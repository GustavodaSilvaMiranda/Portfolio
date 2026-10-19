// Função que inicia o efeito de digitação
function iniEfDig() {
    const titleElement = document.getElementById("typing-title");
    const text = "Gustavo Miranda"; // Texto a ser "digitado"
    let index = 0;

    // Função interna que executa o efeito de digitação
    function typeEffect() {
        if (index < text.length) {
            titleElement.textContent += text.charAt(index); // Adiciona a próxima letra
            index++;
            setTimeout(typeEffect, 125); // Controla a velocidade da digitação (em milissegundos)
        }
    }

    typeEffect(); // Inicia o efeito de digitação
}

// Inicia o efeito de digitação ao carregar a página
window.addEventListener('load', iniEfDig);

// Mostra as seções quando uma parte delas entra na tela
// (antes exigia a seção inteira visível, o que nunca acontecia com seções altas no celular)
const sections = document.querySelectorAll('.animate-on-scroll');
if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    sections.forEach((section) => sectionObserver.observe(section));
} else {
    sections.forEach((section) => section.classList.add('visible'));
}

// Rolagem suave para todos os links internos (menu e botão "Saiba Mais")
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (event) {
        const href = this.getAttribute('href');
        if (href === '#') {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        const offset = window.innerWidth <= 768 ? 50 : 75;
        const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });

        // Fecha o menu no celular depois de clicar
        if (window.jQuery && this.closest('.navbar-collapse')) {
            window.jQuery('#navbarNav').collapse('hide');
        }
    });
});

// Formulário de contato: o GitHub Pages não tem servidor,
// então abre o app de e-mail do visitante com a mensagem preenchida
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const subject = `Contato pelo portfólio - ${name}`;
        const body = `${message}\n\n${name}\n${email}`;
        window.location.href = 'mailto:gustavomiranda.enterprise@gmail.com'
            + '?subject=' + encodeURIComponent(subject)
            + '&body=' + encodeURIComponent(body);
    });
}


// ==================== PARTÍCULAS DO TOPO ====================
// O canvas fica dentro do .header e ocupa só a área do topo
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
resizeCanvas();

let particlesArrey;

// Pega a posição do mouse
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener('mousemove',
    function(event) {
        // Converte para coordenadas do canvas (funciona mesmo com a página rolada)
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
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
        ctx.fillStyle = this.color;
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

        if (mouse.x !== null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if (distance > 0 && distance < mouse.radius + this.size) {
                const force = Math.max(0, (mouse.radius - distance) / mouse.radius); // valor entre 0 e 1
                const moveX = (dx / distance) * force * 5; // força moderada
                const moveY = (dy / distance) * force * 5;

                this.x -= moveX;
                this.y -= moveY;
            }
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
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size *2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size *2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#003667';

        particlesArrey.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connect() {
    // Acima de 20000 a opacidade ficaria negativa (linha invisível), então nem desenha
    const maxDistance = Math.min((canvas.width/7) * (canvas.height/7), 20000);
    ctx.lineWidth = 1;
    for (let a = 0; a < particlesArrey.length; a++) {
        for (let b = a + 1; b < particlesArrey.length; b++) {
            let dx = particlesArrey[a].x - particlesArrey[b].x;
            let dy = particlesArrey[a].y - particlesArrey[b].y;
            let distance = dx * dx + dy * dy;
            if (distance < maxDistance) {
                let opacityValue = 1 - (distance/20000);
                ctx.strokeStyle = 'rgba(0, 54, 103,' + opacityValue + ')';
                ctx.beginPath();
                ctx.moveTo(particlesArrey[a].x, particlesArrey[a].y);
                ctx.lineTo(particlesArrey[b].x, particlesArrey[b].y);
                ctx.stroke();
            }
        }
    }
}

// Só anima enquanto o topo está visível (economiza CPU/bateria ao rolar a página)
let heroVisible = true;
let animationId = null;

function animate() {
    if (!heroVisible) {
        animationId = null;
        return;
    }
    animationId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArrey.length; i++) {
        particlesArrey[i].update();
    }
    connect();
}

if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
        heroVisible = entries[0].isIntersecting;
        if (heroVisible && animationId === null) animate();
    }).observe(canvas);
}

let lastWidth = canvas.clientWidth;
window.addEventListener('resize',
    function(){
        const oldHeight = canvas.height;
        resizeCanvas();
        mouse.radius = (canvas.height/80) * (canvas.width/80);
        // No celular a barra de endereço muda só a altura ao rolar:
        // nesse caso não recria as partículas (evitava o "pulo" da animação)
        if (canvas.width !== lastWidth || Math.abs(canvas.height - oldHeight) > 150) {
            lastWidth = canvas.width;
            init();
        }
    }
);

document.addEventListener('mouseleave',
    function(){
        mouse.x = null;
        mouse.y = null;
    }
);

init();
animate();


// ==================== TRANSIÇÃO DO BOTÃO ❤️ ====================
const loveBtn = document.querySelector('.love-btn');
const transitionCanvas = document.getElementById('transition-canvas');

if (loveBtn && transitionCanvas) {
    // Efeito de fade com canvas
    loveBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Prepara o gradiente do fundo igual ao do login (no tamanho atual da tela)
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

        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = loveBtn.getAttribute('href');
        }, 800);
    });
}

// Ao voltar com o botão "voltar" do navegador, a página vem do cache ainda com o fade ativo
// (tela rosa travada). Isso remove o fade.
window.addEventListener('pageshow', function () {
    document.body.classList.remove('fade-out');
});


// Atualiza automaticamente o ano no texto
document.querySelector('.year').textContent = new Date().getFullYear();
