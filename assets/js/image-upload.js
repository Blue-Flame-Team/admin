/**
 * Image Upload Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const uploadButton = document.getElementById('uploadButton');
    
    // Initially disable the upload button
    uploadButton.disabled = true;
    
    // Click on drop zone to trigger file input
    dropZone.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Handle file selection
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });
    
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    
    // Highlight drop zone when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });
    
    // Handle dropped files
    dropZone.addEventListener('drop', handleDrop, false);
    
    // Handle upload button click
    uploadButton.addEventListener('click', uploadFiles);
    
    // Helper functions
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight() {
        dropZone.classList.add('drag-over');
    }
    
    function unhighlight() {
        dropZone.classList.remove('drag-over');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
    
    function handleFiles(files) {
        if (files.length > 0) {
            validateFiles(files);
        }
    }
    
    function validateFiles(files) {
        const file = files[0]; // Currently handling only one file
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        if (!validTypes.includes(file.type)) {
            alert('يرجى اختيار ملف صورة بصيغة JPG, JPEG, أو PNG');
            return;
        }
        
        if (file.size > maxSize) {
            alert('حجم الملف يتجاوز الحد المسموح به (10MB)');
            return;
        }
        
        // File is valid, enable upload button and update UI
        uploadButton.disabled = false;
        showPreview(file);
    }
    
    function showPreview(file) {
        // Update the UI to show the selected file
        const uploadContent = document.querySelector('.upload-content');
        
        // Check if preview already exists
        let existingPreview = document.querySelector('.file-preview');
        if (existingPreview) {
            existingPreview.remove();
        }
        
        // Create preview element
        const preview = document.createElement('div');
        preview.className = 'file-preview';
        
        // If it's an image, show image preview
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.style.maxWidth = '100%';
            img.style.maxHeight = '200px';
            img.style.marginTop = '15px';
            img.style.borderRadius = '5px';
            
            const reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
            
            preview.appendChild(img);
        }
        
        // Add file name
        const fileName = document.createElement('div');
        fileName.textContent = file.name;
        fileName.style.marginTop = '10px';
        fileName.style.fontWeight = '500';
        preview.appendChild(fileName);
        
        // Update text
        const uploadText = document.querySelector('.upload-text');
        uploadText.textContent = 'تم اختيار الملف بنجاح';
        
        // Add clear button
        const clearBtn = document.createElement('button');
        clearBtn.textContent = 'إلغاء';
        clearBtn.style.marginTop = '10px';
        clearBtn.style.padding = '5px 15px';
        clearBtn.style.background = '#f0f0f0';
        clearBtn.style.border = 'none';
        clearBtn.style.borderRadius = '4px';
        clearBtn.style.cursor = 'pointer';
        
        clearBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent opening file dialog
            resetUpload();
        });
        
        preview.appendChild(clearBtn);
        uploadContent.appendChild(preview);
    }
    
    function resetUpload() {
        // Clear file input
        fileInput.value = '';
        
        // Reset UI
        const uploadText = document.querySelector('.upload-text');
        uploadText.textContent = 'اسحب الملف هنا او انقر للتحميل';
        
        // Remove preview
        const preview = document.querySelector('.file-preview');
        if (preview) {
            preview.remove();
        }
        
        // Disable upload button
        uploadButton.disabled = true;
    }
    
    function uploadFiles() {
        if (fileInput.files.length === 0) {
            alert('يرجى اختيار ملف أولاً');
            return;
        }
        
        const file = fileInput.files[0];
        
        // In a real application, you would use FormData to upload the file to a server
        // For demo purposes, we'll simulate an upload with a progress indicator
        
        // Create and show progress
        showProgress();
        
        // Simulate upload completion after a delay
        setTimeout(function() {
            completeUpload();
        }, 2000);
    }
    
    function showProgress() {
        // Disable upload button and change its text
        uploadButton.disabled = true;
        uploadButton.textContent = 'جاري الرفع...';
        
        // Add a progress indicator
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.style.width = '100%';
        progressContainer.style.height = '5px';
        progressContainer.style.backgroundColor = '#f0f0f0';
        progressContainer.style.marginTop = '10px';
        progressContainer.style.borderRadius = '3px';
        progressContainer.style.overflow = 'hidden';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.width = '0%';
        progressBar.style.height = '100%';
        progressBar.style.backgroundColor = '#0055ba';
        progressBar.style.transition = 'width 2s';
        
        progressContainer.appendChild(progressBar);
        
        // Add progress to UI
        const uploadContainer = document.querySelector('.upload-container');
        uploadContainer.appendChild(progressContainer);
        
        // Animate progress bar
        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 100);
    }
    
    function completeUpload() {
        // Show success message
        const uploadContainer = document.querySelector('.upload-container');
        uploadContainer.innerHTML = `
            <div class="success-message" style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-check-circle" style="font-size: 48px; color: #28a745; margin-bottom: 20px;"></i>
                <h3 style="margin-bottom: 15px; font-size: 24px;">تم رفع الملف بنجاح!</h3>
                <p style="margin-bottom: 30px; color: #666;">تم رفع الملف إلى الخادم بنجاح</p>
                <button class="upload-button" onclick="window.location.reload()">رفع ملف آخر</button>
            </div>
        `;
    }
});
