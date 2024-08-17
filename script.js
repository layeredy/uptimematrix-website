const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const demoImage = document.getElementById('demo-image');

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function setTheme(isDark) {
    if (isDark) {
        body.classList.add('dark-mode');
        themeToggle.classList.replace('bi-sun-fill', 'bi-moon-fill');
        demoImage.src = 'assets/homepage-darkmode.png';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.classList.replace('bi-moon-fill', 'bi-sun-fill');
        demoImage.src = 'assets/homepage-lightmode.png';
    }
}

const savedTheme = getCookie('theme');
setTheme(savedTheme === 'dark');

themeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.toggle('dark-mode');
    setTheme(isDarkMode);
    setCookie('theme', isDarkMode ? 'dark' : 'light', 30);
});

document.addEventListener('DOMContentLoaded', function () {
    const element = document.querySelector('.text-switcher');
    const words = ["website", "app", "API", "service", "database", "server", "platform", "network"];
    let index = 0;
    let charIndex = 0;
    const typingSpeed = 150;
    let isDeleting = false;

    function typeWriter() {
        if (charIndex < words[index].length && !isDeleting) {
            element.textContent += words[index].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else if (charIndex > 0 && isDeleting) {
            element.textContent = element.textContent.slice(0, -1);
            charIndex--;
            setTimeout(typeWriter, typingSpeed / 2);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                index = (index + 1) % words.length;
            }
            setTimeout(typeWriter, 500);
        }
    }

    typeWriter();
});