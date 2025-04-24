document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".activity");

  function revealOnScroll() {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.classList.add("visible");
      }
    });
  }

  // شغلنا التأثير أول ما تفتح الصفحة + وقت التمرير
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});
