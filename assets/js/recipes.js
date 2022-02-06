var userFormEl = document.querySelector("#user-form")
var ingredientSearchEl = document.querySelector("#ingredients");
var appKey = "&app_key=38100359b40740841a18a00837f9be68"
var appId = "&app_id=7ac48de2"


var getRecipes = function(ingredients) {

    var apiUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=" + ingredients + "&from=0&to=10" + appId + appKey;

    //sample url
    //var apiUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=7ac48de2&app_key=38100359b40740841a18a00837f9be68"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);

                if (data.hits.length == 0) {
                    alert("try again")
                }
            })
        } else {
            alert("try again")
        }
    })
    .catch(function(error) {
        alert("unable to connect to Edamam")
    })
    console.log(apiUrl);
}

var formSubmitHandler = function(event) {
    event.preventDefault();
    var ingredients = ingredientSearchEl.value.trim();

    if (ingredients) {
        getRecipes(ingredients);
        ingredientSearchEl.value = "";
    } else {
        alert("Please enter an ingredient")
    }
    console.log(ingredients);
}


userFormEl.addEventListener("submit", formSubmitHandler);