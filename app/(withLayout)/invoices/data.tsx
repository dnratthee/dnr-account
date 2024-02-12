import { Metadata } from "next";
import prisma from "~/lib/prisma";
import { InvoiceList } from "~/components/ItemList";
import Pagination from "~/components/Pagination";
import { number } from "~/lib/utils/formatter";

export default async function Data({
  searchParams,
}: {
  searchParams?: {
    limit?: string;
    query?: string;
    page?: string;
    status?: string;
    name?: string;
    no?: string;
  };
}) {
  const no = searchParams?.no || "";
  const name = searchParams?.name || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 20;

  const status = searchParams?.status || "";
  const query = searchParams?.query || {};

  const count = (
    await prisma.invoice.findMany({
      where: {
        created: true,
        no: { contains: no },
        OR: [
          {
            contact: {
              name: {
                contains: name,
              },
            },
          },
          {
            contact: {
              company: {
                name: {
                  contains: name,
                },
              },
            },
          },
        ],
      },
    })
  ).length;

  const invoice = await prisma.invoice.findMany({
    where: {
      created: true,
      no: { contains: no },
      OR: [
        {
          contact: {
            name: {
              contains: name,
            },
          },
        },
        {
          contact: {
            company: {
              name: {
                contains: name,
              },
            },
          },
        },
      ],
    },
    include: {
      BillingNote: {
        include: {
          BillingNoteStatus: { orderBy: { createDate: "desc" }, take: 1 },
        },
      },
      Receipt: {
        include: {
          ReceiptStatus: { orderBy: { createDate: "desc" }, take: 1 },
        },
      },
      contact: {
        include: {
          company: true,
        },
      },
      InvoiceStatus: {
        include: {
          status: true,
        },
        take: 1,
        orderBy: {
          createDate: "desc",
        },
      },
    },
    orderBy: {
      date: "desc",
    },
    skip: (currentPage - 1) * limit,
    take: limit,
  });

  return (
    <>
      <div className="table">
        <InvoiceList list={invoice} searchParams={searchParams} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(count / limit)}
      />
      <div>
        Total :{" "}
        {invoice.length >= 1 &&
          number.format(
            invoice
              .map((x) => Number(x.netTotal))
              .reduce((x, y) => Number(x) + Number(y))
          )}
      </div>
    </>
  );
}
