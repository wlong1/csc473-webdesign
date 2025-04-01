function loadComponent(id, file) {
    fetch(`components/${file}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;

            // Async loading requires this...
            if (id === "header-placeholder") {
                initializeMenuToggle();
                updateCartCount();
            }
        })
        .catch(error => console.error(`Error loading ${file}:`, error));
}

function initializeMenuToggle() {
    const menuToggle = document.querySelector(".menu-toggle");
    if (menuToggle) {
        menuToggle.addEventListener("click", function() {
            document.querySelector(".navigation ul").classList.toggle("show");
        });
    } else {
        console.error("Header loaded, but menu toggle element not found");
    }
}

// cart
function updateCartCount() {
    const cart = Cookies.get('cart');
    let cartItems = cart ? JSON.parse(cart) : {};

    if (Array.isArray(cartItems)) {
        cartItems = {}; // Reset if error
    }

    // Sum number of items in the cart
    const totalItems = Object.values(cartItems).reduce((sum, count) => sum + count, 0);

    // Update the cart link text
    const cartLink = document.getElementById('cart-link');
    if (cartLink) {
        cartLink.textContent = totalItems > 0 
            ? `Cart(${totalItems})` 
            : 'Cart';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header-placeholder", "header.html");
    loadComponent("footer-placeholder", "footer.html");
});

