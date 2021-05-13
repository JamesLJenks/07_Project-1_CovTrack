//This function uses the country that was typed into the search box and uses that info to ask the API for covid cases in that country.
$("#search-form").on("submit", function(event) {
      event.preventDefault()

      var searchInput = $("#search-input").val();
        
      searchInput = capitalizeFirstLetter(searchInput) //calling the function to set the proper format four country names in the API

      console.log(searchInput);

      //Save country to local storage
      saveData(searchInput);

      searchCountry(searchInput, 2)//telling this function to append this info into box 2(else statement)

  });

//This function uses the API info and appends it to the HTML boxes. It also deciphers which box to append information into. 
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
//this function calls the API with either the ip address info or the searched country info
  function searchCountry(searchInput, outputID) { 
      $.ajax({
          url:"https://covid-api.mmediagroup.fr/v1/cases?country=" + searchInput,
          method: "GET"
      }).then(function (apiResponse) {
          console.log(apiResponse);
          searchResults(apiResponse, outputID)
      })
  }
//This function runs on page load, it calls to an API that uses your ip location and returns a country.
function showLocalCases(){
    fetch('https://api.country.is')
    .then(response => response.json())
    .then(data => searchCountry(data.country, 1));//telling this to append info into box 1 on the page
}
//Function to add commas to our case numbers returned from API
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//Function to capitalize the first letter in the search box, in case the user types all lowercase.
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //var save_button = document.getElementById('search-button')
//save_button.onsubmit = saveData;

function saveData(country){
  localStorage.setItem("lastCountrySaved", country);
}

function retrieveLastCountry(){
    //Logic here gets lastCountrySaved if it exists in local storage
    var lastCountrySaved = localStorage.getItem("lastCountrySaved");
    console.log(lastCountrySaved)
    if (lastCountrySaved) {
    searchCountry(lastCountrySaved, 2)
    }
    //call the api with the value
    //searchCountry(nameOfCountry, which box #1 or #2)
    
}
retrieveLastCountry()
showLocalCases();


