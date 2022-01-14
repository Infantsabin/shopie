import './App.css';
import SignIn from './SignIn';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from './CheckOut';
import Home from './Home';
import SignUp from './SignUp';

function App() {
  // const token = localStorage.getItem('user')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/check-out" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
