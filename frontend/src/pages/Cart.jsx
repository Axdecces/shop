import React, { useContext, useEffect, useState } from 'react';
import { Fragment } from 'react';
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Popover, Transition } from '@headlessui/react';
import { ShopContext } from '../contexts/ShopContext';
import { createOrder, getCart } from '../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const productsMockup = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: 100,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: 200,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
];
const Cart = () => {
  const { cartProducts, setCartProducts, products, user, cart } =
    useContext(ShopContext);

  const [productList, setProductList] = useState(productsMockup);

  const [sum, setSum] = useState(0);

  const removeCartItemHandler = (id) => {
    const newCart = cartProducts.filter((product) => product !== id);
    setCartProducts(newCart);
  };

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.error('Bitte logge dich ein um Produkte zu kaufen');
      return;
    }

    if (cartProducts.length === 0) {
      toast.error('Bitte legen Sie Produkte in den Warenkorb');
      return;
    }

    createOrder(productList, 1).then((res) => {
      toast.success('Erfolgreich bestellt');
      setCartProducts([]);
      navigate('/orders');
    });
  };

  useEffect(() => {
    if (!productList) return;
    const sum = productList.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
    setSum(sum);
  }, [productList]);

  useEffect(() => {
    let tempProducts = [];
    products.forEach((product) => {
      if (cartProducts.includes(product.id)) {
        tempProducts.push(product);
      }
    });
    setProductList(tempProducts);
  }, [cartProducts, products]);

  return (
    <>
      {productList && (
        <>
          <form className="px-4 max-w-3xl flex flex-col py-4 gap-4 font-sans items-center mx-auto">
            <h2 className="mt-6 text-center text-2xl uppercase tracking-tight text-gray-900">
              Shopping Cart
            </h2>
            <ul role="list" className="divide-y divide-gray-200 w-full">
              {productList.map((product) => (
                <li key={product.id} className="py-6 flex justify-start w-full">
                  <img
                    src={product.image}
                    alt={`${product.name} product shot`}
                    className="flex-none w-32 h-32 rounded-md border border-gray-200"
                  />
                  <div className="ml-4 flex flex-col gap-2 justify-start items-start w-full">
                    <div className="flex flex-row justify-between w-full">
                      <h3 className="font-medium text-xl text-gray-900">
                        <a href={`/product/${product.id}/`}>{product.name}</a>
                      </h3>
                      <button onClick={() => removeCartItemHandler(product.id)}>
                        <XMarkIcon className="h-8 w-8 text-secondary relative" />
                      </button>
                    </div>
                    <h4 className="font-medium text-gray-900">
                      {product.description}
                    </h4>
                    <h5 className="font-medium text-gray-900">
                      {product.price} EUR
                    </h5>
                  </div>
                </li>
              ))}
            </ul>

            <div className="w-full">
              <div className="text-2xl pb-4">Total: {sum} EUR</div>
              <button
                className="group relative w-full h-full text-tertiary"
                type="button"
                onClick={handleCheckout}
              >
                <span className="absolute inset-0 -bottom-0 bg-secondary border-4 border-tertiary" />
                <div className="relative bg-primary w-full h-full px-4 py-2 border-4 border-tertiary uppercase active:translate-x-0 active:translate-y-0 hover:translate-x-1.5 hover:-translate-y-1.5 ease-in-out duration-200">
                  Checkout
                </div>
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Cart;
