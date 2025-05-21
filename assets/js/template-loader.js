/**
 * JavaScript Utility for Including Templates in All Pages
 * This helps maintain consistent navigation and sidebar across the website
 */

// استيراد تكوين الموقع
let SITE_CONFIG;

document.addEventListener('DOMContentLoaded', function() {
    // تحميل ملف التكوين
    fetch('../../js/site-config.js')
        .then(response => response.text())
        .then(text => {
            // تقييم النص كجافاسكريبت
            eval(text);
            // استدعاء وظائف تهيئة القوالب بعد تحميل التكوين
            initTemplates();
        })
        .catch(error => {
            console.error('Error loading site config:', error);
            // استمر في تحميل القوالب حتى مع عدم توفر ملف التكوين
            initTemplates();
        });
});

/**
 * تهيئة القوالب وتحميلها في الصفحة
 */
function initTemplates() {
    // تحميل قالب الشريط الجانبي
    const sidebarContainer = document.querySelector('.container');
    if (sidebarContainer) {
        const sidebarInclude = document.createElement('div');
        sidebarInclude.classList.add('sidebar-include');
        sidebarInclude.style.display = 'none';
        
        // تحديد مسار القالب بناءً على موقع الصفحة الحالية
        let sidebarPath = '../templates/sidebar.html';
        
        // جلب قالب الشريط الجانبي
        fetch(sidebarPath)
            .then(response => response.text())
            .then(html => {
                // إضافة الشريط الجانبي في بداية الحاوية
                sidebarInclude.innerHTML = html;
                let sidebarContent = sidebarInclude.firstElementChild;
                while (sidebarContent) {
                    sidebarContainer.insertBefore(sidebarContent, sidebarContainer.firstChild);
                    sidebarContent = sidebarInclude.firstElementChild;
                }
                
                // تحديث روابط الشريط الجانبي لتعكس المسارات الصحيحة
                updateSidebarLinks();
                
                // تهيئة وظائف الشريط الجانبي
                initSidebar();
                
                // تمييز عناصر القائمة النشطة بناءً على الصفحة الحالية
                markActiveMenuItems();
            })
            .catch(error => {
                console.error('Error loading sidebar template:', error);
            });
    }
    
    // تحميل قالب شريط التنقل العلوي
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        const navInclude = document.createElement('div');
        navInclude.classList.add('nav-include');
        navInclude.style.display = 'none';
        
        // تحديد مسار القالب بناءً على موقع الصفحة الحالية
        let navPath = '../templates/topnav.html';
        
        // جلب قالب شريط التنقل العلوي
        fetch(navPath)
            .then(response => response.text())
            .then(html => {
                // إضافة شريط التنقل العلوي في بداية المحتوى الرئيسي
                navInclude.innerHTML = html;
                let navContent = navInclude.firstElementChild;
                while (navContent) {
                    mainContent.insertBefore(navContent, mainContent.firstChild);
                    navContent = navInclude.firstElementChild;
                }
                
                // تحديث روابط التنقل لتعكس المسارات الصحيحة
                updateTopNavLinks();
                
                // تميير عناصر التنقل النشطة بناءً على الصفحة الحالية
                markActiveNavItems();
            })
            .catch(error => {
                console.error('Error loading top navigation template:', error);
            });
    }
    
    // إضافة فتات الخبز (مسار التنقل) في الصفحات إذا كان موجوداً
    addBreadcrumbs();
}

/**
 * Initialize sidebar functionality
 */
