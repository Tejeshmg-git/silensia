// js/auth.js
document.addEventListener("DOMContentLoaded", () => {
    const authCard = document.getElementById("auth-card");
    const toggleAuthBtns = document.querySelectorAll(".toggle-auth");
    const authTitle = document.getElementById("auth-title");
    const authDesc = document.getElementById("auth-desc");
    const authSubmitBtn = document.getElementById("auth-submit-btn");
    const pwToggles = document.querySelectorAll(".pw-toggle");

    // 1. Toggle Login / Sign Up State
    toggleAuthBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (authCard.classList.contains("mode-signup")) {
                // Switching to LOGIN
                authCard.classList.remove("mode-signup");
                authTitle.innerText = "Welcome Back";
                authDesc.innerText = "Enter your credentials to access your account";
                authSubmitBtn.innerText = "Sign In";
            } else {
                // Switching to SIGN UP
                authCard.classList.add("mode-signup");
                authTitle.innerText = "Create Account";
                authDesc.innerText = "Join the Silensia neural collective today";
                authSubmitBtn.innerText = "Create Account";
            }
        });
    });

    // 2. Toggle Password Visibility
    pwToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const input = toggle.previousElementSibling;
            if (input.type === "password") {
                input.type = "text";
                toggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
            } else {
                input.type = "password";
                toggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
            }
        });
    });

    // 3. Fake Form Submission
    const authForm = document.getElementById("auth-form-internal");
    if (authForm) {
        authForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const originalText = authSubmitBtn.innerText;
            authSubmitBtn.innerText = "Authenticating...";
            authSubmitBtn.disabled = true;

            setTimeout(() => {
                const isSignup = authCard.classList.contains("mode-signup");
                alert(isSignup ? "Account established. Welcome to Silensia." : "Neural handshake successful. Welcome back.");
                authSubmitBtn.innerText = originalText;
                authSubmitBtn.disabled = false;
                
                // Redirect simulation
                window.location.href = "user-dashboard.html";
            }, 1500);
        });
    }
});
