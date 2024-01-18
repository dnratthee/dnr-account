import { NextResponse } from 'next/server'
import prisma from "~/lib/prisma";

export async function GET(request: Request) {
    const products = await prisma.product.findMany()
    return NextResponse.json({
        success: true,
        payload: products
    })
} 