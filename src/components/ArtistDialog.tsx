import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Artist, Review, skillLevelMap } from '@/types/artist';

interface ArtistDialogProps {
  artist: Artist | null;
  reviews: Review[];
  onClose: () => void;
  onCreateOrder: (artistId: number, description: string, price: number) => void;
}

const ArtistDialog = ({ artist, reviews, onClose, onCreateOrder }: ArtistDialogProps) => {
  if (!artist) return null;

  const artistReviews = reviews.filter(r => r.artistId === artist.id);

  return (
    <Dialog open={!!artist} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={artist.avatar}
              alt={artist.name}
              className="w-20 h-20 rounded-full border-4 border-purple-300"
            />
            <div>
              <DialogTitle className="text-3xl">{artist.name}</DialogTitle>
              <div className="flex items-center gap-3 mt-2">
                <Badge className={`${skillLevelMap[artist.skillLevel].color} text-white`}>
                  {skillLevelMap[artist.skillLevel].label}
                </Badge>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Icon name="Star" size={18} className="fill-yellow-500" />
                  <span className="font-bold">{artist.rating}</span>
                  <span className="text-muted-foreground">({artist.reviewCount} отзывов)</span>
                </div>
              </div>
            </div>
          </div>
          <DialogDescription className="text-base">
            {artist.description}
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
              {artist.portfolio.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden">
                  <img src={img} alt={`Work ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {artist.specialties.map((spec, i) => (
                <Badge key={i} className="bg-purple-100 text-purple-700 text-sm py-2 px-4">
                  {spec}
                </Badge>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="order" className="space-y-4">
            <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
              <p className="text-lg font-semibold mb-2">Стоимость работ:</p>
              <p className="text-3xl font-bold text-purple-600">от {artist.priceFrom.toLocaleString()}₽</p>
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
                  placeholder={`от ${artist.priceFrom}`}
                  className="mt-2 border-2 border-purple-200"
                />
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12 text-lg"
                onClick={() => {
                  const desc = (document.getElementById('order-desc') as HTMLTextAreaElement).value;
                  const price = parseInt((document.getElementById('order-price') as HTMLInputElement).value) || artist.priceFrom;
                  onCreateOrder(artist.id, desc, price);
                  onClose();
                }}
              >
                <Icon name="Check" size={20} className="mr-2" />
                Отправить заказ
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            {artistReviews.map(review => (
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
      </DialogContent>
    </Dialog>
  );
};

export default ArtistDialog;
