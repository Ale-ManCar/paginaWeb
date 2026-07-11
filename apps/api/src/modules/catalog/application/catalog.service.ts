import { Injectable } from '@nestjs/common';
import { ProductStatus } from '../../../generated/prisma/client';
import { PrismaService } from '../../../infrastructure/database/prisma.service';

export interface CatalogProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  image: { url: string; alt: string } | null;
  variant: { id: string; name: string; price: string; available: number };
}

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  async listFeatured(): Promise<CatalogProduct[]> {
    const products = await this.prisma.product.findMany({
      where: { status: ProductStatus.ACTIVE, featured: true },
      orderBy: { createdAt: 'asc' },
      take: 8,
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' }, take: 1 },
        variants: {
          where: { isActive: true },
          include: { inventory: true },
          take: 1,
        },
      },
    });

    return products.flatMap((product) => {
      const variant = product.variants[0];
      if (!variant) return [];
      const image = product.images[0];
      return [
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.shortDescription,
          category: product.category.name,
          image: image ? { url: image.url, alt: image.altText } : null,
          variant: {
            id: variant.id,
            name: variant.name,
            price: variant.price.toFixed(2),
            available: variant.inventory?.available ?? 0,
          },
        },
      ];
    });
  }
}
