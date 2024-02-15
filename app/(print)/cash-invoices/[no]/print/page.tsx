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

  const cash = await prisma.cashInvoice.findUnique({
    where: { no: no },
    include: {
      Invoice: {
        include: {
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
          contact: true,
        },
      },
    },
  });

  return cash ? (
    <section className="sheet padding-10mm">
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
            <div className="detail"></div>
          </div>
          <div className="name">
            <div>
              <p>ใบกำกับภาษีอย่างย่อ /</p>
              <p>ใบเสร็จรับเงิน</p>
            </div>
            <div>{c ? "ต้นฉบับลูกค้า" : "สำเนาผู้ขาย"}</div>
          </div>
        </div>
        <div className="body">
          <div className="header cash">
            <div className="customer">
              <div className="customerDetail">
                <p>{process.env.NEXT_PUBLIC_company_name}</p>
                <p>{process.env.NEXT_PUBLIC_company_address}</p>
                <p>
                  เลขประจำตัวผู้เสียภาษี :{" "}
                  {process.env.NEXT_PUBLIC_company_taxID}
                </p>
                {/* <p>เบอร์ติดต่อ : {process.env.NEXT_PUBLIC_company_phone}</p> */}
              </div>
            </div>
            <div className="shippingDetail">
              <div className="no">
                <div className="left">
                  <p>เลขที่ :</p>
                  <p>Bill No.</p>
                </div>
                <p>{cash.no}</p>
              </div>
              <div className="shippingDate">
                <div className="left">
                  <p>วันที่ :</p>
                  <p>Date</p>
                </div>
                <p>{cash.createDate.toLocaleDateString("th")}</p>
              </div>
            </div>
          </div>
          <div className="detail invoice">
            <div className="header row">
              <div>ลำดับ</div>
              <div>รายการสินค้า</div>
              <div>จำนวน</div>
              <div>หน่วย</div>
              <div>ราคาต่อหน่วย</div>
              <div>ส่วนลด</div>
              <div>จำนวนเงิน (บาท)</div>
            </div>

            {cash.Invoice.InvoiceDetail.map((item, index) => {
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
                    <div className="right">{item.vat ? "V " : "N "}</div>
                  </div>
                  <div>{item.amount.toFixed(3)}</div>
                  <div>{item.product.unit.name}</div>
                  <div>{number.format(Number(item.price))}</div>
                  <div>{item.discount} %</div>
                  <div>{number.format(pricev)}</div>
                </div>
              );
            })}
            <div className="total row">
              <div></div>
              <div>ราคาสินค้าไม่รวมภาษี</div>
              <div>{number.format(sum - sumVat)}</div>
            </div>
            <div className="total row">
              <div></div>
              <div>ส่วนลด</div>
              <div>{number.format(sumDis)}</div>
            </div>
            <div className="total row">
              <div></div>
              <div>ราคาสินค้าหลังหักส่วนลด</div>
              <div>{number.format(sum - sumVat - sumDis)}</div>
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
              <div className="nettotal">{number.format(sum - sumDis)}</div>
            </div>
          </div>
        </div>

        <div className="remark">
          <p>
            {cash.Invoice.remark ? "หมายเหตุ : " + cash.Invoice.remark : ""}
          </p>
          <p>วิธีการชำระเงิน : {process.env.NEXT_PUBLIC_company_payment} </p>
        </div>

        <div className="payment">
          <div>
            <div>การชำระเงินจะสมบูรณ์ เมื่อบริษัทได้รับเงินเรียบร้อยแล้ว</div>
            <div>
              <input type="checkbox"></input> เงินสด
            </div>
            <div>
              <input type="checkbox"></input> เช็ค
            </div>
            <div>
              <input type="checkbox"></input> โอนเงิน
            </div>
          </div>
          <div>
            <div>ธนาคาร</div>
            <div></div>
            <div>เลขที่</div>
            <div></div>
            <div>วันที่</div>
            <div></div>
            <div>จำนวนเงิน</div>
            <div></div>
          </div>
        </div>

        <div className="footer">
          <div className="box">
            <div>ผู้จ่ายเงิน :</div>
            <div></div>
            <div>วันที่ : </div>
          </div>
          {/* <div className="box">
            <div>ผู้รับสินค้า :</div>
            <div></div>
            <div>วันที่ : </div>
          </div> */}
          <div className="box">
            <div>ผู้รับเงิน :</div>
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
      <Paper no={params.no} />
    </div>
  );
}
