//VARIABLES
//workout tab variables
const workoutTabEl = document.getElementById("workout-tab");
const workoutTabBtnsWrapper = document.getElementById("workout-tab-btns");
const archiveBtn = document.getElementById("archivebtn-wrapper");
const generateWorkoutBtn = document.getElementById("generate-workoutbtn-wrapper");
const archiveWrapperEl = document.getElementById("archive-wrapper");
const muscleGroupWrapperEl = document.getElementById("muscle-group-wrapper");
var armsArray = [];
var legsArray = [];
var chestArray = [];
var backArray = [];
var coreArray = [];

var muscleGroupArray = [];


//FUNCTIONS
function reset() { 
  armsArray = [];
  legsArray = [];
  chestArray = [];
  backArray = [];
  coreArray = [];

  muscleGroupArray=[];
};

// loading muscle groups data from api
// pushes data into createMuscleList()
function loadArchive() {
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
// When clicking 'Exercise Archve' button run loadArchive()
archiveBtn.addEventListener("click", loadArchive);

// muscle group array to generate cards
const muscleGroup = ['Arms', 'Legs', 'Chest', 'Back', 'Core']

// push data from loadArchive() to appropriate arrays
function createMuscleList(data) {

  // reset the arrays
  reset();
  
  // loop through data results to put individual muscles into groups. maybe put into loadArchive??
  for (var i = 0; i < data.results.length; i++) {

    var muscle = data.results[i];
    
    if (muscle.id == 2 || muscle.id == 1 || muscle.id == 13 || muscle.id == 5) {
      armsArray.push(muscle);
    } 
    else if (muscle.id == 11 || muscle.id == 7 || muscle.id == 8 || muscle.id == 10 || muscle.id == 15) {
      legsArray.push(muscle);
    } 
    else if (muscle.id == 12 || muscle.id == 9) {
      backArray.push(muscle);
    } 
    else if (muscle.id == 14 || muscle.id == 6 || muscle.id == 3) {
      coreArray.push(muscle);
    } 
    else {
      chestArray.push(muscle);
    };
  };

  console.log(armsArray);


  // generate cards for arms, legs, chest, back, core
  muscleGroupCards();

  

  // display muscles when group is selected
  $('#Arms-group').click(loadMuscles(armsArray.results));
  // $('#Arms-group').click(loadMuscles(armsArray));
  $('#Legs-group').click(loadLegMuscles);

  // for (i = 0; i < muscleGroup.length; i++) {
  //   $('#Arms-group').click(loadMuscles(muscleGroup[i].toLowerCase() + 'Array'));
  //   $('#Legs-group').click(loadLegMuscles);
  // }

  // for (i = 0; i < muscleGroup.length; i++) {
  //   //add event listeners for muscle group cards
  //   let muscleGroupCard = document.getElementById(muscleGroup[i] + '-group');
  //   // muscleGroupCard.addEventListener('click', loadMuscles(muscleGroup[i].toLowerCase() + 'Array'));

  //   console.log('muscle group card is ' + muscleGroup[i] + '-group');
  //   console.log('muscle group card is ' + muscleGroupCard);
  //   console.log(muscleGroup[i].toLowerCase() + 'Array');
  // }

  // loadMuscles();


  // return [
  //   armsArray,
  //   legsArray,
  //   backArray,
  //   coreArray,
  //   chestArray
  // ];

};


//generate muscle group cards
function muscleGroupCards() {
  
  for (i = 0; i < muscleGroup.length; i++) {

    var bodyCard = document.createElement("div");
    bodyCard.id = "muscle-card";
    bodyCard.classList = "muscle-card";
    bodyCard.id = muscleGroup[i] + "-group";
    
    var bodyCardName = document.createElement("h2");
    bodyCardName.classList = "card-title";
    bodyCardName.textContent = muscleGroup[i];
  
    var bodyImageContainer = document.createElement("div");
    bodyImageContainer.id = "image";
    bodyImageContainer.setAttribute(
      "style",
      "background-image: url(./assets/images/" + muscleGroup[i] + ".svg); background-repeat: no-repeat; width: 150px; height: 100px; background-size: 110px"
    );
  
    bodyCard.append(bodyCardName, bodyImageContainer);
    muscleGroupWrapperEl.appendChild(bodyCard);
    archiveWrapperEl.appendChild(muscleGroupWrapperEl);

    console.log(bodyCard);
  }
};





// generate muscles for each muscle group card
function loadMuscles(muscleArray) {

  // var muscleActualArray = JSON.parse(muscleArray);

  console.log('muscle array is ' + muscleArray);

  // console.log('actual muscle array is ' + muscleActualArray);

  muscleGroupWrapperEl.innerHTML = "";
  let bodyMuscleList = document.createElement("div");
  // bodyMuscleList.id = name + "-muscles";

  // create return button
  let returnBtn = document.createElement("button");
  returnBtn.setAttribute("type", "button");
  returnBtn.setAttribute("name", "returnbtn");
  returnBtn.id = "returnbtn";
  returnBtn.textContent = "Back";
  muscleGroupWrapperEl.appendChild(returnBtn);

 

  // loop through array to generate individual muscle cards
  // for (var i = 0; i < muscleArray.length; i++) {
  // muscleArray.forEach(function() {

  //   // create card for each muscle
  //   let muscleCard = document.createElement("div");
  //   muscleCard.id = muscleArray[i].name;
  //   muscleCard.classList = "muscle-card";
  //   //assigns muscle id to be the same as the muscle id in the api
  //   muscleCard.setAttribute("data-muscleID", muscleArray[i].id);

  //   let muscleName = document.createElement("h2");
  //   muscleName.id = "muscle-name";
  //   muscleName.textContent = muscleArray[i].name;

  //   //checks if the background body should be front or back view
  //   if (muscleArray[i].is_front === true) {
  //     var bodyImage =
  //       "https://wger.de/static/images/muscles/muscular_system_front.svg";
  //   } else {
  //     var bodyImage =
  //       "https://wger.de/static/images/muscles/muscular_system_back.svg";
  //   }

  //   //sets image url as a variable
  //   let imageLocation = muscleArray[i].image_url_secondary;

  //   let imageContainer = document.createElement("div");
  //   imageContainer.id = "image";
  //   imageContainer.setAttribute(
  //     "style",
  //     "background-image: url(https://wger.de" +
  //       imageLocation +
  //       "), url(" +
  //       bodyImage +
  //       "); width: 150px; height: 276px; background-size: 150px"
  //   );

  //   muscleCard.append(muscleName, imageContainer);
  //   bodyMuscleList.appendChild(muscleCard);
  //   muscleGroupWrapperEl.appendChild(bodyMuscleList);
  // });
}
// loadMuscles(...armsArray);





// function loadMuscles() {

//   var muscleArrays = [armsArray, legsArray, chestArray, backArray, coreArray];
//   console.log(muscleArrays);

//   for (i = 0; i < muscleArrays.length; i++) {

//     muscleGroupWrapperEl.innerHTML = "";
//     let bodyMuscleList = document.createElement("div");
//     // bodyMuscleList.id = [i] + "-muscles";
  
//     // create return button
//     let returnBtn = document.createElement("button");
//     returnBtn.setAttribute("type", "button");
//     returnBtn.setAttribute("name", "returnbtn");
//     returnBtn.id = "returnbtn";
//     returnBtn.textContent = "Back";
//     muscleGroupWrapperEl.appendChild(returnBtn);

//     let muscleArray = muscleArrays[i];
//     console.log(muscleArray[i]);

  
//     // loop through array to generate individual muscle cards
//     // for (var i = 0; i < muscleArray.length; i++) {
//     muscleArrays[i].forEach(function() {

//       // create card for each muscle
//       let muscleCard = document.createElement("div");
//       muscleCard.id = muscleArray[i].name;
//       muscleCard.classList = "muscle-card";
//       //assigns muscle id to be the same as the muscle id in the api
//       muscleCard.setAttribute("data-muscleID", muscleArray[i].id);

//       console.log(muscleCard);
  
//       let muscleName = document.createElement("h2");
//       muscleName.id = "muscle-name";
//       muscleName.textContent = muscleArray[i].name;
  
//       //checks if the background body should be front or back view
//       if (muscleArray[i].is_front === true) {
//         var bodyImage =
//           "https://wger.de/static/images/muscles/muscular_system_front.svg";
//       } else {
//         var bodyImage =
//           "https://wger.de/static/images/muscles/muscular_system_back.svg";
//       }
  
//       //sets image url as a variable
//       let imageLocation = muscleArray[i].image_url_secondary;
  
//       let imageContainer = document.createElement("div");
//       imageContainer.id = "image";
//       imageContainer.setAttribute(
//         "style",
//         "background-image: url(https://wger.de" +
//           imageLocation +
//           "), url(" +
//           bodyImage +
//           "); width: 150px; height: 276px; background-size: 150px"
//       );
  
//       muscleCard.append(muscleName, imageContainer);
//       bodyMuscleList.appendChild(muscleCard);
//       muscleGroupWrapperEl.appendChild(bodyMuscleList);
//     });
//   };
// }










//BEGIN ARM MUSCLE FUNCTIONS
function loadArmMuscles() {
  muscleGroupWrapperEl.innerHTML = "";
  var armMuscleList = document.createElement("div");
  // armMuscleList.id = "arm-muscles";

  var returnBtn = document.createElement("button");
  returnBtn.setAttribute("type", "button");
  returnBtn.setAttribute("name", "returnbtn");
  returnBtn.id = "returnbtn";
  returnBtn.textContent = "Back";
  muscleGroupWrapperEl.appendChild(returnBtn);

  //loop through array to generate individual muscle cards
  for (var i = 0; i < armsArray.length; i++) {
    var muscleCard = document.createElement("div");
    muscleCard.id = armsArray[i].name;
    muscleCard.classList = "muscle-card";
    //assigns muscle id to be the same as the muscle id in the api
    muscleCard.setAttribute("data-muscleID", armsArray[i].id);

    var muscleName = document.createElement("h2");
    muscleName.id = "muscle-name";
    muscleName.textContent = armsArray[i].name;

    //checks if the background body should be front or back view
    if (armsArray[i].is_front === true) {
      var bodyImage =
        "https://wger.de/static/images/muscles/muscular_system_front.svg";
    } else {
      var bodyImage =
        "https://wger.de/static/images/muscles/muscular_system_back.svg";
    }

    //sets image url as a variable
    var imageLocation = armsArray[i].image_url_secondary;

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
    armMuscleList.appendChild(muscleCard);
    muscleGroupWrapperEl.appendChild(armMuscleList);
  };

  // //add event listeners for individual cards to load exercise lists
  // var antDelt = document.getElementById("Anterior deltoid");
  // antDelt.addEventListener("click", loadAntDelt)
  // // var bicBrac = document.getElementById("Biceps brachii");
  // // bicBrac.addEventListener("click", loadBicBrac());
  // // var brach = document.getElementById("Brachialis");
  // // brach.addEventListener("click", loadBrach());
  // // var triBrach = document.getElementById("Triceps brachii");
  // // triBach.addEventListener("click", loadTriBach());

  // // console.log(antDelt, bicBrac, brach, triBrach);
};

function loadAntDelt() {
  var apiUrl =
    "https://wger.de/api/v2/exercise/?muscles=" +
    armsArray[1].id +
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
function loadLegMuscles() {
  muscleGroupWrapperEl.innerHTML = "";
  var legMuscleList = document.createElement("div");
  legMuscleList.id = "leg-muscles";

  var returnBtn = document.createElement("button");
  returnBtn.setAttribute("type", "button");
  returnBtn.setAttribute("name", "returnbtn");
  returnBtn.id = "returnbtn";
  returnBtn.textContent = "Back";
  muscleGroupWrapperEl.appendChild(returnBtn);

  //loop through array to generate individual muscle cards
  for (var i = 0; i < legsArray.length; i++) {
    var muscleCard = document.createElement("div");
    muscleCard.id = legsArray[i].name;
    muscleCard.classList = "muscle-card";
    //assigns muscle id to be the same as the muscle id in the api
    muscleCard.setAttribute("data-muscleID", legsArray[i].id);

    var muscleName = document.createElement("h2");
    muscleName.id = "muscle-name";
    muscleName.textContent = legsArray[i].name;

    //checks if the background body should be front or back view
    if (legsArray[i].is_front === true) {
      var bodyImage =
        "https://wger.de/static/images/muscles/muscular_system_front.svg";
    } else {
      var bodyImage =
        "https://wger.de/static/images/muscles/muscular_system_back.svg";
    }

    //sets image url as a variable
    var imageLocation = legsArray[i].image_url_secondary;

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
    legMuscleList.appendChild(muscleCard);
    muscleGroupWrapperEl.appendChild(legMuscleList);
  }

  //add event listeners for individual cards to load exercise lists
  var bicFem = document.getElementById("Biceps femoris");
  bicFem.addEventListener("click", loadBicFem);
  // var gastro = document.getElementById("Gastrocnemius");
  // gastro.addEventListener("click", loadGastro);
  // var glutMax = document.getElementById("Gluteus maximus");
  // glutMax.addEventListener("click", loadGlutmax);
  // var quadFem = document.getElementById("Quadraceps femoris");
  // quadFem.addEventListener("click", loadQuadFem);
  // var Sole = document.getElementById("Soleus");
  // quadFem.addEventListener("click", loadSole);
};

function loadBicFem() {
  var apiUrl =
    "https://wger.de/api/v2/exercise/?muscles=" +
    legsArray[1].id +
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

function displayExerciseList(data) {
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