import { Test, TestingModule } from '@nestjs/testing';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

describe('StoreController', () => {
    let controller: StoreController;

    const mockStoreService = {
        getAll: jest.fn().mockResolvedValue([{ id: '1', name: 'Store 1' }]),
        create: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
        getAllProductsByStoreWithFilters: jest.fn(),
        getInventoryValue: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StoreController],
            providers: [{ provide: StoreService, useValue: mockStoreService }],
        }).compile();

        controller = module.get<StoreController>(StoreController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAll', () => {
        it('should return an array of stores', async () => {
            expect(await controller.getAll()).toEqual([
                { id: '1', name: 'Store 1' },
            ]);
        });
    });
});
