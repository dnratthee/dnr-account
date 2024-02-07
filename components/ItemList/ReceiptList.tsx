import Link from "next/link";
import { number } from "~/lib/utils/formatter";

import dynamic from "next/dynamic";
const SearchBox = dynamic(() => import("~/components/SearchBox"), {
  ssr: false,
});

export default ({ list, searchParams }) => {
  return (
    <>
      <div className="tr header">
        {/* <div className="th box">_</div> */}
        <div className="th">วันที่</div>
        <div className="th">เลขที่เอกสาร</div>
        <div className="th">ชื่อลูกค้า</div>
        <div className="th">ยอดรวม</div>
        <div></div>
        <div className="th">สถานะ</div>
        {/* <div className="th box"></div> */}
      </div>

      <SearchBox searchParams={searchParams} />

      {list.map((data) => {
        let sum = 0;
        if (data.invoices[0])
          return (
            <Link key={data.no} href={`/receipts/${data.no}/print`}>
              {/* href={`/billing-notes/${data.no}` */}
              <div
                className={`tr data ${
                  data.ReceiptStatus[0] && data.ReceiptStatus[0].status.id == 4
                    ? "void"
                    : ""
                }`}
              >
                {/* <div className="td box">_</div> */}
                <div className="td">
                  {data.createDate.toLocaleDateString("th")}
                </div>
                <div className="td">{data.no}</div>
                <div className="td">
                  {data.invoices[0] ? data.invoices[0].shipping.name : ""}
                </div>
                <div className="td">
                  {number.format(
                    data.invoices
                      .map((x) => x.netTotal)
                      .reduce((x, y) => Number(x) + Number(y))
                  )}
                </div>
                <div></div>
                <div
                  className={
                    data.ReceiptStatus[0] &&
                    data.ReceiptStatus[0].status.id == 2
                      ? "td success"
                      : data.ReceiptStatus[0] &&
                        data.ReceiptStatus[0].status.id == 3
                      ? "td void"
                      : "td"
                  }
                >
                  {data.ReceiptStatus[0]
                    ? data.ReceiptStatus[0].status.name
                    : "Awaiting"}
                </div>
                {/* <div className="td box">...</div> */}
              </div>
            </Link>
          );
      })}
    </>
  );
};
