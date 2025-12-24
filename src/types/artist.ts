export type SkillLevel = 'beginner' | 'intermediate' | 'expert';
export type OrderStatus = 'pending' | 'in-progress' | 'completed';

export interface Artist {
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

export interface Order {
  id: number;
  artistId: number;
  artistName: string;
  description: string;
  status: OrderStatus;
  price: number;
}

export interface Review {
  id: number;
  artistId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const skillLevelMap = {
  beginner: { label: 'Начинающий', color: 'bg-blue-500' },
  intermediate: { label: 'Средний', color: 'bg-purple-500' },
  expert: { label: 'Эксперт', color: 'bg-pink-500' }
};
