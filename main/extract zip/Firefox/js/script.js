$(document).ready(function() {
  if (Modernizr.cssanimations) {
    document.body.className = "nocssanimations";
  }
  $("h1 a").click(function() {
    $("#main").addClass("go");
  });
  updateDebug();
});///ENDERS GAME///

function updateDebug() {
  if (document.querySelector("footer input").checked) {
    document.body.classList.add("debug");
  } else {
    document.body.classList.remove("debug");
  }
}






