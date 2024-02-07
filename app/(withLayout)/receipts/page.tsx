export const dynamic = "force-dynamic";

import { Metadata } from "next";
import Link from "next/link";

import prisma from "~/lib/prisma";
import { ReceiptList } from "~/components/ItemList";
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
    await prisma.receipt.findMany({
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

  const bill = await prisma.receipt.findMany({
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
      ReceiptStatus: { include: { status: true } },
    },
    orderBy: {
      createDate: "desc",
    },
  });

  return (
    <>
      <div className="title">ใบเสร็จรับเงิน</div>
      <div className="table">
        <ReceiptList list={bill} searchParams={searchParams} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(count / limit)}
      />
    </>
  );
}
