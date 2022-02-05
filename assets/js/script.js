//VARIABLES
//workout tab variables
const workoutTabEl = document.getElementById("workout-tab");
const workoutTabBtnsWrapper = document.getElementById("workout-tab-btns");
const archiveBtn = document.getElementById("archivebtn-wrapper");
const generateWorkoutBtn = document.getElementById("generate-workoutbtn-wrapper");
const archiveWrapperEl = document.getElementById("archive-wrapper");
const muscleGroupWrapperEl = document.getElementById("muscle-group-wrapper");
var muscleGroupArray = [];


//FUNCTIONS
var reset = function () { 
  muscleGroupArray=[];
};

var loadArchive = function () {
  reset();
  var muscleApi = "https://wger.de/api/v2/muscle/?format=json";

  //gets muscle data from api
  fetch(muscleApi)
  .then(function (response) {
      if (response.ok) {
      response.json().then(function (data) {
          createMuscleList(data);
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
  muscleGroupWrapperEl.innerHTML = "";
  reset();
  
  //generate muscle group cards
  var armCard = document.createElement("div");
  armCard.id = "muscle-card";
  armCard.classList = "muscle-card";
  armCard.id = "arm-group";
  
  var armCardName = document.createElement("h2");
  armCardName.classList = "card-title";
  armCardName.textContent = "Arms";

  var armImageContainer = document.createElement("div");
  armImageContainer.id = "arm-image";
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
  legImageContainer.id = "leg-image";
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
  chestImageContainer.id = "chest-image";
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
  backImageContainer.id = "back-image";
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
  coreImageContainer.id = "core-image";
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
  
  //add event listeners for muscle group cards
  muscleGroupWrapperEl.addEventListener("click", (event) => {
    if (event.target.id === "arm-image") {
      console.log("ARM CLICK");
      for (var i = 0; i < data.results.length; i++) {
        var muscle = data.results[i];

        if (muscle.id == 2 || muscle.id == 1 || muscle.id == 13 || muscle.id == 5) {
          muscleGroupArray.push(muscle);
          loadIndMuscles(muscleGroupArray);
        };
      };
    } else if (event.target.id === "leg-image") {
      console.log("LEG CLICK");
      for (var i = 0; i < data.results.length; i++) {
        var muscle = data.results[i];

        if (muscle.id == 11 || muscle.id == 7 || muscle.id == 8 || muscle.id == 10 || muscle.id == 15) {
          muscleGroupArray.push(muscle);
          loadIndMuscles(muscleGroupArray);
        };
      };
    } else if (event.target.id === "chest-image") {
      console.log("CHEST CLICK");
      for (var i = 0; i < data.results.length; i++) {
        var muscle = data.results[i];

        if (muscle.id == 4) {
          muscleGroupArray.push(muscle);
          loadIndMuscles(muscleGroupArray);
        };
      };
    } else if (event.target.id === "back-image") {
      console.log("BACK CLICK");
      for (var i = 0; i < data.results.length; i++) {
        var muscle = data.results[i];

        if (muscle.id == 12 || muscle.id == 9) {
          muscleGroupArray.push(muscle);
          loadIndMuscles(muscleGroupArray);
        };
      };
    } else if (event.target.id === "core-image"){
      console.log("CORE CLICK");
      for (var i = 0; i < data.results.length; i++) {
        var muscle = data.results[i];

        if (muscle.id == 14 || muscle.id == 6 || muscle.id == 3) {
          muscleGroupArray.push(muscle);
          loadIndMuscles(muscleGroupArray);
        };
      };
    }
  });
  console.log(muscleGroupArray)
};

var loadIndMuscles = function (muscleGroupArray) {
  muscleGroupWrapperEl.innerHTML = "";
  var muscleList = document.createElement("div");
  muscleList.id = "muscles";

  var returnBtn = document.createElement("button");
  returnBtn.setAttribute("type", "button");
  returnBtn.setAttribute("name", "returnbtn");
  returnBtn.id = "returnbtn";
  returnBtn.textContent = "Back";
  muscleGroupWrapperEl.appendChild(returnBtn);

  //loop through array to generate individual muscle cards
  for (var i = 0; i < muscleGroupArray.length; i++) {
    var muscleCard = document.createElement("div");
    muscleCard.id = muscleGroupArray[i].name;
    muscleCard.classList = "muscle-card";
    //assigns muscle id to be the same as the muscle id in the api
    muscleCard.setAttribute("data-muscleID", muscleGroupArray[i].id);

    var muscleName = document.createElement("h2");
    muscleName.id = "muscle-name";
    muscleName.textContent = muscleGroupArray[i].name;

    //checks if the background body should be front or back view
    if (muscleGroupArray[i].is_front === true) {
      var bodyImage =
        "https://wger.de/static/images/muscles/muscular_system_front.svg";
    } else {
      var bodyImage =
        "https://wger.de/static/images/muscles/muscular_system_back.svg";
    }

    //sets image url as a variable
    var imageLocation = muscleGroupArray[i].image_url_secondary;

    var imageContainer = document.createElement("div");
    imageContainer.id = "image";
    imageContainer.setAttribute(
      "style",
      "background-image: url(https://wger.de" +
        imageLocation +
        "), url(" +
        bodyImage +
        "); width: 150px; height: 276px; background-size: 150px"
    );

    muscleCard.appendChild(muscleName);
    muscleCard.appendChild(imageContainer);
    muscleList.appendChild(muscleCard);
    muscleGroupWrapperEl.appendChild(muscleList);
  }
};;



//BEGIN ARM MUSCLE FUNCTIONS
// var loadArmMuscles = function () {
  // muscleGroupWrapperEl.innerHTML = "";
  // var armMuscleList = document.createElement("div");
  // armMuscleList.id = "arm-muscles";

  // var returnBtn = document.createElement("button");
  // returnBtn.setAttribute("type", "button");
  // returnBtn.setAttribute("name", "returnbtn");
  // returnBtn.id = "returnbtn";
  // returnBtn.textContent = "Back";
  // muscleGroupWrapperEl.appendChild(returnBtn);

  // //loop through array to generate individual muscle cards
  // for (var i = 0; i < armGroupArray.length; i++) {
  //   var muscleCard = document.createElement("div");
  //   muscleCard.id = armGroupArray[i].name;
  //   muscleCard.classList = "muscle-card";
  //   //assigns muscle id to be the same as the muscle id in the api
  //   muscleCard.setAttribute("data-muscleID", armGroupArray[i].id);

  //   var muscleName = document.createElement("h2");
  //   muscleName.id = "muscle-name";
  //   muscleName.textContent = armGroupArray[i].name;

  //   //checks if the background body should be front or back view
  //   if (armGroupArray[i].is_front === true) {
  //     var bodyImage =
  //       "https://wger.de/static/images/muscles/muscular_system_front.svg";
  //   } else {
  //     var bodyImage =
  //       "https://wger.de/static/images/muscles/muscular_system_back.svg";
  //   }

  //   //sets image url as a variable
  //   var imageLocation = armGroupArray[i].image_url_secondary;

  //   var imageContainer = document.createElement("div");
  //   imageContainer.id = "image";
  //   imageContainer.setAttribute(
  //     "style",
  //     "background-image: url(https://wger.de" +
  //       imageLocation +
  //       "), url(" +
  //       bodyImage +
  //       "); width: 150px; height: 276px; background-size: 150px"
  //   );

  //   muscleCard.appendChild(muscleName);
  //   muscleCard.appendChild(imageContainer);
  //   armMuscleList.appendChild(muscleCard);
  //   muscleGroupWrapperEl.appendChild(armMuscleList);
  // };

//   //add event listeners for individual cards to load exercise lists
//   var antDelt = document.getElementById("Anterior deltoid");
//   antDelt.addEventListener("click", loadAntDelt)
//   // var bicBrac = document.getElementById("Biceps brachii");
//   // bicBrac.addEventListener("click", loadBicBrac());
//   // var brach = document.getElementById("Brachialis");
//   // brach.addEventListener("click", loadBrach());
//   // var triBrach = document.getElementById("Triceps brachii");
//   // triBach.addEventListener("click", loadTriBach());

//   // console.log(antDelt, bicBrac, brach, triBrach);
// };

var loadAntDelt = function () {
  var apiUrl =
    "https://wger.de/api/v2/exercise/?muscles=" +
    armGroupArray[1].id +
    "&language=2&format=json";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayExerciseList(data);
      });
    }
  });
};

