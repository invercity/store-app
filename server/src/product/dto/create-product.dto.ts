import { IsString, IsNotEmpty, IsNumber, Min, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: false })
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Type(() => Number)
    @ApiProperty({ required: false })
    price: number;

    @IsInt()
    @IsNotEmpty()
    @Min(0)
    @Type(() => Number)
    @ApiProperty()
    quantity: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    category: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    storeId: string;
}
