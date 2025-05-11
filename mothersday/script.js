// Create pollen particles
function createPollen() {
    const pollen = document.createElement('div');
    pollen.className = 'pollen';
    
    // Random size between 2px and 8px
    const size = Math.random() * 6 + 2;
    pollen.style.width = `${size}px`;
    pollen.style.height = `${size}px`;
    
    // Random position
    pollen.style.left = `${Math.random() * 100}vw`;
    pollen.style.top = `${Math.random() * 100}vh`;
    
    // Random animation
    const duration = Math.random() * 20 + 10;
    pollen.style.animation = `float ${duration}s linear infinite`;
    
    // Random delay
    pollen.style.animationDelay = `${Math.random() * 5}s`;
    
    document.body.appendChild(pollen);
    
    // Remove pollen after animation completes to prevent DOM overload
    setTimeout(() => {
        pollen.remove();
    }, duration * 1000);
}

// Create leaves
function createLeaf() {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    
    // Random size
    const size = Math.random() * 30 + 20;
    leaf.style.width = `${size}px`;
    leaf.style.height = `${size}px`;
    
    // Random position
    leaf.style.left = `${Math.random() * 100}vw`;
    leaf.style.top = `${Math.random() * 100}vh`;
    
    // Random leaf type
    const leafTypes = [
        'https://cdn.pixabay.com/photo/2017/01/31/23/42/decorative-2028039_960_720.png',
        'https://cdn.pixabay.com/photo/2017/01/31/23/42/decorative-2028044_960_720.png',
        'https://cdn.pixabay.com/photo/2017/01/31/23/42/decorative-2028045_960_720.png'
    ];
    const randomLeaf = leafTypes[Math.floor(Math.random() * leafTypes.length)];
    leaf.style.backgroundImage = `url('${randomLeaf}')`;
    
    // Random rotation
    leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Random animation
    const duration = Math.random() * 25 + 15;
    const delay = Math.random() * 5;
    leaf.style.animation = `float ${duration}s linear infinite`;
    leaf.style.animationDelay = `${delay}s`;
    
    document.body.appendChild(leaf);
    
    // Remove leaf after animation completes
    setTimeout(() => {
        leaf.remove();
    }, (duration + delay) * 1000);
}

// Create floating hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤';
    
    // Random position at bottom
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.bottom = '0';
    
    // Random size
    const size = Math.random() * 10 + 10;
    heart.style.fontSize = `${size}px`;
    
    // Random animation duration
    const duration = Math.random() * 3 + 2;
    heart.style.animationDuration = `${duration}s`;
    
    document.getElementById('hearts-container').appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Initialize animations
function initAnimations() {
    // Create initial pollen
    for (let i = 0; i < 30; i++) {
        createPollen();
    }
    
    // Create initial leaves
    for (let i = 0; i < 10; i++) {
        createLeaf();
    }
    
    // Keep creating pollen periodically
    setInterval(createPollen, 1000);
    
    // Keep creating leaves periodically
    setInterval(createLeaf, 3000);
    
    // Create hearts periodically
    setInterval(createHeart, 800);
}

// Start animations when page loads
window.onload = initAnimations;