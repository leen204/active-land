
// زر التبديل من الصفحة الرئيسية فقط
document.getElementById('theme-toggle')?.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// تفعيل الثيم المحفوظ عند الدخول لأي صفحة
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});






document.getElementById("menu-toggle").addEventListener("change", function () {
  document.body.classList.toggle("menu-open", this.checked);
});



