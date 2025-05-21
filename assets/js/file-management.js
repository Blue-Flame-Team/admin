/**
 * File Management Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const fileInput = document.getElementById('file-input');
    const selectFileBtn = document.getElementById('select-file-btn');
    const uploadBtn = document.getElementById('upload-btn');
    const fileStatusText = document.getElementById('file-status-text');
    const fileSizeText = document.getElementById('file-size');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const downloadButtons = document.querySelectorAll('.download-btn');
    const shareButtons = document.querySelectorAll('.share-btn');
    
    // Click on select file button to trigger file input
    selectFileBtn.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Handle file selection
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            const file = this.files[0];
            const fileSize = formatFileSize(file.size);
            
            // Update UI with file information
            fileStatusText.textContent = file.name;
            fileSizeText.textContent = `(${fileSize})`;
            
            // Enable upload button
            uploadBtn.disabled = false;
        } else {
            // Reset UI if no file selected
            resetFileUpload();
        }
    });
    
    // Handle upload button click
    uploadBtn.addEventListener('click', function() {
        if (fileInput.files.length > 0) {
            // Simulate file upload
            uploadFile(fileInput.files[0]);
        }
    });
    
    // Handle delete buttons
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            deleteFile(row);
        });
    });
    
    // Handle download buttons
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const fileName = row.querySelector('td:first-child').textContent;
            downloadFile(fileName);
        });
    });
    
    // Handle share buttons
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const fileName = row.querySelector('td:first-child').textContent;
            shareFile(fileName);
        });
    });
    
    // Helper function to format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 بايت';
        
        const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت', 'تيرابايت'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        
        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Reset file upload fields
    function resetFileUpload() {
        fileStatusText.textContent = 'لم يتم اختيار ملف';
        fileSizeText.textContent = '(ميجابايت)';
        uploadBtn.disabled = true;
        fileInput.value = '';
    }
    
    // Simulate file upload
    function uploadFile(file) {
        // Disable upload button during upload
        uploadBtn.disabled = true;
        uploadBtn.textContent = 'جاري الرفع...';
        
        // Simulate upload progress (in a real application, you would use AJAX/fetch)
        setTimeout(function() {
            // Add file to table
            addFileToTable(file);
            
            // Reset upload form
            resetFileUpload();
            
            // Reset button text
            uploadBtn.textContent = 'رفع ملف';
            
            // Show success notification
            showNotification('تم رفع الملف بنجاح');
        }, 2000);
    }
    
    // Add file to the table
    function addFileToTable(file) {
        const table = document.querySelector('.files-table tbody');
        const newRow = document.createElement('tr');
        
        // Get file extension from name
        const fileExt = file.name.split('.').pop().toUpperCase();
        
        // Create row content
        newRow.innerHTML = `
            <td>${file.name}</td>
            <td>${fileExt}</td>
            <td>${formatFileSize(file.size)}</td>
            <td>${new Date().getFullYear()}</td>
            <td class="actions-cell">
                <button class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
                <button class="action-btn download-btn"><i class="fas fa-download"></i></button>
                <button class="action-btn share-btn"><i class="fas fa-share-alt"></i></button>
            </td>
        `;
        
        // Add to table
        table.prepend(newRow);
        
        // Add event listeners to new buttons
        const newDeleteBtn = newRow.querySelector('.delete-btn');
        const newDownloadBtn = newRow.querySelector('.download-btn');
        const newShareBtn = newRow.querySelector('.share-btn');
        
        newDeleteBtn.addEventListener('click', function() {
            deleteFile(newRow);
        });
        
        newDownloadBtn.addEventListener('click', function() {
            downloadFile(file.name);
        });
        
        newShareBtn.addEventListener('click', function() {
            shareFile(file.name);
        });
        
        // Update storage usage
        updateStorageUsage(file.size);
    }
    
    // Delete file
    function deleteFile(row) {
        if (confirm('هل أنت متأكد من حذف هذا الملف؟')) {
            // Remove row with animation
            row.style.transition = 'opacity 0.3s';
            row.style.opacity = '0';
            
            setTimeout(() => {
                row.remove();
                showNotification('تم حذف الملف بنجاح');
            }, 300);
        }
    }
    
    // Download file
    function downloadFile(fileName) {
        showNotification(`جاري تحميل الملف: ${fileName}`);
        
        // In a real application, you would create a download link to the actual file
        // For demo, we'll just show a notification
    }
    
    // Share file
    function shareFile(fileName) {
        // Create and show share dialog
        const shareDialog = document.createElement('div');
        shareDialog.className = 'share-dialog';
        shareDialog.innerHTML = `
            <div class="share-dialog-content">
                <h3>مشاركة الملف</h3>
                <p class="file-name">${fileName}</p>
                <div class="share-options">
                    <button class="share-option" data-platform="email">
                        <i class="fas fa-envelope"></i>
                        <span>البريد الإلكتروني</span>
                    </button>
                    <button class="share-option" data-platform="whatsapp">
                        <i class="fab fa-whatsapp"></i>
                        <span>واتساب</span>
                    </button>
                    <button class="share-option" data-platform="copy">
                        <i class="fas fa-link"></i>
                        <span>نسخ الرابط</span>
                    </button>
                </div>
                <button class="close-dialog">إغلاق</button>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .share-dialog {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 999;
            }
            .share-dialog-content {
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                width: 90%;
                max-width: 400px;
            }
            .share-dialog h3 {
                margin-bottom: 10px;
                text-align: center;
            }
            .file-name {
                text-align: center;
                margin-bottom: 20px;
                font-weight: 500;
            }
            .share-options {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
            }
            .share-option {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background-color: #f8f9fa;
                cursor: pointer;
                flex: 1;
            }
            .share-option i {
                font-size: 24px;
                margin-bottom: 5px;
            }
            .close-dialog {
                display: block;
                width: 100%;
                padding: 10px;
                background-color: #f8f9fa;
                border: 1px solid #ddd;
                border-radius: 4px;
                cursor: pointer;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(shareDialog);
        
        // Handle share option clicks
        const shareOptions = shareDialog.querySelectorAll('.share-option');
        shareOptions.forEach(option => {
            option.addEventListener('click', function() {
                const platform = this.getAttribute('data-platform');
                handleShare(platform, fileName);
                document.body.removeChild(shareDialog);
            });
        });
        
        // Handle close button
        const closeButton = shareDialog.querySelector('.close-dialog');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(shareDialog);
        });
    }
    
    // Handle sharing based on platform
    function handleShare(platform, fileName) {
        switch(platform) {
            case 'email':
                showNotification('تم فتح نافذة البريد الإلكتروني');
                break;
            case 'whatsapp':
                showNotification('تم فتح نافذة واتساب');
                break;
            case 'copy':
                showNotification('تم نسخ رابط الملف');
                break;
        }
    }
    
    // Update storage usage
    function updateStorageUsage(newFileSize) {
        // This is just a simulation
        // In a real app, you would fetch the actual usage from the server
        const progressBar = document.querySelector('.progress-bar');
        
        // Get the current width percentage
        let currentPercentage = parseInt(progressBar.style.width) || 30;
        
        // Simulate adding a small percentage for the new file
        // In a real app, calculate this based on actual quota
        currentPercentage += 2;
        
        // Update progress bar (max 100%)
        progressBar.style.width = Math.min(currentPercentage, 100) + '%';
        
        // Update text if needed
        if (currentPercentage >= 80) {
            progressBar.style.backgroundColor = '#dc3545'; // Change to red if high usage
        }
    }
    
    // Show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Add styles
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#333';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        
        // Add to document
        document.body.appendChild(notification);
        
        // Fade in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // Fade out and remove
        setTimeout(() => {
            notification.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});
