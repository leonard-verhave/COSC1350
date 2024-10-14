/*
Author: leonard verhave
Filename: pizzaOrder
data: 10-10-24
*/
// prices for sizes, crusts, and toppings \\
const sizePrices = {
    small: 5.00,
    medium: 9.00,
    large: 12.00
};

const crustPrices = {
    thin: 2.00,
    thick: 4.00,
    stuffed: 5.00
};

const toppingPrices = {
    pepperoni: 2.00,
    mushrooms: 1.50,
    sausage: 2.50,
    bacon: 2.00,
    extraCheese: 1.75
};

// calculate the total price \\
function calculateTotal() {
    let total = 0;

    const size = document.getElementById("size").value;
    const crust = document.getElementById("crust").value;

    if (size) total += sizePrices[size];
    if (crust) total += crustPrices[crust];

    const selectedToppings = document.querySelectorAll('input[name="toppings"]:checked');
    selectedToppings.forEach(topping => {
        total += parseFloat(topping.getAttribute("data-price"));
    });

    // Update the total price in the form \\
    document.getElementById("totalPrice").textContent = `Total Price: $${total.toFixed(2)}`;
}

document.getElementById("size").addEventListener("change", calculateTotal);
document.getElementById("crust").addEventListener("change", calculateTotal);
document.querySelectorAll('input[name="toppings"]').forEach(topping => {
    topping.addEventListener("change", calculateTotal);
});


document.getElementById("pizzaForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const name = document.getElementById("name").value.trim();
    const size = document.getElementById("size").value;
    const crust = document.getElementById("crust").value;
    const pickupTime = document.getElementById("pickupTime").value;
    const toppings = document.querySelectorAll('input[name="toppings"]:checked');

    if (!name) {
        alert("Please enter your name.");
        return;
    }
    
    if (!size) {
        alert("Please select a pizza size.");
        return;
    }
    
    if (!crust) {
        alert("Please select a pizza crust.");
        return;
    }
    
    if (!pickupTime) {
        alert("Please select a pickup time.");
        return;
    }


    if (toppings.length === 0) {
        alert("Please select at least one topping.");
        return;
    }

    alert("Order placed successfully!");

    // Calculate final total

    let total = sizePrices[size] + crustPrices[crust];
    toppings.forEach(topping => {
        total += parseFloat(topping.getAttribute("data-price"));
    });

    alert(`Order placed successfully!\nName: ${name}\nSize: ${size}\nCrust: ${crust}\nToppings: ${Array.from(toppings).map(t => t.value).join(", ")}\nPickup Time: ${pickupTime}\nTotal Price: $${total.toFixed(2)}`);
});


