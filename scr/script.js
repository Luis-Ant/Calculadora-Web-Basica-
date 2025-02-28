// Variables globales
let displayValue = "0.00";
let historial = [];

// Vincular eventos a botones
document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".btn");
    botones.forEach(boton => {
        boton.addEventListener("click", manejarClic);
    });
});

// Función para manejar clics
function manejarClic(evento) {
    const valorBoton = evento.target.textContent;
    console.log("Botón presionado:", valorBoton); // Debug
}