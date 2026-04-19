import { ApiProperty } from '@nestjs/swagger';

export class InventoryValueEntity {
    @ApiProperty()
    storeId: string;
    @ApiProperty()
    total: number;
}
