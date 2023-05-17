const phrases = [
    "gitara akustyczna",
    "pianino",
    "sluchawki",
    "iSzmata",
    "telefon",
    "głośnik",
    "airpods",
    "mikrofala"
  ];
  
  function search() {
    const input = document.getElementById("input-serch");
    const query = input.value.toLowerCase();
  
    const results = phrases.filter(phrase => phrase.toLowerCase().includes(query));
  
    const resultsDiv = document.getElementById("search-results");
    const resultsContainer = document.getElementById("results-container");

    


    if (query === '') {
        resultsDiv.innerHTML = '';
        resultsContainer.style.display = 'none';
        return;
      }
    
    resultsDiv.innerHTML = "";
    
  //tworezenie resultatów i nadawanie im róznych id
    results.forEach(result => {
      const resultDiv = document.createElement("div");

      resultDiv.setAttribute("id", result);

      resultDiv.innerText = result;

      resultDiv.onclick = () => {
        redirectToProduct(result);
      }

      resultsDiv.appendChild(resultDiv);
    });
    console.log(results.length);

    if (results.length > 0) {
        resultsContainer.style.display = "block"; // wyświetlanie pojemnika na wyniki
        console.log(results.length);
    } 

    function redirectToProduct() {
        // Wykonaj przekierowanie na stronę z danym produktem, np.:
       // window.location.href = `https://example.com/products/${productId}`;
        window.location.href='product.html';
      }

  }
  