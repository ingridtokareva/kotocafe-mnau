import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Contacts from './pages/Contacts';
import ProductCatalog from './pages/ProductCatalog';
import Cart from './pages/Cart';
import Payment from './pages/Payment';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="App bg-monolit">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/catalog" element={<ProductCatalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;