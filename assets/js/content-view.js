// Content View JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Toggle switches functionality
    const toggleSwitches = document.querySelectorAll('.toggle input');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            // Logic for toggling visibility
            const row = this.closest('.table-row');
            const itemName = row.querySelector('.name-cell span').textContent.trim();
            console.log(`Toggled visibility for item: ${itemName}`);
        });
    });

    // Delete button functionality
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
                const row = this.closest('.table-row');
                // Here you would typically send a request to delete the item from the database
                // For now, we'll just remove it from the UI
                row.remove();
                console.log('Item deleted');
            }
        });
    });

    // Tools button functionality 
    const toolsButtons = document.querySelectorAll('.tools-btn');
    toolsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Remove any existing dropdown
            const existingDropdown = document.querySelector('.tools-dropdown');
            if (existingDropdown) {
                existingDropdown.remove();
            }
            
            // Create dropdown
            const dropdown = document.createElement('div');
            dropdown.className = 'tools-dropdown';
            dropdown.style.position = 'absolute';
            dropdown.style.backgroundColor = 'white';
            dropdown.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
            dropdown.style.borderRadius = '4px';
            dropdown.style.padding = '8px 0';
            dropdown.style.zIndex = '100';
            
            // Position dropdown near the button
            const rect = this.getBoundingClientRect();
            dropdown.style.top = `${rect.bottom + window.scrollY}px`;
            dropdown.style.left = `${rect.left + window.scrollX - 100}px`;
            
            // Add dropdown items
            const options = [
                { text: 'تعديل', icon: 'fa-edit' },
                { text: 'مشاركة', icon: 'fa-share-alt' },
                { text: 'نسخ', icon: 'fa-copy' }
            ];
            
            options.forEach(option => {
                const item = document.createElement('div');
                item.className = 'dropdown-item';
                item.style.padding = '8px 15px';
                item.style.cursor = 'pointer';
                item.style.display = 'flex';
                item.style.alignItems = 'center';
                item.style.gap = '8px';
                
                const icon = document.createElement('i');
                icon.className = `fas ${option.icon}`;
                
                const text = document.createTextNode(option.text);
                
                item.appendChild(icon);
                item.appendChild(text);
                
                item.addEventListener('mouseover', function() {
                    this.style.backgroundColor = '#f0f0f0';
                });
                
                item.addEventListener('mouseout', function() {
                    this.style.backgroundColor = 'transparent';
                });
                
                item.addEventListener('click', function() {
                    console.log(`Selected ${option.text}`);
                    dropdown.remove();
                });
                
                dropdown.appendChild(item);
            });
            
            document.body.appendChild(dropdown);
            
            // Close dropdown when clicking elsewhere
            document.addEventListener('click', function closeDropdown() {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            });
        });
    });

    // Button functionality for all buttons in action-buttons
    const addFolderBtn = document.querySelector('.btn-blue:nth-child(2)');
    if (addFolderBtn) {
        addFolderBtn.addEventListener('click', function() {
            console.log('Add folder clicked');
            // Implement folder creation modal/form
        });
    }

    const addFileBtn = document.querySelector('.btn-blue:nth-child(3)');
    if (addFileBtn) {
        addFileBtn.addEventListener('click', function() {
            console.log('Add file clicked');
            // Implement file upload/creation modal/form
        });
    }

    const verifyBtn = document.querySelector('.btn-white');
    if (verifyBtn) {
        verifyBtn.addEventListener('click', function() {
            console.log('Verify clicked');
            // Implement verification functionality
        });
    }

    // Filter tabs functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active style from all tabs
            filterTabs.forEach(t => {
                t.style.color = '#777';
                t.style.borderBottom = 'none';
            });
            // Add active style to clicked tab
            this.style.color = '#333';
            this.style.borderBottom = '2px solid #3498db';
            console.log(`Tab selected: ${this.textContent}`);
        });
    });

    // Pagination functionality
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(pageBtn => {
        pageBtn.addEventListener('click', function() {
            // Remove active class from all page numbers
            pageButtons.forEach(p => p.classList.remove('active'));
            // Add active class to clicked page number
            this.classList.add('active');
            // Here you would typically load the content for the selected page
            console.log(`Navigated to page ${this.textContent}`);
        });
    });

    // Prev/Next pagination buttons
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            const activePage = document.querySelector('.page-btn.active');
            if (activePage && activePage.previousElementSibling && activePage.previousElementSibling.classList.contains('page-btn')) {
                activePage.previousElementSibling.click();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const activePage = document.querySelector('.page-btn.active');
            if (activePage && activePage.nextElementSibling && activePage.nextElementSibling.classList.contains('page-btn')) {
                activePage.nextElementSibling.click();
            }
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box button');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const query = searchInput ? searchInput.value.trim() : '';
        if (query) {
            console.log(`Searching for: ${query}`);
            // Implement search functionality
        }
    }
});
