let cart = []

const productDisplay = document.querySelector('#product-display');
const cartItemsContainer = document.querySelector('.cart-items');
const emptyCartMessage = document.querySelector('#empty-cart');
const cartCount = document.querySelector('#cart-count');
const totalPriceElement = document.querySelector('#total-price');

const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/products');
        let data = await response.json();
        console.log(data);

        let output = '';

        data.forEach((product) => {
            output += `
            <div class="product" data-id="${product.id}">
                <img src="${product.image.desktop}" alt="${product.name}" loading="lazy">
                <button class="add-to-cart-btn" data-id="${product.id}">
                    <img src="./assets/images/icon-add-to-cart.svg" alt="Add to cart">
                    <p>Add to Cart</p>
                </button>
                <div class="product-info">
                    <p>${product.category}</p>
                    <h4>${product.name}</h4>
                    <h5>$${product.price.toFixed(2)}</h5>
                </div>
            </div>
        `;
        });
        productDisplay.innerHTML = output;

    } catch (error) {
        console.error(error);
    }
};

const handleAddToCart = (e) => {
    const cartBtn = e.target.closest('.add-to-cart-btn');  
    if (!cartBtn) return;  // Guard clause to prevent errors

    const productId = cartBtn.dataset.id;  // Get the product ID from the button's dataset
    const productElement = document.querySelector(`.product[data-id="${productId}"]`);

    // Check if the productElement and button exist before modifying
    if (productElement && cartBtn) {
        // Replace "Add to Cart" button with quantity control buttons
        cartBtn.outerHTML = `
            <div class="quantity-control" data-id="${productId}">
                <button class="quantity-decrease">
                    <img src="./assets/images/icon-decrement-quantity.svg" alt="Decrease quantity">
                </button>
                <p class="quantity-value">1</p>
                <button class="quantity-increase">
                    <img src="./assets/images/icon-increment-quantity.svg" alt="Increase quantity">
                </button>
            </div>
        `;
    }
};

const updateQuantity = (e) => {
    const target = e.target;
    const quantityControl = target.closest('.quantity-control');

    if (!quantityControl) return; 

    const productId = quantityControl.dataset.id;
    const quantityValueElement = quantityControl.querySelector('.quantity-value');
    let quantity = parseInt(quantityValueElement.textContent);

    // Handle increase and decrease button clicks
    if (target.closest('.quantity-decrease')) {
        if (quantity > 1) {
            quantity--;
            quantityValueElement.textContent = quantity;
        }
    } else if (target.closest('.quantity-increase')) {
        quantity++;
        quantityValueElement.textContent = quantity;
    }
};

// Event delegation for adding to cart and managing quantities
productDisplay.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart-btn')) {
        handleAddToCart(e);
    } else if (e.target.closest('.quantity-control')) {
        updateQuantity(e);
    }
});

// working on the cart 


fetchData();