//BEGIN LEG MUSCLE FUNCTIONS
// var loadLegMuscles = function () {
//   muscleGroupWrapperEl.innerHTML = "";
//   var legMuscleList = document.createElement("div");
//   legMuscleList.id = "leg-muscles";

//   var returnBtn = document.createElement("button");
//   returnBtn.setAttribute("type", "button");
//   returnBtn.setAttribute("name", "returnbtn");
//   returnBtn.id = "returnbtn";
//   returnBtn.textContent = "Back";
//   muscleGroupWrapperEl.appendChild(returnBtn);

//   //loop through array to generate individual muscle cards
//   for (var i = 0; i < legGroupArray.length; i++) {
//     var muscleCard = document.createElement("div");
//     muscleCard.id = legGroupArray[i].name;
//     muscleCard.classList = "muscle-card";
//     //assigns muscle id to be the same as the muscle id in the api
//     muscleCard.setAttribute("data-muscleID", legGroupArray[i].id);

//     var muscleName = document.createElement("h2");
//     muscleName.id = "muscle-name";
//     muscleName.textContent = legGroupArray[i].name;

//     //checks if the background body should be front or back view
//     if (legGroupArray[i].is_front === true) {
//       var bodyImage =
//         "https://wger.de/static/images/muscles/muscular_system_front.svg";
//     } else {
//       var bodyImage =
//         "https://wger.de/static/images/muscles/muscular_system_back.svg";
//     }

