//Add items to the cart from the JSON file

let ListProductHTML = document.querySelector(".cart");
let listItems = [];

const addDataToHTML = () => {
    ListProductHTML.innerHTML = "";
    if (listItems.length > 0) {
        listItems.forEach(item => {
            let newItem = document.createElement("div");
            newItem.classList.add("item");
            newItem.setAttribute("data-price",item.price);
            newItem.innerHTML = `
                <img src="${item.image}">
                <h2>${item.name}</h2>
                <h4>${item.price}$</h4>
                <button onclick="adjustQuantity(this, -1)"> - </button>
                <span class="quantity">0</span>
                <button onclick="adjustQuantity(this, 1)"> + </button> <br>
                <button onclick="deleteItem(this)">
                    <i class="fa-solid fa-trash"></i>
                </button>
                <button class="like-btn" onclick="toggleLike(this)">
                    <i class="fa-solid fa-heart"></i>
                </button> <br>
                <span class="total"> <span class="item-total"> ${item.initial} </span> $ </span>
            `;
            ListProductHTML.appendChild(newItem);
        });
    }
};

const initApp = async () => {
    try {
        const response = await fetch('items.json');
        const data = await response.json();
        listItems = data;
        addDataToHTML(); // Call addDataToHTML after fetching data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

initApp();


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





