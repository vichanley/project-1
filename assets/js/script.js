//VARIABLES
//workout tab variables
const workoutTabEl = document.getElementById("workout-tab");
const workoutTabBtnsWrapper = document.getElementById("workout-tab-btns");
const archiveBtn = document.getElementById("archivebtn-wrapper");
const generateWorkoutBtn = document.getElementById("generate-workoutbtn-wrapper");
const archiveWrapperEl = document.getElementById("archive-wrapper");

//FUNCTIONS
var loadArchive = function () {
    var muscleApi = "https://wger.de/api/v2/muscle/?format=json";

    //gets muscle data from api
    fetch(muscleApi)
    .then(function (response) {
        if (response.ok) {
        response.json().then(function (data) {
            //createMuscleList(data);
            console.log("working")
        });
        } else {
        alert("Error: Something Went Wrong");
        }
    })
    .catch(function (error) {
        alert("Unable to Connect to WGER");
    });
};

//EVENT LISTENERS
archiveBtn.addEventListener("click", loadArchive);