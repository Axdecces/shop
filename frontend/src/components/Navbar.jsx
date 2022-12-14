import { Fragment, useContext } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ShopContext } from '../contexts/ShopContext';
import { toast } from 'react-toastify';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Sale', href: '/sale' },
  { name: 'Hoodies', href: '/hoodies' },
  { name: 'Shirts', href: '/shirts' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const { setLogout, token, setToken } = useContext(ShopContext);

  const logout = () => {
    setToken(null);
    setLogout(true);
    toast.success('You have been logged out');
  };

  // check what page we are on
  const currentPage = window.location.pathname.slice(1);
  // delete / from currentPath

  return (
    <Disclosure as="nav" className="bg-white border-y-4 border-tertiary">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl pl-2 md:pl-6 lg:pl-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="/bbs.jpg"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="/bbs.jpg"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden md:ml-6 md:block">
                  <div className="flex space-x-4 justify-center items-center h-full">
                    {navigation.map((item) => (
                      <div
                        key={item.name}
                        className="ease-in-out duration-200 shadow-red-800 shadow-3xl hover:pt-1 hover:shadow-4xl"
                      >
                        <a
                          href={item.href}
                          className={classNames(
                            item.name.toLowerCase() === currentPage ||
                              (item.name.toLowerCase() === 'home' &&
                                currentPage === '')
                              ? 'bg-primary text-white'
                              : 'text-tertiary hover:bg-secondary hover:text-white',
                            'px-3 py-2 text-sm font-medium focus:outline-none uppercase font-sans ease-in-out duration-75'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center md:static md:inset-auto md:ml-6 md:pr-0 gap-2 h-full">
                <div className="relative justify-center flex items-center group  border-tertiary">
                  <a
                    href="/cart"
                    className="flex-row gap-2 px-3 py-2 text-sm font-medium focus:outline-none uppercase font-sans text-tertiary h-full hover:bg-secondary hover:text-white flex justify-center items-center"
                  >
                    <ShoppingCartIcon className="h-8 w-8" />
                  </a>
                </div>

                {token && (
                  <div className="relative justify-center flex items-center group  border-tertiary">
                    <a
                      href="/profile"
                      className="flex-row gap-2 px-3 py-2 text-sm font-medium focus:outline-none uppercase font-sans text-tertiary h-full hover:bg-secondary hover:text-white flex justify-center items-center"
                    >
                      <UserIcon className="h-8 w-8" />
                    </a>
                  </div>
                )}

                {token ? (
                  <div className="relative border-l-4 h-full justify-center flex items-center group  border-tertiary">
                    <a
                      href="/"
                      className="px-3 py-2 text-sm font-medium focus:outline-none uppercase font-sans text-tertiary h-full hover:bg-secondary hover:text-white flex justify-center items-center"
                      onClick={logout}
                    >
                      Logout
                    </a>
                  </div>
                ) : (
                  <div className="relative border-l-4 h-full justify-center flex items-center group  border-tertiary">
                    <a
                      href="/login"
                      className={classNames(
                        currentPage === 'login'
                          ? 'bg-secondary text-white'
                          : '',
                        'px-3 py-2 text-sm font-medium focus:outline-none uppercase font-sans text-tertiary h-full hover:bg-secondary hover:text-white flex justify-center items-center'
                      )}
                    >
                      Login
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
