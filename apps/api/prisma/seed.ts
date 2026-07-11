import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, ProductStatus } from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;
if (!connectionString)
  throw new Error('DATABASE_URL is required to seed the database');

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const catalog = [
  {
    category: { name: 'Escritorio', slug: 'escritorio' },
    name: 'Lámpara Nido',
    slug: 'lampara-nido',
    sku: 'HOG-LAM-NIDO',
    price: '58.00',
    stock: 18,
    shortDescription:
      'Luz cálida y regulable para espacios de trabajo serenos.',
    description:
      'Lámpara de escritorio con pantalla orientable, tres intensidades y acabado mate.',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    category: { name: 'Organización', slug: 'organizacion' },
    name: 'Bandeja Loma',
    slug: 'bandeja-loma',
    sku: 'HOG-BAN-LOMA',
    price: '34.50',
    stock: 24,
    shortDescription:
      'Una superficie honesta para ordenar lo que usas todos los días.',
    description:
      'Bandeja multipropósito de madera con bordes suaves y acabado protector natural.',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
  },
  {
    category: { name: 'Textiles', slug: 'textiles' },
    name: 'Manta Bruma',
    slug: 'manta-bruma',
    sku: 'HOG-MAN-BRUMA',
    price: '72.00',
    stock: 12,
    shortDescription:
      'Textura ligera para tardes frescas y rincones tranquilos.',
    description:
      'Manta tejida de tacto suave, fácil cuidado y tonos neutros para uso cotidiano.',
    image:
      'https://images.unsplash.com/photo-1583845112203-454c2254ed4e?auto=format&fit=crop&w=1200&q=85',
  },
  {
    category: { name: 'Cerámica', slug: 'ceramica' },
    name: 'Taza Río',
    slug: 'taza-rio',
    sku: 'HOG-TAZ-RIO',
    price: '18.00',
    stock: 40,
    shortDescription:
      'Cerámica de líneas imperfectas para el ritual de cada mañana.',
    description:
      'Taza de cerámica esmaltada, capacidad de 350 ml y acabado artesanal.',
    image:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1200&q=85',
  },
  {
    category: { name: 'Aromas', slug: 'aromas' },
    name: 'Vela Monte',
    slug: 'vela-monte',
    sku: 'HOG-VEL-MONTE',
    price: '26.00',
    stock: 30,
    shortDescription:
      'Cedro, hojas verdes y una combustión limpia de larga duración.',
    description:
      'Vela de cera vegetal en recipiente reutilizable, elaborada en pequeños lotes.',
    image:
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=85',
  },
  {
    category: { name: 'Cocina', slug: 'cocina' },
    name: 'Tabla Origen',
    slug: 'tabla-origen',
    sku: 'HOG-TAB-ORIGEN',
    price: '46.00',
    stock: 15,
    shortDescription: 'Madera sólida para preparar, servir y compartir.',
    description:
      'Tabla de cocina reversible con canal perimetral y aceite apto para alimentos.',
    image:
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=85',
  },
];

async function main(): Promise<void> {
  for (const [index, item] of catalog.entries()) {
    const category = await prisma.category.upsert({
      where: { slug: item.category.slug },
      update: { name: item.category.name, isActive: true },
      create: { ...item.category, sortOrder: index },
    });
    await prisma.product.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        categoryId: category.id,
        name: item.name,
        slug: item.slug,
        shortDescription: item.shortDescription,
        description: item.description,
        featured: index < 4,
        status: ProductStatus.ACTIVE,
        images: { create: { url: item.image, altText: item.name } },
        variants: {
          create: {
            sku: item.sku,
            name: 'Estándar',
            price: item.price,
            inventory: { create: { available: item.stock } },
          },
        },
      },
    });
  }
}

main().finally(async () => prisma.$disconnect());
