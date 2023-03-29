function toggleInput() {
    var inputDiv = document.getElementById("input-serch");
    if (inputDiv.style.display === "none") {
        showInput();
    } else {
        hideInput();
    }
}

function showInput() {
    document.getElementById("input-serch").style.display = "block";
}

function hideInput() {
    document.getElementById("input-serch").style.display = "none";
} 

