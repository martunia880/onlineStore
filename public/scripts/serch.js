// const Product = require("../../database/models/product");
// const products = await Product.find().exec();	
// const phrases = products.map(product => product.name);
// console.log(phrases);

// const phrases0 = [
//   "gitara akustyczna",
//   "pianino",
//   "sluchawki",
//   "iSzmata",
//   "telefon",
//   "głośnik",
//   "airpods",
//   "mikrofala"
//   ];
  
  function search(products) {
    const input = document.getElementById("input-serch");
    const query = input.value.toLowerCase();
    products = JSON.parse(products);
    console.log(products);

    const phrases = products.map(product => product.name);
    console.log(phrases);
    // console.log(phrases);
    // console.log(phrases0);
    // console.log(typeof phrases);
    // console.log(typeof phrases0);
    //const phrasesArray = phrases.split(",")

  
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
      // console.log(result);
      // console.log(typeof result);

      const product = products.find(product => product.name === result);

      const resultDiv = document.createElement("div");

      resultDiv.setAttribute("id", result);

      resultDiv.innerText = result;

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/product';
      
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'product';
        input.value = JSON.stringify(product);
      
        form.appendChild(input);
        resultDiv.appendChild(form);
        

      resultDiv.onclick = () => {
        form.submit()
      }

      resultsDiv.appendChild(resultDiv);
    });
    console.log(results.length);

    if (results.length > 0) {
        resultsContainer.style.display = "block"; // wyświetlanie pojemnika na wyniki
        console.log(results.length);
    } 


  }
  