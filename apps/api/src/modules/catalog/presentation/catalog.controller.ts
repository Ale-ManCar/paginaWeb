import { Controller, Get } from '@nestjs/common';
import { CatalogProduct, CatalogService } from '../application/catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Get('featured')
  listFeatured(): Promise<CatalogProduct[]> {
    return this.catalog.listFeatured();
  }
}
