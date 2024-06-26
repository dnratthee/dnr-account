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
        <div className="th"></div>
        <div className="th">รหัส</div>
        <div className="th">ชื่อ</div>
        <div className="th">หน่วย</div>
        <div className="th">ราคา/หน่วย</div>
        {/* <div className="th"></div> */}
      </div>
      <SearchBox searchParams={searchParams} />
      {/* {data.name} {data.nameForeign} {data.code} {data.sellingPrice.toString()} */}
      <div className="data">
        {list.map((data) => {
          return (
            <div key={data.code} className={`tr data`}>
              {/* <div className="td box">
            <input type="checkbox" />
          </div> */}
              <Link href={`/products/${data.code}`}>
                <div className="td"></div>
                <div className="td">{data.code}</div>
                <div className="td">{data.name}</div>
                <div className="td">{data.unit.name}</div>
                <div className="td">
                  {number.format(Number(data.sellingPrice))}
                </div>
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
