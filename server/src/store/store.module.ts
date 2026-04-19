import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductModule } from '../product/product.module';

@Module({
    imports: [PrismaModule, ProductModule],
    controllers: [StoreController],
    providers: [StoreService],
})
export class StoreModule {}
