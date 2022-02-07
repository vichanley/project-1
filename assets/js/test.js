//VARIABLES
//workout tab variables
const workoutTabEl = document.getElementById("workout-tab");
const generateWorkoutBtn = document.getElementById("generate-workout-btn");
const archiveWrapperEl = document.getElementById("archive-wrapper");
const generateWorkoutWrapperEl = document.getElementById(
  "generate-workout-wrapper"
);
const workoutDropdownEl = document.getElementById("workout-list");
const muscleGroupWrapperEl = document.getElementById("muscle-group-wrapper");
const exerciseListWrapperEl = document.getElementById("exercise-wrapper");
const individualMusclesWrapperEl = document.getElementById(
  "individual-muscle-wrapper"
);
var muscleGroupArray = [];
const muscleGroup = ["Arms", "Legs", "Chest", "Back", "Core"];
var muscleGroupCardArray = [];

//FUNCTIONS
var reset = function () {
  muscleGroupArray = [];
};

var loadArchive = function () {
  //clear values
  generateWorkoutWrapperEl.removeAttribute("style");
  reset();

  var muscleApi = "https://wger.de/api/v2/muscle/?format=json";

  //gets muscle data from api
  fetch(muscleApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          muscleGroupCardArray.push(data);
          muscleGroupCards(data);
        });
      } else {
        alert("Error: Something Went Wrong");
      }
    })
    .catch(function (error) {
      alert("Unable to Connect to WGER");
    });
};

//generate muscle group cards
function muscleGroupCards() {
  //clear values
  muscleGroupWrapperEl.innerHTML = "";
  exerciseListWrapperEl.innerHTML = "";
  individualMusclesWrapperEl.innerHTML = "";
  generateWorkoutWrapperEl.removeAttribute("style");
  reset();

  for (i = 0; i < muscleGroup.length; i++) {
    var bodyCard = document.createElement("div");
    bodyCard.id = "muscle-card";
    bodyCard.classList = "muscle-card";
    bodyCard.id = muscleGroup[i] + "-group";

    var bodyCardName = document.createElement("h2");
    bodyCardName.classList = "card-title";
    bodyCardName.textContent = muscleGroup[i];

    var bodyImageContainer = document.createElement("div");
    bodyImageContainer.id = muscleGroup[i] + "-image";
    bodyImageContainer.setAttribute(
      "style",
      "background-image: url(./assets/images/" +
        muscleGroup[i] +
        ".svg); background-repeat: no-repeat; width: 150px; height: 100px; background-size: 110px"
    );

    var moreInfoBtn = document.createElement("div");
    moreInfoBtn.id = muscleGroup[i] + "-info";
    moreInfoBtn.setAttribute(
      "style",
      "background-image: url(./assets/images/info-icon.svg);width: 20px; height: 20px; background-size: 20px"
    );

    bodyCard.append(bodyCardName, bodyImageContainer, moreInfoBtn);
    muscleGroupWrapperEl.appendChild(bodyCard);
    archiveWrapperEl.appendChild(muscleGroupWrapperEl);
  }
}

var loadIndMuscles = function () {
  //clear values
  muscleGroupWrapperEl.innerHTML = "";
  exerciseListWrapperEl.innerHTML = "";
  individualMusclesWrapperEl.innerHTML = "";
  generateWorkoutWrapperEl.setAttribute("style", "display: none");

  var muscleList = document.createElement("div");
  muscleList.id = "muscles";

  var returnBtn = document.createElement("button");
  returnBtn.setAttribute("type", "button");
  returnBtn.setAttribute("name", "returnbtn");
  returnBtn.id = "returnbtn-ind-muscles";
  returnBtn.textContent = "Back";
  individualMusclesWrapperEl.appendChild(returnBtn);

  //loop through array to generate individual muscle cards
  for (var i = 0; i < muscleGroupArray.length; i++) {
    var muscleCard = document.createElement("div");
    muscleCard.id = muscleGroupArray[i].name;
    muscleCard.classList = "muscle-card";
    //assigns muscle id to be the same as the muscle id in the api
    muscleCard.setAttribute("data-muscleID", muscleGroupArray[i].id);

    var muscleName = document.createElement("h2");
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
    imageContainer.id = muscleGroupArray[i].id;
    imageContainer.classList = "muscle-image";
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
    individualMusclesWrapperEl.appendChild(muscleList);
    };
};

var loadExerciseList = function (muscleID) {
  muscleGroupWrapperEl.innerHTML = "";
  exerciseListWrapperEl.innerHTML = "";
  individualMusclesWrapperEl.innerHTML = "";
  var apiUrl =
    "https://wger.de/api/v2/exercise/?muscles=" +
    muscleID +
    "&language=2&format=json";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayExerciseList(data);
      });
    }
  });
};

//ASYNC FETCH FUNCTIONS IN ORDER TO GET RANDOMIZED WORKOUTS FOR MUSCLE GROUPS
async function fetchArms() {
  var data = await Promise.all([
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=2&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=1&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=13&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=5&language=2&format=json"
    ).then((response) => response.json()),
  ]);
  displayRandomWorkout(data);
}

async function fetchLegs() {
  var data = await Promise.all([
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=11&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=7&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=8&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=10&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=15&language=2&format=json"
    ).then((response) => response.json()),
  ]);
  displayRandomWorkout(data);
}

async function fetchChest() {
  var data = await Promise.all([
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=4&language=2&format=json"
    ).then((response) => response.json()),
  ]);
  displayRandomWorkout(data);
}

async function fetchBack() {
  var data = await Promise.all([
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=12&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=9&language=2&format=json"
    ).then((response) => response.json()),
  ]);
  displayRandomWorkout(data);
}

