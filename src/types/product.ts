export interface Product {
  id: number;
  title: string;
  slug: string;
  platform: string;
  genre: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  recommendedImage?: string;
  region: string;
  description: string;
  requirements: string[];
  isNew?: boolean;
  isPopular?: boolean;
  isUpcoming?: boolean;
}