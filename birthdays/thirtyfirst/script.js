// Confetti effect with slight delay for optimization
window.addEventListener('load', function() {
    setTimeout(createConfetti, 1000); // Delay the confetti by 1 second after page load
});

function createConfetti() {
    const rainContainer = document.querySelector('.rain-container');
    const screenWidth = window.innerWidth;

    const confettiColors = ['pink', 'purple', 'skyblue', 'yellow', 'green'];
    const confettiShapes = ['square', 'rectangle', 'circle'];

    for (let i = 0; i < 100; i++) { // Number of confetti pieces
        const confettiElement = document.createElement('div');
        confettiElement.classList.add('confetti');

        // Randomly assign a color and shape
        const randomColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        const randomShape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
        
        confettiElement.classList.add(randomColor);
        confettiElement.classList.add(randomShape);

        // Randomize horizontal position (left), animation delay, and duration
        const randomX = Math.random() * screenWidth;
        const randomDelay = Math.random() * 5; // Delay before falling (0s to 5s)
        const randomDuration = 3 + Math.random() * 5; // Fall duration (3s to 8s)

        confettiElement.style.left = `${randomX}px`;
        confettiElement.style.animationDelay = `${randomDelay}s`;
        confettiElement.style.animationDuration = `${randomDuration}s`;

        rainContainer.appendChild(confettiElement);
    }
}