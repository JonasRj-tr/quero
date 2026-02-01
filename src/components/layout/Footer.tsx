import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="h-16 w-auto overflow-hidden">
                <img 
                  src="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2Fl7TI01n6w2X0oz1OMhiwaLDyb922%2F2025-12-10_13-28-00_UTC__dfa0f02f.jpg?alt=media&token=ad4079da-7596-4600-8f28-c56e5cf56767" 
                  alt="Quero+ Logo" 
                  className="h-full w-auto object-contain mix-blend-multiply"
                />
              </div>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-8">
              A Quero+ é sua loja premium de moda e acessórios femininos. Oferecemos o que há de melhor com elegância e sofisticação.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/queromaisacessoriosemoda" target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold font-serif mb-6">Links Rápidos</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Início</Link></li>
              <li><a href="#acessorios" className="hover:text-primary transition-colors">Acessórios</a></li>
              <li><a href="#roupas" className="hover:text-primary transition-colors">Roupas</a></li>
              <li><Link to="/admin" className="hover:text-primary transition-colors">Área Administrativa</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold font-serif mb-6">Contato</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>21 96424-4465</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>anaclarjudiabernardo194@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Nova Iguaçu, RJ - Brasil</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
          <p>© 2026 Quero+. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
