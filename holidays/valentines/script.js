// Function to create falling hearts
function createHearts() {
    const heartsContainer = document.querySelector('.hearts');
    const numHearts = 50;
  
    for (let i = 0; i < numHearts; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
      heart.style.animationDelay = `${Math.random() * 5}s`;
      heartsContainer.appendChild(heart);
    }
  }
  
  // Call the function to create hearts
  createHearts();