$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    console.log(data);
    $(".username")
      .text(data.email)
      .replace("@", "");
    $("#gender").text(data.gender);
    $("#weight").text(data.weight);
    $("#fitnessLevel").text(data.level);
  });
});
