/**
 * SILENSIA — ADMIN DASHBOARD LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sidebar Toggle (Mobile/Tablet)
    const sidebar = document.getElementById('admin-sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-active');
        });
    }

    const closeBtn = document.getElementById('sidebar-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.body.classList.remove('sidebar-active');
        });
    }



    // 2. Tab Switching Logic
    const navLinks = document.querySelectorAll('.nav-link[data-tab]');
    const tabContents = document.querySelectorAll('.admin-tab-content');
    const pageTitle = document.querySelector('.page-title');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');

            // Update Nav Links
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Update Tab Content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `tab-${tabId}`) {
                    content.classList.add('active');
                }
            });

            // Update Topbar Title
            if (pageTitle) {
                const label = link.querySelector('.nav-label').textContent;
                pageTitle.textContent = label === 'Overview' ? 'Platform Overview' : label;
            }

            // Close sidebar on mobile after clicking
            if (window.innerWidth <= 991) {
                document.body.classList.remove('sidebar-active');
            }

        });
    });

    // 3. Simple Counter Animation for KPIs (Mock)
    const kpiValues = document.querySelectorAll('.kpi-value');
    kpiValues.forEach(el => {
        // Just a simple fade-in effect for now
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.transition = 'opacity 1s ease';
            el.style.opacity = '1';
        }, 300);
    });

    // 3. Search Feedback
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                alert(`Search initiated for: ${searchInput.value}`);
                // In a real app, this would filter the table or navigate
            }
        });
    }
});
