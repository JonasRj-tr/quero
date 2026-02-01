import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Package, Settings, LogOut, LayoutDashboard, Plus, Search } from 'lucide-react';
import ProductList from '@/components/admin/ProductList';
import AdminSettings from '@/components/admin/AdminSettings';
import { Spinner } from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { user, loading, logout, isAuthenticated, blink } = useAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  const [customAuth, setCustomAuth] = useState(() => localStorage.getItem('admin_authenticated') === 'true');
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === 'queromais' && loginData.password === 'deusefiel') {
      setCustomAuth(true);
      localStorage.setItem('admin_authenticated', 'true');
      toast.success('Bem-vindo!');
    } else {
      toast.error('Usuário ou senha incorretos');
    }
  };

  const handleLogout = () => {
    setCustomAuth(false);
    localStorage.removeItem('admin_authenticated');
    logout();
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Spinner className="h-12 w-12 text-primary" />
      </div>
    );
  }

  if (!customAuth) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/30 p-4">
        <div className="w-full max-w-md space-y-8 rounded-3xl bg-card p-10 shadow-xl border border-border">
          <div className="text-center">
            <h1 className="text-3xl font-bold font-serif text-primary">Acesso Restrito</h1>
            <p className="mt-2 text-muted-foreground">Área Administrativa</p>
          </div>
          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Usuário</label>
              <Input 
                value={loginData.username}
                onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Usuário"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Senha</label>
              <Input 
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Senha"
                className="h-12"
              />
            </div>
            <Button type="submit" className="w-full h-12 text-lg font-semibold mt-4">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/30 p-4">
        <div className="w-full max-w-md space-y-8 rounded-3xl bg-card p-10 shadow-xl border border-border">
          <div className="text-center">
            <h1 className="text-3xl font-bold font-serif text-primary">Conectar Banco de Dados</h1>
            <p className="mt-2 text-muted-foreground">Você passou na segurança local, agora conecte sua conta Blink para gerenciar os dados.</p>
          </div>
          <Button onClick={() => blink.auth.login()} className="w-full h-12 text-lg font-semibold">
            Conectar com Blink Auth
          </Button>
          <Button variant="ghost" onClick={handleLogout} className="w-full">
            Sair
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-secondary/10">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col">
        <div className="p-6 border-b">
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-primary font-serif">CHICSHOP ADMIN</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Controle Total</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'products' 
                ? 'bg-primary text-white shadow-md' 
                : 'text-muted-foreground hover:bg-secondary'
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="font-medium">Produtos</span>
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'settings' 
                ? 'bg-primary text-white shadow-md' 
                : 'text-muted-foreground hover:bg-secondary'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Configurações</span>
          </button>
        </nav>
        
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-4 py-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {user?.displayName?.[0] || 'Q'}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold truncate max-w-[120px]">{user?.displayName || 'Admin Quero+'}</span>
              <span className="text-[10px] text-muted-foreground uppercase">Administrador</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start gap-3 px-4 py-3 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'products' ? <ProductList /> : <AdminSettings />}
        </div>
      </main>
    </div>
  );
}
