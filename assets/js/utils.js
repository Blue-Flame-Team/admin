// Utility Functions - Clean Architecture

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to wait
 * @returns {Function} - The debounced function
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Format date to locale string
 * @param {Date|string} date - The date to format
 * @param {string} locale - The locale to use (default: 'ar-SA')
 * @returns {string} - The formatted date
 */
export const formatDate = (date, locale = 'ar-SA') => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Format currency
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code (default: 'SAR')
 * @param {string} locale - The locale to use (default: 'ar-SA')
 * @returns {string} - The formatted currency
 */
export const formatCurrency = (amount, currency = 'SAR', locale = 'ar-SA') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
};

/**
 * Validate email address
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate phone number (Saudi format)
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
export const isValidPhone = (phone) => {
    const phoneRegex = /^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Get form data as object
 * @param {HTMLFormElement} form - The form element
 * @returns {Object} - The form data as an object
 */
export const getFormData = (form) => {
    const formData = new FormData(form);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
        if (data[key] !== undefined) {
            if (!Array.isArray(data[key])) {
                data[key] = [data[key]];
            }
            data[key].push(value);
        } else {
            data[key] = value;
        }
    }
    
    return data;
};

/**
 * Deep clone an object
 * @param {Object} obj - The object to clone
 * @returns {Object} - The cloned object
 */
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

/**
 * Generate a unique ID
 * @param {number} length - The length of the ID (default: 10)
 * @returns {string} - The unique ID
 */
export const generateId = (length = 10) => {
    return Math.random().toString(36).substring(2, length + 2);
};

/**
 * Scroll to element with smooth animation
 * @param {HTMLElement} element - The element to scroll to
 * @param {number} offset - The offset from the top (default: 0)
 */
export const scrollToElement = (element, offset = 0) => {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
};

/**
 * Handle API errors
 * @param {Error} error - The error object
 * @returns {string} - The error message
 */
export const handleApiError = (error) => {
    if (error.response) {
        // Server responded with error
        return error.response.data.message || 'حدث خطأ في الخادم';
    } else if (error.request) {
        // Request made but no response
        return 'لا يمكن الاتصال بالخادم';
    } else {
        // Error in request setup
        return 'حدث خطأ في الطلب';
    }
};

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - Whether the element is in viewport
 */
export const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}; 