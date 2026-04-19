import {
    Controller,
    Get,
    Query,
    Post,
    Delete,
    Body,
    Patch,
    Param,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import {
    CreateProductDTO,
    UpdateProductDTO,
    ProductListFiltersDTO,
} from './dto';
import { ProductEntity, ProductListEntity } from './entity';

@Controller('product')
@ApiTags('Product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    @ApiOkResponse({ type: ProductListEntity })
    getAllWithFilters(@Query() query: ProductListFiltersDTO) {
        return this.productService.getAllWithFilters(query);
    }

    @Get(':id')
    @ApiOkResponse({ type: ProductEntity })
    get(@Param('id') id: string) {
        return this.productService.get(id);
    }

    @Post()
    @ApiCreatedResponse({ type: ProductEntity })
    create(@Body() body: CreateProductDTO) {
        return this.productService.create(body);
    }

    @Patch(':id')
    @ApiCreatedResponse({ type: ProductEntity })
    update(@Param('id') id: string, @Body() body: UpdateProductDTO) {
        return this.productService.update(id, body);
    }

    @Delete(':id')
    @ApiOkResponse({ type: ProductEntity })
    remove(@Param('id') id: string) {
        return this.productService.remove(id);
    }
}
