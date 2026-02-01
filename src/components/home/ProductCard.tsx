import { ShoppingCart, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  whatsappNumber: string;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} adicionado ao carrinho!`, {
      description: "Você pode finalizar seu pedido no ícone de sacola.",
      position: "top-center",
    });
  };

  return (
    <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
      <div className="group overflow-hidden rounded-2xl bg-card border border-border shadow-sm transition-all hover:shadow-md cursor-pointer flex flex-col h-full">
        <DialogTrigger asChild>
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={product.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000'}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-white/90 p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                <ZoomIn className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </DialogTrigger>
        <div className="p-6 flex flex-col flex-1">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {product.category}
          </div>
          <h3 className="mb-2 text-lg font-bold font-serif text-foreground truncate">
            {product.name}
          </h3>
          <div className="mb-4 text-2xl font-bold text-primary mt-auto">
            R${product.price.toFixed(2)}
          </div>
          <Button 
            onClick={handleAddToCart}
            className="w-full h-11 font-semibold transition-transform active:scale-95"
            variant="default"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>

      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden rounded-3xl">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto overflow-hidden bg-secondary/20">
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-contain hover:scale-150 transition-transform duration-500 cursor-zoom-in"
            />
          </div>
          <div className="p-8 flex flex-col">
            <div className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary/60">
              {product.category}
            </div>
            <h2 className="text-3xl font-bold font-serif text-primary mb-4">
              {product.name}
            </h2>
            <div className="text-3xl font-bold text-primary mb-6">
              R${product.price.toFixed(2)}
            </div>
            <div className="prose prose-sm text-muted-foreground mb-8">
              <p>{product.description || 'Nenhuma descrição disponível para este produto.'}</p>
            </div>
            <div className="mt-auto space-y-4">
              <Button 
                onClick={(e) => {
                  handleAddToCart(e);
                  setIsZoomOpen(false);
                }}
                className="w-full h-14 text-lg font-bold rounded-xl shadow-lg"
              >
                <ShoppingCart className="mr-3 h-6 w-6" />
                Adicionar à Sacola
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Clique na imagem acima para dar zoom
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}