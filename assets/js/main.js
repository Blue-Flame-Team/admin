// Main JavaScript - Clean Architecture

// Form Validation Module
const FormValidation = {
    /**
     * Validates required fields in a form
     * @param {HTMLFormElement} form - The form to validate
     * @returns {boolean} - Whether the form is valid
     */
    validateRequired(form) {
        const requiredInputs = form.querySelectorAll('[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    },

    /**
     * Validates a single form field
     * @param {HTMLElement} field - The field to validate
     * @returns {boolean} - Whether the field is valid
     */
    validateField(field) {
        const value = field.value.trim();
        const isValid = value !== '';
        
        this.toggleFieldError(field, !isValid);
        return isValid;
    },

    /**
     * Toggles error state on a field
     * @param {HTMLElement} field - The field to toggle error on
     * @param {boolean} hasError - Whether the field has an error
     */
    toggleFieldError(field, hasError) {
        field.style.borderColor = hasError ? 'var(--error-color)' : 'var(--border-color)';
        
        // Find and toggle error message if it exists
        const errorMessage = field.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.style.display = hasError ? 'block' : 'none';
        }
    },

    /**
     * Clears validation state on a field
     * @param {HTMLElement} field - The field to clear validation on
     */
    clearValidation(field) {
        this.toggleFieldError(field, false);
    }
};

// UI Utilities Module
const UIUtils = {
    /**
     * Shows a toast message
     * @param {string} message - The message to show
     * @param {string} type - The type of message ('success' or 'error')
     */
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    },

    /**
     * Shows a confirmation dialog
     * @param {string} message - The confirmation message
     * @returns {Promise<boolean>} - Whether the user confirmed
     */
    async showConfirmation(message) {
        return window.confirm(message);
    }
};

// Form Handler Module
const FormHandler = {
    /**
     * Initializes form handling
     * @param {string} formSelector - The selector for the form
     * @param {Function} onSubmit - The submit callback
     */
    init(formSelector, onSubmit) {
        const form = document.querySelector(formSelector);
        if (!form) return;

        // Handle form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (FormValidation.validateRequired(form)) {
                await onSubmit(form);
            } else {
                UIUtils.showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
            }
        });

        // Clear validation on input
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', () => {
                FormValidation.clearValidation(field);
            });
        });
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Example form initialization
    FormHandler.init('#mainForm', async (form) => {
        try {
            // Handle form submission
            // Add your API call here
            UIUtils.showToast('تم حفظ البيانات بنجاح!');
        } catch (error) {
            UIUtils.showToast('حدث خطأ أثناء حفظ البيانات', 'error');
            console.error('Form submission error:', error);
        }
    });
}); 