import Cookies from 'js-cookie';

export const getCart = () => {
    const cart = Cookies.get('cart');
    return cart ? JSON.parse(cart) : {};
};

export const updateCartCount = () => {
    const cart = getCart();
    const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);
    const cartLink = document.getElementById('cart-link');
    if (cartLink) {
        cartLink.textContent = totalItems > 0 ? `Cart(${totalItems})` : 'Cart';
    }
};

export const addToCart = (itemId) => {
    const cart = getCart();
    cart[itemId] = (cart[itemId] || 0) + 1;
    Cookies.set('cart', JSON.stringify(cart));
    updateCartCount();
};

export const clearCart = () => {
    Cookies.set('cart', JSON.stringify({}));
    updateCartCount();
};
  