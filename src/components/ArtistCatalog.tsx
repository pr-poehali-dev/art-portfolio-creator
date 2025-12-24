import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Artist, skillLevelMap } from '@/types/artist';

interface ArtistCatalogProps {
  filteredArtists: Artist[];
  searchQuery: string;
  skillFilter: string;
  priceFilter: string;
  onSearchChange: (value: string) => void;
  onSkillFilterChange: (value: string) => void;
  onPriceFilterChange: (value: string) => void;
  onArtistClick: (artist: Artist) => void;
}

const ArtistCatalog = ({
  filteredArtists,
  searchQuery,
  skillFilter,
  priceFilter,
  onSearchChange,
  onSkillFilterChange,
  onPriceFilterChange,
  onArtistClick
}: ArtistCatalogProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="🔍 Поиск по имени или специализации..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-12 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
            />
          </div>
          <Select value={skillFilter} onValueChange={onSkillFilterChange}>
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
          <Select value={priceFilter} onValueChange={onPriceFilterChange}>
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
          {filteredArtists.sort((a, b) => (b.isPremium ? 1 : 0) - (a.isPremium ? 1 : 0)).map((artist, idx) => (
            <Card 
              key={artist.id} 
              className={`group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 rounded-2xl overflow-hidden animate-scale-in cursor-pointer ${
                artist.isPremium 
                  ? 'border-orange-300 hover:border-orange-400 ring-2 ring-orange-200' 
                  : 'border-purple-100 hover:border-purple-300'
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => onArtistClick(artist)}
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400">
                <img 
                  src={artist.portfolio[0]} 
                  alt={artist.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {artist.isPremium && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0">
                      <Icon name="Crown" size={14} className="mr-1" />
                      Premium
                    </Badge>
                  </div>
                )}
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
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{artist.name}</CardTitle>
                      {artist.isPremium && (
                        <Icon name="Crown" size={16} className="text-orange-500" />
                      )}
                    </div>
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
  );
};

export default ArtistCatalog;