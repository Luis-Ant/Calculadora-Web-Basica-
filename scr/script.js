// Variables globales
let displayValue = "0.00";  // Almacena el valor actual del display
let memoria = "0.00";   // Guarda el mumero en la memoria
let historial = [];         // Array para el historial de operaciones
let resultadoMostrado = false; // Indica si el último valor mostrado es un resultado

document.addEventListener("DOMContentLoaded", () => {
    // Vincular todos los botones a la función manejarClic
    const botones = document.querySelectorAll(".btn");
    botones.forEach(boton => {
        boton.addEventListener("click", manejarClic);
        
        // Si el botón contiene una imagen, también vincular el evento de clic a la imagen
        const imagen = boton.querySelector("img");
        if (imagen) {
            imagen.addEventListener("click", (event) => {
                event.stopPropagation();
                boton.click();
            });
        }
    });
    
    // Inicializar display
    actualizarDisplay();
});

// Función para manejar clics
function manejarClic(evento) {
    const valorBoton = evento.target.value;

    switch (valorBoton) {
        case "MS":
            guardarMemoria();
            break;
        case "M+":
            sumarMemoria();
            break;
        case "M-":
            restarMemoria();
            break;
        case "MC":
            borrarMemoria();
            break;
        case "HIS":
            toggleHistorial();
            break;
        case "BOR":
            borrarUltimoDigito();
            break;
        case "CE":
            borrarTodo();
            break;
        case "DEL":
            borrarUltimaOperacion();
            break;
        case "=":
            calcularResultado();
            break;
        case "%":    
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
    if (resultadoMostrado) {
        displayValue = numero === "." ? "0." : numero;
        resultadoMostrado = false;
    } else {
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
    }
    actualizarDisplay();
}

// Agregar operador al display
function agregarOperador(operador) {
    if (displayValue === "0.00" || displayValue === "Error") {
        if (operador === "-") {
            displayValue = "-";
        } else {
            displayValue = "0.00";
        }
    } else {
        // Evitar agregar otro signo "-" si ya está presente
        if (displayValue === "-") {
            return;
        }

        if (displayValue.slice(-2) === "+ " || displayValue.slice(-2) === "- " || displayValue.slice(-2) === "* " || displayValue.slice(-2) === "/ " || displayValue.slice(-2) === "% ") {
            displayValue = displayValue.slice(0, -2);
        }

        displayValue += " " + operador + " ";
    }
    resultadoMostrado = false;
    actualizarDisplay();
}

// Calcular resultado
function calcularResultado() {
    if (displayValue === "0.00" || displayValue === "Error" || resultadoMostrado) {
        return; // No hacer nada si el display está en "0.00" o "Error"
    }

    try {
        let operacion = displayValue;
        const resultado = parseFloat(eval(operacion)).toFixed(2);

        if (resultado === "Infinity" || resultado === "NaN") throw new Error("División por cero");
        
        // Guardar en historial
        historial.push({ operacion: displayValue, resultado });
        actualizarHistorial();

        // Actualizar display y preparar nueva operación
        displayValue = resultado;
        resultadoMostrado = true;
        actualizarDisplay();

    } catch (error) {
        displayValue = "Error";
        actualizarDisplay();
    }
}

// Borrar ultimo digito
function borrarUltimoDigito() {
    if (displayValue === "Error") {
        displayValue = "0.00";
        actualizarDisplay();
    }

    if (displayValue !== "0.00") {
        
        if (displayValue[displayValue.length - 1] === " "){
            displayValue = displayValue.slice(0, -2);
        }

        displayValue = displayValue.slice(0, -1);

        if (displayValue === "" || displayValue === "Error") {
            displayValue = "0.00";
        }
        actualizarDisplay();
    }
}

// Borrar todo
function borrarTodo() {
    displayValue = "0.00";
    memoria = "0.00";
    historial = [];
    actualizarHistorial();
    actualizarDisplay();
}

// Borrar ultima operacion
function borrarUltimaOperacion() {
    if (displayValue !== "0.00") {
        displayValue = displayValue.split(" ").slice(0, -2).join(" ");
        actualizarDisplay();
    }

    if (displayValue === "") {
        displayValue = "0.00";
    }
    actualizarDisplay();
}

// Guardar numero en la memoria
function guardarMemoria() {
    const displayNumero = parseFloat(displayValue);

    // Verificar si displayValue es un número válido
    if (!isNaN(displayNumero)) {
        memoria = displayNumero.toFixed(2);
        resultadoMostrado = true;
        actualizarDisplay();
    } else {
        displayValue = "Error";
        actualizarDisplay();
    }
}

// Sumar numero en la memoria
function sumarMemoria() {
    // Convertir memoria y displayValue a números
    const memoriaNumero = parseFloat(memoria);
    const displayNumero = parseFloat(displayValue);

    // Verificar si ambos son números válidos
    if (!isNaN(memoriaNumero) && !isNaN(displayNumero)) {
        memoria = (memoriaNumero + displayNumero).toFixed(2);
        displayValue = memoria;
        resultadoMostrado = true;
        actualizarDisplay();
    } else {
        displayValue = "Error";
        actualizarDisplay();
    }
}

// Restar numero en la memoria
function restarMemoria() {
    // Convertir memoria y displayValue a números
    const memoriaNumero = parseFloat(memoria);
    const displayNumero = parseFloat(displayValue);

    // Verificar si ambos son números válidos
    if (!isNaN(memoriaNumero) && !isNaN(displayNumero)) {
        memoria = (memoriaNumero - displayNumero).toFixed(2);
        displayValue = memoria;
        resultadoMostrado = true;
        actualizarDisplay();
    } else {
        displayValue = "Error";
        actualizarDisplay();
    }
}

// Borrar memoria
function borrarMemoria() {
    memoria = "0.00";
    displayValue = memoria;
    resultadoMostrado = true;
    actualizarDisplay(); 
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

// Mostrar historial
function toggleHistorial() {
    const historialElement = document.querySelector(".historial");
    historialVisible = !historialVisible;
    if (historialVisible) {
        historialElement.classList.remove("oculto");
        historialElement.classList.add("visible");
    } else {
        historialElement.classList.remove("visible");
        historialElement.classList.add("oculto");
    }
}