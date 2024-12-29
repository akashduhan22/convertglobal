// JavaScript Code to Handle the Given HTML Functionality

// Mock Data for Products
const products = [
    { id: 1, name: "Desire Perfume", category: "Desire", price: 45 },
    { id: 2, name: "Drift Soap", category: "Drift", price: 35 },
    { id: 3, name: "Opaline Muse Candle", category: "Opaline Muse", price: 50 },
    { id: 4, name: "Radiant Oil", category: "Radiant Shaddow", price: 25 },
    { id: 5, name: "Essence Bouquet", category: "Essence", price: 70 },
    { id: 6, name: "Imperial Bloom Cream", category: "Imperial Bloom", price: 60 },
];

// Cart to store added items
let cart = [];

// Function to Render Products Based on Category and Search Query
function renderProducts(category = "All", searchQuery = "") {
    const productContainer = document.getElementById("product-list");
    productContainer.innerHTML = "";

    const filteredProducts = products.filter(product => {
        const matchesCategory = category === "All" || product.category === category;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        productContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    filteredProducts.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "product-item";
        productElement.innerHTML = `
            <div class="product">
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p>Price: Rs. ${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productContainer.appendChild(productElement);
    });
}

// Function to Add Product to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

// Function to Remove Product from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Function to Update Cart UI
function updateCartUI() {
    const cartContainer = document.getElementById("cart-items");
    const cartCount = document.querySelector(".count");
    const totalPriceElement = document.querySelector(".total-price .Price-amount");

    cartContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const cartItemElement = document.createElement("li");
        cartItemElement.className = "product-cart mini_cart_item";
        cartItemElement.innerHTML = `
            <div>
                <h5>${item.name}</h5>
                <p>Price: Rs. ${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartContainer.appendChild(cartItemElement);
    });

    cartCount.textContent = cart.length;
    totalPriceElement.textContent = `Rs. ${totalPrice}`;
}

// Function to Handle Login and Register
function handleLoginRegister(action) {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (action === "login") {
        // Mock login validation
        if (email === "user@example.com" && password === "password") {
            alert("Login successful!");
        } else {
            alert("Invalid credentials.");
        }
    } else if (action === "register") {
        alert(`Registration successful for ${email}`);
    }
}

// Event Listeners for Search and Category
const searchInput = document.querySelector(".input");
const categoryDropdown = document.querySelector(".chosen-select");

searchInput.addEventListener("input", () => {
    renderProducts(categoryDropdown.value, searchInput.value);
});

categoryDropdown.addEventListener("change", () => {
    renderProducts(categoryDropdown.value, searchInput.value);
});

// Initial Render of Products
renderProducts();
