// Confetti effect with performance optimization
window.addEventListener('load', () => {
    setTimeout(createConfetti, 500); // Reduced delay for quicker effect
});

// Create confetti
function createConfetti() {
    const rainContainer = document.querySelector('.rain-container');
    const screenWidth = window.innerWidth;
    const confettiColors = ['pink', 'purple', 'skyblue', 'yellow', 'green'];
    const confettiShapes = ['square', 'rectangle', 'circle'];
    const confettiCount = Math.min(100, Math.floor(screenWidth / 10)); // Adjust count based on screen size

    for (let i = 0; i < confettiCount; i++) {
        const confettiElement = document.createElement('div');
        confettiElement.classList.add('confetti');

        const randomColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        const randomShape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
        confettiElement.classList.add(randomColor, randomShape);

        const randomX = Math.random() * screenWidth;
        const randomDelay = Math.random() * 3;
        const randomDuration = 4 + Math.random() * 4;

        confettiElement.style.left = `${randomX}px`;
        confettiElement.style.animationDelay = `${randomDelay}s`;
        confettiElement.style.animationDuration = `${randomDuration}s`;

        rainContainer.appendChild(confettiElement);
    }
}

// Back-to-top button functionality
document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.getElementById('backToTop');
    
    const toggleBackToTop = () => {
        backToTop.classList.toggle('opacity-0', window.scrollY < 200);
        backToTop.classList.toggle('opacity-100', window.scrollY >= 200);
    };

    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => toggleBackToTop());
});