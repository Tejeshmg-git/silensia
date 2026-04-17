// js/contact.js
document.addEventListener("DOMContentLoaded", () => {
    // 1. Intersection Observer for Reveal animations
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Form Submission Simulation
    const contactForm = document.getElementById("silensia-contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector("button[type='submit']");
            const originalText = btn.innerText;
            
            // Loading state
            btn.innerText = "Transmitting...";
            btn.disabled = true;
            btn.style.opacity = "0.7";

            // Simulate API delay
            setTimeout(() => {
                alert("Sequence alignment initiated. Our clinical team will reach out shortly.");
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.opacity = "1";
                contactForm.reset();
            }, 1800);
        });
    }

    // 3. Leaflet Map Initialization
    const mapContainer = document.getElementById('contact-map');
    if (mapContainer) {
        // Initialize Map
        const map = L.map('contact-map', {
            center: [20, 0],
            zoom: 2,
            scrollWheelZoom: false,
            zoomControl: true
        });

        // Add Light-themed Tile Layer (Matches screenshot)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Marker Locations (Silensia Studios)
        const locations = [
            { name: "New York Studio", coords: [40.7128, -74.0060] },
            { name: "London Hub", coords: [51.5074, -0.1278] },
            { name: "Tokyo Node", coords: [35.6762, 139.6503] },
            { name: "Berlin Focus Point", coords: [52.5200, 13.4050] }
        ];

        // Add Markers
        locations.forEach(loc => {
            L.marker(loc.coords).addTo(map)
                .bindPopup(`<strong>${loc.name}</strong><br>Silensia Active Studio`);
        });
    }
});
