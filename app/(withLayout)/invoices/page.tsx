export const dynamic = "force-dynamic";

import { Metadata } from "next";
import Link from "next/link";

import prisma from "~/lib/prisma";
import { InvoiceList } from "~/components/ItemList";

export const metadata: Metadata = {
  title: "DNR Account :: Invoice",
};

export default async function Page() {
  const invoice = await prisma.invoice.findMany({
    include: {
      shipping: {},
      InvoiceStatus: {
        include: {
          status: true,
        },
        orderBy: {
          createDate: "desc",
        },
        take: 1,
      },
    },
  });

  return (
    <>
      <div>ใบส่งสินค้า/ใบแจ้งหนี้/ใบกำกับภาษี</div>
      <div className="table">
        <InvoiceList list={invoice} />
      </div>
    </>
  );
}
