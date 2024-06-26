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

      <div className="data">
        {list.map((data) => {
          return (
            <div
              key={data.no}
              className={`tr data ${
                data.InvoiceStatus[0] && data.InvoiceStatus[0].status.id == 4
                  ? "void"
                  : ""
              }`}
            >
              {/* <div className="td box">
            <input type="checkbox" />
          </div> */}
              <Link href={`/invoices/${data.no}/print`}>
                <div className="td">{data.date.toLocaleDateString("th")}</div>
                <div className="td">{data.no}</div>
                <div className="td">
                  {data.contact.name}
                  {data.contact.company
                    ? " - " + data.contact.company.name
                    : ""}
                </div>
                <div className="td">
                  {plusDate(data.date, data.credit).toLocaleDateString("th")}
                </div>
                <div className={`td ${data.netTotal <= 0 ? "warning" : ""}`}>
                  {data.netTotal <= 0
                    ? "ยังไม่คำนวน"
                    : number.format(Number(data.netTotal))}
                </div>
              </Link>
              <div className="td">
                {data.InvoiceStatus[0] &&
                data.InvoiceStatus[0].status.id > 2 ? (
                  data.InvoiceStatus[0].status.name
                ) : data.Receipt ? (
                  data.Receipt.ReceiptStatus[0] &&
                  data.Receipt.ReceiptStatus[0].receiptStatusTypeId > 2 ? (
                    <Link
                      className="void"
                      href={`receipts/${data.Receipt.no}/print`}
                    >
                      Receipt Void
                    </Link>
                  ) : (
                    <Link
                      className="success"
                      href={`receipts/${data.Receipt.no}/print`}
                    >
                      Receipt created
                    </Link>
                  )
                ) : data.BillingNote ? (
                  data.BillingNote.BillingNoteStatus[0] &&
                  data.BillingNote.BillingNoteStatus[0]
                    .billingNoteStatusTypeId > 3 ? (
                    <Link
                      className="void"
                      href={`billing-notes/${data.BillingNote.no}/print`}
                    >
                      Payment Bill Void
                    </Link>
                  ) : (
                    <Link
                      className="wait"
                      href={`billing-notes/${data.BillingNote.no}/print`}
                    >
                      Payment Due
                    </Link>
                  )
                ) : (
                  <Link href={`/invoices/${data.no}/print`}>Awaiting</Link>
                )}
              </div>
              {/* <div className="td box">...</div> */}
            </div>
          );
        })}
      </div>
    </>
  );
};
