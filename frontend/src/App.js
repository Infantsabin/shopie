import './App.css';
import SignIn from './SignIn';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from './CheckOut';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import Cart from './Cart';

function App() {
  // const token = localStorage.getItem('user')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/check-out" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
