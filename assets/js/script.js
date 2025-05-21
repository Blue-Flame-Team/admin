document.addEventListener('DOMContentLoaded', function() {
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
    
    // Revenue Chart (Example data)
    const revenueChart = document.getElementById('revenue-chart');
    if (revenueChart) {
        new Chart(revenueChart, {
            type: 'line',
            data: {
                labels: ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4'],
                datasets: [{
                    label: 'إحصائيات الزيارات',
                    data: [1200, 1900, 3000, 3500],
                    fill: true,
                    backgroundColor: 'rgba(46, 78, 173, 0.1)',
                    borderColor: '#2e4ead',
                    tension: 0.4,
                    pointBackgroundColor: '#2e4ead'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        rtl: true,
                        titleAlign: 'right',
                        bodyAlign: 'right'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Responsive table
    function adjustTable() {
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
            const tableWidth = table.offsetWidth;
            const containerWidth = table.parentElement.offsetWidth;
            
            if (tableWidth > containerWidth) {
                table.parentElement.style.overflowX = 'auto';
            } else {
                table.parentElement.style.overflowX = 'hidden';
            }
        });
    }
    
    // Call on load and resize
    adjustTable();
    window.addEventListener('resize', adjustTable);
    
    // Add event listeners for table actions
    const viewButtons = document.querySelectorAll('.btn-view');
    const editButtons = document.querySelectorAll('.btn-edit');
    const deleteButtons = document.querySelectorAll('.btn-delete');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const documentId = row.querySelector('td:first-child').textContent;
            alert(`عرض المستند: ${documentId}`);
        });
    });
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const documentId = row.querySelector('td:first-child').textContent;
            alert(`تعديل المستند: ${documentId}`);
        });
    });
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const documentId = row.querySelector('td:first-child').textContent;
            if (confirm(`هل أنت متأكد من رغبتك في حذف المستند: ${documentId}؟`)) {
                alert('تم حذف المستند بنجاح');
                // Here you would actually delete the row or call an API
            }
        });
    });
    
    // Add New Button (Floating & Top)
    const addButtons = document.querySelectorAll('.add-btn, .floating-add button');
    
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('إضافة مستند جديد');
            // Here you would show a form or navigate to a new page
        });
    });
    
    // Quick Actions
    const actionCards = document.querySelectorAll('.action-card');
    
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const action = this.querySelector('p').textContent;
            alert(`تم اختيار: ${action}`);
            // Here you would perform the action
        });
    });
    
    // Notification hover effects
    const notifications = document.querySelectorAll('.notification');
    
    notifications.forEach(notification => {
        notification.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(245, 247, 251, 0.5)';
        });
        
        notification.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Event hover effects
    const events = document.querySelectorAll('.event');
    
    events.forEach(event => {
        event.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(245, 247, 251, 0.5)';
        });
        
        event.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Notification Badge - simulating new notifications
    const notificationBadge = document.querySelector('.badge');
    let notificationCount = parseInt(notificationBadge.textContent);
    
    // Simulate new notification every 30 seconds
    setInterval(() => {
        notificationCount++;
        notificationBadge.textContent = notificationCount;
        
        // Create a temporary notification popup
        const popup = document.createElement('div');
        popup.className = 'notification-popup';
        popup.innerHTML = `<p>لديك ${notificationCount} إشعارات جديدة</p>`;
        popup.style.position = 'fixed';
        popup.style.top = '60px';
        popup.style.left = '20px';
        popup.style.backgroundColor = 'var(--primary-color)';
        popup.style.color = 'white';
        popup.style.padding = '10px 15px';
        popup.style.borderRadius = '5px';
        popup.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
        popup.style.zIndex = '1000';
        popup.style.opacity = '0';
        popup.style.transition = 'opacity 0.3s ease';
        
        document.body.appendChild(popup);
        
        // Fade in
        setTimeout(() => {
            popup.style.opacity = '1';
        }, 100);
        
        // Fade out and remove after 3 seconds
        setTimeout(() => {
            popup.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(popup);
            }, 300);
        }, 3000);
    }, 30000); // This is set to 30 seconds, but you can adjust as needed
    
    // Simulate loading states for dynamic content
    function simulateLoading() {
        const loadingElements = document.querySelectorAll('.widget-body, .documents-table');
        
        loadingElements.forEach(element => {
            // Create loading overlay
            const overlay = document.createElement('div');
            overlay.className = 'loading-overlay';
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.zIndex = '10';
            
            const spinner = document.createElement('div');
            spinner.className = 'spinner';
            spinner.style.width = '40px';
            spinner.style.height = '40px';
            spinner.style.border = '4px solid rgba(0, 0, 0, 0.1)';
            spinner.style.borderTopColor = 'var(--primary-color)';
            spinner.style.borderRadius = '50%';
            spinner.style.animation = 'spin 1s linear infinite';
            
            // Create keyframes for spinner
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            overlay.appendChild(spinner);
            
            // Store original position if not already
            if (element.style.position !== 'relative') {
                element.originalPosition = element.style.position;
                element.style.position = 'relative';
            }
            
            element.appendChild(overlay);
            
            // Remove after 1-2 seconds (random time for realistic effect)
            const loadTime = 1000 + Math.random() * 1000;
            setTimeout(() => {
                element.removeChild(overlay);
                // Restore original position
                if (element.originalPosition !== undefined) {
                    element.style.position = element.originalPosition;
                }
            }, loadTime);
        });
    }
    
    // Call simulation on page load
    simulateLoading();
    
    // Handle language direction (RTL)
    const htmlElement = document.documentElement;
    const isRTL = htmlElement.getAttribute('dir') === 'rtl';
    
    function adjustForRTL() {
        if (isRTL) {
            // Ensure any framework or library components respect RTL
            // This is useful if you're using libraries that don't automatically handle RTL
            document.querySelectorAll('.fa-arrow-left').forEach(icon => {
                icon.classList.remove('fa-arrow-left');
                icon.classList.add('fa-arrow-right');
            });
            
            document.querySelectorAll('.fa-arrow-right').forEach(icon => {
                icon.classList.remove('fa-arrow-right');
                icon.classList.add('fa-arrow-left');
            });
        }
    }
    
    adjustForRTL();
});
