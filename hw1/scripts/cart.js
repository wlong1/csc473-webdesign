document.addEventListener("DOMContentLoaded", () => {
    loadCartItems();
    
    document.getElementById("cart-item-clear").addEventListener("click", clearCart);
});

function loadCartItems() {
    const cart = JSON.parse(Cookies.get('cart') || '{}');

    fetch("data/menu.json")
        .then(response => response.json())
        .then(menuItems => {
            const totalPriceElement = document.querySelector(".cart-total-price");
            const cartContainer = document.querySelector("#cart");
            const currentItems = document.querySelectorAll(".cart-item");
            const seenIds = new Set();

            let totalPrice = 0;

            Object.keys(cart).forEach(itemId => {
                const menuItem = menuItems.find(item => item.id == itemId);
                if (!menuItem) return;

                const quantity = cart[itemId];
                const itemTotal = menuItem.price * quantity;
                totalPrice += itemTotal;
                seenIds.add(itemId);

                // Check if item is in cart
                let existing = document.querySelector(`.cart-item[data-id="${itemId}"]`);
                if (existing) {
                    // Exists, update qty and item price
                    const priceElem = existing.querySelector(".cart-item-price");
                    const qtyElem = existing.querySelector(".cart-count h3");
                    if (priceElem.textContent !== `$${itemTotal.toFixed(2)}`) {
                        priceElem.textContent = `$${itemTotal.toFixed(2)}`;
                    }
                    if (qtyElem.textContent != quantity) {
                        qtyElem.textContent = quantity;
                    }
                } else {
                    // Item doesn't exist, make one
                    const cartItem = createCartItemElement(menuItem, quantity, itemTotal);
                    totalPriceElement.insertAdjacentElement('beforebegin', cartItem);
                }
            });

            // Zero qty, remove
            currentItems.forEach(item => {
                if (!seenIds.has(item.dataset.id)) {
                    item.remove();
                }
            });

            // If cart is empty, show empty message
            const emptyMsg = cartContainer.querySelector(".empty-cart-message");
            if (Object.keys(cart).length === 0) {
                if (!emptyMsg) {
                    const msg = document.createElement("p");
                    msg.classList.add("empty-cart-message");
                    msg.textContent = "Your cart is empty.";
                    cartContainer.querySelector("h2").insertAdjacentElement("afterend", msg);
                }
            } else if (emptyMsg) {
                emptyMsg.remove();
            }

            totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;

            updateCartCount();
        })
        .catch(console.error);
}


function createCartItemElement(menuItem, quantity, itemTotal) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.dataset.id = menuItem.id;
    
    const img = document.createElement("img");
    img.src = "assets/img/" + menuItem.img;
    img.alt = menuItem.name;
    
    const itemInfo = document.createElement("div");
    itemInfo.classList.add("cart-item-info");
    
    const name = document.createElement("p");
    name.classList.add("cart-item-name");
    name.textContent = menuItem.name;
    
    const description = document.createElement("p");
    description.classList.add("cart-item-description");
    description.textContent = menuItem.description;
    
    const totalPrice = document.createElement("h3");
    totalPrice.classList.add("cart-item-price");
    totalPrice.textContent = `$${itemTotal.toFixed(2)}`;
    
    const countContainer = document.createElement("div");
    countContainer.classList.add("cart-count");
    
    const addButton = document.createElement("button");
    addButton.classList.add("cart-button");
    addButton.id = `cart-item-add`;
    addButton.textContent = "+";
    addButton.addEventListener("click", () => updateCartItemQuantity(menuItem.id, 1));
    
    const quantityText = document.createElement("h3");
    quantityText.textContent = quantity;
    
    const subButton = document.createElement("button");
    subButton.classList.add("cart-button");
    subButton.id = `cart-item-sub`;
    subButton.textContent = "-";
    subButton.addEventListener("click", () => updateCartItemQuantity(menuItem.id, -1));
    
    const removeButton = document.createElement("button");
    removeButton.classList.add("cart-button");
    removeButton.id = `cart-item-remove`;
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeCartItem(menuItem.id));
    

    itemInfo.appendChild(name);
    itemInfo.appendChild(description);
    
    countContainer.appendChild(addButton);
    countContainer.appendChild(quantityText);
    countContainer.appendChild(subButton);
    countContainer.appendChild(removeButton);
    
    cartItem.appendChild(img);
    cartItem.appendChild(itemInfo);
    cartItem.appendChild(totalPrice);
    cartItem.appendChild(countContainer);
    
    return cartItem;
}

function updateCartItemQuantity(itemId, change) {
    let cart = Cookies.get('cart');
    cart = cart ? JSON.parse(cart) : {};
    
    if (cart[itemId]) {
        cart[itemId] += change;
        
        // Remove item if quantity reaches 0
        if (cart[itemId] <= 0) {
            delete cart[itemId];
        }
    }
    
    Cookies.set('cart', JSON.stringify(cart));
    loadCartItems();
}

function removeCartItem(itemId) {
    let cart = Cookies.get('cart');
    cart = cart ? JSON.parse(cart) : {};
    
    if (cart[itemId]) {
        delete cart[itemId];
    }
    
    Cookies.set('cart', JSON.stringify(cart));
    loadCartItems();
}

function clearCart() {
    Cookies.set('cart', JSON.stringify({}));
    loadCartItems();
}
