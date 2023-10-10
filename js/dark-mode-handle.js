//function for dark mode
function toggleDarkMode() {
    const body = document.body;
    const container = document.getElementById('container');
    const darkModeIcon = document.getElementById('darkModeIcon');
    body.classList.toggle("dark-mode");
    container.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        darkModeIcon.classList.remove("fa-moon");
        darkModeIcon.classList.add("fa-sun");
    } else {
        darkModeIcon.classList.remove("fa-sun");
        darkModeIcon.classList.add("fa-moon");
    }
}

const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", toggleDarkMode);

/////////////////////////