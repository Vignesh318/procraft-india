export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  type: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating?: number;
  reviewsCount?: number;
  inStock: boolean;
  isNew?: boolean;
  freeShipping: boolean;
  image: string;
  description: string;
  features: string[];
  specs?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  summary: string;
  content: string[];
  author: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  image: string;
  count: number;
  description: string;
}

export type ActiveTab = 'guitars' | 'headphones' | 'blog' | 'ukulele' | 'amplifiers' | 'accessories';
