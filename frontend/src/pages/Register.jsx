import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { createCustomer } from '../api/api';

const Register = ({}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState(email);
  const [first_name, setFirstName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  const [street_address, setStreetAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [country, setCountry] = React.useState('');

  useEffect(() => {
    setUsername(email);
  }, [email]);

  const fields = [
    {
      label: 'First Name',
      value: 'given-name',
      onChange: setFirstName,
    },
    {
      label: 'Last Name',
      value: 'family-name',
      onChange: setLastName,
    },
    {
      label: 'Email',
      value: 'email',
      onChange: setEmail,
    },
    {
      label: 'Street Address',
      value: 'street_address',
      onChange: setStreetAddress,
    },
    {
      label: 'City',
      value: 'city',
      onChange: setCity,
    },
    {
      label: 'Postcode',
      value: 'postcode',
      onChange: setPostcode,
    },
    {
      label: 'Country',
      value: 'country',
      onChange: setCountry,
    },
    {
      label: 'Password',
      value: 'password',
      onChange: setPassword,
    },
  ];

  const handleRegister = (e) => {
    e.preventDefault();
    const customer = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      address: {
        street_address: street_address,
        city: city,
        postcode: postcode,
        country: country,
      },
      password: password,
    };

    createCustomer(customer)
      .then((data) => {
        toast.success('Registration successful');
        console.log(data);
      })
      .catch((error) => {
        toast.error('Registration failed');
        console.log(error);
      });
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-2xl uppercase tracking-tight text-gray-900">
            Register a new account
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="-space-y-px grid grid-cols-2 gap-2">
            {fields.map((field) => (
              <div
                key={field.label}
                className={classNames(
                  field.value.includes('name') ||
                    field.value === 'password' ||
                    field.value === 'email'
                    ? 'col-span-2'
                    : 'col-span-1',
                  'relative'
                )}
              >
                <label htmlFor={`${field.value}`} className="sr-only">
                  {field.label}
                </label>
                <input
                  id={field.value}
                  name={field.value}
                  type={field.value === 'password' ? 'password' : 'text'}
                  autoComplete={field.value}
                  required
                  className="relative block w-full border-4 p-2 appearance-none border-tertiary x-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder={field.label}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </div>
            ))}
          </div>
          <div>
            <button
              className="group relative w-full h-full text-tertiary"
              onClick={handleRegister}
            >
              <span className="absolute inset-0 -bottom-0 bg-secondary border-4 border-tertiary" />
              <div className="relative bg-primary w-full h-full px-4 py-2 border-4 border-tertiary uppercase active:translate-x-0 active:translate-y-0 hover:translate-x-1.5 hover:-translate-y-1.5 ease-in-out duration-200">
                Register
              </div>
            </button>
            <div className="flex flex-row pt-2 gap-1">
              Already have an account?
              <a href="/login" className="text-secondary">
                Login
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
