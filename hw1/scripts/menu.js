document.addEventListener("DOMContentLoaded", () => {
    fetch("data/menu.json")
        .then(response => response.json())
        .then(menuItems => {
            const menuContainer = document.getElementById("menu");

            menuItems.forEach(item => {
                const menuItem = document.createElement("div");
                menuItem.classList.add("menu-item");

                const img = document.createElement("img");
                img.src = "assets/img/" + item.img;
                img.alt = item.name;

                const title = document.createElement("h3");
                title.textContent = item.name;

                const description = document.createElement("p");
                description.textContent = item.description;

                const menuBuy = document.createElement("div");
                menuBuy.classList.add("menu-price-container");

                const price = document.createElement("p");
                price.classList.add("price");
                price.textContent = `$${item.price.toFixed(2)}`;

                const button = document.createElement("button");
                button.classList.add("menu-button");
                button.textContent = "Add to Cart";
                button.onclick = () => addToCart(item.id, button);

                menuItem.appendChild(img);
                menuItem.appendChild(title);
                menuItem.appendChild(description);

                menuBuy.appendChild(price);
                menuBuy.appendChild(button);
                menuItem.appendChild(menuBuy);

                menuContainer.appendChild(menuItem);
            });
        })
        .catch(error => console.error("Error loading menu:", error));
});

function addToCart(itemId, itemButton) {
    let cart = Cookies.get('cart');
    cart = cart ? JSON.parse(cart) : {};

    if (Array.isArray(cart)) {
        cart = {}; // Reset if error
    }

    // Add item
    if (itemId in cart) {
        cart[itemId]++;
    } else {
        cart[itemId] = 1;
    }
    
    console.log("Updated cart:", cart);
    Cookies.set('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Disable the button and change text
    itemButton.disabled = true;
    itemButton.textContent = "Added!";
    
    // Wait 1 second before reverting
    setTimeout(() => {
        itemButton.textContent = "Add to Cart";
        itemButton.disabled = false;
    }, 1000);

}
