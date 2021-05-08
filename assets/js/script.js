function searchResults(resultObj){
    var confirmed = resultObj.All.confirmed;
    
    var resultDiv = document.createElement('h3');
    resultDiv.textContent = confirmed;
  
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