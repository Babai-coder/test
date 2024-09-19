'use strict';

// Preload Animation

const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function() {
    // Set a 4-second delay before showing the main page
    setTimeout(function() {
        preloader.classList.add("loaded");
        document.body.classList.add("loaded");
    }, 5000); // 5000 milliseconds = 4 seconds
});


// adding event listener on multiplle elements

const addEventOnElements = function(elements, eventType, callback){
    for(let i = 0, len = elements.length; i<len; i++){
        elements[i].addEventListener(eventType, callback);
    }
}

/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const navLinks = document.querySelectorAll(".navbar-link"); // Target nav links

// Function to toggle the navbar and scroll locking
const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");

  // Toggle the scroll lock
  if (navbar.classList.contains("active")) {
    document.body.classList.add("nav-active"); // Lock scroll when nav is active
  } else {
    document.body.classList.remove("nav-active"); // Enable scroll when nav is closed
  }
};

// Add click event to toggle the navbar when hamburger icon or overlay is clicked
navTogglers.forEach(toggler => {
  toggler.addEventListener("click", toggleNavbar);
});

// Automatically hide the navbar and restore scroll when a nav link is clicked
navLinks.forEach(link => {
  link.addEventListener("click", function() {
    // Remove the active classes from navbar and overlay to hide the menu
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("nav-active"); // Re-enable scroll after selecting an option
  });
});




