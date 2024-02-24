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
    page?: string;
    status?: string;
    name?: string;
    no?: string;
    from?: string;
    to?: string;
    all?: string;
  };
}) {
  const no = searchParams?.no || "";
  const name = searchParams?.name || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 20;
  const created = searchParams?.all == "1" ? false : true || true;

  const fromDate = searchParams?.from || "2024-01";
  const toDate = searchParams?.to || "2024-12";

  const status = searchParams?.status || "";

  let filter: { [k: string]: any } = {
    created: true,
    no: { contains: no },
    date: { gte: new Date(fromDate), lt: new Date(toDate) },
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
  };

  // filter.where.created = false;

  const constructedWhere = Object.keys(filter).reduce((k, p) => {
    k[p] = filter[p];
    return k;
  }, {});

  // (searchParams?.all ? created: created : created: created),

  const count = (
    await prisma.invoice.findMany({
      where: constructedWhere,
    })
  ).length;

  const invoice = await prisma.invoice.findMany({
    where: constructedWhere,
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
        searchParams={searchParams}
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
