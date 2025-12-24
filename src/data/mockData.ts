import { Artist, Review } from '@/types/artist';

export const mockArtists: Artist[] = [
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
    description: 'Профессиональный художник с 10+ летним опытом. Специализируюсь на создании персонажей для игр и анимации.',
    isPremium: true,
    customTheme: {
      primaryColor: '#9333ea',
      accentColor: '#f59e0b',
      backgroundPattern: 'dots'
    }
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
    description: 'Создаю яркий аниме-арт с живыми эмоциями. Быстрые сроки, качественная работа.',
    isPremium: true,
    customTheme: {
      primaryColor: '#ec4899',
      accentColor: '#8b5cf6',
      backgroundPattern: 'waves'
    }
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

export const mockReviews: Review[] = [
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