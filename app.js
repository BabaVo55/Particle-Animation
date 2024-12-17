const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight


const particles = [];
const numParticles = 100;
const SPEED_MULTIPLIER = 0.5;
let mouseX = null;
let mouseY = null;

const images = [
    "imgs/gojo.jpg",
    "imgs/haikyuu.jpg",
    "imgs/kakashi.jpg",
    "imgs/killua.jpg",
    "imgs/naruto.jpg",
    "imgs/saitama.jpg",
    "imgs/zoro.jpg"
];

class Particle {
    constructor(size, x, y, speedX, speedY, image){
        this.size = size;
        this.x = x;
        this.y = y;
        this.speedX = speedX * SPEED_MULTIPLIER;
        this.speedY = speedY * SPEED_MULTIPLIER;
        this.image = new Image();
        this.image.src = image
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x + this.size > canvas.width || this.x < 0){
            this.speedX = -this.speedX;
        }
        if (this.y + this.size > canvas.height || this.speedY < 0){
            this.speedY = -this.speedY;
        }

        if (mouseX !== null && mouseY !== null){
            const dist = Math.hypot(mouseX - this.x, mouseY - this.y)

            if (dist < 150) {
                const angle = Math.atan2(this.y - mouseY, this.x - mouseX);
                this.x += Math.cos(angle) * 2;
                this.y += Math.sin(angle) * 2;

                if (this.x < 0) 
                    this.x = 0;
                if (this.x + this.size > canvas.width) 
                    this.x = canvas.width - this.size;
                if (this.y < 0) 
                    this.y = 0;
                if (this.y + this.size > canvas.height) 
                    this.y = canvas.height - this.size
            }
        }
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
}

function init(){
    for (let i = 0; i < numParticles; i++){
        const size = 40 * Math.random() * 20;
        const x = Math.random() * (canvas.width - size);
        const y = Math.random() * (canvas.height - size);
        const speedX = Math.random() - 0.5;
        const speedY = Math.random() - 0.5;
        const image = images[Math.floor(Math.random() * image.length)];
        particles.push(new Particle(size, x, y, speedX, speedY, image))
    }
}

function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    numParticles.forEach((particle) => {
        particle.update()
        particle.draw();

    })
    requestAnimationFrame(animate)
}

init()
animate()
