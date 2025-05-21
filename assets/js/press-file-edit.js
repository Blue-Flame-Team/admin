/**
 * Press File Edit - Rich Text Editor Functionality
 * This script handles the functionality of the rich text editor for press file editing
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const editorContent = document.querySelector('.editor-content');
    const toolbarButtons = document.querySelectorAll('.toolbar-btn');
    const saveButtons = document.querySelectorAll('.primary-btn');
    const previewButton = document.querySelector('.save-btn');
    const cancelButton = document.querySelector('.secondary-btn');
    const deleteButton = document.querySelector('.danger-btn');
    
    // Initialize editor content with placeholder if empty
    if (editorContent.innerHTML.trim() === '') {
        editorContent.innerHTML = '';
    }
    
    // Format toolbar button click handler
    toolbarButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get command from button title or class
            const command = this.getAttribute('title');
            
            if (command) {
                // Handle specific formatting commands
                switch(command) {
                    case 'عريض':
                        document.execCommand('bold', false, null);
                        break;
                    case 'مائل':
                        document.execCommand('italic', false, null);
                        break;
                    case 'تسطير':
                        document.execCommand('underline', false, null);
                        break;
                    case 'رابط':
                        const url = prompt('أدخل عنوان الرابط:', 'https://');
                        if (url) {
                            document.execCommand('createLink', false, url);
                        }
                        break;
                    case 'صورة':
                        const imageUrl = prompt('أدخل رابط الصورة:', 'https://');
                        if (imageUrl) {
                            document.execCommand('insertImage', false, imageUrl);
                        }
                        break;
                    case 'قائمة نقطية':
                        document.execCommand('insertUnorderedList', false, null);
                        break;
                    case 'قائمة مرقمة':
                        document.execCommand('insertOrderedList', false, null);
                        break;
                    case 'محاذاة لليمين':
                        document.execCommand('justifyRight', false, null);
                        break;
                    case 'محاذاة للوسط':
                        document.execCommand('justifyCenter', false, null);
                        break;
                    case 'محاذاة للوسط':
                        if (this.classList.contains('active')) {
                            document.execCommand('justifyFull', false, null);
                        }
                        break;
                    case 'تراجع':
                        document.execCommand('undo', false, null);
                        break;
                    case 'إعادة':
                        document.execCommand('redo', false, null);
                        break;
                    case 'جدول':
                        insertTable();
                        break;
                    case 'رمز':
                        insertCode();
                        break;
                    case 'تحويل النص':
                        toggleTextDirection();
                        break;
                    default:
                        // For any other commands, try to execute directly
                        document.execCommand(command, false, null);
                }
                
                // Update toolbar state
                updateToolbarState();
            }
        });
    });
    
    // Helper functions for complex operations
    function insertTable() {
        const rows = prompt('عدد الصفوف:', '3');
        const cols = prompt('عدد الأعمدة:', '3');
        
        if (rows && cols) {
            let tableHTML = '<table border="1" style="width:100%; border-collapse: collapse;">';
            for (let i = 0; i < parseInt(rows); i++) {
                tableHTML += '<tr>';
                for (let j = 0; j < parseInt(cols); j++) {
                    tableHTML += '<td style="padding: 8px; border: 1px solid #ddd;">محتوى</td>';
                }
                tableHTML += '</tr>';
            }
            tableHTML += '</table><br>';
            
            document.execCommand('insertHTML', false, tableHTML);
        }
    }
    
    function insertCode() {
        const code = prompt('أدخل الكود:', '');
        if (code) {
            const codeHTML = '<pre style="background-color: #f5f5f5; padding: 10px; border-radius: 4px; font-family: monospace;">' + code + '</pre>';
            document.execCommand('insertHTML', false, codeHTML);
        }
    }
    
    function toggleTextDirection() {
        const selection = window.getSelection();
        if (selection.rangeCount) {
            const range = selection.getRangeAt(0);
            const selectedText = range.toString();
            
            if (selectedText) {
                // Determine current direction
                const currentDir = getComputedStyle(editorContent).direction;
                const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
                
                // Create span with the opposite direction
                const span = document.createElement('span');
                span.style.direction = newDir;
                span.innerHTML = selectedText;
                
                // Replace selection with the new span
                range.deleteContents();
                range.insertNode(span);
            }
        }
    }
    
    // Update toolbar button states based on current text selection
    function updateToolbarState() {
        const commands = {
            'bold': 'عريض',
            'italic': 'مائل',
            'underline': 'تسطير',
            'insertUnorderedList': 'قائمة نقطية',
            'insertOrderedList': 'قائمة مرقمة',
            'justifyRight': 'محاذاة لليمين',
            'justifyCenter': 'محاذاة للوسط',
            'justifyFull': 'محاذاة للوسط'
        };
        
        // Check each command state and update corresponding button
        for (const [command, title] of Object.entries(commands)) {
            const isActive = document.queryCommandState(command);
            const button = Array.from(toolbarButtons).find(btn => btn.getAttribute('title') === title);
            
            if (button) {
                if (isActive) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            }
        }
    }
    
    // Handle selection changes to update toolbar state
    editorContent.addEventListener('mouseup', updateToolbarState);
    editorContent.addEventListener('keyup', updateToolbarState);
    
    // Save button click handler
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = editorContent.innerHTML;
            
            // Here you would typically send the content to the server
            // For demonstration, show a success message
            alert('تم حفظ المحتوى بنجاح');
        });
    });
    
    // Preview button click handler
    if (previewButton) {
        previewButton.addEventListener('click', function() {
            const content = editorContent.innerHTML;
            
            // Open preview in new window/tab or modal
            const previewWindow = window.open('', '_blank');
            previewWindow.document.write(`
                <!DOCTYPE html>
                <html lang="ar" dir="rtl">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>معاينة المقال</title>
                    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
                    <style>
                        body {
                            font-family: 'Tajawal', sans-serif;
                            line-height: 1.6;
                            color: #333;
                            max-width: 800px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                    </style>
                </head>
                <body>
                    <h1>معاينة المقال</h1>
                    <div class="content">
                        ${content}
                    </div>
                </body>
                </html>
            `);
            previewWindow.document.close();
        });
    }
    
    // Cancel button click handler
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            if (confirm('هل أنت متأكد من أنك تريد إلغاء التغييرات؟')) {
                // Reload the page or reset the editor
                window.location.reload();
            }
        });
    }
    
    // Delete button click handler
    if (deleteButton) {
        deleteButton.addEventListener('click', function() {
            if (confirm('هل أنت متأكد من أنك تريد حذف هذا المقال؟ هذا الإجراء لا يمكن التراجع عنه.')) {
                // Here you would typically send a delete request to the server
                // For demonstration, redirect to a list page
                alert('تم حذف المقال بنجاح');
                // window.location.href = 'press-file-list.html'; // Redirect to list page
            }
        });
    }
    
    // Initial toolbar state update
    updateToolbarState();
});
