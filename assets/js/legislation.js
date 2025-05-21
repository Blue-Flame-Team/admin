document.addEventListener('DOMContentLoaded', function() {
    // Initialize date pickers for all date inputs
    const dateInputs = document.querySelectorAll('.date-input input');
    dateInputs.forEach(input => {
        // You could add a date picker library here
        input.addEventListener('focus', function() {
            // Placeholder for date picker functionality
        });
    });

    // File upload functionality
    const fileUploadArea = document.querySelector('.file-upload-area');
    const fileInput = document.getElementById('fileUpload');

    fileUploadArea.addEventListener('click', function() {
        fileInput.click();
    });

    fileUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        fileUploadArea.classList.add('dragover');
    });

    fileUploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        fileUploadArea.classList.remove('dragover');
    });

    fileUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        fileUploadArea.classList.remove('dragover');
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            updateFileList(e.dataTransfer.files);
        }
    });

    fileInput.addEventListener('change', function() {
        updateFileList(this.files);
    });

    function updateFileList(files) {
        // Here you could show the list of selected files
        console.log('Files selected:', files);
    }

    // Form submission
    const documentForm = document.getElementById('documentForm');
    
    documentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const documentTitle = document.getElementById('documentTitle').value;
        const documentDate = document.getElementById('documentDate').value;
        const documentNumber = document.getElementById('documentNumber').value;
        const implementationDate = document.getElementById('implementationDate').value;
        const documentLink = document.getElementById('documentLink').value;
        const returnDate = document.getElementById('returnDate').value;
        const sourceName = document.getElementById('sourceName').value;
        
        // Get checkbox values
        const nonGovernmental = document.getElementById('nonGovernmental').checked;
        const englishTranslation = document.getElementById('englishTranslation').checked;
        const translatedTextLink = document.getElementById('translatedTextLink').checked;
        
        // Get dropdown values
        const documentType = document.getElementById('documentType').value;
        const displayType = document.getElementById('displayType').value;
        const visionOption = document.getElementById('visionOption').value;
        
        // Basic validation
        if (!documentTitle.trim()) {
            alert('الرجاء إدخال عنوان المستند');
            return;
        }
        
        // Construct data object for submission
        const formData = {
            title: documentTitle,
            date: documentDate,
            number: documentNumber,
            implementation_date: implementationDate,
            link: documentLink,
            return_date: returnDate,
            source: sourceName,
            options: {
                non_governmental: nonGovernmental,
                english_translation: englishTranslation,
                translated_text_link: translatedTextLink
            },
            document_type: documentType,
            display_type: displayType,
            vision_option: visionOption,
            // Files would be handled separately with FormData in a real implementation
        };
        
        // Here you would normally send data to server
        console.log('Form data to submit:', formData);
        
        // Success message
        alert('تم حفظ المستند بنجاح');
    });

    // Add related document button
    const addRelatedBtn = document.querySelector('.add-related-btn');
    
    addRelatedBtn.addEventListener('click', function() {
        // Logic to add a related document
        // This could open a modal or navigate to another page
        console.log('Add related document clicked');
    });

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

    // Initialize select dropdowns
    initializeDropdowns();
});

function initializeDropdowns() {
    // Document Type
    const documentType = document.getElementById('documentType');
    const documentTypes = ['نظام', 'لائحة', 'قرار', 'تعميم', 'أمر ملكي', 'مرسوم ملكي'];
    
    documentTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        documentType.appendChild(option);
    });
    
    // Display Type
    const displayType = document.getElementById('displayType');
    const displayTypes = ['عام', 'خاص', 'مقيد'];
    
    displayTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        displayType.appendChild(option);
    });
    
    // Vision Option
    const visionOption = document.getElementById('visionOption');
    const visionOptions = ['رؤية 2030', 'خطة التحول الوطني', 'برنامج جودة الحياة'];
    
    visionOptions.forEach(option => {
        const optionEl = document.createElement('option');
        optionEl.value = option;
        optionEl.textContent = option;
        visionOption.appendChild(optionEl);
    });
}
