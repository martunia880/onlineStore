function updateQuantity(index,productID) {
    const selectElement = document.getElementById("order-info-element-" + index);
    const quantity = selectElement.value;
    const productId = productID;
    console.log(quantity);
    console.log(productId);

    // Wywołaj żądanie AJAX do serwera
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/updateQuantity", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log("Wartość została zaktualizowana w bazie danych.");
      }
    };
    xhr.send("productId=" + encodeURIComponent(productId) + "&quantity=" + encodeURIComponent(quantity));
    setTimeout(function() {
        window.location.reload();
      }, 1000); //setTimeout bo funkcja asynchroniczna
    }

function removeProduct(productID) {
    const productId = productID;
    console.log(productId);

    // Wywołaj żądanie AJAX do serwera
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/removeProduct", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log("Produkt został usunięty z koszyka");
      }
    };
    xhr.send("productId=" + encodeURIComponent(productId));
    setTimeout(function() {
        window.location.reload();
      }, 1000);  
} //setTimeout bo funkcja asynchroniczna
