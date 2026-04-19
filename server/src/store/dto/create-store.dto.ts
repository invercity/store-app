import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;
}
