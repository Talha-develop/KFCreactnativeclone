import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../../data/productData';

export type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, change: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const savedCartItems = await AsyncStorage.getItem('cartItems');
        if (savedCartItems) {
          setCart(JSON.parse(savedCartItems));
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
      }
    };
    loadCartItems();
  }, []);

  useEffect(() => {
    const saveCartItems = async () => {
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart items:', error);
      }
    };
    saveCartItems();
  }, [cart]);

  const addToCart = (item: Product) => {
    setCart(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(prevItems => {
      return prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

