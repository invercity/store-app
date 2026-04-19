import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
    CreateProductDTO,
    UpdateProductDTO,
    ProductListFiltersDTO,
} from '../product/dto';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    private async getAllWithFiltersAndParams(
        query: ProductListFiltersDTO,
        storeId?: string,
    ) {
        const { page = 1, limit = 10, category, minPrice, maxPrice } = query;

        const where: any = {};

        if (category) where.category = category;
        if (minPrice || maxPrice) {
            where.price = {
                gte: minPrice ? Number(minPrice) : undefined,
                lte: maxPrice ? Number(maxPrice) : undefined,
            };
        }
        if (storeId) where.storeId = storeId;

        const [data, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip: (page - 1) * limit,
                take: Number(limit),
            }),
            this.prisma.product.count({ where }),
        ]);

        return { data, total, page, limit };
    }

    async get(productId: string) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            throw new NotFoundException(
                `Product with ID ${productId} not found`,
            );
        }
        return product;
    }

    create(data: CreateProductDTO) {
        return this.prisma.product.create({ data });
    }

    async update(productId: string, data: Partial<UpdateProductDTO>) {
        try {
            return await this.prisma.product.update({
                where: { id: productId },
                data,
            });
        } catch (error) {
            throw new NotFoundException(
                `Product with ID ${productId} not found`,
            );
        }
    }

    async remove(productId: string) {
        try {
            return await this.prisma.product.delete({
                where: { id: productId },
            });
        } catch (error) {
            throw new NotFoundException(
                `Product with ID ${productId} not found`,
            );
        }
    }

    getAllWithFilters(query: ProductListFiltersDTO) {
        return this.getAllWithFiltersAndParams(query);
    }

    getAllByStoreWithFilters(storeId: string, query: ProductListFiltersDTO) {
        return this.getAllWithFiltersAndParams(query, storeId);
    }
}
