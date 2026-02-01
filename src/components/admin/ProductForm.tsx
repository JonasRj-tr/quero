import { useState, useEffect } from 'react';
import { blink } from '@/lib/blink';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';
import { ImagePlus, Loader2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image_url: string;
}

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product: Product | null;
}

const categories = [
  { id: 'roupas', label: 'Roupas' },
  { id: 'acessorios', label: 'Acessórios' },
];

export default function ProductForm({ isOpen, onClose, onSuccess, product }: ProductFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image_url: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        description: product.description || '',
        image_url: product.image_url,
      });
    } else {
      setFormData({
        name: '',
        price: '',
        category: '',
        description: '',
        image_url: '',
      });
    }
  }, [product, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!formData.name || !formData.price || !formData.category || !formData.image_url) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        description: formData.description,
        imageUrl: formData.image_url,
      };

      if (product) {
        // Don't include userId when updating - it cannot be changed
        await blink.db.products.update(product.id, productData);
        toast.success('Produto atualizado com sucesso!');
      } else {
        // Only include userId when creating a new product
        await blink.db.products.create({
          ...productData,
          id: `prod_${Date.now()}`,
          userId: user.id,
        });
        toast.success('Produto criado com sucesso!');
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save product:', error);
      toast.error('Erro ao salvar produto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl p-0 overflow-hidden">
        <DialogHeader className="p-6 bg-secondary/30">
          <DialogTitle className="text-2xl font-bold font-serif text-primary">
            {product ? 'Editar Produto' : 'Novo Produto'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="name" className="font-bold">Nome do Produto *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="rounded-xl h-11"
                placeholder="Ex: Vestido Floral Verão"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price" className="font-bold">Preço (R$) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="rounded-xl h-11"
                placeholder="0,00"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category" className="font-bold">Categoria *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(val) => setFormData(prev => ({ ...prev, category: val }))}
              >
                <SelectTrigger className="rounded-xl h-11">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id} className="rounded-lg">
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-bold">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="rounded-xl min-h-[100px]"
              placeholder="Descreva detalhes do produto..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url" className="font-bold">Link da Imagem (Imgur) *</Label>
            <div className="flex flex-col gap-4">
              <div className="relative h-48 w-full overflow-hidden rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-secondary/20">
                {formData.image_url ? (
                  <img src={formData.image_url} alt="Preview" className="h-full w-full object-contain" />
                ) : (
                  <div className="text-center p-4">
                    <ImagePlus className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-xs text-muted-foreground">Insira o link do Imgur abaixo</p>
                  </div>
                )}
              </div>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                className="rounded-xl h-11"
                placeholder="https://i.imgur.com/..."
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl h-11 px-6">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="rounded-xl h-11 px-8 font-bold shadow-lg">
              {loading ? 'Salvando...' : 'Salvar Produto'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
