export const dynamic = "force-dynamic";

import { Metadata } from "next";
import Link from "next/link";

import prisma from "~/lib/prisma";
import { BillingNoteList } from "~/components/ItemList";

export const metadata: Metadata = {
  title: "DNR Account :: Billing Note",
};

export default async function Page() {
  const bill = await prisma.billingNote.findMany({
    include: {
      invoices: { include: { shipping: true } },
      BillingNoteStatus: { include: { status: true } },
    },
  });

  return (
    <>
      <div>ใบวางบิล</div>
      <div className="table">
        <BillingNoteList list={bill} />
      </div>
    </>
  );
}
