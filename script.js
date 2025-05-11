document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const cards = document.querySelectorAll('.card');
    const noResultsMessage = document.createElement('p');
    const sortDateAsc = document.getElementById('sortDateAsc');
    const sortDateDesc = document.getElementById('sortDateDesc');
    const backToTop = document.getElementById('backToTop');
    const section = document.querySelector('section');

    // Configure "No results" message
    noResultsMessage.textContent = 'No creations match your search.';
    noResultsMessage.className = 'text-gray-500 text-center mt-4 hidden';
    section.appendChild(noResultsMessage);

    // Debounce function
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(null, args), delay);
        };
    };

    // Filter cards by search
    const filterCards = () => {
        const searchQuery = searchInput.value.toLowerCase().trim();
        let visibleCards = 0;

        cards.forEach(card => {
            const reason = card.getAttribute('data-reason').toLowerCase();
            const isVisible = reason.includes(searchQuery);
            card.style.display = isVisible ? 'block' : 'none';
            if (isVisible) visibleCards++;
        });

        noResultsMessage.classList.toggle('hidden', visibleCards > 0);
    };

    // Sort cards by date
    const sortCards = (order) => {
        const cardArray = Array.from(cards);
        cardArray.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        });
        cardArray.forEach(card => section.appendChild(card));
    };

    // Back-to-top visibility
    const toggleBackToTop = () => {
        backToTop.classList.toggle('opacity-0', window.scrollY < 200);
        backToTop.classList.toggle('opacity-100', window.scrollY >= 200);
    };

    // Event listeners
    searchInput.addEventListener('input', debounce(filterCards, 300));
    sortDateAsc.addEventListener('click', () => sortCards('asc'));
    sortDateDesc.addEventListener('click', () => sortCards('desc'));
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', debounce(toggleBackToTop, 100));
});