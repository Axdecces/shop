import './App.css';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <span className="absolute h-screen w-screen border-4 border-primary inset-0" />
      <Navbar />
      <Hero />
    </>
  );
}

export default App;
