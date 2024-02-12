import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import banks from "./seeds/bank";
import bankAccountTypes from "./seeds/bankAccountType";
import billingNoteStatusTypes from "./seeds/billingNoteStatusType";
import cashInvoiceStatusTypes from "./seeds/cashInvoiceStatusType";
import categories from "./seeds/category";
import contactTypes from "./seeds/contactType";
import invoiceStatusTypes from "./seeds/invoiceStatusType";
import receiptStatusTypes from "./seeds/receiptStatusType";
import roles from "./seeds/role";
import units from "./seeds/unit";
import productTypes from "./seeds/productType";
import paymentTypes from "./seeds/paymentType";
import expensesCategories from "./seeds/expensesCategory";

async function main() {


    const bank = await banks.map(async (d) => await prisma.bank.create({
        data: d
    }));
    console.log("Bank seed data " + bank.length + " row(s).");

    const bankAccountType = await bankAccountTypes.map(async (d) => await prisma.bankAccountType.create({
        data: d
    }));
    console.log("BankAccountType seed data " + bankAccountType.length + " row(s).");

    const billingNoteStatusType = await billingNoteStatusTypes.map(async (d) => await prisma.billingNoteStatusType.create({
        data: d
    }));
    console.log("BillingNoteStatusType seed data " + billingNoteStatusType.length + " row(s).");

    const cashInvoiceStatusType = await cashInvoiceStatusTypes.map(async (d) => await prisma.cashInvoiceStatusType.create({
        data: d
    }));
    console.log("CashInvoiceStatusType seed data " + cashInvoiceStatusType.length + " row(s).");

    const category = await categories.map(async (d) => await prisma.category.create({
        data: d
    }));
    console.log("Category seed data " + category.length + " row(s).");

    const contactType = await contactTypes.map(async (d) => await prisma.contactType.create({
        data: d
    }));
    console.log("ContactType seed data " + contactType.length + " row(s).");

    const invoiceStatusType = await invoiceStatusTypes.map(async (d) => await prisma.invoiceStatusType.create({
        data: d
    }));
    console.log("InvoiceStatusType seed data " + invoiceStatusType.length + " row(s).");

    const receiptStatusType = await receiptStatusTypes.map(async (d) => await prisma.receiptStatusType.create({
        data: d
    }));
    console.log("ReceiptStatusType seed data " + receiptStatusType.length + " row(s).");

    const role = await roles.map(async (d) => await prisma.role.create({
        data: d
    }));
    console.log("Role seed data " + role.length + " row(s).");

    const unit = await units.map(async (d) => await prisma.unit.create({
        data: d
    }));
    console.log("Unit seed data " + unit.length + " row(s).");


    const productType = await productTypes.map(async (d) => await prisma.productType.create({
        data: d
    }));
    console.log("productType seed data " + productType.length + " row(s).");

    const paymentType = await paymentTypes.map((d) => prisma.paymentType.create({
        data: d
    }));
    console.log("paymentTypes seed data " + paymentType.length + " row(s).");


    const expensesCategory = await expensesCategories.map((d) => prisma.expensesCategory.create({
        data: d
    }));
    console.log("expensesCategory seed data " + expensesCategory.length + " row(s).");

}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit();
    });