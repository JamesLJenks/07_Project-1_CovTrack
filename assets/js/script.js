function searchResults(resultObj){
    var confirmed = resultObj.All.confirmed;
    var country = resultObj.All.country

    var resultDiv = document.createElement('h3');
    resultDiv.textContent = country +" = " + confirmed;
  
    var resultContent = document.getElementById("result-content");
    resultContent.append(resultDiv);
  }
  
  $("#search-form").on("submit", function(event) {
      event.preventDefault()
      var searchInput = $("#search-input").val();

      console.log(searchInput);

      searchCountry(searchInput)

  });

  function searchCountry(searchInput) {
      $.ajax({
          url:"https://covid-api.mmediagroup.fr/v1/cases?country=" + searchInput,
          method: "GET"
      }).then(function (apiResponse) {
          console.log(apiResponse);
          searchResults(apiResponse)
      })
  }

  
fetch('https://api.country.is/1.179.112.0')
.then(response => response.json())
.then(data => console.log(data.country));



