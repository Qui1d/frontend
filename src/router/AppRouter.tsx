import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import CatalogPage from '../pages/CatalogPage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import ProfilePage from '../pages/ProfilePage';
import AuthPage from '../pages/AuthPage';
import DiscountsPage from '../pages/DiscountsPage';
import PurchasesPage from '../pages/PurchasesPage';
import NotFoundPage from '../pages/NotFoundPage';
import FavoritesPage from '../pages/FavoritesPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="product/:slug" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="discounts" element={<DiscountsPage />} />
        <Route path="purchases" element={<PurchasesPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;