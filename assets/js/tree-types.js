// Tree-Types.js - JavaScript for the Tree Types page

document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('newCategoryModal');
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    // Open modal when add button is clicked
    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', function() {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    }
    
    // Close modal when close button is clicked
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
    
    // Handle save button click
    const saveBtn = document.querySelector('.btn-save');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            // Here you would add code to save the form data
            // For now, just close the modal
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    // Prevent clicks inside the modal container from closing the modal
    const modalContainer = document.querySelector('.modal-container');
    if (modalContainer) {
        modalContainer.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
});
