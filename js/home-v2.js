/* ============================================================
   HOME V2 — INTERACTIVE LOGIC
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. STATS COUNTER ANIMATION
    const stats = document.querySelectorAll('.stat-value');
    
    const animateStats = () => {
      stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const updateCount = () => {
          const count = +stat.innerText;
          const speed = target / 100; // adjust speed
          
          if (count < target) {
            stat.innerText = Math.ceil(count + speed);
            setTimeout(updateCount, 20);
          } else {
            stat.innerText = target;
          }
        };
        updateCount();
      });
    };

    // Trigger stats animation when visible
    const statsSection = document.querySelector('.section-stats');
    if (statsSection) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          animateStats();
          observer.unobserve(statsSection);
        }
      }, { threshold: 0.5 });
      observer.observe(statsSection);
    }

    // 2. FAQ ACCORDION
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(i => {
            if (i !== item) i.classList.remove('active');
        });
        // Toggle current item
        item.classList.toggle('active');
      });
    });

    // 3. REVEAL ANIMATIONS (Basic Scroll-Trigger)
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
      reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // run once on load
});

// Add basic reveal styles injected via JS for simplicity if not in CSS
const style = document.createElement('style');
style.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
