import {
    Controller,
    Post,
    Patch,
    Body,
    Get,
    Param,
    Query,
    Delete,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StoreService } from './store.service';
import { CreateStoreDTO, UpdateStoreDTO } from './dto';
import { ProductListFiltersDTO } from '../product/dto';
import { StoreEntity, InventoryValueEntity } from './entity';
import { ProductListEntity } from '../product/entity';

@Controller('store')
@ApiTags('Store')
export class StoreController {
    constructor(private storeService: StoreService) {}

    @Post()
    @ApiCreatedResponse({ type: StoreEntity })
    create(@Body() body: CreateStoreDTO) {
        return this.storeService.create(body);
    }

    @Patch(':id')
    @ApiCreatedResponse({ type: StoreEntity })
    update(@Param('id') id: string, @Body() body: UpdateStoreDTO) {
        return this.storeService.update(id, body);
    }

    @Get(':id')
    @ApiOkResponse({ type: StoreEntity })
    get(@Param('id') id: string) {
        return this.storeService.get(id);
    }

    @Get()
    @ApiOkResponse({ type: StoreEntity, isArray: true })
    getAll() {
        return this.storeService.getAll();
    }

    @Get(':id/products')
    @ApiOkResponse({ type: ProductListEntity })
    getProductsByStore(
        @Param('id') id: string,
        @Query() query: ProductListFiltersDTO,
    ) {
        return this.storeService.getAllProductsByStoreWithFilters(id, query);
    }

    @Get(':id/inventory-value')
    @ApiOkResponse({ type: InventoryValueEntity })
    getInventoryValue(@Param('id') id: string) {
        return this.storeService.getInventoryValue(id);
    }
    @Delete(':id')
    @ApiOkResponse({ type: StoreEntity })
    remove(@Param('id') id: string) {
        return this.storeService.remove(id);
    }
}
