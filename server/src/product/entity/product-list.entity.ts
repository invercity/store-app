import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from './product.entity';

export class ProductListEntity {
    @ApiProperty({ type: () => ProductEntity, isArray: true })
    data: ProductEntity[];
    @ApiProperty()
    total: number;
    @ApiProperty()
    limit: number;
    @ApiProperty()
    page: number;
}
