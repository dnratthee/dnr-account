import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { bahttext } from "bahttext";
import prisma from "~/lib/prisma";

import { number, plusDate } from "~/lib/utils/formatter";

export async function generateMetadata({ params }) {
  return {
    title: params.no,
  };
}

async function Paper({ no = "", c = false }) {
  let sum = 0;
  let sumDis = 0;
  let sumVat = 0;
  let itemId = 0;

  const invoice = await prisma.invoice.findUnique({
    where: { no: "QT202402-0001" },
    include: {
      contact: {
        include: {
          company: true,
        },
      },
      InvoiceDetail: {
        include: {
          product: {
            include: {
              unit: true,
            },
          },
        },
        orderBy: [
          {
            productId: "asc",
          },
          {
            amount: "asc",
          },
        ],
      },
    },
  });

  return invoice ? (
    <section
      className={`sheet padding-10mm ${
        invoice.InvoiceDetail.length <= 1 ? "A5" : ""
      }`}
    >
      <div className="page">
        <div className="header">
          <div className="companySender">
            <div className="logo">
              <Image
                src="/static/images/logo.png"
                alt="logo"
                width={170}
                height={80}
                quality={100}
              />
            </div>
            <div className="detail">
              <p>{process.env.NEXT_PUBLIC_company_name}</p>
              <p>{process.env.NEXT_PUBLIC_company_address}</p>
              <p>
                เลขประจำตัวผู้เสียภาษี : {process.env.NEXT_PUBLIC_company_taxID}
              </p>
              {/* <p>เบอร์ติดต่อ : {process.env.NEXT_PUBLIC_company_phone}</p> */}
            </div>
          </div>
          <div className="name">
            <div>
              <p>ใบเสนอราคา</p>
              <p></p>
            </div>
            {/* <div>{c ? "ต้นฉบับลูกค้า" : "สำเนาผู้ขาย"}</div> */}
          </div>
        </div>
        <div className="body">
          <div className="header qt">
            <div className="customer">
              <div className="customerDetail">
                <div className="label">ลูกค้า : </div>
                <div className="brunch">
                  {invoice.contact.taxId && invoice.contact.taxId.length >= 10
                    ? "สาขา : " + ("0000" + invoice.contact.branchId).slice(-5)
                    : ""}
                </div>
                <p>
                  {invoice.contact.company
                    ? invoice.contact.company.name + "\n"
                    : invoice.contact.name + "\n"}
                  {invoice.address ? invoice.address : invoice.contact.address}
                </p>
                <p>
                  {invoice.contact.taxId && invoice.contact.taxId.length >= 10
                    ? "เลขประจำตัวผู้เสียภาษี : " + invoice.contact.taxId
                    : ""}
                </p>
              </div>
            </div>
            <div className="shippingDetail">
              <div className="no">
                <div className="left">
                  <p>เลขที่ :</p>
                  <p>Bill No.</p>
                </div>
                <p>{invoice.no}</p>
              </div>
              <div className="shippingDate">
                <div className="left">
                  <p>วันที่ :</p>
                  <p>Date</p>
                </div>
                <p>{invoice.date.toLocaleDateString("th")}</p>
              </div>
              {/* <div>
                <div className="left">
                  <p>เครดิต :</p>
                  <p>Credit</p>
                </div>
                <p>
                  {invoice.credit
                    ? invoice.credit + " วัน"
                    : invoice.contact.credit
                    ? invoice.contact.credit + " วัน"
                    : ""}
                </p>
              </div> */}
            </div>
          </div>
          <div className="detail qt">
            <div className="header row">
              <div>ลำดับ</div>
              <div>รายการสินค้า</div>
              {/* <div>จำนวน</div> */}
              <div>หน่วย</div>
              <div>ราคาต่อหน่วย</div>
              {/* <div>จำนวนเงิน (บาท)</div> */}
            </div>

            {invoice.InvoiceDetail.map((item, index) => {
              itemId += 1;
              let price = Number(item.price) * Number(item.amount);
              let pricev = price;
              sum += price;
              let discount = (price * item.discount) / 100;
              price -= discount;
              if (item.vat == true) {
                sumVat += (price * 7) / 100;
                price = (price * 100) / 107;
              }
              sumDis += discount;
              return (
                <div className="row" key={index}>
                  <div>{itemId}</div>
                  <div className="itemName">
                    <div>{item.name}</div>
                    {/* <div className="right">{item.vat ? "V " : "N "}</div> */}
                  </div>
                  {/* <div>{item.amount.toFixed(3)}</div> */}
                  <div>{item.product.unit.name}</div>
                  <div>{number.format(Number(item.price))}</div>
                </div>
              );
            })}
            {/* <div className="total row">
              <div></div>
              <div>ราคาสินค้าไม่รวมภาษี</div>
              <div>{number.format(sum - sumVat)}</div>
            </div>
            <div className="total row">
              <div></div>
              <div className="vat">
                <div className="left">*V = VAT, N = Non VAT</div>
                <div className="right">ภาษีมูลค่าเพิ่ม (7%)</div>
              </div>
              <div>{number.format(sumVat)}</div>
            </div>
            <div className="total row">
              <div></div>
              <div className="nettotal">
                <div>({bahttext(sum - sumDis)})</div>
                <div>ยอดรวมสุทธิ</div>
              </div>
              <div className="nettotal qt">{number.format(sum - sumDis)}</div>
            </div> */}
          </div>
        </div>

        <div className="remark">
          {/* <p>{invoice.remark ? "หมายเหตุ : " + invoice.remark : ""}</p>
          <p>วิธีการชำระเงิน : {process.env.NEXT_PUBLIC_company_payment} </p> */}
        </div>

        <div className="footer qt">
          {/* <div className="box">
            <div>ผู้ส่งสินค้า :</div>
            <div></div>
            <div>วันที่ : </div>
          </div>
          <div className="box">
            <div>ผู้รับสินค้า :</div>
            <div></div>
            <div>วันที่ : </div>
          </div> */}
          <div className="box">
            <div>ผู้อนุมัติ :</div>
            <div className="sign">
              <Image
                src="/static/images/sign.jpg"
                alt="logo"
                width={170}
                height={80}
                quality={100}
              />
            </div>
            <div>วันที่ : {new Date(Date.now()).toLocaleDateString("th")}</div>
            {/* <div>เวลา : {new Date(Date.now()).toLocaleTimeString("th")}</div> */}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <></>
  );
}

export default function Page({ params }) {
  return (
    <div>
      <Paper no={params.no} c />
    </div>
  );
}
