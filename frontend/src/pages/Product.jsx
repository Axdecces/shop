import React, { useContext } from 'react';
import { Fragment, useState } from 'react';
import { Dialog, Menu, Popover, Tab, Transition } from '@headlessui/react';
import { XCircleIcon, StarIcon } from '@heroicons/react/24/solid';
import { useParams } from 'react-router';
import { ShopContext } from '../contexts/ShopContext';

const reviews = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>Sehr schönes T-Shirt!</p>
      `,
      date: 'July 16, 2021',
      datetime: '2021-07-16',
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Heftige Qualität</p>
      `,
      date: 'July 12, 2021',
      datetime: '2021-07-12',
      author: 'Hector Gibbons',
      avatarSrc:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    // More reviews...
  ],
};
const faqs = [
  {
    question: 'Ist das ein echter Shop?',
    answer:
      'Nein, dies ist ein ein Fiktiver-Shop der für die Schule als Projekt erstellt wurde.',
  },
  {
    question: 'Test',
    answer: 'Test2',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Product = ({}) => {
  const { products } = useContext(ShopContext);

  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [product] = useState(
    products.filter((product) => product.id === Number(id))[0]
  );

  return (
    <>
      <div className="bg-white font-sans">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 pt-5 pb-2 flex">
                  <button
                    type="button"
                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XCircleIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      Create account
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 py-6 px-4">
                  <a href="#" className="-m-2 p-2 flex items-center">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="w-5 h-auto block flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      CAD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto pt-10 pb-24 px-4 sm:pb-32 sm:px-6 lg:max-w-7xl lg:px-8">
          {/* Product */}
          <div className="lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
            {/* Product image */}
            <div className="lg:row-end-1 lg:col-span-4">
              <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={`${product.name} product shot`}
                  className="object-center object-cover"
                />
              </div>
            </div>

            {/* Product details */}
            <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
              <div className="flex flex-col-reverse">
                <div className="mt-4">
                  <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    {product.name}
                  </h1>
                  <h1 className="text-2xl font-medium tracking-tight text-tertiary sm:text-2xl">
                    {product.price} €
                  </h1>

                  <h2 id="information-heading" className="sr-only">
                    Product information
                  </h2>
                </div>

                <div>
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? 'text-yellow-300'
                            : 'text-tertiary',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                </div>
              </div>

              <p className="text-gray-500 mt-6">{product.description}</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4">
                <button
                  className="group relative w-full h-full text-tertiary"
                  type="button"
                >
                  <span className="absolute inset-0 -bottom-0 bg-secondary border-4 border-tertiary" />
                  <div className="relative bg-primary w-full h-full px-4 py-2 border-4 border-tertiary uppercase active:translate-x-0 active:translate-y-0 hover:translate-x-1.5 hover:-translate-y-1.5 ease-in-out duration-200">
                    Add to Cart
                  </div>
                </button>
              </div>
              <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
                <Tab.Group as="div">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8">
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? 'border-indigo-600 text-indigo-600'
                              : 'border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300',
                            'whitespace-nowrap py-6 border-b-2 font-medium text-sm'
                          )
                        }
                      >
                        Customer Reviews
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? 'border-indigo-600 text-indigo-600'
                              : 'border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300',
                            'whitespace-nowrap py-6 border-b-2 font-medium text-sm'
                          )
                        }
                      >
                        FAQ
                      </Tab>
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    <Tab.Panel className="-mb-10">
                      <h3 className="sr-only">Customer Reviews</h3>

                      {reviews.featured.map((review, reviewIdx) => (
                        <div
                          key={review.id}
                          className="flex text-sm text-gray-500 space-x-4"
                        >
                          <div className="flex-none py-10">
                            <img
                              src={review.avatarSrc}
                              alt=""
                              className="w-10 h-10 bg-gray-100 rounded-full"
                            />
                          </div>
                          <div
                            className={classNames(
                              reviewIdx === 0 ? '' : 'border-t border-gray-200',
                              'flex-1 py-10'
                            )}
                          >
                            <h3 className="font-medium text-gray-900">
                              {review.author}
                            </h3>
                            <p>
                              <time dateTime={review.datetime}>
                                {review.date}
                              </time>
                            </p>

                            <div className="flex items-center mt-4">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    review.rating > rating
                                      ? 'text-yellow-300'
                                      : 'text-tertiary',
                                    'h-5 w-5 flex-shrink-0 '
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <p className="sr-only">
                              {review.rating} out of 5 stars
                            </p>

                            <div
                              className="mt-4 prose prose-sm max-w-none text-gray-500"
                              dangerouslySetInnerHTML={{
                                __html: review.content,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </Tab.Panel>

                    <Tab.Panel as="dl" className="text-sm text-gray-500">
                      <h3 className="sr-only">Frequently Asked Questions</h3>

                      {faqs.map((faq) => (
                        <Fragment key={faq.question}>
                          <dt className="mt-10 font-medium text-gray-900">
                            {faq.question}
                          </dt>
                          <dd className="mt-2 prose prose-sm max-w-none text-gray-500">
                            <p>{faq.answer}</p>
                          </dd>
                        </Fragment>
                      ))}
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Product;
