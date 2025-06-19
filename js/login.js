const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 80) * (canvas.width / 80)
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Particle {
  constructor(x, y, directionX, directionY, size) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
  }

  draw() {
    ctx.font = `${this.size * 5}px Arial`;
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("❤", this.x, this.y);
  }

  update() {
    if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
    if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

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
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 7000;

  for (let i = 0; i < numberOfParticles; i++) {
    let size = (Math.random() * 5) + 1;
    let x = (Math.random() * (canvas.width - size * 2)) + size * 2;
    let y = (Math.random() * (canvas.height - size * 2)) + size * 2;
    let directionX = (Math.random() * 5) - 2.5;
    let directionY = (Math.random() * 5) - 2.5;
    particlesArray.push(new Particle(x, y, directionX, directionY, size));
  }
}

function connect() {
  let opacityValue = 1;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = dx * dx + dy * dy;

      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        opacityValue = 1 - (distance / 20000);
        ctx.strokeStyle = `rgba(130, 0, 0, ${opacityValue})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  connect(); // Desenha as linhas primeiro
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update(); // Depois desenha os corações por cima
  }
}

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = (canvas.height / 80) * (canvas.width / 80);
  init();
});

window.addEventListener("mouseout", () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

init();
animate();

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const senhaInput = document.getElementById('senha');
  const message = document.getElementById('login-message');

  form.addEventListener('submit', function (e) {
  e.preventDefault();

  const senhaCorreta = "04112024";

  if (senhaInput.value === senhaCorreta) {
      message.textContent = "Senha correta! ❤️ Bem-vinda!";
      message.style.color = "green";

      setTimeout(() => {
        window.location.href = "Surpresa.html";
      }, 3000); // 3 segundos de espera
    } else {
      message.textContent = "Senha incorreta. Tente novamente.";
      message.style.color = "red";
    }
  });
});

// Contador de tempo desde 04/11/2024

document.addEventListener('DOMContentLoaded', () => {
  const contador = document.getElementById('contador-surpresa');

  if (contador) {
    function atualizarContador() {
      const dataInicial = new Date('2024-11-04T15:15:15');
      const agora = new Date();

      let anos = agora.getFullYear() - dataInicial.getFullYear();
      let meses = agora.getMonth() - dataInicial.getMonth();
      let dias = agora.getDate() - dataInicial.getDate();
      let horas = agora.getHours() - dataInicial.getHours();
      let minutos = agora.getMinutes() - dataInicial.getMinutes();
      let segundos = agora.getSeconds() - dataInicial.getSeconds();

      if (segundos < 0) {
        segundos += 60;
        minutos--;
      }
      if (minutos < 0) {
        minutos += 60;
        horas--;
      }
      if (horas < 0) {
        horas += 24;
        dias--;
      }
      if (dias < 0) {
        meses--;
        const ultimoMes = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
        dias += ultimoMes;
      }
      if (meses < 0) {
        meses += 12;
        anos--;
      }

      document.getElementById('anos').textContent = `${anos} ano${anos !== 1 ? 's' : ''}`;
      document.getElementById('meses').textContent = `${meses} mês${meses !== 1 ? 'es' : ''}`;
      document.getElementById('dias').textContent = `${dias} dia${dias !== 1 ? 's' : ''}`;
      document.getElementById('horas').textContent = `${horas} hora${horas !== 1 ? 's' : ''}`;
      document.getElementById('minutos').textContent = `${minutos} minuto${minutos !== 1 ? 's' : ''}`;
      document.getElementById('segundos').innerHTML = `${segundos} segundo${segundos !== 1 ? 's' : ''} juntos <span title="E pela eternidade ❤️" style="cursor: help;">&#10084;&#65039;*</span>`;
    }

    atualizarContador();
    setInterval(atualizarContador, 1000);
  }
});