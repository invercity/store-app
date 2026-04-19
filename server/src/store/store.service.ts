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
            throw new NotFoundException(`Store with ID ${storeId} not found`);
        }
    }

    getAll() {
        return this.prisma.store.findMany();
    }

    async getAllProductsByStoreWithFilters(
        storeId: string,
        query: ProductListFiltersDTO,
    ) {
        const store = await this.prisma.store.findUnique({
            where: { id: storeId },
        });
        if (!store) {
            throw new NotFoundException(`Store with ID ${storeId} not found`);
        }
        return this.productService.getAllByStoreWithFilters(storeId, query);
    }

    async getInventoryValue(storeId: string) {
        const store = await this.prisma.store.findUnique({
            where: { id: storeId },
        });
        if (!store) {
            throw new NotFoundException(`Store with ID ${storeId} not found`);
        }
        const products = await this.prisma.product.findMany({
            where: { storeId },
        });

        const total = products.reduce(
            (sum: number, p: any) => sum + p.price * p.quantity,
            0,
        );

        return { storeId, total };
    }
}
