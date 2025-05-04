import { useEffect, useState } from 'react';
import { addToCart } from '../utils/cart';
import '../assets/css/menu.css';

export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [addedItems, setAddedItems] = useState({});

    useEffect(() => {
        document.title = "Fastest Food - Menu";
        fetch('/data/menu.json')
            .then(res => res.json())
            .then(setMenuItems)
            .catch(console.error);
    }, []);

    const handleAddToCart = (itemId) => {
        addToCart(itemId);
        setAddedItems(prev => ({ ...prev, [itemId]: true }));

        setTimeout(() => {
            setAddedItems(prev => ({ ...prev, [itemId]: false }));
        }, 1000);
    };

    return (
        <main className="content">
            <div className="menu">
            <h2>Menu</h2>
            {menuItems.map(item => (
                <div key={item.id} className="menu-item">
                <img src={`/img/${item.img}`} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="menu-price-container">
                    <p className="price">${item.price.toFixed(2)}</p>
                    <button
                    className="menu-button"
                    disabled={addedItems[item.id]}
                    onClick={() => handleAddToCart(item.id)}
                    >
                    {addedItems[item.id] ? 'Added!' : 'Add to Cart'}
                    </button>
                </div>
                </div>
            ))}
            </div>
        </main>
    );
}
