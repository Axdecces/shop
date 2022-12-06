import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { login } from '../api/api';
import { ShopContext } from '../contexts/ShopContext';

const Login = ({}) => {
  const { setToken, setUser } = useContext(ShopContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState(email);

  useEffect(() => {
    setUsername(email);
  }, [email]);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password).then((res) => {
      if (res.token) {
        setToken(res.token);
        setUser(res.id);
        toast.success('Login successful');
        // Redirect to home page
        navigate('/');
      }
    });
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-2xl uppercase tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="-space-y-px shadow-sm flex flex-col gap-5">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full border-4 p-2 appearance-none border-tertiary x-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                className="relative block w-full border-4 p-2 appearance-none border-tertiary x-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              className="group relative w-full h-full text-tertiary"
              onClick={handleLogin}
            >
              <span className="absolute inset-0 -bottom-0 bg-secondary border-4 border-tertiary" />
              <div className="relative bg-primary w-full h-full px-4 py-2 border-4 border-tertiary uppercase active:translate-x-0 active:translate-y-0 hover:translate-x-1.5 hover:-translate-y-1.5 ease-in-out duration-200">
                login
              </div>
            </button>
            <div className="flex flex-row pt-2 gap-1">
              Don't have an account?{' '}
              <a href="/register" className="text-secondary">
                Register
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
