import { Search, ShoppingBag, User, Plus, Minus, Trash2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/use-cart';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState, useEffect } from 'react';
import { blink } from '@/lib/blink';

export default function Navbar() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {
    async function fetchSettings() {
      try {
        const settings = await blink.db.settings.list() as { key: string; value: string }[];
        const waSetting = settings.find(s => s.key === 'whatsapp_number');
        if (waSetting) {
          setWhatsappNumber(waSetting.value);
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    }
    fetchSettings();
  }, []);

  const handleCheckout = () => {
    const itemsList = items
      .map((item) => `- ${item.quantity}x ${item.name} (R${(item.price * item.quantity).toFixed(2)})`)
      .join('\n');
    const total = totalPrice().toFixed(2);
    const message = encodeURIComponent(
      `Olá! Gostaria de fazer um pedido:\n\n${itemsList}\n\n*Total: R${total}*`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-16 w-auto overflow-hidden">
                <img 
                  src="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2Fl7TI01n6w2X0oz1OMhiwaLDyb922%2F2025-12-10_13-28-00_UTC__dfa0f02f.jpg?alt=media&token=ad4079da-7596-4600-8f28-c56e5cf56767" 
                  alt="Quero+ Logo" 
                  className="h-full w-auto object-contain mix-blend-multiply"
                />
              </div>
            </Link>
            <div className="hidden lg:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Início</Link>
              <a href="#acessorios" className="text-sm font-medium hover:text-primary transition-colors">Acessórios</a>
              <a href="#roupas" className="text-sm font-medium hover:text-primary transition-colors">Roupas</a>
              <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors">Admin</Link>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 hover:bg-secondary rounded-full transition-colors hidden sm:block">
              <Search className="w-5 h-5" />
            </button>
            
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-secondary rounded-full transition-colors relative">
                  <ShoppingBag className="w-5 h-5" />
                  {totalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-background">
                      {totalItems()}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md p-0 flex flex-col rounded-l-3xl overflow-hidden">
                <SheetHeader className="p-6 border-b">
                  <SheetTitle className="text-2xl font-bold font-serif flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6 text-primary" />
                    Sua Sacola
                  </SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex-1 p-6">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4">
                      <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                        <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground font-medium">Sua sacola está vazia</p>
                      <Button asChild variant="outline" className="rounded-full">
                        <Link to="/">Continuar Comprando</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="h-24 w-20 overflow-hidden rounded-xl bg-secondary">
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-between py-1">
                            <div>
                              <h4 className="font-bold text-foreground line-clamp-1">{item.name}</h4>
                              <p className="text-primary font-bold">R${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center border rounded-full px-2 py-1">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 hover:text-primary transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="mx-3 text-sm font-bold min-w-[20px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 hover:text-primary transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-muted-foreground hover:text-destructive transition-colors p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>

                {items.length > 0 && (
                  <SheetFooter className="p-6 border-t bg-secondary/30 block space-y-4">
                    <div className="flex items-center justify-between text-lg">
                      <span className="font-medium">Subtotal</span>
                      <span className="font-bold text-primary text-2xl">
                        R${totalPrice().toFixed(2)}
                      </span>
                    </div>
                    <Button 
                      onClick={handleCheckout}
                      className="w-full h-14 rounded-full text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <MessageCircle className="mr-2 h-6 w-6" />
                      Finalizar no WhatsApp
                    </Button>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>

            <Link to="/admin" className="p-2 hover:bg-secondary rounded-full transition-colors hidden sm:block">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
