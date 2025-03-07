// Function to add item to wishlist
function addToWishlist(name, price, image, description = '') {
    let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    const item = { name, price, image, description };
    wishlistItems.push(item);
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    updateWishlistCount();
}

// Function to update the wishlist count in the header
function updateWishlistCount() {
    let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistCount = document.querySelector('.header__action-btn .count');
    if (wishlistCount) {
        wishlistCount.textContent = wishlistItems.length;
    }
}

// Function to load wishlist items on the wishlist page
function loadWishlistItems() {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistTable = document.querySelector('.wishlist table');

    if (wishlistTable) {
        wishlistTable.innerHTML = `
            <tr>
                <th>Images</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
                <th>Remove</th>
            </tr>
        `;

        wishlistItems.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" class="table__img"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.description}</td>
                <td><a href="#" class="btn btn--sm" onclick="addToCart('${item.name}', '${item.price}', '${item.image}')">Add To Cart</a></td>
                <td><i class="fi fi-rr-trash table__trash" onclick="removeFromWishlist(${index})"></i></td>
            `;
            wishlistTable.appendChild(row);
        });
    }
}

// Function to remove item from wishlist
function removeFromWishlist(index) {
    let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlistItems.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    loadWishlistItems();
    updateWishlistCount();
}

// Initialize wishlist count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateWishlistCount();
    loadWishlistItems();
});