import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center rotate-6 transition-transform hover:rotate-12">
              <Icon name="Palette" className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ArtMarket
              </h1>
              <p className="text-xs text-muted-foreground">Маркетплейс для художников</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <Button variant="ghost" className="font-medium">
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </Button>
            <Button variant="ghost" className="font-medium">
              <Icon name="Users" size={18} className="mr-2" />
              Художники
            </Button>
            <Button variant="ghost" className="font-medium">
              <Icon name="ShoppingBag" size={18} className="mr-2" />
              Мои заказы
            </Button>
          </nav>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Icon name="User" size={18} className="mr-2" />
            Войти
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
