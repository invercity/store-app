import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsInt,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDTO {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ required: false })
    name?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Type(() => Number)
    @IsOptional()
    @ApiProperty({ required: false })
    price?: number;

    @IsInt()
    @IsNotEmpty()
    @Min(0)
    @Type(() => Number)
    @IsOptional()
    @ApiProperty({ required: false })
    quantity?: number;
}
