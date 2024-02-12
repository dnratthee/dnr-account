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
        <div className="th">ชื่อผู้จำหนาย</div>
        <div className="th">หมวดหมู่</div>
        <div className="th">ยอดรวม</div>
        <div className="th">สถานะ</div>
        {/* <div className="th box"></div> */}
      </div>

      {/* <SearchBox searchParams={searchParams} /> */}
      {/* {data.name} {data.nameForeign} {data.code} {data.sellingPrice.toString()} */}
      <div className="data">
        {list.map((data) => {
          return (
            <div key={data.no} className={`tr data`}>
              {/* <div className="td box">
            <input type="checkbox" />
          </div> */}
              <Link href={`/expenses/${data.no}`}>
                <div className="td">{data.date.toLocaleDateString("th")}</div>
                <div className="td">{data.no}</div>
                <div className="td">
                  {data.Contact.contactPerson
                    ? data.Contact.contactPerson
                    : data.Contact.name}
                  {data.Contact.company
                    ? " - " + data.Contact.company.name
                    : data.Contact.id != 0
                    ? " - " + data.Contact.name
                    : ""}
                </div>
                <div className="td">{data.ExpensesDetail[0].category.name}</div>
                <div className="td">{number.format(data.netTotal)}</div>
                <div className="td">...</div>
                {/* <div className="td"></div> */}
              </Link>
              {/* <div className="td box">...</div> */}
            </div>
          );
        })}
      </div>
    </>
  );
};
