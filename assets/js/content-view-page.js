/**
 * Content View Page - JavaScript Functionality
 * This script handles various actions for the content view page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const printButton = document.querySelector('.nav-btn:nth-child(2)');
    const pdfButton = document.querySelector('.nav-btn:nth-child(3)');
    const shareButton = document.querySelector('.nav-btn:nth-child(4)');
    const commentButton = document.querySelector('.nav-btn:nth-child(1)');
    
    // Print button functionality
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }
    
    // PDF button functionality
    if (pdfButton) {
        pdfButton.addEventListener('click', function() {
            generatePDF();
        });
    }
    
    // Share button functionality
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            showShareOptions();
        });
    }
    
    // Comment button functionality
    if (commentButton) {
        commentButton.addEventListener('click', function() {
            showComments();
        });
    }
    
    // Function to generate PDF
    function generatePDF() {
        // In a real implementation, you might use a library like jsPDF or call an API
        // For now, we'll just show an alert as a placeholder
        alert('جاري تحويل المستند إلى PDF...');
        
        // Simulating delay for PDF generation
        setTimeout(function() {
            // Create a fake download link
            const link = document.createElement('a');
            link.href = '#';
            link.download = 'المحلات_التجارية_ذات_الأسماء_الأجنبية.pdf';
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 1000);
    }
    
    // Function to show share options
    function showShareOptions() {
        // Create a share dialog
        const shareDialog = document.createElement('div');
        shareDialog.className = 'share-dialog';
        shareDialog.innerHTML = `
            <div class="share-dialog-content">
                <h3>مشاركة المستند</h3>
                <div class="share-options">
                    <button class="share-option" data-platform="email">
                        <i class="fas fa-envelope"></i>
                        <span>البريد الإلكتروني</span>
                    </button>
                    <button class="share-option" data-platform="whatsapp">
                        <i class="fab fa-whatsapp"></i>
                        <span>واتساب</span>
                    </button>
                    <button class="share-option" data-platform="twitter">
                        <i class="fab fa-twitter"></i>
                        <span>تويتر</span>
                    </button>
                    <button class="share-option" data-platform="copy">
                        <i class="fas fa-link"></i>
                        <span>نسخ الرابط</span>
                    </button>
                </div>
                <button class="close-dialog">إغلاق</button>
            </div>
        `;
        
        // Add styles for the dialog
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
                margin-bottom: 20px;
                text-align: center;
            }
            .share-options {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-bottom: 20px;
            }
            .share-option {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background-color: #f8f9fa;
                cursor: pointer;
                flex: 1;
                min-width: 80px;
            }
            .share-option i {
                font-size: 24px;
                margin-bottom: 5px;
            }
            .close-dialog {
                display: block;
                width: 100%;
                padding: 10px;
                background-color: #4e73df;
                color: white;
                border: none;
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
                handleShare(platform);
                document.body.removeChild(shareDialog);
            });
        });
        
        // Handle close button
        const closeButton = shareDialog.querySelector('.close-dialog');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(shareDialog);
        });
    }
    
    // Function to handle sharing based on platform
    function handleShare(platform) {
        const documentTitle = 'بشأن المحلات التجارية ذات الأسماء الأجنبية';
        const documentUrl = window.location.href;
        
        switch(platform) {
            case 'email':
                window.location.href = `mailto:?subject=${encodeURIComponent(documentTitle)}&body=${encodeURIComponent('يمكنك الإطلاع على المستند من خلال الرابط التالي: ' + documentUrl)}`;
                break;
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(documentTitle + ': ' + documentUrl)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(documentTitle)}&url=${encodeURIComponent(documentUrl)}`, '_blank');
                break;
            case 'copy':
                // Copy the URL to clipboard
                navigator.clipboard.writeText(documentUrl).then(function() {
                    alert('تم نسخ الرابط بنجاح!');
                }).catch(function() {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = documentUrl;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    alert('تم نسخ الرابط بنجاح!');
                });
                break;
        }
    }
    
    // Function to show comments
    function showComments() {
        // Create a comments dialog
        const commentsDialog = document.createElement('div');
        commentsDialog.className = 'comments-dialog';
        commentsDialog.innerHTML = `
            <div class="comments-dialog-content">
                <h3>التعليقات (5)</h3>
                <div class="comments-list">
                    <div class="comment">
                        <div class="comment-header">
                            <div class="comment-user">أحمد محمد</div>
                            <div class="comment-date">منذ 3 أيام</div>
                        </div>
                        <div class="comment-body">
                            موضوع مهم جداً ويحتاج لمزيد من الاهتمام لحماية هويتنا الوطنية.
                        </div>
                    </div>
                    <div class="comment">
                        <div class="comment-header">
                            <div class="comment-user">سارة عبدالله</div>
                            <div class="comment-date">منذ 5 أيام</div>
                        </div>
                        <div class="comment-body">
                            أتفق تماماً مع القرار، ولكن يجب مراعاة المحلات التي لديها علامات تجارية عالمية.
                        </div>
                    </div>
                    <div class="comment">
                        <div class="comment-header">
                            <div class="comment-user">خالد العتيبي</div>
                            <div class="comment-date">منذ أسبوع</div>
                        </div>
                        <div class="comment-body">
                            هل هناك استثناءات للعلامات التجارية العالمية؟
                        </div>
                    </div>
                    <div class="comment">
                        <div class="comment-header">
                            <div class="comment-user">نورة سعد</div>
                            <div class="comment-date">منذ أسبوع</div>
                        </div>
                        <div class="comment-body">
                            شكراً على التوضيح، سؤال: ما هي العقوبات المترتبة على عدم الالتزام؟
                        </div>
                    </div>
                    <div class="comment">
                        <div class="comment-header">
                            <div class="comment-user">فهد الحربي</div>
                            <div class="comment-date">منذ 10 أيام</div>
                        </div>
                        <div class="comment-body">
                            قرار صائب، لابد من الاهتمام باللغة العربية في جميع المجالات.
                        </div>
                    </div>
                </div>
                <div class="add-comment">
                    <textarea placeholder="أضف تعليقاً..."></textarea>
                    <button class="submit-comment">إرسال</button>
                </div>
                <button class="close-dialog">إغلاق</button>
            </div>
        `;
        
        // Add styles for the dialog
        const style = document.createElement('style');
        style.textContent = `
            .comments-dialog {
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
            .comments-dialog-content {
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                width: 90%;
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
            }
            .comments-dialog h3 {
                margin-bottom: 20px;
                text-align: center;
            }
            .comments-list {
                margin-bottom: 20px;
            }
            .comment {
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid #eee;
            }
            .comment-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
            }
            .comment-user {
                font-weight: bold;
            }
            .comment-date {
                color: #777;
                font-size: 0.9em;
            }
            .add-comment {
                margin-bottom: 20px;
            }
            .add-comment textarea {
                width: 100%;
                min-height: 80px;
                margin-bottom: 10px;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
                resize: vertical;
            }
            .submit-comment {
                padding: 8px 16px;
                background-color: #4e73df;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            .close-dialog {
                display: block;
                width: 100%;
                padding: 10px;
                background-color: #f8f9fa;
                color: #333;
                border: 1px solid #ddd;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 10px;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(commentsDialog);
        
        // Handle submit comment
        const submitButton = commentsDialog.querySelector('.submit-comment');
        const commentTextarea = commentsDialog.querySelector('.add-comment textarea');
        
        submitButton.addEventListener('click', function() {
            const commentText = commentTextarea.value.trim();
            if (commentText) {
                // In a real app, you would send this to a server
                alert('تم إرسال تعليقك بنجاح!');
                commentTextarea.value = '';
            } else {
                alert('يرجى كتابة تعليق قبل الإرسال');
            }
        });
        
        // Handle close button
        const closeButton = commentsDialog.querySelector('.close-dialog');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(commentsDialog);
        });
    }
});
