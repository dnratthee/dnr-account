export const dynamic = "force-dynamic";
import { Metadata } from "next";
import prisma from "~/lib/prisma";
import { ContactList } from "~/components/ItemList";

export const metadata: Metadata = {
  title: "DNR Account :: Contact",
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
  const contacts = await prisma.contact.findMany({
    include: {
      company: true,
    },
  });

  return (
    <div>
      <div className="title">สินค้า</div>
      <div className="table">
        <ContactList list={contacts} searchParams={searchParams} />
      </div>
    </div>
  );
}
