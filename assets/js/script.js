'use strict';

// Preload Animation

const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function() {
    // Set a 4-second delay before showing the main page
    setTimeout(function() {
        preloader.classList.add("loaded");
        document.body.classList.add("loaded");
    }, 4000); // 4000 milliseconds = 4 seconds
});


// adding event listener on multiplle elements

const addEventOnElements = function(elements, eventType, callback){
    for(let i = 0, len = elements.length; i<len; i++){
        elements[i].addEventListener(eventType, callback);
    }
}

// Navbar

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function(){
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active")
}

addEventOnElements(navTogglers, "click", toggleNavbar);


// Header

const header = document.querySelector("[data-header]");

let lastScrollPos = 0;

const hideHeader = function() {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if(isScrollBottom){
        header.classList.add("hide");
    }
    else{
        header.classList.remove("hide");
    }

    lastScrollPos = window.scrollY;
}

window.addEventListener("scroll" , function(){
    if(window.scrollY >=50){
        header.classList.add("active");
        hideHeader();
    }

    else{
        header.classList.remove("active");
    }
});



// Hero Slider

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

// Function to update slider position and trigger zoom-in effect
const updateSliderPos = function() {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

// Slide to the next image
const slideNext = function() {
    if (currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
    } else {
        currentSlidePos++;
    }

    updateSliderPos();
}

// Slide to the previous image
const slidePrev = function() {
    if (currentSlidePos <= 0) {
        currentSlidePos = heroSliderItems.length - 1;
    } else {
        currentSlidePos--;
    }

    updateSliderPos();
}

// Add event listeners for the navigation buttons
heroSliderNextBtn.addEventListener("click", slideNext);
heroSliderPrevBtn.addEventListener("click", slidePrev);

// Auto slide functionality
let autoSlideInterval;

const autoSlide = function() {
    autoSlideInterval = setInterval(function() {
        slideNext();
    }, 3000); // Slide interval of 3 seconds
}

// Start auto-slide on load
window.addEventListener("load", function() {
    updateSliderPos(); // Trigger first slide's zoom immediately on load
    autoSlide(); // Start auto slide after page loads
});

// Stop auto slide when hovering over next/prev buttons
heroSliderNextBtn.addEventListener("mouseover", function() {
    clearInterval(autoSlideInterval);
});

heroSliderPrevBtn.addEventListener("mouseover", function() {
    clearInterval(autoSlideInterval);
});

// Resume auto slide when mouse leaves the next/prev buttons
heroSliderNextBtn.addEventListener("mouseout", autoSlide);
heroSliderPrevBtn.addEventListener("mouseout", autoSlide);
