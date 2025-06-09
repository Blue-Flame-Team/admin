document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const closeBtn = document.querySelector('.close-sidebar');
    const menuBtn = document.querySelector('.menu-toggle');
    const overlay = document.querySelector('.sidebar-overlay');

    function toggleSidebar() {
        sidebar.classList.toggle('hide');
        mainContent.classList.toggle('sidebar-visible');
        menuBtn.classList.toggle('hide');
        overlay.classList.toggle('show');
    }

    closeBtn.addEventListener('click', toggleSidebar);
    menuBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // Show sidebar and hide menu button by default
    mainContent.classList.add('sidebar-visible');
    menuBtn.classList.add('hide');
});
