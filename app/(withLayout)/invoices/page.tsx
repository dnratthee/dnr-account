import { Metadata } from "next";
import Data from "./data";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "DNR Account :: Invoice",
};

export default async function Page({ searchParams }: { searchParams? }) {
  return (
    <>
      <div className="title">ใบส่งสินค้า/ใบแจ้งหนี้/ใบกำกับภาษี</div>
      <Suspense fallback={"Loading..."}>
        <Data searchParams={searchParams}></Data>
      </Suspense>
    </>
  );
}
