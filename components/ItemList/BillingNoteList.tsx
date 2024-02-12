import Link from "next/link";
import { number, plusDate } from "~/lib/utils/formatter";

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
        <div className="th">วันครบกำหนด</div>
        <div className="th">ยอดรวม</div>
        <div className="th">สถานะ</div>
        {/* <div className="th box"></div> */}
      </div>

      <SearchBox searchParams={searchParams} />

      {list.map((data) => {
        let sum = 0;
        if (data.invoices[0])
          return (
            <div
              key={data.no}
              className={`tr data ${
                data.BillingNoteStatus[0] &&
                data.BillingNoteStatus[0].status.id == 4
                  ? "void"
                  : ""
              }`}
            >
              <Link href={`/billing-notes/${data.no}/print`}>
                {/* <div className="td box">_</div> */}
                <div className="td">
                  {data.createDate.toLocaleDateString("th")}
                </div>
                <div className="td">{data.no}</div>
                <div className="td">
                  {data.invoices[0].contact.name}
                  {data.invoices[0].contact.company
                    ? " - " + data.invoices[0].contact.company.name
                    : ""}
                </div>
                <div className="td">
                  {plusDate(data.createDate, data.credit).toLocaleDateString(
                    "th"
                  )}
                </div>
                <div className="td">
                  {number.format(
                    data.invoices
                      .map((x) => x.netTotal)
                      .reduce((x, y) => Number(x) + Number(y))
                  )}
                </div>
              </Link>
              <div className="td">
                {data.BillingNoteStatus[0] ? (
                  data.BillingNoteStatus[0].status.name
                ) : data.invoices[0].Receipt ? (
                  <Link
                    className="success"
                    href={`receipts/${data.invoices[0].Receipt.no}/print`}
                  >
                    Receipt created
                  </Link>
                ) : (
                  "Awaiting"
                )}
              </div>
              {/* <div className="td box">...</div> */}
            </div>
          );
      })}
    </>
  );
};
