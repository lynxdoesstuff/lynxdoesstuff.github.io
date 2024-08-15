const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

const mouse = {
  x: null,
  y: null,
};

window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

class Particle {
  constructor(x, y, size, color, directionX, directionY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.directionX = directionX;
    this.directionY = directionY;
    this.opacity = 1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    this.x += this.directionX;
    this.y += this.directionY;

    // Interactivity
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      this.size = 20;
      this.opacity = 0.5;
    } else {
      this.size = 5;
      this.opacity = 1;
    }

    // Fade out
    if (this.opacity < 0.1) {
      this.opacity = 0;
    } else {
      this.opacity -= 0.01;
    }

    this.draw();
  }
}

function init() {
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

init();
animate();
