const canvas = document.createElement('canvas');
canvas.className = 'particle-canvas';
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const mouse = {
  x: null,
  y: null,
};

// Update mouse position on mousemove
window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

// Handle window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Reinitialize particles to fit the new canvas size
  init();
});

class Particle {
  constructor(x, y, size, color, directionX, directionY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.directionX = directionX;
    this.directionY = directionY;
  }

  distance() {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  update() {
    const distance = this.distance();

    // Check if the particle is close to the mouse
    if (distance < 100) {
      const angle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
      this.directionX = -Math.cos(angle);
      this.directionY = -Math.sin(angle);
    }

    this.x += this.directionX;
    this.y += this.directionY;

    // Ensure particles stay within bounds
    if (this.x < 0 || this.x > canvas.width) this.directionX = -this.directionX;
    if (this.y < 0 || this.y > canvas.height) this.directionY = -this.directionY;

    this.draw();
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function init() {
  particles.length = 0; // Clear the existing particles
  for (let i = 0; i < 100; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let directionX = Math.random() * 2 - 1;
    let directionY = Math.random() * 2 - 1;
    let color = 'white';
    particles.push(new Particle(x, y, size, color, directionX, directionY));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
  }
}

// Initialize particles and start animation
init();
animate();
