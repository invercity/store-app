import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductService } from '../product/product.service';
import { ProductListFiltersDTO } from '../product/dto';

@Injectable()
export class StoreService {
    constructor(
        private prisma: PrismaService,
        private productService: ProductService,
    ) {}

    create(data: any) {
        return this.prisma.store.create({ data });
    }

    async update(storeId: string, data: any) {
        try {
            return await this.prisma.store.update({
                where: { id: storeId },
                data,
            });
        } catch (error) {
            throw new NotFoundException(`Store with ID ${storeId} not found`);
        }
    }

    async remove(storeId: string) {
        try {
            return await this.prisma.store.delete({ where: { id: storeId } });
        } catch (error) {
            console.log(error)
            throw new NotFoundException(`Store with ID ${storeId} not found`);
        }
    }

    get(id: string) {
        return this.prisma.store.findUnique({ where: { id } });
    }

    getAll() {
        return this.prisma.store.findMany();
    }

    async getAllProductsByStoreWithFilters(
        id: string,
        query: ProductListFiltersDTO,
    ) {
        const store = await this.prisma.store.findUnique({
            where: { id },
        });
        if (!store) {
            throw new NotFoundException(`Store with ID ${id} not found`);
        }
        return this.productService.getAllByStoreWithFilters(id, query);
    }

    async getInventoryValue(id: string) {
        const store = await this.prisma.store.findUnique({
            where: { id },
        });
        if (!store) {
            throw new NotFoundException(`Store with ID ${id} not found`);
        }
        const result = await this.prisma.$queryRaw<{ total: number }[]>`
            SELECT COALESCE(SUM(price * quantity), 0) as total
            FROM "Product"
            WHERE "storeId" = ${id}
        `;

        return {
            storeId: id,
            total: result[0].total,
        };
    }
}
