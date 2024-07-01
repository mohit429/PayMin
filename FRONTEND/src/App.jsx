import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate
} from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Dashboard } from './pages/Dashboard';
import { SendMoney } from './pages/SendMoney';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-gray-300 to-gray-700">
      <nav className="bg-white shadow-md sticky top-0 z-50 animate-fade-in">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">PayMin</div>
          <div>
          <button className="rounded-full text-gray-800 mx-4 px-4 py-2 transition duration-300 ease-in-out hover:text-white hover:bg-sky-500 hover:rounded-full hover:px-4 hover:py-2" onClick={() => navigate("/signin")}>Sign In</button>
         <button className="bg-sky-500 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out hover:bg-white hover:shadow-none hover:text-gray-800" onClick={() => navigate("/signup")}>Sign Up</button>

          </div>
        </div>
      </nav>
      <section className="hero-bg text-gray-800 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center px-6 animate-fade-in">
          <h1 className="text-6xl font-bold mb-8">Instant Money Transfer</h1>
          <p className="text-2xl mb-8">Experience a seamless and secure way to transfer money instantly.</p>
          <Link to="/features" className="bg-sky-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl floating">Learn More</Link>
        </div>
        <div className="flex flex-col">
          <img src="Removal-166.png" alt="img" />
        </div>
      </section>
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-sky-500 mb-10">Features</h2>
          <p className="text-xl text-gray-600">Explore the powerful features of our app</p>
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:text-sky-500 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <p className="text-gray-600">Secure authentication with token-based system.</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:text-sky-500 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <p className="text-gray-600">Easy registration process with secure data handling.</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:text-sky-500 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <p className="text-gray-600">Instant money transfer with complete safety.</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="bg-white min-h-24 rounded-lg shadow-lg p-6 hover:text-sky-500 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <p className="text-gray-600">Quickly check your available balance.</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg">&copy; 2024 WalletApp. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="text-gray-400 hover:text-sky-500 mx-2">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-sky-500 mx-2">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-sky-500 mx-2">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
