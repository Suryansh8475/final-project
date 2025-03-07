document.addEventListener('DOMContentLoaded', function() {
  // Get total from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('payment-total').textContent = `₹${total.toFixed(2)}`;
});

function initiatePhonePePayment() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  
  // PhonePe URL Scheme (replace with your merchant details)
  const phonePeUrl = `upi://pay?pa=your-merchant-vpa@ybl&pn=Your%20Store&am=${total}&tn=Payment%20for%20Order`;
  
  // Try to open PhonePe app
  window.location.href = phonePeUrl;
  
  // Fallback to Play Store if app not installed
  setTimeout(function() {
    window.location.href = 'https://play.google.com/store/apps/details?id=com.phonepe.app';
  }, 250);
}