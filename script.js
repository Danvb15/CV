// Secciones plegables
const sectionsHeaders = document.querySelectorAll('.section h2');
sectionsHeaders.forEach(sec => {
    sec.addEventListener('click', () => {
        const content = sec.nextElementSibling;
        const icon = sec.querySelector('.toggle-icon');
        content.classList.toggle('collapsed');
        icon.classList.toggle('rotate');
    });
});

// Animación de entrada (fade + slide + scale + blur)
const fadeElems = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', () => {
    fadeElems.forEach(el => {
        const rect = el.getBoundingClientRect();
        if(rect.top < window.innerHeight - 50) el.classList.add('show');
    });
});

// Efecto parallax solo para background-deco
const sections = document.querySelectorAll('.section');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    sections.forEach(sec => {
        const deco = sec.querySelector('.background-deco');
        const speed = parseFloat(sec.dataset.speed) || 0.2;
        if(deco) {
            deco.style.transform = `translateY(${scrollY * speed}px)`;
        }
    });
});

// Partículas fondo
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for(let i=0;i<100;i++){
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*2+1,
        dx: (Math.random()-0.5)*0.5,
        dy: (Math.random()-0.5)*0.5
    });
}

function animateParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle="rgba(255,255,255,0.6)";
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if(p.x>canvas.width)p.x=0; if(p.x<0)p.x=canvas.width;
        if(p.y>canvas.height)p.y=0; if(p.y<0)p.y=canvas.height;
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
