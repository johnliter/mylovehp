// Hearts animation
const canvas = document.getElementById("hearts-canvas");
const ctx = canvas.getContext("2d");

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();

const hearts = [];
const colors = ["#ff4d6d", "#ff6b81", "#ff878d", "#ffb3c1", "#ffc2d1"];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

class Heart {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height * 0.5;
        this.size = Math.random() * 15 + 5;
        this.speedY = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = 1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(
            this.x - this.size / 2, this.y - this.size / 2,
            this.x - this.size, this.y + this.size / 3,
            this.x, this.y + this.size
        );
        ctx.bezierCurveTo(
            this.x + this.size, this.y + this.size / 3,
            this.x + this.size / 2, this.y - this.size / 2,
            this.x, this.y
        );
        ctx.closePath();
        ctx.fill();
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.opacity = Math.max(0, 1 - this.y / canvas.height);
        if (this.y > canvas.height + this.size) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
            this.opacity = 1;
        }
    }
}

function createHearts() {
    const heartCount = prefersReducedMotion ? 30 : 80;
    for (let i = 0; i < heartCount; i++) {
        hearts.push(new Heart());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => {
        if (!prefersReducedMotion) {
            heart.update();
            heart.draw();
        }
    });
    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    setCanvasSize();
    hearts.length = 0;
    createHearts();
});

window.addEventListener("load", () => {
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }
    console.log("Starting hearts animation...");
    createHearts();
    animate();
});

// Back-to-top functionality
document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.getElementById('backToTop');

    const toggleBackToTop = () => {
        backToTop.classList.toggle('opacity-0', window.scrollY < 200);
        backToTop.classList.toggle('opacity-100', window.scrollY >= 200);
    };

    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', toggleBackToTop);
});