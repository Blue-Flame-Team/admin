// Site Configuration - Clean Architecture

/**
 * API Configuration
 */
export const API_CONFIG = {
    BASE_URL: process.env.API_BASE_URL || 'https://api.example.com',
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 3,
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register',
            LOGOUT: '/auth/logout',
            REFRESH_TOKEN: '/auth/refresh-token'
        },
        USER: {
            PROFILE: '/user/profile',
            UPDATE_PROFILE: '/user/profile/update',
            CHANGE_PASSWORD: '/user/password/change'
        },
        FORMS: {
            SAVE: '/forms/save',
            UPDATE: '/forms/update',
            DELETE: '/forms/delete',
            GET_ALL: '/forms/all',
            GET_BY_ID: '/forms/get'
        }
    }
};

/**
 * Form Validation Rules
 */
export const VALIDATION_RULES = {
    TEXT: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 100
    },
    TEXTAREA: {
        MIN_LENGTH: 10,
        MAX_LENGTH: 1000
    },
    PASSWORD: {
        MIN_LENGTH: 8,
        PATTERN: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    },
    PHONE: {
        PATTERN: /^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
    }
};

/**
 * UI Configuration
 */
export const UI_CONFIG = {
    TOAST: {
        DURATION: 3000,
        POSITION: 'bottom-right'
    },
    ANIMATION: {
        DURATION: 300,
        EASING: 'ease'
    },
    BREAKPOINTS: {
        MOBILE: 576,
        TABLET: 768,
        DESKTOP: 991,
        LARGE: 1200
    }
};

/**
 * Localization Configuration
 */
export const LOCALE_CONFIG = {
    DEFAULT_LOCALE: 'ar-SA',
    DEFAULT_CURRENCY: 'SAR',
    DATE_FORMAT: {
        SHORT: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        },
        LONG: {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    }
};

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
    NETWORK: {
        NO_CONNECTION: 'لا يمكن الاتصال بالخادم',
        TIMEOUT: 'انتهت مهلة الاتصال',
        SERVER_ERROR: 'حدث خطأ في الخادم'
    },
    VALIDATION: {
        REQUIRED: 'هذا الحقل مطلوب',
        INVALID_EMAIL: 'البريد الإلكتروني غير صالح',
        INVALID_PHONE: 'رقم الهاتف غير صالح',
        PASSWORD_WEAK: 'كلمة المرور ضعيفة جداً',
        PASSWORD_MISMATCH: 'كلمات المرور غير متطابقة'
    },
    AUTH: {
        INVALID_CREDENTIALS: 'بيانات الدخول غير صحيحة',
        SESSION_EXPIRED: 'انتهت صلاحية الجلسة',
        UNAUTHORIZED: 'غير مصرح لك بالوصول'
    }
};

/**
 * Cache Configuration
 */
export const CACHE_CONFIG = {
    STORAGE_KEY: 'app_cache',
    TTL: 3600, // 1 hour in seconds
    VERSION: '1.0.0'
};

/**
 * Security Configuration
 */
export const SECURITY_CONFIG = {
    TOKEN_KEY: 'auth_token',
    REFRESH_TOKEN_KEY: 'refresh_token',
    SESSION_TIMEOUT: 3600000, // 1 hour in milliseconds
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 900000 // 15 minutes in milliseconds
}; 