import React, { useEffect } from 'react';
import { useState } from 'react';
import { getCart, getCustomer, getProducts, updateCart } from '../api/api';
// create a context
// create a provider
export const productsMockup = [
  {
    id: 1,
    name: 'Basic Tee 8-Pack',
    price: 56.2,
    description:
      'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
    stock: 2,
    image:
      'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg',
    tags: ['shirts', 'trees'],
  },
  {
    id: 2,
    name: 'Basic Tee 8-Pack',
    price: 56.2,
    description:
      'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
    stock: 2,
    image:
      'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg',
    tags: ['shirts', 'trees'],
  },
  {
    id: 3,
    name: 'Basic Tee 8-Pack',
    price: 56.2,
    description:
      'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
    stock: 2,
    image:
      'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg',
    tags: ['shirts', 'trees', 'sale'],
  },
  {
    id: 4,
    name: 'Basic Tee 8-Pack',
    price: 56.2,
    description:
      'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
    stock: 2,
    image:
      'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg',
    tags: ['shirts', 'trees', 'sale'],
  },
  {
    id: 5,
    name: 'Basic Tee 8-Pack',
    price: 56.2,
    description:
      'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
    stock: 2,
    image:
      'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg',
    tags: ['shirts', 'trees', 'sale'],
  },
];

export const ShopContext = React.createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cart, setCart] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [token, setToken] = useState(null);
  const [logout, setLogout] = useState(false);

  /**
  useEffect(() => {
    addToCart(cart.id, cart);
  }, [cart]);
 */

  useEffect(() => {
    if (token) {
      // put token in localstorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', JSON.stringify(userId));
      // put cartProducts in localstorage
      getCustomer(userId).then((data) => {
        setUser(data);
      });
    }
  }, [token]);

  useEffect(() => {
    if (cart) {
      updateCart(cart, cartProducts).then((data) => {
        return data;
      });
    }
  }, [cartProducts]);

  useEffect(() => {
    if (user) {
      getCart(user.cart).then((data) => {
        setCart(data.id);
        setCartProducts(data.products);
      });
    }
  }, [user]);

  // check if user is logged in
  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });

    const tokenExist = localStorage.getItem('token');
    if (tokenExist) {
      setToken(tokenExist);
      setUserId(JSON.parse(localStorage.getItem('userId')));
      return;
    }
  }, []);

  useEffect(() => {
    if (logout) {
      setUser(null);
      setCart(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('cartProducts');
      setLogout(false);
    }
  }, [logout]);

  return (
    <ShopContext.Provider
      value={{
        setUserId,
        userId,
        cartProducts,
        setCartProducts,
        products,
        user,
        setUser,
        cart,
        setCart,
        setLogout,
        token,
        setToken,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
