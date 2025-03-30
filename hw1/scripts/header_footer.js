function loadComponent(id, file) {
    fetch(`components/${file}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${file}:`, error));
}

document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header-placeholder", "header.html");
    loadComponent("footer-placeholder", "footer.html");
});

// Mobile Hamburger
document.querySelector(".menu-toggle").addEventListener("click", function() {
    document.querySelector(".navigation ul").classList.toggle("show");
  });