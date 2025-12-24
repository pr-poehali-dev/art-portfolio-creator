import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type SkillLevel = 'beginner' | 'intermediate' | 'expert';
type OrderStatus = 'pending' | 'in-progress' | 'completed';

interface Artist {
  id: number;
  name: string;
  avatar: string;
  skillLevel: SkillLevel;
  rating: number;
  reviewCount: number;
  priceFrom: number;
  specialties: string[];
  portfolio: string[];
  description: string;
}

interface Order {
  id: number;
  artistId: number;
  artistName: string;
  description: string;
  status: OrderStatus;
  price: number;
}

interface Review {
  id: number;
  artistId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const mockArtists: Artist[] = [
  {
    id: 1,
    name: 'Анна Звездная',
    avatar: 'https://cdn.poehali.dev/projects/0463d3eb-f825-4919-b241-1eea54cd5437/files/04951cb6-7851-4626-bf03-2e1ccd12449d.jpg',
    skillLevel: 'expert',
    rating: 4.9,
    reviewCount: 127,
    priceFrom: 5000,
    specialties: ['Персонажи', 'Фан-арт', 'Концепт-арт'],
    portfolio: ['https://cdn.poehali.dev/projects/0463d3eb-f825-4919-b241-1eea54cd5437/files/56737f61-f410-45c4-9039-758fdd0735a3.jpg'],
    description: 'Профессиональный художник с 10+ летним опытом. Специализируюсь на создании персонажей для игр и анимации.'
  },
  {
    id: 2,
    name: 'Максим Креатив',
    avatar: 'https://cdn.poehali.dev/projects/0463d3eb-f825-4919-b241-1eea54cd5437/files/04951cb6-7851-4626-bf03-2e1ccd12449d.jpg',
    skillLevel: 'intermediate',
    rating: 4.6,
    reviewCount: 83,
    priceFrom: 3000,
    specialties: ['Портреты питомцев', 'Реализм'],
    portfolio: ['https://cdn.poehali.dev/projects/0463d3eb-f825-4919-b241-1eea54cd5437/files/56737f61-f410-45c4-9039-758fdd0735a3.jpg'],
    description: 'Рисую трогательные портреты ваших любимых питомцев в реалистичном стиле.'
  },
  {
    id: 3,
    name: 'София Арт',
    avatar: 'https://cdn.poehali.dev/projects/0463d3eb-f825-4919-b241-1eea54cd5437/files/04951cb6-7851-4626-bf03-2e1ccd12449d.jpg',
    skillLevel: 'expert',
    rating: 5.0,
    reviewCount: 210,
    priceFrom: 7000,
    specialties: ['Аниме', 'Манга', 'Фан-арт'],
    portfolio: ['https://cdn.poehali.dev/projects/0463d3eb-f825-4919-b241-1eea54cd5437/files/56737f61-f410-45c4-9039-758fdd0735a3.jpg'],
    description: 'Создаю яркий аниме-арт с живыми эмоциями. Быстрые сроки, качественная работа.'
  },
  {
    id: 4,
    name: 'Дмитрий Колор',
    avatar: 'https://cdn.poehali.dev/projects/0463d3eb-f825-4919-b241-1eea54cd5437/files/04951cb6-7851-4626-bf03-2e1ccd12449d.jpg',
    skillLevel: 'beginner',
    rating: 4.3,
    reviewCount: 15,
    priceFrom: 1500,
    specialties: ['Скетчи', 'Стикеры'],
    portfolio: ['https://cdn.poehali.dev/projects/0463d3eb-f825-4919-b241-1eea54cd5437/files/56737f61-f410-45c4-9039-758fdd0735a3.jpg'],
    description: 'Начинающий художник с креативным подходом. Делаю милые скетчи и стикеры по доступным ценам.'
  }
];

const mockReviews: Review[] = [
  {
    id: 1,
    artistId: 1,
    userName: 'Елена К.',
    rating: 5,
    comment: 'Невероятная работа! Персонаж получился именно таким, как я представляла. Рекомендую!',
    date: '2024-12-20'
  },
  {
    id: 2,
    artistId: 1,
    userName: 'Игорь М.',
    rating: 5,
    comment: 'Профессионал своего дела. Быстро, качественно, с душой!',
    date: '2024-12-18'
  }
];

const Index = () => {
  const [artists, setArtists] = useState<Artist[]>(mockArtists);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>(mockArtists);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [skillFilter, setSkillFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const skillLevelMap = {
    beginner: { label: 'Начинающий', color: 'bg-blue-500' },
    intermediate: { label: 'Средний', color: 'bg-purple-500' },
    expert: { label: 'Эксперт', color: 'bg-pink-500' }
  };

  const filterArtists = () => {
    let filtered = artists;

    if (skillFilter !== 'all') {
      filtered = filtered.filter(a => a.skillLevel === skillFilter);
    }

    if (priceFilter === 'low') {
      filtered = filtered.filter(a => a.priceFrom < 3000);
    } else if (priceFilter === 'medium') {
      filtered = filtered.filter(a => a.priceFrom >= 3000 && a.priceFrom < 6000);
    } else if (priceFilter === 'high') {
      filtered = filtered.filter(a => a.priceFrom >= 6000);
    }

    if (searchQuery) {
      filtered = filtered.filter(a => 
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredArtists(filtered);
  };

  const handleCreateOrder = (artistId: number, description: string, price: number) => {
    const artist = artists.find(a => a.id === artistId);
    if (!artist) return;

    const newOrder: Order = {
      id: orders.length + 1,
      artistId,
      artistName: artist.name,
      description,
      status: 'pending',
      price
    };

    setOrders([...orders, newOrder]);
    toast.success('Заказ успешно создан! Художник скоро свяжется с вами.');
  };

  useState(() => {
    filterArtists();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
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

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input
                placeholder="🔍 Поиск по имени или специализации..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  filterArtists();
                }}
                className="h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
              />
            </div>
            <Select value={skillFilter} onValueChange={(v) => { setSkillFilter(v); filterArtists(); }}>
              <SelectTrigger className="w-full md:w-[200px] h-12 border-2 border-purple-200 rounded-xl">
                <SelectValue placeholder="Уровень скилла" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все уровни</SelectItem>
                <SelectItem value="beginner">Начинающий</SelectItem>
                <SelectItem value="intermediate">Средний</SelectItem>
                <SelectItem value="expert">Эксперт</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceFilter} onValueChange={(v) => { setPriceFilter(v); filterArtists(); }}>
              <SelectTrigger className="w-full md:w-[200px] h-12 border-2 border-purple-200 rounded-xl">
                <SelectValue placeholder="Цена" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любая цена</SelectItem>
                <SelectItem value="low">До 3000₽</SelectItem>
                <SelectItem value="medium">3000₽ - 6000₽</SelectItem>
                <SelectItem value="high">От 6000₽</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtists.map((artist, idx) => (
              <Card 
                key={artist.id} 
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-purple-100 hover:border-purple-300 rounded-2xl overflow-hidden animate-scale-in cursor-pointer"
                style={{ animationDelay: `${idx * 0.1}s` }}
                onClick={() => setSelectedArtist(artist)}
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400">
                  <img 
                    src={artist.portfolio[0]} 
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className={`${skillLevelMap[artist.skillLevel].color} text-white border-0`}>
                      {skillLevelMap[artist.skillLevel].label}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <img 
                      src={artist.avatar}
                      alt={artist.name}
                      className="w-12 h-12 rounded-full border-2 border-purple-300"
                    />
                    <div>
                      <CardTitle className="text-lg">{artist.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-yellow-500">
                        <Icon name="Star" size={16} className="fill-yellow-500" />
                        <span className="font-semibold">{artist.rating}</span>
                        <span className="text-muted-foreground">({artist.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">{artist.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {artist.specialties.slice(0, 3).map((spec, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">от</p>
                      <p className="text-2xl font-bold text-purple-600">{artist.priceFrom.toLocaleString()}₽</p>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Заказать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedArtist} onOpenChange={() => setSelectedArtist(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedArtist && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={selectedArtist.avatar}
                    alt={selectedArtist.name}
                    className="w-20 h-20 rounded-full border-4 border-purple-300"
                  />
                  <div>
                    <DialogTitle className="text-3xl">{selectedArtist.name}</DialogTitle>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge className={`${skillLevelMap[selectedArtist.skillLevel].color} text-white`}>
                        {skillLevelMap[selectedArtist.skillLevel].label}
                      </Badge>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Icon name="Star" size={18} className="fill-yellow-500" />
                        <span className="font-bold">{selectedArtist.rating}</span>
                        <span className="text-muted-foreground">({selectedArtist.reviewCount} отзывов)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogDescription className="text-base">
                  {selectedArtist.description}
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="portfolio" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="portfolio">Портфолио</TabsTrigger>
                  <TabsTrigger value="order">Заказать</TabsTrigger>
                  <TabsTrigger value="reviews">Отзывы</TabsTrigger>
                </TabsList>

                <TabsContent value="portfolio" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {selectedArtist.portfolio.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden">
                        <img src={img} alt={`Work ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedArtist.specialties.map((spec, i) => (
                      <Badge key={i} className="bg-purple-100 text-purple-700 text-sm py-2 px-4">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="order" className="space-y-4">
                  <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                    <p className="text-lg font-semibold mb-2">Стоимость работ:</p>
                    <p className="text-3xl font-bold text-purple-600">от {selectedArtist.priceFrom.toLocaleString()}₽</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="order-desc" className="text-base">Опишите ваш заказ</Label>
                      <Textarea 
                        id="order-desc"
                        placeholder="Расскажите подробно, что вы хотите заказать: тип персонажа, стиль, референсы..."
                        className="mt-2 min-h-[150px] border-2 border-purple-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="order-price" className="text-base">Ваш бюджет (₽)</Label>
                      <Input 
                        id="order-price"
                        type="number"
                        placeholder={`от ${selectedArtist.priceFrom}`}
                        className="mt-2 border-2 border-purple-200"
                      />
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12 text-lg"
                      onClick={() => {
                        const desc = (document.getElementById('order-desc') as HTMLTextAreaElement).value;
                        const price = parseInt((document.getElementById('order-price') as HTMLInputElement).value) || selectedArtist.priceFrom;
                        handleCreateOrder(selectedArtist.id, desc, price);
                        setSelectedArtist(null);
                      }}
                    >
                      <Icon name="Check" size={20} className="mr-2" />
                      Отправить заказ
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  {mockReviews.filter(r => r.artistId === selectedArtist.id).map(review => (
                    <Card key={review.id} className="border-2 border-purple-100">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{review.userName}</CardTitle>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Icon 
                                key={i}
                                name="Star" 
                                size={16} 
                                className={i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                        </div>
                        <CardDescription>{review.date}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Icon name="Sparkles" size={48} className="mx-auto mb-6" />
          <h3 className="text-4xl font-black mb-6">Стань частью креативного сообщества!</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Регистрируйся как художник и получай заказы от клиентов со всего мира
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-10 py-6 rounded-2xl">
            <Icon name="UserPlus" size={20} className="mr-2" />
            Начать зарабатывать
          </Button>
        </div>
      </section>

      <footer className="bg-purple-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Palette" size={24} />
                ArtMarket
              </h4>
              <p className="text-purple-300">Маркетплейс для творческих людей</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Для заказчиков</h5>
              <ul className="space-y-2 text-purple-300">
                <li>Найти художника</li>
                <li>Как заказать</li>
                <li>Защита покупателя</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Для художников</h5>
              <ul className="space-y-2 text-purple-300">
                <li>Регистрация</li>
                <li>Вывод средств</li>
                <li>Правила работы</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Поддержка</h5>
              <ul className="space-y-2 text-purple-300">
                <li>Помощь</li>
                <li>Контакты</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-purple-800 text-center text-purple-300">
            <p>© 2024 ArtMarket. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
