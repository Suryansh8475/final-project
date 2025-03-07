document.addEventListener('DOMContentLoaded', function () {
    // Function to render checkout items
    function renderCheckout() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const checkoutItemsContainer = document.getElementById('checkout-items');
        const checkoutTotal = document.getElementById('checkout-total');

        checkoutItemsContainer.innerHTML = '';
        let total = 0;

        // Render each cart item
        cart.forEach(item => {
            const checkoutItem = document.createElement('div');
            checkoutItem.classList.add('checkout__item');
            checkoutItem.innerHTML = `
        <div class="checkout__item-image">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="checkout__item-details">
          <h3>${item.title}</h3>
          <p>₹${item.price.toFixed(2)}</p>
        </div>
      `;
            checkoutItemsContainer.appendChild(checkoutItem);
            total += item.price;
        });

        // Update the total amount
        checkoutTotal.textContent = `₹${total.toFixed(2)}`;
    }

    // Function to handle form submission
    function handleFormSubmission(event) {
        event.preventDefault();

        // Get form data
        const formData = new FormData(event.target);
        const billingDetails = Object.fromEntries(formData.entries());

        // Save billing details to localStorage
        localStorage.setItem('billingDetails', JSON.stringify(billingDetails));

        // Redirect to payment page
        window.location.href = 'payment.html';
    }

    // Attach form submission handler
    const billingForm = document.querySelector('.billing__form-container');
    if (billingForm) {
        billingForm.addEventListener('submit', handleFormSubmission);
    }

    // Function to proceed to payment
    window.proceedToPayment = function () {
        const selectedPayment = document.querySelector('select#payment').value;

        if (selectedPayment === 'online') {
            // Redirect to payment page for online payment
            window.location.href = 'payment.html';
        } else if (selectedPayment === 'cod') {
            alert('You have selected Cash on Delivery. Your order will be confirmed shortly.');
            // Handle COD logic here (e.g., clear cart, show confirmation)
        } else if (selectedPayment === 'crypto') {
            alert('Crypto payment is not yet supported. Please choose another payment method.');
        } else {
            alert('Please select a valid payment method.');
        }
    };

    // Initial render of checkout items
    renderCheckout();
});