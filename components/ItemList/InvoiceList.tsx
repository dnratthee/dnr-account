import Link from "next/link";
import { number, plusDate } from "~/utils/formater";

export default ({ list }) => (
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
        <Link href={`/invoices/${data.no}/print`}>
          {/* <Link href={`/invoices/${data.no}`}>*/}
          <div key={data.no} className="tr">
            {/* <div className="td box">
            <input type="checkbox" />
          </div> */}
            <div className="td">{data.date.toLocaleDateString("th")}</div>
            <div className="td">{data.no}</div>
            <div className="td">{data.shipping.name}</div>
            <div className="td">{/* {plusDate(data.date, 0)} */}</div>
            <div className="td">{number.format(Number(data.netTotal))}</div>
            <div className="td">
              {data.InvoiceStatus[0]
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
