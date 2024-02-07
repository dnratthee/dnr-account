import { Metadata } from "next";
import prisma from "~/lib/prisma";
import { BillingNoteList } from "~/components/ItemList";
import Pagination from "~/components/Pagination";

export const metadata: Metadata = {
  title: "DNR Account :: Billing Note",
};

export default async function Page({
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

  const count = (
    await prisma.billingNote.findMany({
      where: {
        no: { contains: no },
        invoices: {
          every: {
            shipping: {
              name: {
                contains: name,
              },
            },
          },
        },
      },
    })
  ).length;

  const bill = await prisma.billingNote.findMany({
    where: {
      no: { contains: no },
      invoices: {
        every: {
          shipping: {
            name: {
              contains: name,
            },
          },
        },
      },
    },
    include: {
      invoices: { include: { shipping: true } },
      BillingNoteStatus: { include: { status: true } },
    },
    orderBy: {
      createDate: "desc",
    },
  });

  return (
    <>
      <div className="title">ใบวางบิล</div>
      <div className="table">
        <BillingNoteList list={bill} searchParams={searchParams} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(count / limit)}
      />
    </>
  );
}
