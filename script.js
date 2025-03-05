// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const cards = document.querySelectorAll('.card');
    const noResultsMessage = document.createElement('p');
    
    // Configure the "No results" message
    noResultsMessage.textContent = 'No creations match your search.';
    noResultsMessage.className = 'text-gray-500 text-center mt-4 hidden';
    document.querySelector('section').appendChild(noResultsMessage);

    // Debounce function to limit how often the search runs
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(null, args), delay);
        };
    };

    // Search function to filter cards by reason
    const filterCards = () => {
        const searchQuery = searchInput.value.toLowerCase().trim();
        let visibleCards = 0;

        cards.forEach(card => {
            const reason = card.getAttribute('data-reason').toLowerCase();
            const isVisible = reason.includes(searchQuery);
            card.style.display = isVisible ? 'block' : 'none';
            if (isVisible) visibleCards++;
        });

        // Show/hide "No results" message
        noResultsMessage.classList.toggle('hidden', visibleCards > 0);
    };

    // Attach debounced event listener to search input
    searchInput.addEventListener('input', debounce(filterCards, 300));
});