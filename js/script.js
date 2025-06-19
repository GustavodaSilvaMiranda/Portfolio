// Função que inicia o efeito de digitação
function iniEfDig() {
    const titleElement = document.getElementById("typing-title");
    const text = "Gustavo Miranda"; // Texto a ser "digitado"
    let index = 0;

    // Função interna que executa o efeito de digitação
    function typeEffect() {
        if (index < text.length) {
            titleElement.innerHTML += text.charAt(index); // Adiciona a próxima letra
            index++;
            setTimeout(typeEffect, 125); // Controla a velocidade da digitação (em milissegundos)
        }
    }

    typeEffect(); // Inicia o efeito de digitação
}

function isElInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateOnScroll() {
    const sections = document.querySelectorAll('.animate-on-scroll');

    sections.forEach((section) => {
        if (isElInViewport(section)) {
            section.classList.add('visible');
        }
    });
}

document.querySelector('a[href="#sobre"]').addEventListener('click', function (event) {
    event.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const offset = window.innerWidth <= 768 ? 50 : 75;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
});

window.addEventListener('scroll', animateOnScroll)
window.addEventListener('load', animateOnScroll)

// Inicia o efeito de digitação ao carregar a página
window.onload = iniEfDig;


const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArrey;

// Pega a posição do mouse
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

//Criando a particula
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    //metodo para fazer individuais
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#003667';
        ctx.fill();
    }
    //checa a posição da particula e do mouse
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size) {
            const force = (mouse.radius - distance) / mouse.radius; // valor entre 0 e 1
            const moveX = (dx / distance) * force * 5; // força moderada
            const moveY = (dy / distance) * force * 5;

            this.x -= moveX;
            this.y -= moveY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArrey = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size *2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size *2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#003667';

        particlesArrey.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArrey.length; a++) {
        for (let b = a; b < particlesArrey.length; b++) {
            let distance = (( particlesArrey[a].x - particlesArrey[b].x) * (particlesArrey[a].x - particlesArrey[b].x)) + ((particlesArrey[a].y - particlesArrey[b].y) * (particlesArrey[a].y - particlesArrey[b].y));
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle = 'rgba(0, 54, 103,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArrey[a].x, particlesArrey[a].y);
                ctx.lineTo(particlesArrey[b].x, particlesArrey[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArrey.length; i++) {
        particlesArrey[i].update();
    }
    connect();
}

window.addEventListener('resize',
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas,height/80) * (canvas.height/80));
        init();
    }
);

window.addEventListener('mouseout',
    function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }
);

document.addEventListener('DOMContentLoaded', () => {
  const loveBtn = document.querySelector('.love-btn');
  const transitionCanvas = document.getElementById('transition-canvas');

  if (loveBtn && transitionCanvas) {
    // Prepara o gradiente do fundo igual ao do login
    const tCtx = transitionCanvas.getContext('2d');
    transitionCanvas.width = window.innerWidth;
    transitionCanvas.height = window.innerHeight;

    const gradient = tCtx.createRadialGradient(
      transitionCanvas.width / 2,
      transitionCanvas.height / 2,
      100,
      transitionCanvas.width / 2,
      transitionCanvas.height / 2,
      transitionCanvas.width
    );
    gradient.addColorStop(0, '#ffccd5'); // cor clara
    gradient.addColorStop(1, '#b33951'); // cor escura

    tCtx.fillStyle = gradient;
    tCtx.fillRect(0, 0, transitionCanvas.width, transitionCanvas.height);

    // Efeito de fade com canvas
    loveBtn.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = loveBtn.getAttribute('href');
      }, 800);
    });
  }
});



// Atualiza automaticamente o ano no texto
document.querySelector('.year').textContent = new Date().getFullYear();
    


init();
animate();