
  
  $("#search-form").on("submit", function(event) {
      event.preventDefault()
      var searchInput = $("#search-input").val();

      console.log(searchInput);

      searchCountry(searchInput, 2)

  });

  function searchResults(resultObj, outputID){
    var confirmed = resultObj.All.confirmed;
    var country = resultObj.All.country

    if(outputID === 1){
        //put in first box
        var resultDiv = document.createElement('h3');
    resultDiv.textContent = country +" = " + confirmed;
    var resultContent = document.getElementById('ip-content');
    resultContent.innerHTML =""
    resultContent.append(resultDiv);
    }
    else
    {
    //put in second box
    var resultDiv = document.createElement('h3');
    resultDiv.textContent = country +" = " + confirmed;
    var resultContent = document.getElementById('result-content');
    resultContent.innerHTML =""
    resultContent.append(resultDiv);
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

showLocalCases();