function initSidebar() {
    // Sidebar Toggle for Mobile and Desktop
    const toggleSidebar = document.getElementById('toggle-sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const dropdownItems = document.querySelectorAll('.menu-item-has-children > a');
    
    // Function to open sidebar
    function openSidebar() {
        sidebar.classList.add('active');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
        
        // If we're on desktop
        if (window.innerWidth > 992) {
            mainContent.style.marginRight = sidebar.offsetWidth + 'px';
        }
        
        document.body.style.overflow = 'hidden'; // Prevent background scrolling on mobile
    }
    
    // Function to close sidebar
    function closeSidebarFunc() {
        sidebar.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        
        // If we're on desktop
        if (window.innerWidth > 992) {
            mainContent.style.marginRight = '0';
        }
        
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', function(e) {
            e.preventDefault();
            if (sidebar.classList.contains('active')) {
                closeSidebarFunc();
            } else {
                openSidebar();
            }
        });
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', function(e) {
            e.preventDefault();
            closeSidebarFunc();
        });
    }
    
    // Close sidebar when clicking on overlay (mobile)
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            closeSidebarFunc();
        });
    }
    
    // Toggle dropdown menus in sidebar
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentNode;
            const subMenu = parent.querySelector('.sub-menu');
            
            // Toggle the current dropdown
            parent.classList.toggle('open');
            
            // Toggle sub-menu visibility with animation
            if (subMenu.style.maxHeight) {
                subMenu.style.maxHeight = null;
            } else {
                subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
            }
            
            // Close other dropdowns
            dropdownItems.forEach(otherItem => {
                if (otherItem !== this) {
                    const otherParent = otherItem.parentNode;
                    const otherSubMenu = otherParent.querySelector('.sub-menu');
                    if (otherParent.classList.contains('open')) {
                        otherParent.classList.remove('open');
                        otherSubMenu.style.maxHeight = null;
                    }
                }
            });
        });
    });
    
    // Close sidebar when clicking on a menu item (mobile) - except dropdown toggles
    const sidebarMenuItems = document.querySelectorAll('.sidebar-menu a:not(.menu-item-has-children > a)');
    sidebarMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                closeSidebarFunc();
            }
        });
    });
    
    // Handle resize events
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            if (sidebar.classList.contains('active')) {
                mainContent.style.marginRight = sidebar.offsetWidth + 'px';
            }
        } else {
            mainContent.style.marginRight = '0';
        }
        
        // Reset dropdown heights on window resize
        document.querySelectorAll('.sub-menu').forEach(menu => {
            if (menu.parentNode.classList.contains('open')) {
                menu.style.maxHeight = menu.scrollHeight + 'px';
            }
        });
    });
}

/**
 * تحديث روابط الشريط الجانبي لتعكس المسارات الصحيحة
 */
function updateSidebarLinks() {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop();
    
    // تحديث جميع الروابط في القائمة الجانبية
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            // التعامل مع روابط خاصة إذا كانت موجودة في التكوين
            const linkPage = href.split('/').pop();
            
            if (SITE_CONFIG) {
                // البحث عن معرّف الصفحة بناءً على اسم الملف
                let pageKey = null;
                for (const key in SITE_CONFIG.pages) {
                    if (SITE_CONFIG.pages[key].path.endsWith(linkPage)) {
                        pageKey = key;
                        break;
                    }
                }
                
                if (pageKey) {
                    const targetPath = SITE_CONFIG.pages[pageKey].path;
                    link.setAttribute('href', SITE_CONFIG.getRelativePath(pageName, targetPath));
                }
            }
        }
    });
}

/**
 * تحديث روابط شريط التنقل العلوي لتعكس المسارات الصحيحة
 */
function updateTopNavLinks() {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop();
    
    // تحديث جميع الروابط في شريط التنقل العلوي
    document.querySelectorAll('.sub-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            // التعامل مع روابط خاصة إذا كانت موجودة في التكوين
            const linkPage = href.split('/').pop();
            
            if (SITE_CONFIG) {
                // البحث عن معرّف الصفحة بناءً على اسم الملف
                let pageKey = null;
                for (const key in SITE_CONFIG.pages) {
                    if (SITE_CONFIG.pages[key].path.endsWith(linkPage)) {
                        pageKey = key;
                        break;
                    }
                }
                
                if (pageKey) {
                    const targetPath = SITE_CONFIG.pages[pageKey].path;
                    link.setAttribute('href', SITE_CONFIG.getRelativePath(pageName, targetPath));
                }
            }
        }
    });
}

