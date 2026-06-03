import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../api/productApi';

import type {
  ProductCreateRequest,
  ProductUpdateRequest,
} from '../api/productApi';
import type { Product } from '../types/product';
import { formatPrice } from '../utils/formatPrice';
import '../styles/adminProducts.css';

const emptyProductForm = {
  title: '',
  slug: '',
  platform: '',
  genre: '',
  price: '',
  oldPrice: '',
  discount: '',
  image: '',
  recommendedImage: '',
  region: '',
  description: '',
  requirements: '',
  isNew: false,
  isPopular: false,
  isUpcoming: false,
};

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyProductForm);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const totalProducts = products.length;

  const discountedProductsCount = useMemo(() => {
    return products.filter((product) => (product.discount || 0) > 0).length;
  }, [products]);

  const popularProductsCount = useMemo(() => {
    return products.filter((product) => product.isPopular).length;
  }, [products]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError('');

      const loadedProducts = await getProducts();

      setProducts(loadedProducts);
    } catch {
      setError('Не удалось загрузить товары');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setForm(emptyProductForm);
    setEditingProductId(null);
    setIsFormOpen(false);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;

    if (type === 'checkbox') {
      const checked = (event.target as HTMLInputElement).checked;

      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateSlug = () => {
    const slug = form.title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9а-яё\s-]/gi, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    setForm((prev) => ({
      ...prev,
      slug,
    }));
  };

  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.id);

    setForm({
      title: product.title,
      slug: product.slug,
      platform: product.platform,
      genre: product.genre,
      price: String(product.price),
      oldPrice:
        product.oldPrice !== undefined && product.oldPrice !== null
          ? String(product.oldPrice)
          : '',
      discount:
        product.discount !== undefined && product.discount !== null
          ? String(product.discount)
          : '',
      image: product.image,
      recommendedImage: product.recommendedImage ?? '',
      region: product.region,
      description: product.description,
      requirements: product.requirements.join('\n'),
      isNew: Boolean(product.isNew),
      isPopular: Boolean(product.isPopular),
      isUpcoming: Boolean(product.isUpcoming),
    });

    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title.trim()) {
      alert('Введите название товара');
      return;
    }

    if (!form.slug.trim()) {
      alert('Введите slug товара');
      return;
    }

    if (!form.platform.trim()) {
      alert('Выберите платформу');
      return;
    }

    if (!form.genre.trim()) {
      alert('Введите жанр');
      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      alert('Введите корректную цену');
      return;
    }

    if (!form.image.trim()) {
      alert('Введите ссылку на изображение');
      return;
    }

    if (!form.region.trim()) {
      alert('Введите регион');
      return;
    }

    if (!form.description.trim()) {
      alert('Введите описание товара');
      return;
    }

    const productToCreate: ProductCreateRequest = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      platform: form.platform.trim(),
      genre: form.genre.trim(),
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      discount: form.discount ? Number(form.discount) : null,
      image: form.image.trim(),
      recommendedImage: form.recommendedImage.trim() || null,
      region: form.region.trim(),
      description: form.description.trim(),
      requirements: form.requirements.trim(),
      isNew: form.isNew,
      isPopular: form.isPopular,
      isUpcoming: form.isUpcoming,
    };

    try {
      setIsSaving(true);

      if (editingProductId) {
        const updatedProduct = await updateProduct(
          editingProductId,
          productToCreate as ProductUpdateRequest
        );

        setProducts((prev) =>
          prev.map((product) =>
            product.id === editingProductId ? updatedProduct : product
          )
        );
      } else {
        const createdProduct = await createProduct(
          productToCreate as ProductCreateRequest
        );

        setProducts((prev) => [...prev, createdProduct]);
      }

      resetForm();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Не удалось добавить товар');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    const confirmDelete = window.confirm(
      `Удалить товар "${product.title}"?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteProduct(product.id);

      setProducts((prev) =>
        prev.filter((item) => item.id !== product.id)
      );
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Не удалось удалить товар');
      }
    }
  };

  return (
    <div className="page-stack admin-products-page">
      <section className="banner banner--small">
        <div>
          <p className="banner__eyebrow">АДМИН-ПАНЕЛЬ</p>
          <h1>Управление товарами</h1>
          <p>
            Добавление, просмотр и удаление игр в каталоге Sky Vision Store.
          </p>
        </div>
      </section>

      <section className="admin-products-stats">
        <article className="admin-products-stat-card">
          <span>Всего товаров</span>
          <strong>{totalProducts}</strong>
          <p>Общее количество игр в каталоге.</p>
        </article>

        <article className="admin-products-stat-card">
          <span>Со скидкой</span>
          <strong>{discountedProductsCount}</strong>
          <p>Товары, у которых указана скидка.</p>
        </article>

        <article className="admin-products-stat-card">
          <span>Популярные</span>
          <strong>{popularProductsCount}</strong>
          <p>Игры, отмеченные как популярные.</p>
        </article>
      </section>

      <section className="admin-products-panel">
        <div className="admin-products-panel__header">
          <div>
            <p className="admin-products-panel__eyebrow">Каталог</p>
            <h2>Список товаров</h2>
            <span>
              Управляй товарами, которые отображаются на главной странице и в каталоге.
            </span>
          </div>

          <button
            className="button"
            onClick={() => setIsFormOpen((prev) => !prev)}
            type="button"
          >
            {isFormOpen ? 'Закрыть форму' : 'Добавить товар'}
          </button>
        </div>

        {isFormOpen && (
          <form className="admin-products-form" onSubmit={handleSubmitProduct}>
            <div className="admin-products-form__title">
              <h3>{editingProductId ? 'Редактирование товара' : 'Новый товар'}</h3>
              <p>
                {editingProductId
                  ? 'Измени данные игры и сохрани обновлённую информацию.'
                  : 'Заполни данные игры, чтобы добавить её в каталог.'}
              </p>
            </div>

            <div className="admin-products-form__grid">
              <label>
                Название
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Cyberpunk 2077"
                />
              </label>

              <label>
                Slug
                <div className="admin-products-form__inline">
                  <input
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder="cyberpunk-2077"
                  />

                  <button
                    className="button button--small button--secondary"
                    onClick={generateSlug}
                    type="button"
                  >
                    Создать
                  </button>
                </div>
              </label>

              <label>
                Платформа
                <select
                  name="platform"
                  value={form.platform}
                  onChange={handleChange}
                >
                  <option value="">Выберите платформу</option>
                  <option value="Steam">Steam</option>
                  <option value="Epic Games">Epic Games</option>
                  <option value="Origin">Origin</option>
                  <option value="Ubisoft Connect">Ubisoft Connect</option>
                  <option value="Battle.net">Battle.net</option>
                  <option value="Xbox">Xbox</option>
                  <option value="PlayStation">PlayStation</option>
                </select>
              </label>

              <label>
                Жанр
                <input
                  name="genre"
                  value={form.genre}
                  onChange={handleChange}
                  placeholder="Action"
                />
              </label>

              <label>
                Цена
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="59.99"
                />
              </label>

              <label>
                Старая цена
                <input
                  name="oldPrice"
                  value={form.oldPrice}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="79.99"
                />
              </label>

              <label>
                Скидка, %
                <input
                  name="discount"
                  value={form.discount}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  max="100"
                  placeholder="25"
                />
              </label>

              <label>
                Регион
                <input
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                  placeholder="Global"
                />
              </label>

              <label className="admin-products-form__wide">
                Ссылка на изображение
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://placehold.co/400x600"
                />
              </label>

              <label className="admin-products-form__wide">
                Рекомендованное изображение
                <input
                  name="recommendedImage"
                  value={form.recommendedImage}
                  onChange={handleChange}
                  placeholder="https://placehold.co/800x450"
                />
              </label>

              <label className="admin-products-form__wide">
                Описание
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Краткое описание игры"
                />
              </label>

              <label className="admin-products-form__wide">
                Системные требования
                <textarea
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
                  rows={4}
                  placeholder={`Windows 10\nIntel Core i5\n8 GB RAM\nGTX 1060`}
                />
              </label>
            </div>

            <div className="admin-products-checks">
              <label>
                <input
                  name="isNew"
                  checked={form.isNew}
                  onChange={handleChange}
                  type="checkbox"
                />
                Новинка
              </label>

              <label>
                <input
                  name="isPopular"
                  checked={form.isPopular}
                  onChange={handleChange}
                  type="checkbox"
                />
                Популярное
              </label>

              <label>
                <input
                  name="isUpcoming"
                  checked={form.isUpcoming}
                  onChange={handleChange}
                  type="checkbox"
                />
                Скоро выйдет
              </label>
            </div>

            <div className="admin-products-form__actions">
              <button
                className="button"
                disabled={isSaving}
                type="submit"
              >
                {isSaving
                  ? 'Сохранение...'
                  : editingProductId
                    ? 'Сохранить изменения'
                    : 'Сохранить товар'}
              </button>

              <button
                className="button button--secondary"
                onClick={resetForm}
                type="button"
              >
                Отмена
              </button>
            </div>
          </form>
        )}

        {isLoading && (
          <div className="empty-state">
            Загрузка товаров...
          </div>
        )}

        {!isLoading && error && (
          <div className="empty-state empty-state--error">
            {error}
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="empty-state">
            Товары пока не добавлены.
          </div>
        )}

        {!isLoading && !error && products.length > 0 && (
          <div className="admin-products-table-wrap">
            <table className="admin-products-table">
              <thead>
                <tr>
                  <th>Товар</th>
                  <th>Платформа</th>
                  <th>Жанр</th>
                  <th>Цена</th>
                  <th>Скидка</th>
                  <th>Статусы</th>
                  <th>Действия</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="admin-products-cell">
                        <img src={product.image} alt={product.title} />

                        <div>
                          <strong>{product.title}</strong>
                          <span>ID: {product.id}</span>
                          <span>{product.slug}</span>
                        </div>
                      </div>
                    </td>

                    <td>{product.platform}</td>
                    <td>{product.genre}</td>
                    <td>{formatPrice(product.price)}</td>

                    <td>
                      {product.discount ? `${product.discount}%` : '—'}
                    </td>

                    <td>
                      <div className="admin-products-badges">
                        {product.isNew && (
                          <span className="admin-products-badge">New</span>
                        )}

                        {product.isPopular && (
                          <span className="admin-products-badge">Popular</span>
                        )}

                        {product.isUpcoming && (
                          <span className="admin-products-badge">Upcoming</span>
                        )}

                        {!product.isNew &&
                          !product.isPopular &&
                          !product.isUpcoming && (
                            <span className="admin-products-muted">—</span>
                          )}
                      </div>
                    </td>

                    <td>
                      <div className="admin-products-actions">
                        <button
                          className="button button--small button--secondary"
                          onClick={() => handleEditProduct(product)}
                          type="button"
                        >
                          Изменить
                        </button>

                        <button
                          className="button button--small admin-products-delete-btn"
                          onClick={() => handleDeleteProduct(product)}
                          type="button"
                        >
                          Удалить
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminProductsPage;