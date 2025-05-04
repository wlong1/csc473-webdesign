import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { updateCartCount } from '../utils/cart';
import '../assets/css/menu.css';
import '../assets/css/cart.css';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [menuData, setMenuData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetch('/data/menu.json')
        .then(res => res.json())
        .then(setMenuData)
        .catch(console.error);
    }, []);

    useEffect(() => {
        if (menuData.length) {
        const cart = JSON.parse(Cookies.get('cart') || '{}');
        const items = [];
        let total = 0;

        Object.entries(cart).forEach(([itemId, quantity]) => {
            const menuItem = menuData.find(item => item.id == itemId);
            if (menuItem) {
            const itemTotal = menuItem.price * quantity;
            total += itemTotal;
            items.push({ ...menuItem, quantity, itemTotal });
            }
        });

        setCartItems(items);
        setTotalPrice(total);
        updateCartCount();
        }
    }, [menuData]);

    const updateQuantity = (itemId, change) => {
        const cart = JSON.parse(Cookies.get('cart') || '{}');
        cart[itemId] = (cart[itemId] || 0) + change;

        if (cart[itemId] <= 0) {
        delete cart[itemId];
        }

        Cookies.set('cart', JSON.stringify(cart));
        setMenuData([...menuData]);
    };

    const removeItem = (itemId) => {
        const cart = JSON.parse(Cookies.get('cart') || '{}');
        delete cart[itemId];
        Cookies.set('cart', JSON.stringify(cart));
        setMenuData([...menuData]);
    };

    const clearCart = () => {
        Cookies.set('cart', JSON.stringify({}));
        setCartItems([]);
        setTotalPrice(0);
        updateCartCount();
    };

    return (
        <main className="content">
        <div className="menu" id="cart">
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
            <p className="empty-cart-message">Your cart is empty.</p>
            ) : (
            <>
                {cartItems.map(item => (
                <div key={item.id} className="cart-item" data-id={item.id}>
                    <img src={`/img/${item.img}`} alt={item.name} />
                    <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-description">{item.description}</p>
                    </div>
                    <h3 className="cart-item-price">${item.itemTotal.toFixed(2)}</h3>
                    <div className="cart-count">
                    <button
                        className="cart-button"
                        id="cart-item-add"
                        onClick={() => updateQuantity(item.id, 1)}
                    >
                        +
                    </button>
                    <h3>{item.quantity}</h3>
                    <button
                        className="cart-button"
                        id="cart-item-sub"
                        onClick={() => updateQuantity(item.id, -1)}
                    >
                        -
                    </button>
                    <button
                        className="cart-button"
                        id="cart-item-remove"
                        onClick={() => removeItem(item.id)}
                    >
                        Remove
                    </button>
                    </div>
                </div>
                ))}
                <h3 className="cart-total-price">Total Price: ${totalPrice.toFixed(2)}</h3>
                <button
                className="cart-button"
                id="cart-item-clear"
                onClick={clearCart}
                >
                Clear Cart
                </button>
            </>
            )}
        </div>
        </main>
    );
}