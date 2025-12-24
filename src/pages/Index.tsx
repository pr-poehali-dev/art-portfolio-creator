import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { Artist, Order } from '@/types/artist';
import { mockArtists, mockReviews } from '@/data/mockData';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ArtistCatalog from '@/components/ArtistCatalog';
import ArtistDialog from '@/components/ArtistDialog';

const Index = () => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState<Artist[]>(mockArtists);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>(mockArtists);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [skillFilter, setSkillFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    filterArtists();
  };

  const handleSkillFilterChange = (value: string) => {
    setSkillFilter(value);
    filterArtists();
  };

  const handlePriceFilterChange = (value: string) => {
    setPriceFilter(value);
    filterArtists();
  };

  useState(() => {
    filterArtists();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      <HeroSection />
      <ArtistCatalog
        filteredArtists={filteredArtists}
        searchQuery={searchQuery}
        skillFilter={skillFilter}
        priceFilter={priceFilter}
        onSearchChange={handleSearchChange}
        onSkillFilterChange={handleSkillFilterChange}
        onPriceFilterChange={handlePriceFilterChange}
        onArtistClick={setSelectedArtist}
      />
      <ArtistDialog
        artist={selectedArtist}
        reviews={mockReviews}
        onClose={() => setSelectedArtist(null)}
        onCreateOrder={handleCreateOrder}
      />

      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Icon name="Crown" size={48} className="mx-auto mb-6" />
          <h3 className="text-4xl font-black mb-6">Стань Premium художником!</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Получай в 3.5 раза больше заказов с Premium-подпиской и кастомным оформлением
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-10 py-6 rounded-2xl"
              onClick={() => navigate('/premium')}
            >
              <Icon name="Crown" size={20} className="mr-2" />
              Узнать о Premium
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-6 rounded-2xl">
              <Icon name="UserPlus" size={20} className="mr-2" />
              Начать бесплатно
            </Button>
          </div>
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