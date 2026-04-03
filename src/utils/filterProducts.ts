import type { Product } from '../types/product';

interface FilterOptions {
  search: string;
  platform: string;
  genre: string;
  sort: string;
}

export const filterProducts = (items: Product[], options: FilterOptions) => {
  const { search, platform, genre, sort } = options;

  let result = [...items];

  if (search.trim()) {
    result = result.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (platform !== 'all') {
    result = result.filter((item) => item.platform === platform);
  }

  if (genre !== 'all') {
    result = result.filter((item) => item.genre === genre);
  }
  switch (sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'discount-desc':
      result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      break;
    case 'title-asc':
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break;
  }

  return result;
};