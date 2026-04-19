import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductListFiltersDTO {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ required: false })
    category?: string;
    @IsInt()
    @Min(1)
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ required: false })
    limit?: number;
    @IsInt()
    @Min(1)
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ required: false })
    page?: number;
    @IsInt()
    @Min(0)
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ required: false })
    minPrice?: number;
    @IsInt()
    @Min(0)
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ required: false })
    maxPrice?: number;
}