/**
 * إضافة فتات الخبز (مسار التنقل) في الصفحات
 */
function addBreadcrumbs() {
    const breadcrumbContainer = document.querySelector('.breadcrumb');
    if (!breadcrumbContainer) return;
    
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop();
    
    if (SITE_CONFIG) {
        // البحث عن معرّف الصفحة الحالية
        let currentPageKey = null;
        for (const key in SITE_CONFIG.pages) {
            if (SITE_CONFIG.pages[key].path.endsWith(pageName)) {
                currentPageKey = key;
                break;
            }
        }
        
        if (currentPageKey) {
            const currentPage = SITE_CONFIG.pages[currentPageKey];
            const parentKey = currentPage.parent;
            
            // إنشاء قائمة فتات الخبز
            let breadcrumbHTML = `<a href="${SITE_CONFIG.getRelativePath(pageName, 'index.html')}">الرئيسية</a>`;
            
            if (parentKey && SITE_CONFIG.mainMenus[parentKey]) {
                const parentMenu = SITE_CONFIG.mainMenus[parentKey];
                breadcrumbHTML += ` / <a href="${SITE_CONFIG.getRelativePath(pageName, parentMenu.path)}">${parentMenu.title}</a>`;
            }
            
            breadcrumbHTML += ` / <span>${currentPage.title}</span>`;
            
            // إضافة فتات الخبز إلى الصفحة
            breadcrumbContainer.innerHTML = breadcrumbHTML;
        }
    }
}

/**
 * تمييز عناصر القائمة النشطة بناءً على الصفحة الحالية
 */
function markActiveMenuItems() {
    // الحصول على مسار الصفحة الحالية
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop();
    
    // تمييز العنصر المناسب في الشريط الجانبي كعنصر نشط
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref && linkHref.includes(pageName)) {
            // تمييز هذا الرابط كنشط
            link.parentElement.classList.add('active');
            
            // إذا كان هذا في قائمة فرعية، افتح القائمة المنسدلة الأب
            const parentDropdown = link.closest('.menu-item-has-children');
            if (parentDropdown) {
                parentDropdown.classList.add('open');
                const subMenu = parentDropdown.querySelector('.sub-menu');
                if (subMenu) {
                    subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
                }
            }
        }
    });
    
    // معالجة حالة خاصة للوحة التحكم الرئيسية
    if (pageName === 'index.html' || pageName === '') {
        const dashboardLink = document.querySelector('.menu-main-item');
        if (dashboardLink) {
            dashboardLink.classList.add('active');
        }
    }
}

/**
 * Mark active navigation items in top menu based on current page
 */
function markActiveNavItems() {
    // Get current page path
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop();
    
    // Clear all active states first
    document.querySelectorAll('.sub-nav li').forEach(item => {
        item.classList.remove('active');
    });
    
    // Mark the appropriate navigation item as active based on page category
    if (pageName === 'index.html' || pageName === '') {
        document.querySelector('.nav-dashboard')?.classList.add('active');
    } 
    else if (pageName.includes('user-')) {
        document.querySelector('.nav-users')?.classList.add('active');
    }
    else if (pageName.includes('permission')) {
        document.querySelector('.nav-permissions')?.classList.add('active');
    }
    else if (pageName.includes('visitor')) {
        document.querySelector('.nav-visitors')?.classList.add('active');
    }
    else if (pageName.includes('print-') || pageName.includes('electronic')) {
        document.querySelector('.nav-reports')?.classList.add('active');
    }
    else if (pageName.includes('file-') || pageName.includes('folder') || pageName.includes('image-') || pageName.includes('content-')) {
        document.querySelector('.nav-files')?.classList.add('active');
    }
    else if (pageName.includes('compan')) {
        document.querySelector('.nav-companies')?.classList.add('active');
    }
    else if (pageName.includes('search')) {
        document.querySelector('.nav-search')?.classList.add('active');
    }
    else if (pageName.includes('settings')) {
        document.querySelector('.nav-settings')?.classList.add('active');
    }
}
