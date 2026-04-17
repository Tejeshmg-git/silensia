// Home v1 (Classic) Scripts

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Select elements to animate
  const animatedElements = document.querySelectorAll(
    '.service-card, .benefit-item, .step-card, .testimonial-card, .section-header, .final-cta'
  );

  animatedElements.forEach((el) => {
    // Add base reveal class
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
});
