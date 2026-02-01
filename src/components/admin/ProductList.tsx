import { useState, useEffect } from 'react';
import { blink } from '@/lib/blink';
import { Button } from '@/components/ui/button';
import { Plus, Search, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import ProductForm from './ProductForm';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image_url: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const data = await blink.db.products.list({
        orderBy: { created_at: 'desc' }
      }) as Product[];
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast.error('Erro ao carregar produtos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      await blink.db.products.delete(id);
      toast.success('Produto excluído!');
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast.error('Erro ao excluir produto.');
    }
  };

  const filteredProducts = products.filter(p => 
    (p.name?.toLowerCase() || '').includes(search.toLowerCase()) || 
    (p.category?.toLowerCase() || '').includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold font-serif text-foreground">Produtos</h2>
          <p className="text-muted-foreground">Gerencie o catálogo da sua loja</p>
        </div>
        <Button onClick={() => { setEditingProduct(null); setIsFormOpen(true); }} className="h-12 px-6 text-lg font-bold rounded-xl shadow-lg">
          <Plus className="mr-2 w-5 h-5" />
          Novo Produto
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou categoria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-12 rounded-xl border-none bg-secondary/30 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-secondary/30">
            <TableRow>
              <TableHead className="font-bold py-4">Imagem</TableHead>
              <TableHead className="font-bold py-4">Nome</TableHead>
              <TableHead className="font-bold py-4">Categoria</TableHead>
              <TableHead className="font-bold py-4">Preço</TableHead>
              <TableHead className="text-right font-bold py-4">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-40 text-center text-muted-foreground font-semibold uppercase tracking-widest">Carregando...</TableCell>
              </TableRow>
            ) : filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-40 text-center text-muted-foreground font-semibold">Nenhum produto encontrado.</TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-secondary/20 transition-colors">
                  <TableCell className="py-4">
                    <img src={product.image_url} alt={product.name} className="h-14 w-14 rounded-lg object-cover border border-border" />
                  </TableCell>
                  <TableCell className="font-bold py-4">{product.name}</TableCell>
                  <TableCell className="py-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase">
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell className="font-bold text-lg text-primary py-4">R${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right py-4">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => { setEditingProduct(product); setIsFormOpen(true); }}
                        className="rounded-full hover:bg-primary/10 hover:text-primary"
                      >
                        <Pencil className="w-5 h-5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(product.id)}
                        className="rounded-full hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ProductForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSuccess={() => { setIsFormOpen(false); fetchProducts(); }}
        product={editingProduct}
      />
    </div>
  );
}
