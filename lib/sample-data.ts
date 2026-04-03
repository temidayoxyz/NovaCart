import { v4 as uuidv4 } from 'uuid';

export type Category = 'Clothing' | 'Electronics' | 'Home' | 'Accessories';

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: Category;
  images: string[];
  variants?: ProductVariant[];
  rating: number;
  reviewCount: number;
  inventory: number;
  featured?: boolean;
  reviews?: Review[];
}

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'p_1',
    title: 'Nova Activewear Set',
    description: 'Premium seamless activewear set designed for maximum comfort and performance. Features moisture-wicking fabric and a flattering fit.',
    price: 89.99,
    compareAtPrice: 120.00,
    category: 'Clothing',
    images: [
      'https://picsum.photos/seed/nova1/800/1000',
      'https://picsum.photos/seed/nova2/800/1000'
    ],
    variants: [
      { id: 'v_size', name: 'Size', options: ['XS', 'S', 'M', 'L', 'XL'] },
      { id: 'v_color', name: 'Color', options: ['Onyx Black', 'Sage Green', 'Dusty Rose'] }
    ],
    rating: 4.8,
    reviewCount: 124,
    inventory: 50,
    featured: true,
  },
  {
    id: 'p_2',
    title: 'Aero Noise-Cancelling Headphones',
    description: 'Industry-leading noise cancellation with high-fidelity audio. Up to 30 hours of battery life and plush ear cushions for all-day comfort.',
    price: 299.00,
    category: 'Electronics',
    images: [
      'https://picsum.photos/seed/aero1/800/1000',
      'https://picsum.photos/seed/aero2/800/1000'
    ],
    variants: [
      { id: 'v_color', name: 'Color', options: ['Matte Black', 'Lunar White', 'Midnight Blue'] }
    ],
    rating: 4.9,
    reviewCount: 342,
    inventory: 15,
    featured: true,
  },
  {
    id: 'p_3',
    title: 'Minimalist Ceramic Vase',
    description: 'Handcrafted ceramic vase with a matte finish. Perfect for dried florals or as a standalone sculptural piece in any modern home.',
    price: 45.00,
    category: 'Home',
    images: [
      'https://picsum.photos/seed/vase1/800/1000'
    ],
    rating: 4.6,
    reviewCount: 56,
    inventory: 100,
  },
  {
    id: 'p_4',
    title: 'Lumina Smart Watch',
    description: 'Track your fitness, receive notifications, and monitor your health with the sleek Lumina Smart Watch. Features an always-on AMOLED display.',
    price: 199.99,
    compareAtPrice: 249.99,
    category: 'Electronics',
    images: [
      'https://picsum.photos/seed/watch1/800/1000',
      'https://picsum.photos/seed/watch2/800/1000'
    ],
    variants: [
      { id: 'v_color', name: 'Band Color', options: ['Graphite', 'Starlight', 'Rose Gold'] }
    ],
    rating: 4.7,
    reviewCount: 210,
    inventory: 30,
    featured: true,
  },
  {
    id: 'p_5',
    title: 'Essential Cotton Crewneck',
    description: 'The perfect everyday t-shirt. Made from 100% organic heavyweight cotton for a structured yet comfortable fit.',
    price: 35.00,
    category: 'Clothing',
    images: [
      'https://picsum.photos/seed/tee1/800/1000',
      'https://picsum.photos/seed/tee2/800/1000'
    ],
    variants: [
      { id: 'v_size', name: 'Size', options: ['S', 'M', 'L', 'XL', 'XXL'] },
      { id: 'v_color', name: 'Color', options: ['White', 'Black', 'Heather Grey', 'Navy'] }
    ],
    rating: 4.5,
    reviewCount: 89,
    inventory: 200,
  },
  {
    id: 'p_6',
    title: 'Leather Crossbody Bag',
    description: 'Premium full-grain leather crossbody bag with adjustable strap and brass hardware. Compact yet spacious enough for your daily essentials.',
    price: 125.00,
    category: 'Accessories',
    images: [
      'https://picsum.photos/seed/bag1/800/1000',
      'https://picsum.photos/seed/bag2/800/1000'
    ],
    variants: [
      { id: 'v_color', name: 'Color', options: ['Cognac', 'Black', 'Olive'] }
    ],
    rating: 4.8,
    reviewCount: 112,
    inventory: 40,
    featured: true,
  },
  {
    id: 'p_7',
    title: 'Aura Diffuser',
    description: 'Ultrasonic essential oil diffuser with ambient LED lighting. Humidifies the air while filling your space with your favorite scents.',
    price: 55.00,
    category: 'Home',
    images: [
      'https://picsum.photos/seed/diffuser1/800/1000'
    ],
    rating: 4.4,
    reviewCount: 67,
    inventory: 80,
  },
  {
    id: 'p_8',
    title: 'Polarized Aviator Sunglasses',
    description: 'Classic aviator silhouette with modern polarized lenses. Provides 100% UV protection and reduces glare for optimal clarity.',
    price: 85.00,
    compareAtPrice: 110.00,
    category: 'Accessories',
    images: [
      'https://picsum.photos/seed/sun1/800/1000',
      'https://picsum.photos/seed/sun2/800/1000'
    ],
    variants: [
      { id: 'v_color', name: 'Frame Color', options: ['Gold', 'Silver', 'Gunmetal'] }
    ],
    rating: 4.7,
    reviewCount: 145,
    inventory: 60,
  }
];
