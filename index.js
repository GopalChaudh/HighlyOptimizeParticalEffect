const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let canvasWidth = canvas.width = window.innerWidth;
let canvasHeight = canvas.height = window.innerHeight;
let particlesArray = [];
let hue = 0;

window.addEventListener('resize', () => {
    canvasWidth = canvas.width = window.innerWidth;
    canvasHeight = canvas.height = window.innerHeight;
    particlesArray = [];
});

class Particle {
    constructor(event) {
        this.x = event.clientX;
        this.y = event.clientY;
        this.radius = Math.random() * 7 + 0.8;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${hue},100%,50%)`; 
    }
    draw() {
        ctx.fillStyle = this.color; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.radius >= 0.2) this.radius -= 0.2;
    }
}

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 40) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = particlesArray[j].radius / 20;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if (particlesArray[i].radius <= 0.2) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animation() {
    ctx.fillStyle = "rgba(0,0,0,0.03";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight); 
    handleParticles();
    window.requestAnimationFrame(animation);
}

animation();

window.addEventListener('mousemove', function (event) {
    for (let i = 0; i < 5; i++) {
        particlesArray.push(new Particle(event));
    }
    hue += 2;
    if (hue >= 360) hue = 0;
});
