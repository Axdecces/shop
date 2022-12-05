import './App.css';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Hero title="bbs1 shop" />
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/:tag" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
