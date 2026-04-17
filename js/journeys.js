/**
 * Silensia - Journeys Page Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Add 'active' class when element comes into view
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); 
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 2. Journey Category Filtering logic
  const filterPills = document.querySelectorAll('.filter-pills .pill');
  const programCards = document.querySelectorAll('.program-card');

  if (filterPills.length > 0 && programCards.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        // Remove active class from all pills
        filterPills.forEach(p => p.classList.remove('active'));
        // Add active to clicked
        pill.classList.add('active');

        const filterValue = pill.getAttribute('data-filter');

        programCards.forEach(card => {
          if (filterValue === 'all') {
            card.style.display = 'grid'; // because we use grid in CSS
            // Re-trigger animation
            card.classList.remove('active');
            setTimeout(() => card.classList.add('active'), 50);
          } else {
            if (card.getAttribute('data-category') === filterValue) {
              card.style.display = 'grid';
              card.classList.remove('active');
              setTimeout(() => card.classList.add('active'), 50);
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }

  // 3. Audio Player mock animation
  const playBtn = document.querySelector('.preview-play-btn');
  const waveBars = document.querySelectorAll('.wave-bar');
  let isPlaying = false;

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      playBtn.textContent = isPlaying ? '⏸' : '▶';

      waveBars.forEach(bar => {
        if (isPlaying) {
          // add random heights to animate
          setInterval(() => {
            if(isPlaying) {
               bar.style.height = Math.floor(Math.random() * 30 + 10) + 'px';
               bar.classList.add('active');
            }
          }, 200);
        } else {
          bar.style.height = '10px';
          bar.classList.remove('active');
        }
      });
    });
  }

});
