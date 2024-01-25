export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";

import prisma from "~/lib/prisma";

export const metadata: Metadata = {
  title: "DNR Account :: Products",
};

export default async function Page({ params }) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params?.id) },
  });

  if (!product) {
    redirect("/products");
  }

  return (
    <ul>
      <li key={product.id}>{product.name}</li>
    </ul>
  );
}
