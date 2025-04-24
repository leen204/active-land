const toggle = document.getElementById('theme-switch');

function applyTheme(theme) {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
    toggle.checked = theme === 'dark';
}

toggle.addEventListener('change', () => {
    applyTheme(toggle.checked ? 'dark' : 'light');
});

window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('theme') || 'light';
    applyTheme(saved);
});



document.getElementById("menu-toggle").addEventListener("change", function () {
  document.body.classList.toggle("menu-open", this.checked);
});
