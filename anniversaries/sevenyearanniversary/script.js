// Modal functions (moved to global scope for onclick compatibility)
function showCosmicLoveCoupon() {
    showModal("🌟 My Dearest Love,\n\nThis cosmic love coupon grants you infinite hugs and kisses!\n\nLove always,\nJohn 💫💖");
}

function showStellarAffectionPass() {
    showModal("🌙 My Beautiful Star,\n\nThis pass guarantees unlimited starlit moments together!\n\nYours forever,\nJohn 🌠💝");
}

function showIntergalacticPromise() {
    showModal("🚀 My Universe,\n\nMy eternal promise to love and support you through all of space and time.\n\nEndlessly yours,\nJohn 💫");
}

function showModal(message) {
    const modal = document.getElementById('customModal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.innerHTML = message.replace(/\n/g, '<br>');
    modal.style.display = "block";
}

document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.getElementById('backToTop');

    // Close modal
    document.querySelector('.close-btn').addEventListener('click', () => {
        document.getElementById('customModal').style.display = "none";
    });

    window.addEventListener('click', (event) => {
        const modal = document.getElementById('customModal');
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Back-to-top
    const toggleBackToTop = () => {
        backToTop.classList.toggle('opacity-0', window.scrollY < 200);
        backToTop.classList.toggle('opacity-100', window.scrollY >= 200);
    };

    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', toggleBackToTop);
});