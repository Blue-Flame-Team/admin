/**
 * button-links.js
 * Archivo para manejar los enlaces de botones en la página principal y otras páginas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Función para inicializar los enlaces de los botones
    function initializeButtonLinks() {
        // Botón de "إضافة جديد" (Agregar nuevo) en la parte superior
        const addNewBtn = document.querySelector('.add-btn');
        if (addNewBtn) {
            addNewBtn.addEventListener('click', function() {
                window.location.href = 'assets/pages/document-add.html';
            });
            // Agregar estilos de enlace
            addNewBtn.style.cursor = 'pointer';
            addNewBtn.setAttribute('title', 'إضافة مستند جديد');
        }

        // Botones "عرض الكل" (Ver todo) en las secciones de widgets
        const viewAllButtons = document.querySelectorAll('.widget-actions button, .section-header button');
        viewAllButtons.forEach(button => {
            if (button.innerText.includes('عرض الكل')) {
                button.style.cursor = 'pointer';
                
                // Determinar la URL basada en el contexto del botón
                let targetUrl = '';
                const parentWidget = button.closest('.widget, .section-header');
                
                if (parentWidget) {
                    if (parentWidget.closest('#recent-activities-widget') || parentWidget.closest('.recent-activities')) {
                        targetUrl = 'assets/pages/activity-log.html';
                        button.setAttribute('title', 'عرض سجل النشاطات الكامل');
                    } else if (parentWidget.closest('#visits-chart-widget') || parentWidget.closest('.visits-chart')) {
                        targetUrl = 'assets/pages/visitor-log.html';
                        button.setAttribute('title', 'عرض سجل الزيارات الكامل');
                    } else if (parentWidget.closest('.documents-section')) {
                        targetUrl = 'assets/pages/documents-list.html';
                        button.setAttribute('title', 'عرض قائمة المستندات الكاملة');
                    }
                }
                
                if (targetUrl) {
                    button.addEventListener('click', function() {
                        window.location.href = targetUrl;
                    });
                }
            }
        });

        // Botones de acción en la tabla de documentos
        const actionButtons = document.querySelectorAll('.documents-table .actions button');
        actionButtons.forEach(button => {
            const row = button.closest('tr');
            let documentId = '';
            
            // Obtener el ID del documento de la fila
            if (row) {
                const idCell = row.querySelector('td:first-child');
                if (idCell) {
                    documentId = idCell.textContent.trim();
                }
            }
            
            if (documentId) {
                if (button.classList.contains('btn-view')) {
                    button.addEventListener('click', function() {
                        window.location.href = `assets/pages/document-view.html?id=${documentId}`;
                    });
                    button.setAttribute('title', 'عرض المستند');
                } else if (button.classList.contains('btn-edit')) {
                    button.addEventListener('click', function() {
                        window.location.href = `assets/pages/document-edit.html?id=${documentId}`;
                    });
                    button.setAttribute('title', 'تعديل المستند');
                } else if (button.classList.contains('btn-delete')) {
                    button.addEventListener('click', function() {
                        confirmDelete(documentId);
                    });
                    button.setAttribute('title', 'حذف المستند');
                }
                
                button.style.cursor = 'pointer';
            }
        });
    }

    // Función para confirmar la eliminación de un documento
    window.confirmDelete = function(documentId) {
        if (confirm(`هل أنت متأكد من رغبتك في حذف المستند ${documentId}؟`)) {
            alert(`تم حذف المستند ${documentId} بنجاح.`);
            // Aquí se implementaría la lógica real de eliminación
        }
    };

    // Inicializar los enlaces de los botones
    initializeButtonLinks();
});
