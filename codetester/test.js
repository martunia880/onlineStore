const phrases = [
    "gitara akustyczna",
    "pianino",
    "sluchawki",
    "iSzmata",
    "telefon",
    "głośnik jbl",
    "airpods",
    "mikrofala"
  ];
  
  function search() {
    const input = document.getElementById("search-input");
    const query = input.value.toLowerCase();
  
    const results = phrases.filter(phrase => phrase.toLowerCase().includes(query));
  
    const resultsDiv = document.getElementById("search-results");

    if (query === '') {
        resultsDiv.innerHTML = '';
        return;
      }
    
    resultsDiv.innerHTML = "";
  
    results.forEach(result => {
      const resultDiv = document.createElement("div");
      resultDiv.innerText = result;
      resultsDiv.appendChild(resultDiv);
    });
  }
  