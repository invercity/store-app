import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
    let service: ProductService;

    const mockPrismaService = {
        product: {
            findMany: jest.fn(),
            count: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        service = module.get<ProductService>(ProductService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('get', () => {
        it('should throw NotFoundException if product not found', async () => {
            mockPrismaService.product.findUnique.mockResolvedValue(null);
            await expect(service.get('1')).rejects.toThrow(NotFoundException);
        });

        it('should return product if found', async () => {
            const product = { id: '1', name: 'Product 1' };
            mockPrismaService.product.findUnique.mockResolvedValue(product);
            expect(await service.get('1')).toEqual(product);
        });
    });

    describe('remove', () => {
        it('should throw NotFoundException if product not found', async () => {
            mockPrismaService.product.delete.mockRejectedValue(
                new Error('NotFound'),
            );
            await expect(service.remove('1')).rejects.toThrow(
                NotFoundException,
            );
        });
    });
});
