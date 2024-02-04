import Link from "next/link";
import { number, plusDate } from "~/utils/formater";

export default ({ list }) => {
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

      {list.map((data) => {
        console.log(data.no);
        return (
          <Link href={`/billing-notes/${data.no}/print`}>
            {/* href={`/billing-notes/${data.no}` */}
            <div key={data.no} className="tr">
              {/* <div className="td box">_</div> */}
              <div className="td">
                {data.createDate.toLocaleDateString("th")}
              </div>
              <div className="td">{data.no}</div>
              <div className="td">
                {data.invoices[0] ? data.invoices[0].shipping.name : ""}
              </div>
              <div className="td">
                {plusDate(data.createDate, data.credit).toLocaleDateString(
                  "th"
                )}
              </div>
              <div className="td">
                {data.invoices.count
                  ? number.format(
                      data.invoices
                        .map((x) => x.netTotal)
                        .reduce((x, y) => Number(x) + Number(y))
                    )
                  : 0}
              </div>
              <div className="td">
                {data.BillingNoteStatus[0]
                  ? data.InvoiceStatus[0].status.name
                  : "N/A"}
              </div>
              {/* <div className="td box">...</div> */}
            </div>
          </Link>
        );
      })}
    </>
  );
};
