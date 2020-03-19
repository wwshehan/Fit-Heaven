$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  const getExercises = () => {
    console.log("get the exercise!");
    $.get("/api/findExercises").then(function(data) {
      console.log(data, "<=====");
      if (data) {
        data.forEach(exercisez => {
          const newRow = $("<div>").addClass("row");
          newRow.html(`
            <div class="col">
              <h2 class="text-primary">${exercisez.name}</h2>
            </div>
            <div class="col">
              <h2 class="text-primary">${exercisez.muscle}</h2>

            </div>
            <div class="col">
              <h2 class="text-primary">${exercisez.equipment}</h2>

            </div>

            <div class="col">
              <h2 class="text-primary">${exercisez.level}</h2>
            </div>
          </div>`);
          $("#mainArea").append(newRow);
        });
      }
    });
  };

  $.get("/api/user_data").then(function(data) {
    let username = data.email;
    console.log(username);
    let realusername = username.substr(0, username.indexOf("@"));
    $(".username").text(realusername);
    $("#gender").text(data.gender);
    $("#weight").text(data.weight);
    $("#fitnessLevel").text(data.level);
    getExercises();
  });
});
