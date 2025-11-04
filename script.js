function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// Close sidebar on link click (mobile)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.sidebar-item a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('open');
            }
        });
    });

    // Highlight active link based on current page
    const currentPath = window.location.pathname;
    document.querySelectorAll('.sidebar-item a').forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Handle both absolute and relative paths
        if (currentPath.endsWith(linkPath) || 
            (currentPath.endsWith('/') && linkPath === 'index.html') ||
            currentPath.includes(linkPath.replace('.html', ''))) {
            link.classList.add('active');
        }
    });
});