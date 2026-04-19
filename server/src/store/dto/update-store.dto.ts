import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStoreDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;
}
