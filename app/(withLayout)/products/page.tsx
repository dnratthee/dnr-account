export const dynamic = "force-dynamic";
import { Metadata } from "next";
import prisma from "~/lib/prisma";
import { ProductList } from "~/components/ItemList";

export const metadata: Metadata = {
  title: "DNR Account :: Products",
};

export default async function Page() {
  const products = await prisma.product.findMany();

  return (
    <div>
      <ProductList list={products} />
    </div>
  );
}
