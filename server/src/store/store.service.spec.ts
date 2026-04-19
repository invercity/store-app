import { Test, TestingModule } from '@nestjs/testing';
import { StoreService } from './store.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProductService } from '../product/product.service';
import { NotFoundException } from '@nestjs/common';

describe('StoreService', () => {
    let service: StoreService;

    const mockPrismaService = {
        store: {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
        product: {
            findMany: jest.fn(),
        },
    };

    const mockProductService = {
        getAllByStoreWithFilters: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StoreService,
                { provide: PrismaService, useValue: mockPrismaService },
                { provide: ProductService, useValue: mockProductService },
            ],
        }).compile();

        service = module.get<StoreService>(StoreService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAll', () => {
        it('should return an array of stores', async () => {
            const result = [{ id: '1', name: 'Store 1' }];
            mockPrismaService.store.findMany.mockResolvedValue(result);
            expect(await service.getAll()).toEqual(result);
        });
    });

    describe('update', () => {
        it('should throw NotFoundException if store not found', async () => {
            mockPrismaService.store.update.mockRejectedValue(
                new Error('NotFound'),
            );
            await expect(
                service.update('1', { name: 'New Name' }),
            ).rejects.toThrow(NotFoundException);
        });

        it('should return updated store', async () => {
            const result = { id: '1', name: 'New Name' };
            mockPrismaService.store.update.mockResolvedValue(result);
            expect(await service.update('1', { name: 'New Name' })).toEqual(
                result,
            );
        });
    });

    describe('remove', () => {
        it('should throw NotFoundException if store not found', async () => {
            mockPrismaService.store.delete.mockRejectedValue(
                new Error('NotFound'),
            );
            await expect(service.remove('1')).rejects.toThrow(
                NotFoundException,
            );
        });
    });
});
