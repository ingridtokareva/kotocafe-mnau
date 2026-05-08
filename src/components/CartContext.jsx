import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('mnau_cafe_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [cart, setCart] = useState([]);


  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.login}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCart([]); 
    }
  }, [user]);


  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.login}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item);
      }
      return [...prev, {...product, qty: 1}];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems, totalPrice, user, setUser }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);