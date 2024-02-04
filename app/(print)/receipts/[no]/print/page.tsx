import Image from "next/image";

import prisma from "~/lib/prisma";
import { bahttext } from "bahttext";
import { number, plusDate, phone } from "~/utils/formater";

export async function generateMetadata({ params }) {
  return {
    title: params.no,
  };
}

async function Paper({ no = "", c = false }) {
  let sum = 0;
  let netTotal = 0;
  let sumVat = 0;

  const receipt = await prisma.receipt.findUnique({
    where: { no: no },
    include: {
      invoices: { include: { shipping: true, BillingNote: true } },
    },
  });

  return receipt ? (
    <section className="sheet padding-10mm">
      <div className="page">
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
            <div className="detail"></div>
          </div>
          <div className="name">
            <div>
              <p>ใบเสร็จรับเงิน</p>
            </div>
            <div>{c ? "ต้นฉบับลูกค้า" : "สำเนาผู้ขาย"}</div>
          </div>
        </div>
        <div className="body">
          <div className="header">
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
              <div className="customerShipping">
                <div className="label">ลูกค้า : </div>
                <div className="brunch">
                  {receipt.invoices[0].CompanyId.length >= 10
                    ? "สาขา : " +
                      ("0000" + receipt.invoices[0].BranchId).slice(-5)
                    : ""}
                </div>
                <p>
                  {receipt.invoices[0].address !== null
                    ? receipt.invoices[0].address
                    : receipt.invoices[0].shipping.name +
                      "\n" +
                      receipt.invoices[0].shipping.address}
                </p>
                <p>
                  {receipt.invoices[0].CompanyId.length >= 10
                    ? "เลขประจำตัวผู้เสียภาษี : " +
                      receipt.invoices[0].CompanyId
                    : ""}
                </p>
                <p>
                  {receipt.invoices[0].shipping.phone
                    ? "เบอร์ติดต่อ : " +
                      phone(receipt.invoices[0].shipping.phone)
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
                <p>{receipt.no}</p>
              </div>
              <div className="shippingDate">
                <div className="left">
                  <p>วันที่ :</p>
                  <p>Date</p>
                </div>
                <p>{receipt.createDate.toLocaleDateString("th")}</p>
              </div>

              <div>
                <div className="left">
                  <p>อ้างอิง :</p>
                  <p>Refer</p>
                </div>
                <p>{receipt.invoices[0].BillingNote.no}</p>
              </div>
              <div>
                <div className="left">
                  <p></p>
                  <p></p>
                </div>
                <p></p>
              </div>
              <div>
                {/* <p>{receipt.invoices[0].dueDate.toLocaleDateString("th")}</p> */}
              </div>
            </div>
          </div>
          <div className="detail bill">
            <div className="header row">
              <div>ลำดับ</div>
              <div>เลขที่เอกสาร</div>
              <div>เอกสารวันที่</div>
              <div>วันครบกำหนด</div>
              <div>ยอดรวมก่อนภาษี</div>
              <div>มูลค่าที่ต้องชำระ</div>
            </div>

            {receipt.invoices.map((item, index) => {
              netTotal += Number(item.netTotal);
              sum += Number(item.nonVatTotal);
              return (
                <div className="row" key={index}>
                  <div>{index + 1}</div>
                  <div>
                    {item.no} {item.po ? "( P/O : " + item.po + " )" : ""}
                  </div>
                  <div>{item.date.toLocaleDateString("th")}</div>
                  <div>
                    {plusDate(item.date, item.credit).toLocaleDateString("th")}
                  </div>
                  <div>{number.format(Number(item.nonVatTotal))}</div>
                  <div>{number.format(Number(item.netTotal))}</div>
                </div>
              );
            })}

            <div className="total row">
              <div></div>
              <div className="vat">
                <div className="left">
                  จำนวนรวม : {receipt.invoices.length} รายการ
                </div>
                <div className="right">ราคาสินค้าไม่รวมภาษี</div>
              </div>
              <div>{number.format(sum)}</div>
            </div>
            <div className="total row">
              <div></div>
              <div className="vat">
                <div className="left"></div>
                <div className="right">ภาษีมูลค่าเพิ่ม (7%)</div>
              </div>
              <div>{number.format(netTotal - sum)}</div>
            </div>
            <div className="total row">
              <div></div>
              <div className="nettotal">
                <div>({bahttext(netTotal)})</div>
                <div>ยอดรวมสุทธิ</div>
              </div>
              <div className="nettotal end">{number.format(netTotal)}</div>
            </div>
          </div>
        </div>

        <div className="remark">
          {/* <p>หมายเหตุ : {receipt.remark}</p>
          <p>วิธีการชำระเงิน : {process.env.NEXT_PUBLIC_company_payment} </p> */}
        </div>

        <div className="payment">
          <div>
            <div>การชำระเงินจะสมบูรณ์ เมื่อบริษัทได้รับเงินเรียบร้อยแล้ว</div>
            <div>เงินสด</div>
            <div>เช็ค</div>
            <div>โอนเงิน</div>
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
            {/* <div>เวลา : </div> */}
          </div>
          <div className="box">
            <div>ผู้รับเงิน :</div>
            <div className="sign">
              <Image
                src="/static/images/sign.jpg"
                alt="CY logo"
                width={170}
                height={80}
                quality={100}
                unoptimized
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

export default function Page({ params }: { params: { no: string } }) {
  return (
    <div>
      <Paper no={params.no} c />
      <Paper no={params.no} />
    </div>
  );
}
