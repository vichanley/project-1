//VARIABLES
//workout tab variables
const workoutTabEl = document.getElementById("workout-tab");
const workoutTabBtnsWrapper = document.getElementById("workout-tab-btns");
const archiveBtn = document.getElementById("archivebtn-wrapper");
const generateWorkoutBtn = document.getElementById("generate-workoutbtn-wrapper");
const archiveWrapperEl = document.getElementById("archive-wrapper");
var armGroupArray = [];
var legGroupArray = [];
var chestArray = [];
var backArray = [];
var coreArray = [];


//FUNCTIONS
var reset = function () { 
  armGroupArray = [];
  legGroupArray = [];
  chestArray = [];
  backArray = [];
  coreArray = [];
};

var loadArchive = function () {
  var muscleApi = "https://wger.de/api/v2/muscle/?format=json";

  //gets muscle data from api
  fetch(muscleApi)
  .then(function (response) {
      if (response.ok) {
      response.json().then(function (data) {
          createMuscleList(data);
          console.log("working")
          console.log(data);
      });
      } else {
      alert("Error: Something Went Wrong");
      }
  })
  .catch(function (error) {
      alert("Unable to Connect to WGER");
  });
};

var createMuscleList = function (data) {
  reset();

  var muscleGroupWrapperEl = document.createElement("div");
  muscleGroupWrapperEl.id = "muscle-group-wrapper";

  //loop through data results to put individual muscles into groups
  for (var i = 0; i < data.results.length; i++) {
    var muscle = data.results[i];
    
    if (muscle.id == 2 || muscle.id == 1 || muscle.id == 13 || muscle.id == 5) {
      armGroupArray.push(muscle);
    } else if (muscle.id == 11 || muscle.id == 7 || muscle.id == 8 || muscle.id == 10 || muscle.id == 15) {
      legGroupArray.push(muscle);
    } else if (muscle.id == 12 || muscle.id == 9) {
      backArray.push(muscle);
    } else if (muscle.id == 14 || muscle.id == 6 || muscle.id == 3) {
      coreArray.push(muscle);
    } else {
      chestArray.push(muscle);
    };
  };

  var armCard = document.createElement("div");
  armCard.id = "muscle-card";
  armCard.classList = "muscle-card";
  armCard.id = "arm-group";
  
  var armCardName = document.createElement("h2");
  armCardName.classList = "card-title";
  armCardName.textContent = "Arms";

  var armImageContainer = document.createElement("div");
  armImageContainer.id = "image";
  armImageContainer.setAttribute(
    "style",
    "background-image: url(./assets/images/arms.svg); background-repeat: no-repeat; width: 150px; height: 100px; background-size: 110px"
  );

  armCard.appendChild(armCardName);
  armCard.appendChild(armImageContainer);

  var legCard = document.createElement("div");
  legCard.id = "muscle-card";
  legCard.classList = "muscle-card";
  legCard.id = "leg-group";
  
  var legCardName = document.createElement("h2");
  legCardName.classList = "card-title";
  legCardName.textContent = "Legs";

  var legImageContainer = document.createElement("div");
  legImageContainer.id = "image";
  legImageContainer.setAttribute(
    "style",
    "background-image: url(./assets/images/legs.svg); background-repeat: no-repeat; width: 150px; height: 100px; background-size: 110px"
  );

  legCard.appendChild(legCardName);
  legCard.appendChild(legImageContainer);

  var chestCard = document.createElement("div");
  chestCard.id = "muscle-card";
  chestCard.classList = "muscle-card";
  chestCard.id = "chest-group";
  
  var chestCardName = document.createElement("h2");
  chestCardName.classList = "card-title";
  chestCardName.textContent = "Chest";

  var chestImageContainer = document.createElement("div");
  chestImageContainer.id = "image";
  chestImageContainer.setAttribute(
    "style",
    "background-image: url(./assets/images/chest.svg); background-repeat: no-repeat; width: 150px; height: 100px; background-size: 110px"
  );

  chestCard.appendChild(chestCardName);
  chestCard.appendChild(chestImageContainer);

  var backCard = document.createElement("div");
  backCard.id = "muscle-card";
  backCard.classList = "muscle-card";
  backCard.id = "back-group";
  
  var backCardName = document.createElement("h2");
  backCardName.classList = "card-title";
  backCardName.textContent = "Back";

  var backImageContainer = document.createElement("div");
  backImageContainer.id = "image";
  backImageContainer.setAttribute(
    "style",
    "background-image: url(./assets/images/back.svg); background-repeat: no-repeat; width: 150px; height: 100px; background-size: 110px"
  );

  backCard.appendChild(backCardName);
  backCard.appendChild(backImageContainer);

  var coreCard = document.createElement("div");
  coreCard.id = "muscle-card";
  coreCard.classList = "muscle-card";
  coreCard.id = "core-group";

  var coreCardName = document.createElement("h2");
  coreCardName.classList = "card-title";
  coreCardName.textContent = "Core";

  var coreImageContainer = document.createElement("div");
  coreImageContainer.id = "image";
  coreImageContainer.setAttribute(
    "style",
    "background-image: url(./assets/images/core.svg); background-repeat: no-repeat; width: 150px; height: 100px; background-size: 110px"
  );

  coreCard.appendChild(coreCardName);
  coreCard.appendChild(coreImageContainer);


    
    muscleGroupWrapperEl.appendChild(armCard);
    muscleGroupWrapperEl.appendChild(legCard);
    muscleGroupWrapperEl.appendChild(chestCard);
    muscleGroupWrapperEl.appendChild(backCard);
    muscleGroupWrapperEl.appendChild(coreCard);
    archiveWrapperEl.appendChild(muscleGroupWrapperEl);
    
    
    //loops through response data to display name and image of muscles
    //assigns muscle id to be the same as the muscle id in the api
    //muscleCard.setAttribute("data-muscleID", data.results[i].id);
  console.log(armGroupArray, legGroupArray, chestArray, backArray, coreArray);
  
};






//EVENT LISTENERS
archiveBtn.addEventListener("click", loadArchive);