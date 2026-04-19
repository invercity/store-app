import { PrismaClient } from '@prisma/client'
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Start seeding...')

    // Create initial data
    const store1 = await prisma.store.create({
        data: {
            name: 'Central Store',
            products: {
                create: [
                    {
                        name: 'Laptop',
                        category: 'Electronics',
                        price: 1200.0,
                        quantity: 10,
                    },
                    {
                        name: 'Coffee Mug',
                        category: 'Kitchen',
                        price: 15.0,
                        quantity: 50,
                    },
                ],
            },
        },
    })

    const store2 = await prisma.store.create({
        data: {
            name: 'Gadget Hub',
            products: {
                create: [
                    {
                        name: 'Smartphone',
                        category: 'Electronics',
                        price: 800.0,
                        quantity: 25,
                    },
                    {
                        name: 'Wireless Mouse',
                        category: 'Electronics',
                        price: 25.0,
                        quantity: 100,
                    },
                ],
            },
        },
    });

    console.log({ store1, store2 })
    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
