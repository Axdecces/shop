import React, { useEffect } from 'react';
import { useState } from 'react';
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
  const [products] = useState(productsMockup);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [token, setToken] = useState(null);
  const [logout, setLogout] = useState(false);

  /**
  useEffect(() => {
    addToCart(cart.id, cart);
  }, [cart]);
 */
  useEffect(() => {
    if (logout) {
      setUser(null);
      setCart(null);
      setToken(null);
      setLogout(false);
    }
  }, [logout]);

  return (
    <ShopContext.Provider
      value={{
        products,
        user,
        setUser,
        cart,
        setCart,
        setLogout,
        token,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
