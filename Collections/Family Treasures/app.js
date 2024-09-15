
'use strict';

// Preload Animation

const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function() {
    // Set a 4-second delay before showing the main page
    setTimeout(function() {
        preloader.classList.add("loaded");
        document.body.classList.add("loaded");
    }, 5000); // 5000 milliseconds = 5 seconds
});


const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    backTopBtn.classList.add("active");
  } else {
    backTopBtn.classList.remove("active");
  }
});


document.querySelectorAll('.photo img').forEach(function(imgElement) {
  imgElement.addEventListener('click', function() {
      // Get the image source
      var imageSource = this.src;

      // Create a new div element for the fullscreen view
      var fullscreenContainer = document.createElement('div');
      fullscreenContainer.style.position = 'fixed';
      fullscreenContainer.style.top = '0';
      fullscreenContainer.style.left = '0';
      fullscreenContainer.style.width = '100%';
      fullscreenContainer.style.height = '100%';
      fullscreenContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      fullscreenContainer.style.display = 'flex';
      fullscreenContainer.style.alignItems = 'center';
      fullscreenContainer.style.justifyContent = 'center';
      fullscreenContainer.style.zIndex = '9999';

      // Create a new image element for the fullscreen view
      var fullscreenImage = document.createElement('img');
      fullscreenImage.src = imageSource;
      fullscreenImage.style.maxWidth = '90%';
      fullscreenImage.style.maxHeight = '80%';
      fullscreenImage.style.objectFit = 'contain';
      fullscreenImage.style.borderRadius = '20px'; // Add border radius here
      fullscreenImage.style.transition = 'transform 0.3s'; // Smooth zoom transition

      // Variable to track zoom state
      var zoomState = false;

      // Function to toggle zoom
      function toggleImageZoom() {
          if (zoomState) {
              fullscreenImage.style.transform = 'scale(1)'; // Zoom out
          } else {
              fullscreenImage.style.transform = 'scale(2)'; // Zoom in
          }
          zoomState = !zoomState;
      }

      // Add event listener for single click zoom functionality
      fullscreenImage.addEventListener('click', toggleImageZoom);

      // Create a new div element for the "Click to zoom" message
      var zoomInstruction = document.createElement('div');
      zoomInstruction.textContent = 'Click to zoom';
      zoomInstruction.style.position = 'absolute';
      zoomInstruction.style.color = 'white';
      zoomInstruction.style.fontSize = '18px'; // Smaller font size
      zoomInstruction.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      zoomInstruction.style.padding = '10px 20px';
      zoomInstruction.style.borderRadius = '10px';
      zoomInstruction.style.opacity = '1';
      zoomInstruction.style.transition = 'opacity 0.5s'; // Smooth fade-out
      zoomInstruction.style.zIndex = '10000'; // Ensure message is on top

      // Append elements to the fullscreen container
      fullscreenContainer.appendChild(fullscreenImage);
      fullscreenContainer.appendChild(zoomInstruction);

      // Append the fullscreen container to the body
      document.body.appendChild(fullscreenContainer);

      // Hide the "Click to zoom" message after a few seconds
      setTimeout(function() {
          zoomInstruction.style.opacity = '0';
          // Remove the message div after it fades out
          setTimeout(function() {
              fullscreenContainer.removeChild(zoomInstruction);
          }, 500); // Matches the transition duration
      }, 1000); // Display the message for 1 second

      // Add a close button
      var closeBtn = document.createElement('span');
      closeBtn.textContent = '×';
      closeBtn.style.position = 'absolute';
      closeBtn.style.top = '20px';
      closeBtn.style.right = '20px';
      closeBtn.style.fontSize = '40px';
      closeBtn.style.color = 'white';
      closeBtn.style.cursor = 'pointer';

      // Append the close button to the fullscreen container
      fullscreenContainer.appendChild(closeBtn);

      // Close the fullscreen view when the close button is clicked
      closeBtn.addEventListener('click', function() {
          document.body.removeChild(fullscreenContainer);
      });

      // Close the fullscreen view when clicking outside the image
      fullscreenContainer.addEventListener('click', function(event) {
          if (event.target === fullscreenContainer) {
              document.body.removeChild(fullscreenContainer);
          }
      });
  });
});
