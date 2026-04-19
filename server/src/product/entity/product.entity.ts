import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';

export class ProductEntity implements Product {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    category: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    storeId: string;
    @ApiProperty()
    createdAt: Date;
}
