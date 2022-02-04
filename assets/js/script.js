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
    
    
    //loops through response data to display name and image of muscles
    // var muscleCard = document.createElement("div");
    // muscleCard.id = "muscle-card";
    // muscleCard.classList = "muscle-card";
    //assigns muscle id to be the same as the muscle id in the api
    //muscleCard.setAttribute("data-muscleID", data.results[i].id);
  };
  console.log(armGroupArray, legGroupArray, chestArray, backArray, coreArray);
  
};






//EVENT LISTENERS
archiveBtn.addEventListener("click", loadArchive);