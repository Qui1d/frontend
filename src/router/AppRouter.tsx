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
import FavoritesPage from '../pages/FavoritesPage';
import NotFoundPage from '../pages/NotFoundPage';

import AdminRoute from './AdminRoute';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import AdminProductsPage from '../pages/AdminProductsPage';

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
        <Route path="favorites" element={<FavoritesPage />} />

        <Route path="admin" element={<AdminRoute />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;