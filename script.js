// 1. Typing Effect
var typed = new Typed("#typed-text", {
  strings: [
    "Android Apps",
    "Secure Backends",
    "Web Platforms",
    "Digital Solutions",
  ],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 2000,
  loop: true,
});

// 2. Navbar Scrolling Effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 10px 30px -10px rgba(2,12,27,0.7)";
    navbar.style.padding = "10px 0";
  } else {
    navbar.style.boxShadow = "none";
    navbar.style.padding = "15px 0";
  }
});

// 3. Mobile Menu
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// 4. Scroll Reveal Animation
const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// 5. Initialize Tilt for all elements with data-tilt
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.2,
});
