import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { getOrders } from '../api/api';
import { ShopContext } from '../contexts/ShopContext';

const Profile = () => {
  const { user } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((data) => setOrders(data));
  }, []);

  const getSumForOrder = (order) => {
    let sum = 0;
    order.products.forEach((product) => {
      sum += product.price;
    });
    return sum;
  };

  return (
    <>
      <form className="px-4 max-w-7xl flex flex-col py-4 gap-4 font-sans items-center mx-auto">
        {orders.map((order) => (
          <div
            className="border-4 border-tertiary flex flex-col w-full"
            key={order.id}
          >
            <div className="w-full bg-secondary p-4 grid grid-cols-3 gap-5 uppercase">
              <p className="text-white">Order #{order.id}</p>
              <p className="text-white">Order date: {order.date}</p>
              <p className="text-white"> total: {getSumForOrder(order)} EUR</p>
            </div>
            <div className="flex flex-row gap-5 p-2">
              {order.products.map((product) => (
                <a
                  href={`/product/${product.id}`}
                  key={`product-${product.id}`}
                  className="flex flex-col gap-2 items-center "
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-64 h-64 border-4 border-tertiary hover:shadow-product duration-200 ease-in-out"
                  />
                  <p>
                    {product.name} - {product.price} EUR
                  </p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </form>
    </>
  );
};

export default Profile;
