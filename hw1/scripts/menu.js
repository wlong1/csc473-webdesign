document.addEventListener("DOMContentLoaded", () => {
    fetch("data/menu.json")
        .then(response => response.json())
        .then(menuItems => {
            const menuContainer = document.getElementById("menu");
            menuContainer.innerHTML = ""; // Just in case
            
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

                const price = document.createElement("p");
                price.classList.add("price");
                price.textContent = `$${item.price.toFixed(2)}`;

                const button = document.createElement("button");
                button.classList.add("menu-button");
                button.textContent = "Add to Cart";
                //button.onclick = () => addToCart(item.id);

                menuItem.appendChild(img);
                menuItem.appendChild(title);
                menuItem.appendChild(description);
                menuItem.appendChild(price);
                menuItem.appendChild(button);

                menuContainer.appendChild(menuItem);
            });
        })
        .catch(error => console.error("Error loading menu:", error));
});