async function fetchCore() {
  var data = await Promise.all([
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=14&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=6&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=3&language=2&format=json"
    ).then((response) => response.json()),
  ]);
  displayRandomWorkout(data);
}

var displayRandomWorkout = function (data) {
  //TO DO: randomize workouts
  console.log(data);
  muscleGroupWrapperEl.innerHTML = "";
  exerciseListWrapperEl.innerHTML = "";
  individualMusclesWrapperEl.innerHTML = "";
  generateWorkoutWrapperEl.setAttribute("style", "display: none");

  var returnBtn = document.createElement("button");
  returnBtn.setAttribute("type", "button");
  returnBtn.setAttribute("name", "returnbtn");
  returnBtn.id = "returnbtn-random";
  returnBtn.textContent = "Back";
  individualMusclesWrapperEl.appendChild(returnBtn);
};

var randomizeWorkout = function () {
  //get information from dropdown
  var chosenDay =
    workoutDropdownEl.options[workoutDropdownEl.selectedIndex].value;
  debugger;

  if (chosenDay === "Arms") {
    fetchArms();
  } else if (chosenDay === "Legs") {
    fetchLegs();
  } else if (chosenDay === "Chest") {
    fetchChest();
  } else if (chosenDay === "Back") {
    fetchBack();
  } else if (chosenDay === "Core") {
    fetchCore();
  } else {
    //TO DO: NEEDS TO BE A MODAL
    alert("Please Select Muscle Group");
  }
};

var displayExerciseList = function (data) {
  //TO DO: add exercise detail, title
  console.log(data);
  console.log(muscleGroupArray);
  muscleGroupWrapperEl.innerHTML = "";
  exerciseListWrapperEl.innerHTML = "";
  individualMusclesWrapperEl.innerHTML = "";

  for (var i = 0; i < data.results.length; i++) {
    var indExerciseWrapper = document.createElement("div");
    indExerciseWrapper.id = data.results[i].id;

    var exerciseTitle = document.createElement("h2");
    exerciseTitle.id = "exercise-title";
    exerciseTitle.textContent = data.results[i].name;

    indExerciseWrapper.appendChild(exerciseTitle);
    exerciseListWrapperEl.appendChild(indExerciseWrapper);
  }

  var returnBtn = document.createElement("button");
  returnBtn.setAttribute("type", "button");
  returnBtn.setAttribute("name", "returnbtn");
  returnBtn.id = "returnbtn-exercise";
  returnBtn.textContent = "Back";
  exerciseListWrapperEl.appendChild(returnBtn);
};

//EVENT LISTENERS
//TO DO: need to add one for when workout tab is clicked to call loadArchive
generateWorkoutBtn.addEventListener("click", randomizeWorkout);
//listeners for dynamically generated elements
document
  .querySelector("#archive-wrapper")
  .addEventListener("click", function (event) {
    if (
      event.target.matches("#returnbtn-ind-muscles") ||
      event.target.matches("#returnbtn-random")
    ) {
      muscleGroupCards(muscleGroupCardArray);
    }
  });
document
  .querySelector("#archive-wrapper")
  .addEventListener("click", function (event) {
    if (event.target.matches("#returnbtn-exercise")) {
      loadIndMuscles();
    }
  });
document
  .querySelector("#archive-wrapper")
  .addEventListener("click", function (event) {
    if (event.target.matches(".muscle-image")) {
      var muscleID = event.target.id;
      loadExerciseList(muscleID);
    }
  });
document
  .querySelector("#archive-wrapper")
  .addEventListener("click", function (event) {
    if (event.target.id === "Arms-info") {
      for (var i = 0; i < muscleGroupCardArray[0].results.length; i++) {
        var muscle = muscleGroupCardArray[0].results[i];

        if (
          muscle.id == 2 ||
          muscle.id == 1 ||
          muscle.id == 13 ||
          muscle.id == 5
        ) {
          muscleGroupArray.push(muscle);
        }
        loadIndMuscles(muscleGroupArray);
      }
    } else if (event.target.id === "Legs-info") {
      for (var i = 0; i < muscleGroupCardArray[0].results.length; i++) {
        var muscle = muscleGroupCardArray[0].results[i];

        if (
          muscle.id == 11 ||
          muscle.id == 7 ||
          muscle.id == 8 ||
          muscle.id == 10 ||
          muscle.id == 15
        ) {
          muscleGroupArray.push(muscle);
        }
        loadIndMuscles(muscleGroupArray);
      }
    } else if (event.target.id === "Chest-info") {
      for (var i = 0; i < muscleGroupCardArray[0].results.length; i++) {
        var muscle = muscleGroupCardArray[0].results[i];

        if (muscle.id == 4) {
          muscleGroupArray.push(muscle);
        }
        loadIndMuscles(muscleGroupArray);
      }
    } else if (event.target.id === "Back-info") {
      for (var i = 0; i < muscleGroupCardArray[0].results.length; i++) {
        var muscle = muscleGroupCardArray[0].results[i];

        if (muscle.id == 12 || muscle.id == 9) {
          muscleGroupArray.push(muscle);
        }
        loadIndMuscles(muscleGroupArray);
      }
    } else if (event.target.id === "Core-info") {
      for (var i = 0; i < muscleGroupCardArray[0].results.length; i++) {
        var muscle = muscleGroupCardArray[0].results[i];

        if (muscle.id == 14 || muscle.id == 6 || muscle.id == 3) {
          muscleGroupArray.push(muscle);
        }
        loadIndMuscles(muscleGroupArray);
      }
    }
  });

loadArchive();
