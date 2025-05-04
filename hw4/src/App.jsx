import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Menu from './pages/Menu';
import Cart from './pages/Cart';


export default function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
