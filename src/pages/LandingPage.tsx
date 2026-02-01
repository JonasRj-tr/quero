import { useState, useEffect } from 'react';
import { blink } from '@/lib/blink';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import CategoryGrid from '@/components/home/CategoryGrid';
import ProductGrid from '@/components/home/ProductGrid';
import InstagramFeed from '@/components/home/InstagramFeed';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import Footer from '@/components/layout/Footer';

export default function LandingPage() {
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

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid />
        
        <ProductGrid whatsappNumber={whatsappNumber} category="roupas" />
        <ProductGrid whatsappNumber={whatsappNumber} category="acessorios" />
        
        <InstagramFeed />
      </main>
      <Footer />
      <WhatsAppButton phoneNumber={whatsappNumber} />
    </div>
  );
}
