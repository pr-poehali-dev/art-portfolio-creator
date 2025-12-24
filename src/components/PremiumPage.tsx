import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { toast } from 'sonner';

const PremiumPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const features = [
    {
      icon: 'Palette',
      title: 'Кастомное оформление',
      description: 'Персональная цветовая схема и дизайн вашей страницы'
    },
    {
      icon: 'TrendingUp',
      title: 'Приоритет в рекомендациях',
      description: 'Ваши работы чаще показываются потенциальным клиентам'
    },
    {
      icon: 'Star',
      title: 'Premium бейдж',
      description: 'Значок премиум-художника на всех ваших публикациях'
    },
    {
      icon: 'Zap',
      title: 'Быстрая поддержка',
      description: 'Приоритетная техническая поддержка 24/7'
    },
    {
      icon: 'BarChart3',
      title: 'Расширенная аналитика',
      description: 'Подробная статистика просмотров и конверсий'
    },
    {
      icon: 'Crown',
      title: 'Эксклюзивные функции',
      description: 'Доступ к новым возможностям до других пользователей'
    }
  ];

  const plans = {
    monthly: { price: 990, period: 'месяц' },
    yearly: { price: 9990, period: 'год', discount: 'Экономия 2 месяцев!' }
  };

  const handleSubscribe = () => {
    toast.success(`Премиум-подписка оформлена на ${plans[selectedPlan].period}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white border-0 px-6 py-2 text-sm">
            <Icon name="Crown" size={16} className="mr-2" />
            Premium для художников
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Выделись среди{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              тысяч художников
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Премиум-подписка увеличивает количество заказов в среднем на 3.5x благодаря приоритетному показу в рекомендациях
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, idx) => (
            <Card 
              key={idx}
              className="border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                  <Icon name={feature.icon as any} className="text-white" size={28} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 justify-center mb-8">
            <Button
              size="lg"
              variant={selectedPlan === 'monthly' ? 'default' : 'outline'}
              onClick={() => setSelectedPlan('monthly')}
              className={selectedPlan === 'monthly' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                : 'border-2 border-purple-300'
              }
            >
              Ежемесячно
            </Button>
            <Button
              size="lg"
              variant={selectedPlan === 'yearly' ? 'default' : 'outline'}
              onClick={() => setSelectedPlan('yearly')}
              className={selectedPlan === 'yearly' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                : 'border-2 border-purple-300'
              }
            >
              Ежегодно
              {plans.yearly.discount && (
                <Badge className="ml-2 bg-orange-500 text-white border-0">-17%</Badge>
              )}
            </Button>
          </div>

          <Card className="border-4 border-purple-300 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center">
                  <Icon name="Crown" className="text-white" size={40} />
                </div>
              </div>
              <CardTitle className="text-3xl mb-2">Premium подписка</CardTitle>
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {plans[selectedPlan].price.toLocaleString()}₽
                </span>
                <span className="text-xl text-muted-foreground">/ {plans[selectedPlan].period}</span>
              </div>
              {plans[selectedPlan].discount && (
                <Badge className="bg-orange-500 text-white border-0 text-sm py-2 px-4">
                  {plans[selectedPlan].discount}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-8">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" className="text-white" size={14} />
                    </div>
                    <div>
                      <p className="font-semibold">{feature.title}</p>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-lg py-6 shadow-lg shadow-purple-500/50"
                onClick={handleSubscribe}
              >
                <Icon name="Sparkles" size={20} className="mr-2" />
                Оформить Premium
              </Button>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Отмена подписки в любое время без комиссий
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center">
          <Icon name="Users" size={48} className="mx-auto mb-6" />
          <h3 className="text-3xl font-black mb-4">Уже 2,500+ художников стали Premium</h3>
          <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
            Они получают в 3-4 раза больше заказов благодаря приоритетному показу
          </p>
          <div className="flex flex-wrap gap-8 justify-center mt-8">
            <div>
              <p className="text-4xl font-black">+350%</p>
              <p className="text-sm opacity-80">Рост заказов</p>
            </div>
            <div>
              <p className="text-4xl font-black">24/7</p>
              <p className="text-sm opacity-80">Поддержка</p>
            </div>
            <div>
              <p className="text-4xl font-black">10K+</p>
              <p className="text-sm opacity-80">Просмотров</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
