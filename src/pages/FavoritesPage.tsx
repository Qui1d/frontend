import { products } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import { useFavorites } from '../hooks/useFavorites';

const FavoritesPage = () => {
  const { favoriteIds } = useFavorites();
  const favoriteProducts = products.filter((item) => favoriteIds.includes(item.id));

  return (
    <div className="page-stack">
      <section className="card">
        <h1>Избранные товары</h1>
        <p>Здесь собраны игры, которые вы добавили в избранное.</p>
      </section>

      <section className="page-section">
        <ProductGrid products={favoriteProducts} />
      </section>
    </div>
  );
};

export default FavoritesPage;