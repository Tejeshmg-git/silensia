// js/services.js
document.addEventListener("DOMContentLoaded", () => {
  // 1. Intersection Observer for standard .reveal elements
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length > 0) {
    const revealOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // 2. FAQ Accordion Logic
  const accordionBtns = document.querySelectorAll(".accordion-btn, .accordion-btn-v2");
  
  if (accordionBtns.length > 0) {
    accordionBtns.forEach(btn => {
      btn.addEventListener("click", function() {
        const isV2 = this.classList.contains('accordion-btn-v2');
        const itemClass = isV2 ? '.accordion-item-v2' : '.accordion-item';
        const activeClass = 'active';
        const contentClass = isV2 ? '.accordion-content-v2' : '.accordion-content';

        const item = this.parentElement;
        const content = this.nextElementSibling;
        
        // Close other items
        const allItems = document.querySelectorAll(itemClass);
        allItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains(activeClass)) {
             otherItem.classList.remove(activeClass);
             otherItem.querySelector(contentClass).style.maxHeight = null;
          }
        });

        // Toggle current item
        item.classList.toggle(activeClass);

        if (item.classList.contains(activeClass)) {
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.style.maxHeight = null;
        }
      });
    });
  }
});
