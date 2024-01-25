import { NextResponse } from 'next/server'
import prisma from "~/lib/prisma";

export async function GET(request: Request) {

    const invoice = {
        customer: {
            name: "บริษัท จำกัด",
            address:
                "แขวงลุมพินี เขตปทุมวัน \nกรุงเทพมหานคร 10330",
            taxID: "0000000000000",
            brunchID: "00000",
        },
        shipping: {
            name: "บริษัท จำกัด",
            address:
                "แขวงลุมพินี เขตปทุมวัน \nกรุงเทพมหานคร 10330",
        },
        no: "INV202401-0001",
        po: "PO202401-0202",
        date: "25/01/2024",
        dueDate: "24/02/2024",
        remark: "ส่งสินค้าทางไปรษณีย์",
        detail: [
            {
                id: 1,
                name: "เป็ด",
                unit: "กก.",
                perUnit: 300.000,
                vat: 0,
                amount: 12.400
            },
            {
                id: 2,
                name: "ไก่",
                unit: "ตัว",
                perUnit: 250.000,
                vat: 0,
                amount: 10
            },
            {
                id: 3,
                name: "น้ำมันเป็ด",
                unit: "กระปุก",
                perUnit: 300.000,
                vat: 0.07,
                amount: 10
            },
            {
                id: 4,
                name: "ไข่",
                unit: "แผง",
                perUnit: 180.000,
                vat: 0,
                amount: 20
            }
        ]
    }

    return NextResponse.json({
        success: true,
        payload: invoice
    })
} 