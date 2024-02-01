// Function to show the 'created' tab
function showCreated() {
    document.querySelector('.saved').style.display = 'none';
    document.querySelector('.created').style.display = 'flex';
    setActiveTab('createdBtn');
    saveActiveTab('createdBtn');
}

// Function to show the 'saved' tab
function showSaved() {
    document.querySelector('.created').style.display = 'none';
    document.querySelector('.saved').style.display = 'flex';
    setActiveTab('savedBtn');
    saveActiveTab('savedBtn');
}

// Set the active tab on reload
setActiveTab(getActiveTab() || 'savedBtn');

function setActiveTab(tabName) {
    // Remove 'active' class from all buttons
    document.querySelectorAll('.action-bar2 button').forEach(button => {
        button.classList.remove('active');
    });

    // Add 'active' class to the selected button
    document.querySelector('.' + tabName).classList.add('active');
}

function saveActiveTab(tabName) {
    // Save the active tab to localStorage
    localStorage.setItem('activeTab', tabName);
}

function getActiveTab() {
    // Retrieve the active tab from localStorage
    return localStorage.getItem('activeTab');
}




$(document).ready(function() {
    // Check if createdPost div is empty
    if ($('.createdPost').children().length === 0) {
      // If it's empty, show createPost div
      $('.createPost p').show();
      $('.createPost').show();
      
    } else {
      // If not empty, hide createPost div
      $('.createPost p').hide();
      $('.createPost').show();
    }
  });