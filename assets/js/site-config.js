/**
 * إعدادات موقع لوحة التحكم
 * يحتوي على تكوين للمسارات والصفحات للتأكد من ترابط الموقع بالكامل
 */

const SITE_CONFIG = {
    // المسار الجذر للموقع
    basePath: '../../../',
    
    // القوائم الرئيسية
    mainMenus: {
        dashboard: {
            title: 'لوحة التحكم',
            icon: 'fas fa-th-large',
            path: 'index.html'
        },
        users: {
            title: 'إدارة المستخدمين',
            icon: 'fas fa-users',
            path: 'assets/pages/user-management-new.html'
        },
        permissions: {
            title: 'إدارة الصلاحيات',
            icon: 'fas fa-shield-alt',
            path: 'assets/pages/permissions-view-new.html'
        },
        visitors: {
            title: 'سجل الزوار',
            icon: 'fas fa-envelope',
            path: 'assets/pages/visitor-log.html'
        },
        reports: {
            title: 'التقارير',
            icon: 'fas fa-chart-bar',
            path: 'assets/pages/print-copy-report.html'
        },
        files: {
            title: 'إدارة الملفات',
            icon: 'fas fa-folder',
            path: 'assets/pages/file-management.html'
        },
        companies: {
            title: 'الشركات',
            icon: 'fas fa-building',
            path: 'assets/pages/companies-view.html'
        },
        search: {
            title: 'كلمات البحث',
            icon: 'fas fa-search',
            path: 'assets/pages/search-keywords-management.html'
        },
        settings: {
            title: 'الإعدادات',
            icon: 'fas fa-cog',
            path: 'assets/pages/general-settings.html'
        },
        sitemap: {
            title: 'خريطة الموقع',
            icon: 'fas fa-sitemap',
            path: 'assets/pages/sitemap.html'
        }
    },
    
    // جميع الصفحات المتاحة في الموقع مع مساراتها
    pages: {
        // لوحة التحكم
        dashboard: {
            path: 'index.html',
            title: 'لوحة التحكم الرئيسية',
            parent: null
        },
        
        // إدارة المستخدمين
        userManagement: {
            path: 'assets/pages/user-management-new.html',
            title: 'إدارة المستخدمين',
            parent: 'users'
        },
        userProfile: {
            path: 'assets/pages/user-profile.html',
            title: 'الملف الشخصي',
            parent: 'users'
        },
        userLoginHistory: {
            path: 'assets/pages/user-login-history.html',
            title: 'سجل تسجيل الدخول',
            parent: 'users'
        },
        changePassword: {
            path: 'assets/pages/change-password.html',
            title: 'تغيير كلمة المرور',
            parent: 'users'
        },
        
        // إدارة الصلاحيات
        permissionsView: {
            path: 'assets/pages/permissions-view-new.html',
            title: 'عرض الصلاحيات',
            parent: 'permissions'
        },
        permissionsAddEdit: {
            path: 'assets/pages/permissions-add-edit-new.html',
            title: 'إضافة/تعديل صلاحية',
            parent: 'permissions'
        },
        
        // سجل الزوار
        visitorLog: {
            path: 'assets/pages/visitor-log.html',
            title: 'قائمة الرسائل',
            parent: 'visitors'
        },
        visitorAddEntry: {
            path: 'assets/pages/visitor-add-entry-new.html',
            title: 'إضافة رسالة',
            parent: 'visitors'
        },
        visitorEditEntry: {
            path: 'assets/pages/visitor-edit-entry.html',
            title: 'الرد على الرسائل',
            parent: 'visitors'
        },
        
        // التقارير
        printCopyReport: {
            path: 'assets/pages/print-copy-report.html',
            title: 'تقارير الطباعة والنسخ',
            parent: 'reports'
        },
        userPrintReport: {
            path: 'assets/pages/user-print-report.html',
            title: 'تقارير طباعة المستخدم',
            parent: 'reports'
        },
        electronicPayment: {
            path: 'assets/pages/electronic-payment.html',
            title: 'تقارير الدفع الإلكتروني',
            parent: 'reports'
        },
        
        // إدارة الملفات
        fileManagement: {
            path: 'assets/pages/file-management.html',
            title: 'إدارة الملفات',
            parent: 'files'
        },
        folderEdit: {
            path: 'assets/pages/folder-edit.html',
            title: 'تحرير المجلد',
            parent: 'files'
        },
        imageUpload: {
            path: 'assets/pages/image-upload.html',
            title: 'رفع الصور',
            parent: 'files'
        },
        contentView: {
            path: 'assets/pages/content-view.html',
            title: 'عرض المحتوى',
            parent: 'files'
        },
        
        // التشريعات والوثائق
        legislationData: {
            path: 'assets/pages/legislation-data.html',
            title: 'بيانات التشريعات',
            parent: 'legislation'
        },
        legislationEditor: {
            path: 'assets/pages/legislation-editor.html',
            title: 'محرر التشريعات',
            parent: 'legislation'
        },
        legalDocumentation: {
            path: 'assets/pages/legal-documentation.html',
            title: 'الوثائق القانونية',
            parent: 'legislation'
        },
        legalCitationRequests: {
            path: 'assets/pages/legal-citation-requests.html',
            title: 'طلبات الاقتباس القانوني',
            parent: 'legislation'
        },
        
        // الإعلانات
        advertisementsBanners: {
            path: 'assets/pages/advertisements-banners.html',
            title: 'البانرات الإعلانية',
            parent: 'advertisements'
        },
        textAdvertisementsView: {
            path: 'assets/pages/text-advertisements-view.html',
            title: 'الإعلانات النصية',
            parent: 'advertisements'
        },
        advertisementAddEdit: {
            path: 'assets/pages/advertisement-add-edit.html',
            title: 'إضافة إعلان',
            parent: 'advertisements'
        },
        
        // الشركات
        companiesView: {
            path: 'assets/pages/companies-view.html',
            title: 'قائمة الشركات',
            parent: 'companies'
        },
        companyAddEdit: {
            path: 'assets/pages/company-add-edit.html',
            title: 'إضافة/تعديل شركة',
            parent: 'companies'
        },
        
        // الاشتراكات
        subscriptionServices: {
            path: 'assets/pages/subscription-services.html',
            title: 'خدمات الاشتراك',
            parent: 'subscriptions'
        },
        serviceSubscription: {
            path: 'assets/pages/service-subscription.html',
            title: 'إضافة اشتراك',
            parent: 'subscriptions'
        },
        subscriptionRenewal: {
            path: 'assets/pages/subscription-renewal.html',
            title: 'تجديد الاشتراك',
            parent: 'subscriptions'
        },
        
        // القائمة البريدية
        mailingList: {
            path: 'assets/pages/mailing-list.html',
            title: 'القائمة البريدية',
            parent: 'mailingList'
        },
        mailingListAddEdit: {
            path: 'assets/pages/mailing-list-add-edit.html',
            title: 'إضافة مشترك',
            parent: 'mailingList'
        },
        sendMessageToSubscribers: {
            path: 'assets/pages/send-message-to-subscribers.html',
            title: 'إرسال رسالة للمشتركين',
            parent: 'mailingList'
        },
        
        // كلمات البحث
        searchKeywordsManagement: {
            path: 'assets/pages/search-keywords-management.html',
            title: 'إدارة كلمات البحث',
            parent: 'search'
        },
        
        // الإعدادات
        generalSettings: {
            path: 'assets/pages/general-settings.html',
            title: 'الإعدادات العامة',
            parent: 'settings'
        },
        
        // خريطة الموقع
        sitemap: {
            path: 'assets/pages/sitemap.html',
            title: 'خريطة الموقع',
            parent: null
        }
    },
    
    // وظيفة للحصول على المسار النسبي استنادًا إلى موقع الصفحة الحالية
    getRelativePath: function(currentPath, targetPath) {
        // إذا كانت الصفحة الحالية هي الصفحة الرئيسية
        if (currentPath === 'index.html' || currentPath === '') {
            return targetPath;
        }
        
        // إذا كانت الصفحة المستهدفة هي الصفحة الرئيسية
        if (targetPath === 'index.html') {
            return '../../..';
        }
        
        // إذا كانت كلتا الصفحتين في نفس المجلد
        if (currentPath.startsWith('assets/pages/') && targetPath.startsWith('assets/pages/')) {
            return targetPath.replace('assets/pages/', '');
        }
        
        // إذا كانت الصفحة المستهدفة في مجلد آخر داخل assets
        return '../' + targetPath.replace('assets/', '');
    },
    
    // وظيفة للحصول على العنوان الكامل
    getPageTitle: function(pageKey) {
        if (this.pages[pageKey]) {
            return this.pages[pageKey].title;
        }
        return 'لوحة التحكم';
    }
};

// تصدير التكوين للاستخدام في الملفات الأخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
}
