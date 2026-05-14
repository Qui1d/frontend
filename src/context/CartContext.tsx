import { createContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  addCartItem,
  clearUserCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from '../api/cartApi';
import { useAuth } from '../hooks/useAuth';
import type { Product } from '../types/product';
import type { CartItemType } from '../types/cart';

interface CartContextType {
  cartItems: CartItemType[];
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  changeQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalPrice: number;
  totalCount: number;
}

export const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = 'game-key-store-cart';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    const saved = localStorage.getItem(CART_KEY);

    if (!saved) {
      return [];
    }

    try {
      return JSON.parse(saved) as CartItemType[];
    } catch {
      localStorage.removeItem(CART_KEY);
      return [];
    }
  });

  useEffect(() => {
    const loadCart = async () => {
      if (!isAuthenticated) {
        const saved = localStorage.getItem(CART_KEY);

        if (!saved) {
          setCartItems([]);
          return;
        }

        try {
          setCartItems(JSON.parse(saved) as CartItemType[]);
        } catch {
          localStorage.removeItem(CART_KEY);
          setCartItems([]);
        }

        return;
      }

      try {
        const loadedCart = await getCart();
        setCartItems(loadedCart);
      } catch {
        setCartItems([]);
      }
    };

    loadCart();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  const addToCart = async (product: Product) => {
    if (!isAuthenticated) {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);

        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        return [...prev, { product, quantity: 1 }];
      });

      return;
    }

    const updatedItem = await addCartItem({
      productId: product.id,
      quantity: 1,
    });

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? updatedItem : item
        );
      }

      return [...prev, updatedItem];
    });
  };

  const removeFromCart = async (productId: number) => {
    if (!isAuthenticated) {
      setCartItems((prev) =>
        prev.filter((item) => item.product.id !== productId)
      );

      return;
    }

    await removeCartItem(productId);

    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  const changeQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) {
      return;
    }

    if (!isAuthenticated) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );

      return;
    }

    const updatedItem = await updateCartItem(productId, quantity);

    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? updatedItem : item
      )
    );
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      return;
    }

    try {
      await clearUserCart();
    } catch {
      // If the cart is already empty, only clear frontend state.
    }

    setCartItems([]);
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }, [cartItems]);

  const totalCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const value = useMemo(() => {
    return {
      cartItems,
      addToCart,
      removeFromCart,
      changeQuantity,
      clearCart,
      totalPrice,
      totalCount,
    };
  }, [cartItems, totalPrice, totalCount, isAuthenticated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};