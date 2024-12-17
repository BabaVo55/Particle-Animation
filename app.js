// Get the canvas element and its 2D rendering context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions to match the viewport
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to store particle objects
const particles = [];
const numParticles = 100; // Total number of particles
const SPEED_MULTIPLIER = 0.5; // Reduces particle speed
let mouseX = null; // Tracks the current mouse X position
let mouseY = null; // Tracks the current mouse Y position

// Array of image paths for the particles
const images = [
    "imgs/gojo.jpg",
    "imgs/haikyuu.jpg",
    "imgs/kakashi.jpg",
    "imgs/killua.jpg",
    "imgs/naruto.jpg",
    "imgs/saitama.jpg",
    "imgs/zoro.jpg",
];

// Class to represent a single particle
class Particle {
    constructor(size, x, y, speedX, speedY, image) {
        this.size = size; // Particle size (width/height)
        this.x = x; // X-coordinate of the particle
        this.y = y; // Y-coordinate of the particle
        this.speedX = speedX * SPEED_MULTIPLIER; // Horizontal speed
        this.speedY = speedY * SPEED_MULTIPLIER; // Vertical speed
        this.image = new Image(); // Create an image object for the particle
        this.image.src = image; // Set the source of the image

        // Set a flag to indicate when the image is fully loaded
        this.image.onload = () => {
            this.loaded = true;
        };
        this.loaded = false; // Initially, the image is not loaded
    }

    // Update the particle's position and handle collisions
    update() {
        this.x += this.speedX; // Update X position based on speed
        this.y += this.speedY; // Update Y position based on speed

        // Reverse direction if the particle hits the canvas edges
        if (this.x + this.size > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y + this.size > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }

        // If the mouse is on the canvas, calculate interaction
        if (mouseX !== null && mouseY !== null) {
            const dist = Math.hypot(mouseX - this.x, mouseY - this.y); // Distance between particle and mouse

            if (dist < 150) { // If the particle is within 150px of the mouse
                const angle = Math.atan2(this.y - mouseY, this.x - mouseX); // Angle between particle and mouse
                this.x += Math.cos(angle) * 2; // Push particle away in X direction
                this.y += Math.sin(angle) * 2; // Push particle away in Y direction

                // Ensure the particle doesn't move out of canvas bounds
                if (this.x < 0) this.x = 0;
                if (this.x + this.size > canvas.width) this.x = canvas.width - this.size;
                if (this.y < 0) this.y = 0;
                if (this.y + this.size > canvas.height) this.y = canvas.height - this.size;
            }
        }
    }

    // Draw the particle on the canvas
    draw() {
        if (this.loaded) { // Only draw the particle if its image is fully loaded
            ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        }
    }
}

// Initialize the particles array
function init() {
    particles.length = 0; // Clear any existing particles
    for (let i = 0; i < numParticles; i++) {
        const size = 100 + Math.random() * 20; // Random size between 100 and 120
        const x = Math.random() * (canvas.width - size); // Random X position
        const y = Math.random() * (canvas.height - size); // Random Y position
        const speedX = Math.random() - 0.5; // Random horizontal speed (-0.5 to 0.5)
        const speedY = Math.random() - 0.5; // Random vertical speed (-0.5 to 0.5)
        const image = images[Math.floor(Math.random() * images.length)]; // Random image from the array
        particles.push(new Particle(size, x, y, speedX, speedY, image)); // Create and add a new particle
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    particles.forEach((particle) => {
        particle.update(); // Update each particle's position
        particle.draw(); // Draw each particle
    });
    requestAnimationFrame(animate); // Request the next frame
}

// Event listener to handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth; // Update canvas width
    canvas.height = window.innerHeight; // Update canvas height
    init(); // Reinitialize particles to fit new dimensions
});

// Event listener to track mouse movement
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; // Update mouse X coordinate
    mouseY = e.clientY; // Update mouse Y coordinate
});

// Event listener to reset mouse position when it leaves the canvas
window.addEventListener('mouseleave', () => {
    mouseX = null; // Reset mouse X to null
    mouseY = null; // Reset mouse Y to null
});

// Start the animation
init(); // Initialize the particles
animate(); // Start the animation loop





// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// const particles = [];
// const numParticles = 100;
// const SPEED_MULTIPLIER = 0.5;
// let mouseX = null;
// let mouseY = null;

// const images = [
//     "imgs/gojo.jpg",
//     "imgs/haikyuu.jpg",
//     "imgs/kakashi.jpg",
//     "imgs/killua.jpg",
//     "imgs/naruto.jpg",
//     "imgs/saitama.jpg",
//     "imgs/zoro.jpg"
// ];

// class Particle {
//     constructor(size, x, y, speedX, speedY, image) {
//         this.size = size;
//         this.x = x;
//         this.y = y;
//         this.speedX = speedX * SPEED_MULTIPLIER;
//         this.speedY = speedY * SPEED_MULTIPLIER;
//         this.image = new Image();
//         this.image.src = image;

//         this.image.onload = () => {
//             this.loaded = true;
//         };
//         this.loaded = false;
//     }

//     update() {
//         this.x += this.speedX;
//         this.y += this.speedY;

//         if (this.x + this.size > canvas.width || this.x < 0) {
//             this.speedX = -this.speedX;
//         }
//         if (this.y + this.size > canvas.height || this.y < 0) {
//             this.speedY = -this.speedY;
//         }

//         if (mouseX !== null && mouseY !== null) {
//             const dist = Math.hypot(mouseX - this.x, mouseY - this.y);

//             if (dist < 150) {
//                 const angle = Math.atan2(this.y - mouseY, this.x - mouseX);
//                 this.x += Math.cos(angle) * 2;
//                 this.y += Math.sin(angle) * 2;

//                 if (this.x < 0) this.x = 0;
//                 if (this.x + this.size > canvas.width) this.x = canvas.width - this.size;
//                 if (this.y < 0) this.y = 0;
//                 if (this.y + this.size > canvas.height) this.y = canvas.height - this.size;
//             }
//         }
//     }

//     draw() {
//         if (this.loaded) {
//             ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
//         }
//     }
// }

// function init() {
//     particles.length = 0; // Clear existing particles
//     for (let i = 0; i < numParticles; i++) {
//         const size = 40 + Math.random() * 20;
//         const x = Math.random() * (canvas.width - size);
//         const y = Math.random() * (canvas.height - size);
//         const speedX = Math.random() - 0.5;
//         const speedY = Math.random() - 0.5;
//         const image = images[Math.floor(Math.random() * images.length)];
//         particles.push(new Particle(size, x, y, speedX, speedY, image));
//     }
// }

// function animate() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     particles.forEach((particle) => {
//         particle.update();
//         particle.draw();
//     });
//     requestAnimationFrame(animate);
// }

// window.addEventListener('resize', () => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     init(); // Reinitialize particles on resize
// });

// window.addEventListener('mousemove', (e) => {
//     mouseX = e.clientX;
//     mouseY = e.clientY;
// });

// window.addEventListener('mouseleave', () => {
//     mouseX = null;
//     mouseY = null;
// });

// init();
// animate();
