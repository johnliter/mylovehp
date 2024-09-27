// Search function to filter cards by reason
document.getElementById('searchInput').addEventListener('keyup', function() {
    const searchQuery = this.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const reason = card.getAttribute('data-reason').toLowerCase();
        if (reason.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