//     //sets image url as a variable
//     var imageLocation = legGroupArray[i].image_url_secondary;

//     var imageContainer = document.createElement("div");
//     imageContainer.id = "image";
//     imageContainer.setAttribute(
//       "style",
//       "background-image: url(https://wger.de" +
//         imageLocation +
//         "), url(" +
//         bodyImage +
//         "); width: 150px; height: 276px; background-size: 150px"
//     );

//     muscleCard.appendChild(muscleName);
//     muscleCard.appendChild(imageContainer);
//     legMuscleList.appendChild(muscleCard);
//     muscleGroupWrapperEl.appendChild(legMuscleList);
//   }

//   //add event listeners for individual cards to load exercise lists
//   var bicFem = document.getElementById("Biceps femoris");
//   bicFem.addEventListener("click", loadBicFem);
//   // var gastro = document.getElementById("Gastrocnemius");
//   // gastro.addEventListener("click", loadGastro);
//   // var glutMax = document.getElementById("Gluteus maximus");
//   // glutMax.addEventListener("click", loadGlutmax);
//   // var quadFem = document.getElementById("Quadraceps femoris");
//   // quadFem.addEventListener("click", loadQuadFem);
//   // var Sole = document.getElementById("Soleus");
//   // quadFem.addEventListener("click", loadSole);
// };

var loadBicFem = function () {
  var apiUrl =
    "https://wger.de/api/v2/exercise/?muscles=" +
    legGroupArray[1].id +
    "&language=2&format=json";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayExerciseList(data);
      });
    }
  });
};

var displayExerciseList = function (data) {
  muscleGroupWrapperEl.innerHTML = "";
  for (var i = 0; i < data.results.length; i++) {
    var indExerciseWrapper = document.createElement("div");
    indExerciseWrapper.id = "ind-exercise-wrapper";
    
    var exerciseTitle = document.createElement("h2");
    exerciseTitle.id = "exercise-title";
    exerciseTitle.textContent = data.results[i].name;
  
    indExerciseWrapper.appendChild(exerciseTitle);
    muscleGroupWrapperEl.appendChild(indExerciseWrapper);
  };
};






//EVENT LISTENERS
archiveBtn.addEventListener("click", loadArchive);
