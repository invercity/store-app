import { ApiProperty } from '@nestjs/swagger';
import { Store } from '@prisma/client';

export class StoreEntity implements Store {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    address: string;
    @ApiProperty()
    createdAt: Date;
}
