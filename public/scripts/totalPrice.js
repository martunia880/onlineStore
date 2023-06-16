const allPriceTab = document.getElementsByClassName("multiply-price-and-quantity");
const deliveryPrice = 6; // przykładowy koszt dostawy
let subtotal = 0;
for (let index = 0; index < allPriceTab.length; index++) {
    subtotal = parseFloat(allPriceTab[index].innerHTML) + subtotal;
}

document.getElementById("subtotal").innerHTML = subtotal;
document.getElementById("deliveryPrice").innerHTML = deliveryPrice;
document.getElementById("total").innerHTML = subtotal + deliveryPrice;

if (subtotal == 0) {
    document.getElementById("deliveryPrice").innerHTML = 0;
    document.getElementById("total").innerHTML = 0;
}





