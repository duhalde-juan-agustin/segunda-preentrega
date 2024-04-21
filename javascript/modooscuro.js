function toggleModoOscuro() {
    const body = document.body;
    body.classList.toggle('modo-oscuro');
    const modoOscuroActivado = body.classList.contains('modo-oscuro');
    localStorage.setItem('modoOscuro', modoOscuroActivado);

    const colorModeButton = document.getElementById('color-mode');
    if (modoOscuroActivado) {
        colorModeButton.textContent = '☀️'; // Cambia el texto del botón a un sol
    } else {
        colorModeButton.textContent = '🌙'; // Cambia el texto del botón a una luna
    }
}

const modoOscuroGuardado = localStorage.getItem('modoOscuro') === 'true';
if (modoOscuroGuardado) {
    document.body.classList.add('modo-oscuro');
}
const colorModeButton = document.getElementById('color-mode');
colorModeButton.addEventListener('click', toggleModoOscuro);