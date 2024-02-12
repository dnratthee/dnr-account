export const dynamic = "force-dynamic";
import { Metadata } from "next";
import prisma from "~/lib/prisma";
import { ProductList } from "~/components/ItemList";

export const metadata: Metadata = {
  title: "DNR Account :: Products",
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
  const products = await prisma.product.findMany({
    include: {
      unit: true,
    },
  });

  return (
    <div>
      <div className="title">สินค้า</div>
      <div className="table">
        <ProductList list={products} searchParams={searchParams} />
      </div>
    </div>
  );
}
