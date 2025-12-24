import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-6 py-2 text-sm">
            🎨 Креативная платформа для арта
          </Badge>
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Найди своего{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              идеального художника
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Тысячи талантливых артистов готовы воплотить твои идеи в жизнь. 
            Персонажи, питомцы, фан-арт — всё что угодно!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-6 rounded-2xl shadow-lg shadow-purple-500/50 transition-all hover:scale-105">
              <Icon name="Search" size={20} className="mr-2" />
              Найти художника
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-2xl border-2 border-purple-300 hover:bg-purple-50 transition-all hover:scale-105">
              <Icon name="Sparkles" size={20} className="mr-2" />
              Стать художником
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