/**
 * HEADER & BACK TOP BTN
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

// Function to show or hide the header on scroll
const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

// Add scroll event listener for header visibility and back to top button
window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
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



// Parralax effect

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});

//View Favorites fullscreen

// Function to open the full-source image with the quote in fullscreen when "View Photo" is clicked
document.querySelectorAll('.view').forEach(function(button) {
    button.addEventListener('click', function() {
        // Get the image and quote inside the corresponding pic-card
        var picCard = this.closest('.pic-card');
        var img = picCard.querySelector('.tour-img');
        var quote = picCard.querySelector('.quote').textContent;

        // Get the src of the clicked image
        var imgSrc = img.src;

        // Create a new div element for the fullscreen view
        var fullscreenDiv = document.createElement('div');
        fullscreenDiv.style.position = 'fixed';
        fullscreenDiv.style.top = '0';
        fullscreenDiv.style.left = '0';
        fullscreenDiv.style.width = '100%';
        fullscreenDiv.style.height = '100%';
        fullscreenDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        fullscreenDiv.style.display = 'flex';
        fullscreenDiv.style.flexDirection = 'column';
        fullscreenDiv.style.alignItems = 'center';
        fullscreenDiv.style.justifyContent = 'center';
        fullscreenDiv.style.zIndex = '9999';

        // Create a new image element for the fullscreen view
        var fullscreenImg = document.createElement('img');
        fullscreenImg.src = imgSrc;
        fullscreenImg.style.maxWidth = '90%';
        fullscreenImg.style.maxHeight = '70%';
        fullscreenImg.style.objectFit = 'contain';
        fullscreenImg.style.borderRadius = '20px'; // Add border radius here
        fullscreenImg.style.transition = 'transform 0.3s'; // Smooth zoom transition

        // Variable to track zoom state
        var isZoomedIn = false;

        // Function to toggle zoom
        function toggleZoom() {
            if (isZoomedIn) {
                fullscreenImg.style.transform = 'scale(1)'; // Zoom out
            } else {
                fullscreenImg.style.transform = 'scale(2)'; // Zoom in
            }
            isZoomedIn = !isZoomedIn;
        }

        // Add event listener for single click zoom functionality
        fullscreenImg.addEventListener('click', toggleZoom);

        // Create a new div element for the "Click to zoom" message
        var zoomMessageDiv = document.createElement('div');
        zoomMessageDiv.textContent = 'Click to zoom';
        zoomMessageDiv.style.position = 'absolute';
        zoomMessageDiv.style.color = 'white';
        zoomMessageDiv.style.fontSize = '18px'; // Smaller font size
        zoomMessageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        zoomMessageDiv.style.padding = '10px 20px';
        zoomMessageDiv.style.borderRadius = '10px';
        zoomMessageDiv.style.opacity = '1';
        zoomMessageDiv.style.transition = 'opacity 0.5s'; // Smooth fade-out
        zoomMessageDiv.style.zIndex = '10000'; // Ensure message is on top

        // Append elements to the fullscreen div
        fullscreenDiv.appendChild(fullscreenImg);
        fullscreenDiv.appendChild(zoomMessageDiv);

        // Append the fullscreen div to the body
        document.body.appendChild(fullscreenDiv);

        // Hide the "Click to zoom" message after a few seconds
        setTimeout(function() {
            zoomMessageDiv.style.opacity = '0';
            // Remove the message div after it fades out
            setTimeout(function() {
                fullscreenDiv.removeChild(zoomMessageDiv);
            }, 500); // Matches the transition duration
        }, 1000); // Display the message for 1 seconds

        // Create a new div element for the quote
        var quoteDiv = document.createElement('div');
        quoteDiv.textContent = quote;
        quoteDiv.style.color = 'white';
        quoteDiv.style.fontSize = '24px';
        quoteDiv.style.marginTop = '20px';
        quoteDiv.style.textAlign = 'center';
        quoteDiv.style.padding = '0 10px';

        // Append the quote div below the image
        fullscreenDiv.appendChild(quoteDiv);

        // Add a close button
        var closeButton = document.createElement('span');
        closeButton.textContent = '×';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '20px';
        closeButton.style.right = '20px';
        closeButton.style.fontSize = '40px';
        closeButton.style.color = 'white';
        closeButton.style.cursor = 'pointer';

        // Append the close button to the fullscreen div
        fullscreenDiv.appendChild(closeButton);

        // Close the fullscreen view when the close button is clicked
        closeButton.addEventListener('click', function() {
            document.body.removeChild(fullscreenDiv);
        });

        // Close the fullscreen view when clicking outside the image
        fullscreenDiv.addEventListener('click', function(event) {
            if (event.target === fullscreenDiv) {
                document.body.removeChild(fullscreenDiv);
            }
        });
    });
});

// Overlay Birthday video

// Get elements
const videoButton = document.querySelector('.btn');
let videoOverlay = null;  // Initialize variable for the overlay
let closeButton = null;
let videoElement = null;  // Initialize variable for the video element

// Function to create the overlay only once
function createOverlay() {
    if (!videoOverlay) {
        // Create video overlay div
        videoOverlay = document.createElement('div');
        videoOverlay.classList.add('video-overlay');

        // Create video element
        videoElement = document.createElement('video');
        videoElement.src = './videoplayback.mp4'; // Add your video URL here
        videoElement.controls = true;
        videoElement.autoplay = true;
        videoElement.classList.add('overlay-video');

        // Create close button
        closeButton = document.createElement('button');
        closeButton.innerText = 'X';
        closeButton.classList.add('overlay-close');

        // Append elements to overlay
        videoOverlay.appendChild(videoElement);
        videoOverlay.appendChild(closeButton);

        // Append overlay to body
        document.body.appendChild(videoOverlay);

        // Add event listener for close button
        closeButton.addEventListener('click', () => {
            // Hide the overlay
            videoOverlay.style.display = 'none';
            // Pause the video and reset its time
            videoElement.pause();
            videoElement.currentTime = 0;
        });
    }
}

// Event listener for the Play Video button
videoButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Call the function to create overlay if it doesn't exist
    createOverlay();
    
    // Show the overlay and play the video
    videoOverlay.style.display = 'flex';
    videoElement.play();  // Play the video if it's paused or reset
});



const images = [
    { url: 'img1.jpg' },
    { url: 'img2.jpg' },
    { url: 'img3.jpg' },
    { url: 'img4.jpg' },
    { url: 'img2.jpg' },
    { url: 'img3.jpg' },
];

let currentIndex = 0;
const mainImage = document.getElementById('main-image');
const imageText = document.getElementById('image-text');

// Function to update the image and text with a fade effect
function updateImage() {
    mainImage.style.opacity = 0;
    imageText.style.opacity = 0;

    setTimeout(() => {
        mainImage.style.backgroundImage = `url(${images[currentIndex].url})`;
        imageText.textContent = images[currentIndex].text;

        mainImage.style.opacity = 1;
        imageText.style.opacity = 1;
    }, 500); // Matches the transition time
}

// Initial load
updateImage();

// Function to go to the next image
document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
});

// Function to go to the previous image
document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
});



