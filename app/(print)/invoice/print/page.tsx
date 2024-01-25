import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { bahttext } from "bahttext";

export const metadata: Metadata = {
  title: "DNR Account :: Invoice [Print]",
};

async function getData() {
  const res = await fetch("http://localhost:3000/api/v1/invoice", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const formatter = new Intl.NumberFormat("th", {
    style: "currency",
    currency: "THB",
  });

  const company = {
    name: "บริษัท",
    nameF: "CO., LTD.",
    address: "แขวงบางแคเหนือ \nเขตบางแค กรุงเทพมหานคร 10160",
    addressF: "Bang Khae Nuea, Bang Khae, Bangkok 10160",
    taxID: "0000000000000",
    payment: "โอนชำระเงินได้ที่\nบริษัท. ธนาคาร สาขา บัญชีเลขที่ 000-0-00000-0",
  };

  const invoice = (await getData()).payload;
  let sum = 0;
  let sumVat = 0;

  return (
    <div className="page A4">
      <div className="header">
        <div className="companySender">
          <div className="logo">
            <Image
              src="/static/images/logo.png"
              alt="CY logo"
              width={170}
              height={80}
              quality={100}
              unoptimized
            />
          </div>
          <div className="detail">
            <p>{company.name}</p>
            <p>{company.address}</p>
            <p>เลขประจำตัวผู้เสียภาษี : {company.taxID}</p>
          </div>
        </div>
        <div className="name">ใบส่งของ / ใบแจ้งหนี้</div>
      </div>
      <div className="body">
        <div className="header">
          <div className="customer">
            <div className="customerDetail">
              <div className="label">ลูกค้า : </div>
              <div className="brunch">สาขา : {invoice.customer.brunchID}</div>
              <p>{invoice.customer.name}</p>
              <p>{invoice.customer.address}</p>
              <p>เลขประจำตัวผู้เสียภาษี : {invoice.customer.taxID}</p>
            </div>
            <div className="customerShipping">
              <div className="label">ส่งของที่ : </div>
              <p>{invoice.shipping.name}</p>
              <p>{invoice.shipping.address}</p>
            </div>
          </div>
          <div className="shippingDetail">
            <div className="row">
              <div className="no">
                <p>เลขที่ :</p>
                {invoice.no}
              </div>
              <div className="shippingDate">
                <p>วันที่ส่ง :</p>
                {invoice.date}
              </div>
            </div>
            <div className="row">
              <div className="po">
                <p>หมายเลข PO :</p>
                {invoice.po}
              </div>
              <div className="dueDate">
                <p>กำหนดชำระเงิน :</p>
                {invoice.dueDate}
              </div>
            </div>
          </div>
        </div>
        <div className="detail">
          <div className="header row">
            <div>#</div>
            <div>รายการ</div>
            <div>จำนวน</div>
            <div>หน่วย</div>
            <div>ราคาต่อหน่วย</div>
            <div>จำนวนเงิน</div>
          </div>

          {invoice.detail.map((item, index) => {
            let price = item.perUnit * item.amount;
            sum += price;
            sumVat += price * item.vat;
            return (
              <div className="row" key={index}>
                <div>{item.id}</div>
                <div>
                  {item.vat ? "V " : "N "}
                  {item.name}
                </div>
                <div>{item.amount.toFixed(3)}</div>
                <div>{item.unit}</div>
                <div>{formatter.format(item.perUnit)}</div>
                <div>{formatter.format(price)}</div>
              </div>
            );
          })}
          <div className="total row">
            <div></div>
            <div>ยอดรวมสินค้า</div>
            <div>{formatter.format(sum)}</div>
          </div>
          <div className="total row">
            <div></div>
            <div className="vat">
              <div className="left">*V = VAT, N = Non VAT</div>
              <div className="right">ภาษีมูลค่าเพิ่ม (7%)</div>
            </div>
            <div>{formatter.format(sumVat)}</div>
          </div>
          <div className="total row">
            <div></div>
            <div className="nettotal">
              <div>({bahttext(sum + sumVat)})</div>
              <div>ยอมรวมสุทธิ</div>
            </div>
            <div className="nettotal">{formatter.format(sum + sumVat)}</div>
          </div>
        </div>
      </div>

      <div className="remark">
        <p>หมายเหตุ : {invoice.remark}</p>
        <p>วิธีการชำระเงิน : {company.payment} </p>
      </div>

      <div className="footer">
        <div className="box">
          <div>ผู้ส่งสินค้า :</div>
          <div></div>
          <div>วันที่ : {invoice.date}</div>
          <div>เวลา : </div>
        </div>
        <div className="box">
          <div>ผู้รับสินค้า :</div>
          <div></div>
          <div>วันที่ : </div>
          <div>เวลา : </div>
        </div>
      </div>
    </div>
  );
}
