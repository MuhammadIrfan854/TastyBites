const sections = ["home", "about", "menu", "reviews", "contact"];
const contentDiv = document.getElementById("portfolio-content");

function loadSectionsSequentially(index = 0, callback) {
    if (index >= sections.length) {
        callback();
        return;
    }

    fetch(`/Pages/${sections[index]}.html`)
        .then(res => res.text())
        .then(data => {
            contentDiv.innerHTML += data;
            loadSectionsSequentially(index + 1, callback);
        })
        .catch(err => console.error(err));
}

AOS.init({
    duration: 700,
    once: true,
});

loadSectionsSequentially(0, () => {
    AOS.refresh(); 

    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("nav > ul");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Close menu on link click
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });
});