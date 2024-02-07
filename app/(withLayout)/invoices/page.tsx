// export const dynamic = "force-dynamic";
// import dynamic from "next/dynamic";
// const InvoiceList = dynamic(() => import("~/components/ItemList/InvoiceList"), {
//   ssr: false,
// });
import { Suspense } from "react";
import { Metadata } from "next";

import prisma from "~/lib/prisma";
import { InvoiceList } from "~/components/ItemList";
import Pagination from "~/components/Pagination";

export const metadata: Metadata = {
  title: "DNR Account :: Invoice",
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

  const status = searchParams?.status || "";
  const query = searchParams?.query || {};

  const count = (
    await prisma.invoice.findMany({
      where: {
        no: { contains: no },
        shipping: {
          name: {
            contains: name,
          },
        },
      },
    })
  ).length;

  const invoice = await prisma.invoice.findMany({
    where: {
      no: { contains: no },
      shipping: {
        name: {
          contains: name,
        },
      },
    },
    include: {
      BillingNote: true,
      Receipt: true,
      shipping: {},
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
      <div className="title">ใบส่งสินค้า/ใบแจ้งหนี้/ใบกำกับภาษี</div>
      <div className="table">
        <Suspense fallback={<p>Loading data...</p>}>
          <InvoiceList list={invoice} searchParams={searchParams} />
        </Suspense>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(count / limit)}
      />
    </>
  );
}
