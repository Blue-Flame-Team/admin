document.addEventListener('DOMContentLoaded', function() {
    // Get form element
    const folderForm = document.getElementById('folderForm');
    
    // Add event listener for form submission
    folderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const folderTitle = document.getElementById('folderTitle').value;
        const tableOrder = document.getElementById('tableOrder').value;
        const freeAccess = document.getElementById('freeAccess').checked;
        const displayInNewView = document.getElementById('displayInNewView').checked;
        
        // Validate form (simple validation)
        if (!folderTitle.trim()) {
            alert('الرجاء إدخال عنوان المجلد');
            return;
        }
        
        // Here you would normally send data to server
        // For demo purposes, we'll just log it
        console.log({
            title: folderTitle,
            tableOrder: tableOrder,
            freeAccess: freeAccess,
            displayInNewView: displayInNewView
        });
        
        // Success message
        alert('تم حفظ المجلد بنجاح');
        
        // Optionally redirect to content view page
        // window.location.href = "content-view.html";
    });
    
    // Breadcrumb navigation - back button behavior
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
    breadcrumbLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            // Navigate back to content view page
            window.location.href = "content-view.html";
        });
    });
});
