import { useState, useEffect } from 'react';
import { updateCartCount } from '../utils/cart';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        updateCartCount();
    }, []);

    return (
        <header className="header">
        <div className="logo">
            <a href="/"><img src="/img/logo.webp" alt="Logo" /></a>
            <h2>Fastest Food</h2>
        </div>
        <button className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <nav className="navigation">
            <ul className={menuOpen ? 'show' : ''}>
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/cart" id="cart-link">Cart</a></li>
            </ul>
        </nav>
        </header>
    );
}
