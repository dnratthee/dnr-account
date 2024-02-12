import { Metadata } from "next";
import prisma from "~/lib/prisma";
import { CashList } from "~/components/ItemList";
import Pagination from "~/components/Pagination";

export const metadata: Metadata = {
  title: "DNR Account :: Receipts",
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
    await prisma.cashInvoice.findMany({
      where: {
        no: { contains: no },
        Invoice: {
          contact: {
            name: {
              contains: name,
            },
          },
        },
      },
    })
  ).length;

  const bill = await prisma.cashInvoice.findMany({
    where: {
      no: { contains: no },
      Invoice: {
        contact: {
          name: {
            contains: name,
          },
        },
      },
    },
    include: {
      Invoice: { include: { contact: { include: { company: true } } } },
      CashInvoiceStatus: {
        include: {
          status: true,
        },
        orderBy: {
          createDate: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      createDate: "desc",
    },
  });

  return (
    <>
      <div className="title">ขายเงินสด</div>
      <div className="table">
        <CashList list={bill} searchParams={searchParams} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(count / limit)}
      />
    </>
  );
}
