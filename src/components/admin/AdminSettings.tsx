import { useState, useEffect } from 'react';
import { blink } from '@/lib/blink';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';
import { QrCode, Download } from 'lucide-react';

export default function AdminSettings() {
  const { user } = useAuth();
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const settings = await blink.db.settings.list() as { id: string; key: string; value: string }[];
        const waSetting = settings.find(s => s.key === 'whatsapp_number');
        if (waSetting) {
          setWhatsappNumber(waSetting.value);
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      } finally {
        setFetching(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      // Remove any non-numeric characters for WhatsApp API
      const sanitized = whatsappNumber.replace(/\D/g, '');
      
      await blink.db.settings.upsert({
        id: 'whatsapp_number',
        key: 'whatsapp_number',
        value: sanitized,
        userId: user.id
      });
      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error('Erro ao salvar configurações.');
    } finally {
      setLoading(false);
    }
  };

  const storeUrl = window.location.origin;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(storeUrl)}`;

  if (fetching) return <div className="py-10 text-center text-muted-foreground uppercase tracking-widest font-semibold">Carregando...</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold font-serif text-foreground">Configurações</h2>
        <p className="text-muted-foreground">Gerencie as informações de contato da sua loja</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl bg-card border border-border p-8 shadow-sm h-full">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-base font-bold text-foreground">WhatsApp da Loja</Label>
              <div className="relative">
                <Input
                  id="whatsapp"
                  placeholder="Ex: 5511999999999"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="h-12 text-lg rounded-xl"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  Insira apenas números, incluindo o código do país (55 para Brasil).
                </p>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12 text-lg font-bold rounded-xl shadow-lg">
              {loading ? 'Salvando...' : 'Salvar Configurações'}
            </Button>
          </form>
        </div>

        <div className="rounded-3xl bg-card border border-border p-8 shadow-sm h-full flex flex-col items-center justify-center text-center">
          <QrCode className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-bold font-serif mb-2">QR Code da Loja</h3>
          <p className="text-sm text-muted-foreground mb-6">Divulgue seu site com facilidade</p>
          
          <div className="bg-white p-4 rounded-2xl shadow-inner border border-border mb-6">
            <img src={qrCodeUrl} alt="Store QR Code" className="w-40 h-40" />
          </div>
          
          <Button 
            variant="outline" 
            className="rounded-xl gap-2"
            onClick={() => window.open(qrCodeUrl, '_blank')}
          >
            <Download className="w-4 h-4" />
            Baixar QR Code
          </Button>
        </div>
      </div>
    </div>
  );
}
