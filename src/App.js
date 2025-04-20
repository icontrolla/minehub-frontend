// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage";
import JobSearchPage from './components/JobSearchPage';
import TrainingPage from './components/TrainingPage';
import About from "./components/About";
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobSearchPage />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
