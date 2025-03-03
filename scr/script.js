// Variables globales
let displayValue = "0.00";  // Almacena el valor actual del display
let operacionActual = "";   // Guarda la operación en curso
let historial = [];         // Array para el historial de operaciones

document.addEventListener("DOMContentLoaded", () => {
    // Vincular todos los botones a la función manejarClic
    const botones = document.querySelectorAll(".btn");
    botones.forEach(boton => boton.addEventListener("click", manejarClic));
    
    // Inicializar display
    actualizarDisplay();
});

document.getElementById('img-bor').addEventListener('click', function(event) {
    event.stopPropagation();
    document.getElementById('btn-bor').click();
});

// Función para manejar clics
function manejarClic(evento) {
    const valorBoton = evento.target.value;

    switch (valorBoton) {
        case "BOR":
            borrarUltimoDigito();
            break;
        case "DEL":
            borrarOperacionEscrita();
            break;
        case "CLR":
            borrarTodo();
            break;
        case "=":
            calcularResultado();
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            agregarOperador(valorBoton);
            break;
        default:
            if (esNumero(valorBoton)) {
                agregarNumero(valorBoton);
            }
            break;
    }
}

// Funcion actualizarDisplay
function actualizarDisplay() {
    document.querySelector(".display").textContent = displayValue;
}

// Verificar si es numero u operador
function esNumero(valor) {
    return !isNaN(valor) || valor === ".";
}

// Agregar numeros al display
function agregarNumero(numero) {
    if (displayValue === "0.00" || displayValue === "Error") {
        displayValue = numero === "." ? "0." : numero;
    } else {
        // Evitar múltiples puntos en el mismo número
        const ultimoCaracter = displayValue.split(" ").pop(); // Obtener el último número u operador
        if (numero === "." && ultimoCaracter.includes(".")) {
            return; // Si ya hay un punto, no hacer nada
        }
        displayValue += numero;
    }
    actualizarDisplay();
}

// Agregar operador al display
function agregarOperador(operador) {
    if (displayValue != "0.00") {
        displayValue += " " + operador + " ";
    }
        
    else {
        if(operador === "-") {
            displayValue = "- ";
        } else{
            displayValue = "0.00";
        }
    }
    actualizarDisplay();
}

// Borrar ultimo digito
function borrarUltimoDigito() {
    if (displayValue !== "0.00") {

        if (displayValue[displayValue.length - 1] === " "){
            displayValue = displayValue.slice(0, -2);
        }

        displayValue = displayValue.slice(0, -1);

        if (displayValue === "") {
            displayValue = "0.00";
        }
        actualizarDisplay();
    }
}

// Borrar operacion escrita
function borrarOperacionEscrita() {
    displayValue = "0.00";
    operacionActual = "";
    actualizarDisplay();
}

// Borrar todo
function borrarTodo() {
    displayValue = "0.00";
    operacionActual = "";
    historial = [];
    actualizarHistorial();
    actualizarDisplay();
}


// Calcular resultado
function calcularResultado() {
    try {
        const resultado = parseFloat(eval(displayValue)).toFixed(2);

        if (resultado === "Infinity") throw new Error("División por cero");
        
        // Guardar en historial
        historial.push({ operacion: displayValue, resultado });
        actualizarHistorial();

        // Actualizar display y preparar nueva operación
        displayValue = resultado;
        operacionActual = "";
        actualizarDisplay();

    } catch (error) {
        displayValue = "Error";
        actualizarDisplay();
    }
}

// Actualizar historial
function actualizarHistorial() {
    const historialElement = document.querySelector(".historial-items");
    historialElement.innerHTML = "";

    historial.forEach((element, index) => {
        const item = document.createElement("div");
        item.className = "historial-item";
        item.textContent = `${element.operacion} = ${element.resultado}`;
        historialElement.appendChild(item);
    });
}