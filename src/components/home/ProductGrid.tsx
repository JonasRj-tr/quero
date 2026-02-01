import { useState, useEffect } from 'react';
import { blink } from '@/lib/blink';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image_url: string;
}

interface ProductGridProps {
  whatsappNumber: string;
  category?: string;
}

export default function ProductGrid({ whatsappNumber, category }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const query: any = {
          orderBy: { created_at: 'desc' }
        };
        
        if (category) {
          query.where = { category };
        }

        const data = await blink.db.products.list(query) as Product[];
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0 && category) {
    return null;
  }

  return (
    <section id={category} className="container mx-auto px-4 py-16 scroll-mt-20">
      <div className="mb-12 flex items-center justify-between border-b pb-4">
        <h2 className="text-3xl font-bold font-serif text-foreground uppercase tracking-tight">
          {category ? (category === 'roupas' ? 'Roupas' : 'Acessórios') : 'Últimos Produtos'}
        </h2>
        <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold bg-secondary px-3 py-1 rounded-full">
          Coleção 2026
        </div>
      </div>
      
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-xl text-muted-foreground">Nenhum produto encontrado.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              whatsappNumber={whatsappNumber} 
            />
          ))}
        </div>
      )}
    </section>
  );
}