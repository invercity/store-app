import { Module } from '@nestjs/common';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [PrismaModule, ProductModule, StoreModule],
})
export class AppModule {}
