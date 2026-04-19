import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Start seeding...');

    const stores = [
        {
            name: 'Central Store',
            products: [
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
        {
            name: 'Gadget Hub',
            products: [
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
    ];

    for (const storeData of stores) {
        const store = await prisma.store.findFirst({
            where: { name: storeData.name },
        });

        if (!store) {
            await prisma.store.create({
                data: {
                    name: storeData.name,
                    products: {
                        create: storeData.products,
                    },
                },
            });
            console.log(`Created store: ${storeData.name}`);
        } else {
            console.log(`Store already exists: ${storeData.name}`);

            for (const productData of storeData.products) {
                const product = await prisma.product.findFirst({
                    where: {
                        name: productData.name,
                        storeId: store.id,
                    },
                });

                if (!product) {
                    await prisma.product.create({
                        data: {
                            ...productData,
                            storeId: store.id,
                        },
                    });
                    console.log(
                        `Created product: ${productData.name} for store ${storeData.name}`,
                    );
                } else {
                    console.log(
                        `Product already exists: ${productData.name} in store ${storeData.name}`,
                    );
                }
            }
        }
    }

    console.log('Seeding finished.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
