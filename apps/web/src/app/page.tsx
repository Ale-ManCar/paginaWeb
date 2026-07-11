import Image from 'next/image';

interface CatalogProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  image: { url: string; alt: string } | null;
  variant: { price: string; available: number };
}

async function getFeaturedProducts(): Promise<CatalogProduct[]> {
  try {
    const response = await fetch(
      `${process.env.API_INTERNAL_URL ?? 'http://127.0.0.1:3001/api/v1'}/catalog/featured`,
      { next: { revalidate: 60 } },
    );
    return response.ok ? ((await response.json()) as CatalogProduct[]) : [];
  } catch {
    return [];
  }
}

const Arrow = () => <span aria-hidden="true">↗</span>;

export default async function HomePage() {
  const products = await getFeaturedProducts();
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Casa Nativa, inicio">
          <span className="brand-mark">CN</span>
          <span>Casa Nativa</span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#coleccion">Colección</a>
          <a href="#historia">Nuestra mirada</a>
        </nav>
        <a className="cart-link" href="#coleccion">
          Explorar <Arrow />
        </a>
      </header>
      <main id="inicio">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Objetos para vivir con intención</p>
            <h1 id="hero-title">
              Lo cotidiano,<em> bien elegido.</em>
            </h1>
            <p className="hero-intro">
              Piezas útiles y honestas para construir espacios tranquilos.
              Seleccionadas por su material, su oficio y la forma en que
              envejecen contigo.
            </p>
            <a className="primary-action" href="#coleccion">
              Ver la colección <Arrow />
            </a>
          </div>
          <div className="hero-visual">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=90"
              alt="Sala serena con mobiliario de madera y textiles naturales"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 50vw"
            />
            <span className="image-note">Colección 01 — Habitar</span>
          </div>
        </section>
        <section className="principles" aria-label="Principios de Casa Nativa">
          <p>Despachos a todo Ecuador</p>
          <p>Materiales elegidos para durar</p>
          <p>Compra protegida</p>
        </section>
        <section
          className="collection"
          id="coleccion"
          aria-labelledby="collection-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selección de temporada</p>
              <h2 id="collection-title">Piezas que hacen hogar</h2>
            </div>
            <p>
              Una colección breve para mantener cerca solo aquello que aporta
              función, calma y carácter.
            </p>
          </div>
          {products.length > 0 ? (
            <div className="product-grid">
              {products.map((product, index) => (
                <article
                  className={`product-card product-${index + 1}`}
                  key={product.id}
                >
                  <div className="product-image">
                    {product.image ? (
                      <Image
                        src={product.image.url}
                        alt={product.image.alt}
                        fill
                        sizes="(max-width: 700px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="image-placeholder">
                        Imagen en preparación
                      </div>
                    )}
                    <span>{product.category}</span>
                  </div>
                  <div className="product-info">
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                    </div>
                    <div className="product-meta">
                      <strong>${product.variant.price}</strong>
                      <span>
                        {product.variant.available > 0
                          ? 'Disponible'
                          : 'Agotado'}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="catalog-state">
              <p className="eyebrow">Conectando inventario</p>
              <h3>La colección estará disponible en un momento.</h3>
              <p>
                La tienda no muestra artículos que no pueda validar en su
                inventario.
              </p>
            </div>
          )}
        </section>
        <section className="story" id="historia">
          <div className="story-number">01</div>
          <div>
            <p className="eyebrow">Nuestra mirada</p>
            <h2>Menos ruido. Mejores objetos.</h2>
          </div>
          <div className="story-copy">
            <p>
              No buscamos llenar espacios. Buscamos piezas que resuelvan una
              necesidad y sigan sintiéndose propias con el paso del tiempo.
            </p>
            <p>
              Cada selección considera materiales, mantenimiento, procedencia y
              posibilidades de reparación.
            </p>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-brand">Casa Nativa</div>
        <p>Objetos honestos para la vida diaria.</p>
        <p>Guayaquil, Ecuador · 2026</p>
      </footer>
    </>
  );
}
