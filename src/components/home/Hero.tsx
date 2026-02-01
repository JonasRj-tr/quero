import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://v3b.fal.media/files/b/0a8c87e4/aOQwW774PK-zcFMN1Yf23.png" 
          alt="Fashion Hero" 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
      </div>
      
      <div className="container relative mx-auto flex h-full items-center px-4">
        <div className="max-w-2xl animate-fade-in">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            QUERO+ MODA E ACESSÓRIOS
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground font-serif lg:text-7xl">
            Moda, beleza e estilo <br />
            <span className="text-primary">em um só lugar</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
            Descubra nossa coleção exclusiva de roupas e acessórios pensados especialmente para você que não abre mão da elegância.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="h-14 px-8 text-base font-semibold group">
              VER NOVIDADES
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold">
              QUEM SOMOS
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
