document.addEventListener("DOMContentLoaded", function () {
    
    /***********************
     * NAVIGATION BAR HANDLER
     ***********************/
    let navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            alert(`Navigating to ${this.textContent} page`);
        });
    });

    /***********************
     * SUBSCRIBE FEATURE
     ***********************/
    let subscribeButton = document.getElementById("subscribe-btn");
    if (subscribeButton) {
        subscribeButton.addEventListener("click", function () {
            let emailInput = document.getElementById("subscribe-email").value;
            if (emailInput.trim() === "" || !emailInput.includes("@")) {
                alert("Please enter a valid email address.");
            } else {
                alert("Thank you for subscribing!");
            }
        });
    }

    /***********************
     * SHOPPING CART FUNCTIONALITY
     ***********************/
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    function updateCartDisplay() {
        let cartContainer = document.getElementById("cart-items");
        if (cartContainer) {
            cartContainer.innerHTML = "";
            cart.forEach((item, index) => {
                let itemElement = document.createElement("p");
                itemElement.textContent = `${item.name} - $${item.price} (Qty: ${item.quantity})`;
                cartContainer.appendChild(itemElement);
            });
        }
    }

    let addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            let itemName = this.getAttribute("data-name");
            let itemPrice = parseFloat(this.getAttribute("data-price"));
            let cartItem = { name: itemName, price: itemPrice, quantity: 1 };
            cart.push(cartItem);
            sessionStorage.setItem("cart", JSON.stringify(cart));
            alert("Item added to the cart");
            updateCartDisplay();
        });
    });

    let clearCartButton = document.getElementById("clear-cart");
    if (clearCartButton) {
        clearCartButton.addEventListener("click", function () {
            if (cart.length > 0) {
                cart = [];
                sessionStorage.removeItem("cart");
                alert("Cart cleared");
                updateCartDisplay();
            } else {
                alert("No items to clear");
            }
        });
    }

    let processOrderButton = document.getElementById("process-order");
    if (processOrderButton) {
        processOrderButton.addEventListener("click", function () {
            if (cart.length > 0) {
                alert("Thank you for your order");
                cart = [];
                sessionStorage.removeItem("cart");
                updateCartDisplay();
            } else {
                alert("Cart is empty");
            }
        });
    }

    // Load cart items on page load
    updateCartDisplay();

    /***********************
     * CONTACT FORM HANDLER
     ***********************/
    let orderForm = document.getElementById("order-form");
    if (orderForm) {
        orderForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let customerOrder = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                orderDetails: document.getElementById("order-details").value
            };
            localStorage.setItem("customerOrder", JSON.stringify(customerOrder));
            alert("Thank you for your message");
        });
    }

    // Load stored custom order details if available
    let savedOrder = JSON.parse(localStorage.getItem("customerOrder"));
    if (savedOrder) {
        document.getElementById("name").value = savedOrder.name;
        document.getElementById("email").value = savedOrder.email;
        document.getElementById("order-details").value = savedOrder.orderDetails;
    }
});
