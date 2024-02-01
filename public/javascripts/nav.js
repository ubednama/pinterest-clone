document.addEventListener("DOMContentLoaded", function() {
  var button = document.getElementById('hiddenButton');
  var arrowDown = document.getElementById('arrowDown');

  arrowDown.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevents the click event from reaching the document
    
    // Toggle the button's display property
    button.style.display = (button.style.display === 'none' || button.style.display === '') ? 'block' : 'none';
    
    // Get the position of the arrow-down image
    var arrowRect = arrowDown.getBoundingClientRect();
    
    // Set the position of the button just below the arrow-down image
    button.style.top = (arrowRect.bottom + window.scrollY) + 'px';

    // Calculate the left position of the button
    var leftPosition = arrowRect.left;

    // Ensure the button is fully visible within the window
    if (leftPosition < 0) {
      leftPosition = 0;
    } else if (leftPosition + button.offsetWidth > window.innerWidth) {
      leftPosition = window.innerWidth - button.offsetWidth;
    }

    leftPosition -= 38; // Adjust this value based on your needs

    button.style.left = leftPosition + 'px';
  });

  // Hide button when clicking anywhere on the screen
  document.addEventListener('click', function(event) {
    if (button.style.display === 'block' && event.target !== button && !button.contains(event.target) && event.target !== arrowDown) {
      button.style.display = 'none';
    }
  });
});
