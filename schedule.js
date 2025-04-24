

function getWeekStartDate() {
  const today = new Date();
  const day = today.getDay();
  const sunday = new Date(today.setDate(today.getDate() - day));
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  return sunday.toLocaleDateString('en-US', options);
}

document.addEventListener("DOMContentLoaded", function () {
  const dateBox = document.getElementById("week-start-date");
  dateBox.innerText = "📅 This week's schedule starts on: " + getWeekStartDate();
});
