document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedActivity = document.getElementById("activity").value;
    const ratingValue = document.querySelector("input[name='rating']:checked");

    if (selectedActivity === "Activity") {
      alert("Please select an activity.");
      return;
    }

    if (!ratingValue) {
      alert("Please select a rating.");
      return;
    }

    // ✅ هذا هو المطلوب في الفيز
    alert(`Thank you for your feedback.\nYou're rating for activity${selectedActivity} is ${ratingValue.value}`);


    // ✅ التحويل للـ homepage بعد التنبيه
    window.location.href = "homepage.html";
  });
});


