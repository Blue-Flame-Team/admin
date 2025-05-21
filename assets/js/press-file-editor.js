document.addEventListener('DOMContentLoaded', function() {
    // Get form element
    const pressFileForm = document.getElementById('pressFileForm');
    
    // Handle image upload button
    const uploadBtn = document.querySelector('.upload-btn');
    
    // Create a hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    // Trigger file input click when upload button is clicked
    uploadBtn.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Handle file selection
    fileInput.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const fileName = e.target.files[0].name;
            // Update the upload button text to show the selected file
            uploadBtn.querySelector('span').textContent = fileName;
            
            // Here you would normally upload the file to the server
            // And then update the image caption field with the file information
            console.log('Selected file:', fileName);
        }
    });
    
    // Handle form submission
    pressFileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const newsTitle = document.getElementById('newsTitle').value;
        const imageCaption = document.getElementById('imageCaption').value;
        const publicationDetails = document.getElementById('publicationDetails').value;
        const relatedNewsIds = document.getElementById('relatedNewsIds').value;
        const newsClassification = document.getElementById('newsClassification').value;
        const newsSource = document.getElementById('newsSource').value;
        
        // Validate required fields
        if (!newsTitle) {
            alert('الرجاء إدخال عنوان الخبر');
            return;
        }
        
        if (!newsClassification) {
            alert('الرجاء اختيار تصنيف الخبر');
            return;
        }
        
        if (!newsSource) {
            alert('الرجاء اختيار مصدر الخبر');
            return;
        }
        
        // Construct data object for submission
        const formData = {
            title: newsTitle,
            imageCaption: imageCaption,
            publicationDetails: publicationDetails,
            relatedNewsIds: relatedNewsIds,
            classification: newsClassification,
            source: newsSource
        };
        
        // Here you would normally send data to server
        console.log('Form data to submit:', formData);
        
        // Success message
        alert('تم حفظ الملف الصحفي بنجاح');
        
        // Optionally redirect to list view
        // window.location.href = "press-files-list.html";
    });
    
    // Handle drag and drop for file upload
    const uploadContainer = document.querySelector('.upload-container');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadContainer.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadContainer.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadContainer.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        uploadContainer.classList.add('highlight');
    }
    
    function unhighlight() {
        uploadContainer.classList.remove('highlight');
    }
    
    uploadContainer.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files && files[0]) {
            const fileName = files[0].name;
            // Update the upload button text to show the selected file
            uploadBtn.querySelector('span').textContent = fileName;
            
            // Here you would normally upload the file to the server
            console.log('Dropped file:', fileName);
        }
    }
    
    // Breadcrumb navigation
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
    
    breadcrumbLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Navigation logic
            const href = this.getAttribute('href');
            console.log('Navigating to:', href);
        });
    });
});
