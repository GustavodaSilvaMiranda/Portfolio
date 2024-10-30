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

window.addEventListener('scroll', animateOnScroll)
window.addEventListener('load', animateOnScroll)

// Inicia o efeito de digitação ao carregar a página
window.onload = iniEfDig;