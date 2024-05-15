document.addEventListener('DOMContentLoaded', (event) => {
  // Fade in header content
  const header = document.getElementById('header');
  header.style.opacity = 1;

  // Get all modal links
  const modalLinks = document.querySelectorAll('.modal-link');
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.close');

  modalLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const modalId = this.getAttribute('href').substring(1);
      const modal = document.getElementById(modalId);
      modal.classList.add('show');
      modal.classList.remove('hide');
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      modal.classList.add('hide');
      setTimeout(() => {
        modal.classList.remove('show');
      }, 300); // match the CSS transition duration
    });
  });

  // Close modal when clicking outside of the modal content
  window.addEventListener('click', function(event) {
    modals.forEach(modal => {
      if (event.target == modal) {
        modal.classList.add('hide');
        setTimeout(() => {
          modal.classList.remove('show');
        }, 300); // match the CSS transition duration
      }
    });
  });

  // Event listener for form submission
  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Serialize form data
    const formData = new FormData(this);

    // Send form data to Google Apps Script web app
    fetch('https://script.google.com/macros/s/AKfycbxW9o5L5bj1LuF1OdUPA5MnUUWj5OR0ZONz3Ok66lXlrt6xhNDM-6qSh-VboBaE7Md05Q/exec', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.result === 'success') {
        // Show success message on the form page
        document.getElementById('form-message').textContent = 'Form submitted successfully!';
      } else {
        // Show error message on the form page
        document.getElementById('form-message').textContent = 'Error submitting form. Please try again later.';
      }
    })
    .catch(error => {
      // Show error message on the form page
      document.getElementById('form-message').textContent = 'An unexpected error occurred. Please try again later.';
      console.error('Error:', error);
    });
  });
});
