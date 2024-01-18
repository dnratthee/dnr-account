import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            firstName: "Admin",
            email: "admin@localhost",
            role: {
                create: {
                    name: 'Admin',
                },
            },
            company: {
                create: {
                    company: {
                        create: {
                            companyType: {
                                create: {
                                    name: "Individual"
                                }
                            },
                            taxId: 1111111111119,
                            name: "DNRatthee",
                        }
                    }
                }
            }
        }
    });

    console.log({ user });

    await prisma.role.create({
        data:
            { name: 'User' },
    })

    await prisma.companyType.create({
        data:
            { name: 'Partnership' },
    })
    await prisma.companyType.create({
        data:
            { name: 'Corporation' },
    })

    await prisma.vatType.create({
        data:
            { name: 'Includeing VAT' },
    })
    await prisma.vatType.create({
        data:
            { name: 'Excluding VAT' },
    })
    await prisma.vatType.create({
        data:
            { name: 'Zero VAT' },
    })
    await prisma.vatType.create({
        data:
            { name: 'Non Vat' },
    })

    await prisma.unit.create({
        data:
            { name: 'กก.', nameForeign: 'Kilogram' },
    })
    await prisma.unit.create({
        data:
            { name: 'กรัม', nameForeign: 'Gram' },
    })
    await prisma.unit.create({
        data:
            { name: 'ตัว', nameForeign: 'Unit' },
    })

    await prisma.productType.create({
        data:
            { name: 'Product' },
    })
    await prisma.productType.create({
        data:
            { name: 'Service' },
    })

    await prisma.category.create({
        data:
            { name: 'อาหารสด' },
    })


}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit();
    });