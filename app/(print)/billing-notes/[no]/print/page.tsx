import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "~/lib/prisma";
import { bahttext } from "bahttext";
import { number, plusDate, phone } from "~/lib/utils/formatter";

export async function generateMetadata({ params }) {
  return {
    title: params.no,
  };
}

async function Paper({ no = "", c = false }) {
  let sum = 0;
  let netTotal = 0;
  let sumVat = 0;

  const bill = await prisma.billingNote.findUnique({
    where: { no: no },
    include: {
      BillingNoteStatus: {
        orderBy: { createDate: "desc" },
        take: 1,
      },
      invoices: {
        include: {
          contact: { include: { company: true } },
          Receipt: {
            include: {
              ReceiptStatus: {
                orderBy: { createDate: "desc" },
                take: 1,
              },
            },
          },
        },
        orderBy: { date: "asc" },
      },
    },
  });

  if (!bill) {
    redirect("/billing-notes");
  }

  return bill ? (
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
              <p>ใบวางบิล</p>
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
                  {bill.invoices[0] &&
                  bill.invoices[0].contact.taxId &&
                  bill.invoices[0].contact.taxId.length >= 10
                    ? "สาขา : " +
                      ("0000" + bill.invoices[0].contact.branchId).slice(-5)
                    : ""}
                </div>
                <p>
                  {bill.invoices[0] && bill.invoices[0].contact.company
                    ? bill.invoices[0].contact.company.name +
                      "\n" +
                      (bill.invoices[0].contact.company.address || "")
                    : bill.invoices[0] &&
                      bill.invoices[0].contact.name +
                        "\n" +
                        (bill.invoices[0].contact.address || "")}
                </p>
                <p>
                  {bill.invoices[0] &&
                  bill.invoices[0].contact.taxId &&
                  bill.invoices[0].contact.taxId.length >= 10
                    ? "เลขประจำตัวผู้เสียภาษี : " +
                      bill.invoices[0].contact.taxId
                    : ""}
                </p>
                <p>
                  {bill.invoices[0] && bill.invoices[0].contact.phone
                    ? "เบอร์ติดต่อ : " + phone(bill.invoices[0].contact.phone)
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
                <p>{bill.no}</p>
              </div>
              <div className="shippingDate">
                <div className="left">
                  <p>วันที่ :</p>
                  <p>Date</p>
                </div>
                <p>{bill.createDate.toLocaleDateString("th")}</p>
              </div>
              <div>
                <div className="left">
                  <p>เครดิต :</p>
                  <p>Credit</p>
                </div>
                <p>{bill.credit} วัน</p>
              </div>
              <div>
                <div className="left">
                  <p>ครบกำหนด :</p>
                  <p>Due Date</p>
                </div>
                <p>
                  {plusDate(bill.createDate, bill.credit).toLocaleDateString(
                    "th"
                  )}
                </p>
              </div>
              <div>
                {/* <p>{bill.invoices[0].dueDate.toLocaleDateString("th")}</p> */}
              </div>
            </div>
          </div>
          <div className="detail bill">
            <div className="header row">
              <div>ลำดับ</div>
              <div>เลขที่เอกสาร</div>
              <div>เอกสารวันที่</div>
              <div>วันครบกำหนด</div>
              <div>ยอดก่อนภาษี</div>
              <div>มูลค่าที่ต้องชำระ</div>
            </div>

            {bill.invoices.map((item, index) => {
              netTotal += Number(item.netTotal);
              sum += Number(item.nonVatTotal);
              return (
                <div className="row" key={index}>
                  <div>{index + 1}</div>
                  <div>
                    <Link href={`/invoices/${item.no}/print`}>
                      {item.no} {item.po ? "( P/O : " + item.po + " )" : ""}
                    </Link>
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
                  จำนวนรวม : {bill.invoices.length} รายการ
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

        {bill.BillingNoteStatus[0] ? (
          bill.BillingNoteStatus[0].billingNoteStatusTypeId == 4 ? (
            <div className="watermark void">VOID</div>
          ) : (
            ""
          )
        ) : bill.invoices[0].Receipt &&
          bill.invoices[0].Receipt.ReceiptStatus[0].receiptStatusTypeId == 2 ? (
          <div className="watermark">PAID</div>
        ) : (
          ""
        )}

        <div className="remark">
          <p>หมายเหตุ : {bill.remark}</p>
          <p>วิธีการชำระเงิน : {process.env.NEXT_PUBLIC_company_payment} </p>
        </div>

        <div className="footer">
          <div className="box">
            <div>ผู้รับวางบิล :</div>
            <div></div>
            <div>วันที่ : </div>
            {/* <div>เวลา : </div> */}
          </div>
          <div className="box">
            <div>ผู้วางบิล :</div>
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

export default function Page({ params }: { params: { no: string } }) {
  return (
    <div>
      <Paper no={params.no} c />
      <Paper no={params.no} />
    </div>
  );
}
