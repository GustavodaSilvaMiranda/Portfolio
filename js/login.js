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

// ==================== LOGIN (PÁGINA DE SENHA) ====================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const senhaInput = document.getElementById('senha');
  const message = document.getElementById('login-message');

  // Se não estiver na página de login, simplesmente não faz nada
  if (form && senhaInput && message) {
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
  }

  // ==================== CONTADOR DE NAMORO ====================
  // IDs usados na Surpresa: anosN, mesesN, diasN, horasN, minutosN, segundosN
  const anosN     = document.getElementById('anosN');
  const mesesN    = document.getElementById('mesesN');
  const diasN     = document.getElementById('diasN');
  const horasN    = document.getElementById('horasN');
  const minutosN  = document.getElementById('minutosN');
  const segundosN = document.getElementById('segundosN');

  // funçãozinha de plural
  function p(n, s, p) {
    return `${n} ${n === 1 ? s : p}`;
  }

  if (anosN && mesesN && diasN && horasN && minutosN && segundosN) {
    function atualizarNamoro() {
      // 04/11/2024 às 15:15:15 (mês 10 = novembro)
      const inicio = new Date(2024, 10, 4, 15, 15, 15);
      const agora = new Date();

      let a   = agora.getFullYear() - inicio.getFullYear();
      let m   = agora.getMonth()    - inicio.getMonth();
      let d   = agora.getDate()     - inicio.getDate();
      let h   = agora.getHours()    - inicio.getHours();
      let min = agora.getMinutes()  - inicio.getMinutes();
      let s   = agora.getSeconds()  - inicio.getSeconds();

      if (s < 0)   { s += 60;   min--; }
      if (min < 0) { min += 60; h--;   }
      if (h < 0)   { h += 24;   d--;   }

      if (d < 0) {
        m--;
        const diasMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
        d += diasMesAnterior;
      }

      if (m < 0) { m += 12; a--; }

      anosN.textContent     = p(a,  'ano',     'anos');
      mesesN.textContent    = p(m,  'mês',     'meses');
      diasN.textContent     = p(d,  'dia',     'dias');
      horasN.textContent    = p(h,  'hora',    'horas');
      minutosN.textContent  = p(min,'minuto',  'minutos');
      segundosN.innerHTML   = `${p(s, 'segundo', 'segundos')} juntos <span title="E pela eternidade ❤️" style="cursor: help;">&#10084;&#65039;*</span>`;
    }

    atualizarNamoro();
    setInterval(atualizarNamoro, 1000);
  }

  // ==================== COUNTDOWN CASAMENTO ====================
  const faltamDias     = document.getElementById('faltamDias');
  const faltamHoras    = document.getElementById('faltamHoras');
  const faltamMinutos  = document.getElementById('faltamMinutos');
  const faltamSegundos = document.getElementById('faltamSegundos');

  if (faltamDias && faltamHoras && faltamMinutos && faltamSegundos) {
    // 06/09/2026 às 15:00 (mês 8 = setembro)
    const casamento = new Date(2026, 8, 6, 15, 0, 0);

    function atualizarNoivado() {
      const agora = new Date();
      let diff = casamento - agora;

      if (diff <= 0) {
        faltamDias.textContent     = "É HOJE! 💍";
        faltamHoras.textContent    = "";
        faltamMinutos.textContent  = "";
        faltamSegundos.textContent = "";
        return;
      }

      const totalSeg = Math.floor(diff / 1000);
      const d  = Math.floor(totalSeg / 86400);
      const h  = Math.floor((totalSeg % 86400) / 3600);
      const m  = Math.floor((totalSeg % 3600)  / 60);
      const s  = totalSeg % 60;

      faltamDias.textContent     = p(d, 'dia', 'dias');
      faltamHoras.textContent    = p(h, 'hora', 'horas');
      faltamMinutos.textContent  = p(m, 'minuto', 'minutos');
      faltamSegundos.textContent = p(s, 'segundo', 'segundos');
    }

    atualizarNoivado();
    setInterval(atualizarNoivado, 1000);
  }
});
