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

  // Form submission handling
  const scriptURL = 'https://script.google.com/macros/s/AKfycbxW9o5L5bj1LuF1OdUPA5MnUUWj5OR0ZONz3Ok66lXlrt6xhNDM-6qSh-VboBaE7Md05Q/exec';
  const form = document.forms['contact-form'];

  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        alert("Thank you! Your form has been submitted successfully.");
        form.reset(); // Reset the form after successful submission
      })
      .catch(error => console.error('Error!', error.message));
  });
});
