//Adjusting product quantity
function adjustQuantity(button, change) {
    const quantityElement = button.parentElement.querySelector(".quantity");
    let quantity = parseInt(quantityElement.textContent) + change;

    if (quantity < 0) {
        quantity = 0;
    }

    quantityElement.textContent = quantity;
    updateTotal();
}

//Like button
function toggleLike(button) {
    if (button.style.color === "" || button.style.color === "black") {
        button.style.color = "red";
    } else {
        button.style.color = "black";
    }
}

//Delete Button
function deleteItem(button) {
    const quantityElement = button.parentElement.querySelector(".quantity");
    quantityElement.textContent = "0";
    updateTotal();
}

//Cart total
function updateTotal() {
    const items = document.querySelectorAll(".item");
    let total = 0;

    items.forEach(item => {
        const price = parseFloat(item.getAttribute("data-price"));
        const quantity = parseInt(item.querySelector(".quantity").textContent);
        const itemTotal = price * quantity;

        item.querySelector(".item-total").textContent = itemTotal.toFixed(2);
        total += itemTotal;
    });

    const cartTotal = document.getElementById("cart-total");
    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2);
    } else {
        console.error("Cart total element not found.");
    }
}
