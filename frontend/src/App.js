import 'asserts/css/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from 'screens/SignIn';
import Checkout from 'screens/CheckOut';
import Dashboard from 'screens/Dashboard';
import SignUp from 'screens/SignUp';
import Cart from 'screens/Cart';

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
