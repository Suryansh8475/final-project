document.addEventListener('DOMContentLoaded', function () {
    // Function to render the cart items
    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        if (!cartItemsContainer || !cartTotal) return;

        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            // Ensure price is a number
            const price = parseFloat(item.price);

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart__item');
            cartItem.innerHTML = `
                <div class="cart__item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart__item-details">
                    <h3>${item.title}</h3>
                    <p>₹${price.toFixed(2)}</p>
                </div>
                <button class="cart__item-remove" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += price;
        });

        cartTotal.textContent = `₹${total.toFixed(2)}`;
    }

    window.removeFromCart = function (index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    };

    // Ensure proper item structure when adding to cart
    window.addToCart = function (title, price, image) {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Remove non-numeric characters (like ₹) and convert to a number
        const numericPrice = parseFloat(price.toString().replace(/[^0-9.]/g, ""));

        const item = {
            title: title,
            price: numericPrice, // Ensure price is a number
            image: image
        };
        cartItems.push(item);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartCount();
    };

    renderCart();
});