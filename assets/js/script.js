$("#search-form").on("submit", function(event) {
      event.preventDefault()
      var searchInput = $("#search-input").val();

      searchInput = capitalizeFirstLetter(searchInput)

      console.log(searchInput);

      searchCountry(searchInput, 2)

  });

  function searchResults(resultObj, outputID){
    var confirmed = resultObj.All.confirmed;
    var country = resultObj.All.country

    confirmed = numberWithCommas(confirmed)

    if(outputID === 1){
        //put in first box
        var countryDiv = document.createElement('h3');
    countryDiv.textContent = country;

        var casesDiv = document.createElement('h2');
    casesDiv.textContent = confirmed;

    var casesContent = document.getElementById('ip-cases');
    

    var countryContent = document.getElementById('ip-country')
        console.log(casesContent)
        console.log(countryContent)
    //casesContent.innerHTML =" "
    //countryContent.innerHTML =" "

    casesContent.append(casesDiv);

    countryContent.append(countryDiv)
     }
    else
    {
    //put in second box
        var resultDiv = document.createElement('h3');
    resultDiv.textContent = country;

        var resultCasesDiv = document.createElement('h2');
    resultCasesDiv.textContent = confirmed;

    var resultCasesContent = document.getElementById('result-cases');


    var resultContent = document.getElementById('result-content')
        
    resultCasesContent.innerHTML =""
    resultContent.innerHTML =""

    resultCasesContent.append(resultCasesDiv);

    resultContent.append(resultDiv)
    }
    
  }

  function searchCountry(searchInput, outputID) {
      $.ajax({
          url:"https://covid-api.mmediagroup.fr/v1/cases?country=" + searchInput,
          method: "GET"
      }).then(function (apiResponse) {
          console.log(apiResponse);
          searchResults(apiResponse, outputID)
      })
  }

function showLocalCases(){
    fetch('https://api.country.is')
    .then(response => response.json())
    .then(data => searchCountry(data.country, 1));
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

showLocalCases();


