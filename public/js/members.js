$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    let username = data.email;
    console.log(username);
    let realusername = username.substr(0, username.indexOf("@"));
    $(".username").text(realusername);
    $("#gender").text(data.gender);
    $("#weight").text(data.weight);
    $("#fitnessLevel").text(data.level);
  });
});
