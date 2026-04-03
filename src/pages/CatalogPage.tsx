import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterPanel from '../components/FilterPanel';
import SidebarCategories from '../components/SidebarCategories';
import SortBar from '../components/SortBar';
import ProductGrid from '../components/ProductGrid';
import RecommendedShowcase from '../components/RecommendedShowcase';
import { products } from '../data/products';
import { filterProducts } from '../utils/filterProducts';

const ITEMS_PER_PAGE = 8;

const CatalogPage = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [platform, setPlatform] = useState('all');
  const [genre, setGenre] = useState('all');
  const [sort, setSort] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return filterProducts(products, { search, platform, genre, sort });
  }, [search, platform, genre, sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePlatformChange = (value: string) => {
    setPlatform(value);
    setCurrentPage(1);
  };

  const handleGenreChange = (value: string) => {
    setGenre(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setCurrentPage(1);
  };

  return (
    <div className="page-stack">
      <section className="catalog-hero page-stack">
        <div className="section-header">
          <h1>Каталог</h1>
        </div>

        <RecommendedShowcase />
      </section>

      <div className="catalog-layout">
        <aside className="catalog-layout__sidebar page-stack">
          <SidebarCategories selected={platform} onSelect={handlePlatformChange} />
        </aside>

        <section className="catalog-layout__content page-stack">
          <FilterPanel
            search={search}
            platform={platform}
            genre={genre}
            onSearchChange={handleSearchChange}
            onPlatformChange={handlePlatformChange}
            onGenreChange={handleGenreChange}
          />

          <SortBar sort={sort} onSortChange={handleSortChange} />

          <ProductGrid products={paginatedProducts} />

          {totalPages > 1 && (
            <div className="catalog-pagination">
              <button
                type="button"
                className="catalog-pagination__btn"
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
              >
                Назад
              </button>

              <div className="catalog-pagination__pages">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`catalog-pagination__page ${
                      currentPage === page ? 'catalog-pagination__page--active' : ''
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="catalog-pagination__btn"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
              >
                Вперед
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CatalogPage;