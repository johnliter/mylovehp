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

// Close button functionality
document.querySelector('.close-btn').onclick = function() {
    document.getElementById('customModal').style.display = "none";
}

// Click outside modal to close
window.onclick = function(event) {
    const modal = document.getElementById('customModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}