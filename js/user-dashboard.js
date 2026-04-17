/**
 * SILENSIA — USER DASHBOARD (THE SANCTUARY) LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sidebar Toggle (Mobile/Tablet)
    const sidebar = document.getElementById('dashboard-sidebar');
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



    // 2. Tab Switching Logic (Functional SPA Pattern)
    const navLinks = document.querySelectorAll('.nav-link[data-tab]');
    const tabContents = document.querySelectorAll('.dashboard-tab-content');
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
                pageTitle.textContent = (label === 'Sanctuary') ? 'Personal Sanctuary' : label;
            }

            // Close sidebar on mobile after clicking
            if (window.innerWidth <= 991) {
                document.body.classList.remove('sidebar-active');
            }

        });
    });

    // 3. Simulated Dynamic Greeting based on time
    const welcomeText = document.querySelector('.welcome-text');
    if (welcomeText) {
        const hour = new Date().getHours();
        let greeting = 'Good Morning';
        if (hour >= 12 && hour < 17) greeting = 'Good Afternoon';
        if (hour >= 17) greeting = 'Good Evening';
        
        // Preserve the name span
        const nameSpan = welcomeText.querySelector('.text-gradient');
        if (nameSpan) {
            welcomeText.innerHTML = `${greeting}, <span class="text-gradient">${nameSpan.textContent}</span>`;
        }
    }
});
