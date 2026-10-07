// Shows today's date in the footer of every page.
function showToday() {
  var today = document.getElementById("today");

  if (today === null) {
    return;
  }

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  today.textContent = "Today is " + new Date().toLocaleDateString("en-US", options) + ".";
}

showToday();
