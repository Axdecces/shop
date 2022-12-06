import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContext';

const ProductList = () => {
  const { products } = React.useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const url = window.location.href;
  const tag = url.split('/').pop();

  const tagMapping = [{ 1: 'sale' }, { 2: 'hoodies' }, { 3: 'shirts' }];

  // set filtered products if products are loaded
  useEffect(() => {
    if (products.length > 0) {
      if (tag === 'sale') {
        setFilteredProducts(
          products.filter((product) => product.tags.includes(1))
        );
      } else if (tag === 'hoodies') {
        setFilteredProducts(
          products.filter((product) => product.tags.includes(2))
        );
      } else if (tag === 'shirts') {
        setFilteredProducts(
          products.filter((product) => product.tags.includes(3))
        );
      } else {
        setFilteredProducts(products);
      }
    }
  }, [products, tag]);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto p-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="button group relative bg-white border-2 border-tertiary flex flex-col overflow-hidden font-sans ease-in-out duration-200 hover:shadow-product shadow-none">
                <div className="aspect-w-2 aspect-h-4 bg-gray-200 sm:aspect-none border-b-2 border-tertiary">
                  <img
                    src={product.image}
                    alt={`${product.name} product shot`}
                    className="w-full h-full object-center object-contain sm:w-full sm:h-full"
                  />
                </div>
                <div className="flex-1 p-4 space-y-2 flex flex-col">
                  <h3 className="text-sm font-medium text-gray-900">
                    <div>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </div>
                  </h3>
                  <p className="text-sm font-mono text-gray-500">
                    {product.description}
                  </p>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-base font-medium text-gray-900">
                      {product.price} EUR
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
