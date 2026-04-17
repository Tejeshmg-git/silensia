// js/coming-soon.js
document.addEventListener("DOMContentLoaded", () => {
    // 1. Countdown Timer Logic
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 45); // Set to 45 days from now

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 2. Progress Bar Animation
    setTimeout(() => {
        const fill = document.querySelector(".progress-fill");
        if (fill) fill.style.width = "88%";
    }, 500);

    // 3. Form Simulation
    const form = document.querySelector(".waitlist-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = form.querySelector("button");
            const input = form.querySelector("input");
            
            btn.innerText = "Aligning...";
            btn.disabled = true;

            setTimeout(() => {
                alert(`Digital signal received: ${input.value}. We'll notify you when the neural sequence begins.`);
                btn.innerText = "Join Waitlist";
                btn.disabled = false;
                input.value = "";
            }, 1800);
        });
    }
});
