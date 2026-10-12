/* ============================================================
   EJERCICIO 6 - Par o impar leyendo un campo input
   ------------------------------------------------------------
   Objetivo: reutilizar la lógica del Ejercicio 5, pero obteniendo
   el número de un campo <input> del formulario en lugar de
   usar prompt().
   ============================================================ */

/* ------------------------------------------------------------
   1) FUNCIÓN QUE DETERMINA SI UN NÚMERO ES PAR (misma del Ej. 5)
   ------------------------------------------------------------ */

/**
 * Devuelve true si el número es par, false si es impar.
 * @param {number} numero Número a comprobar
 * @returns {boolean} true si es par
 */
function esPar(numero) {
  // Operador resto '%': sobra 0 -> par; sobra 1 -> impar
  return numero % 2 === 0;
}

/* ------------------------------------------------------------
   2) LEER EL CAMPO input Y COMPROBAR
   ------------------------------------------------------------ */

/**
 * Se ejecuta al enviar el formulario.
 * Lee el valor del input, lo convierte y muestra si es par o impar.
 * @param {Event} evento Objeto evento que ha provocado la ejecución
 */
function comprobarDesdeInput(evento) {
  // Prevenimos el envío tradicional del formulario (recarga de la página)
  // Si no hiciéramos esto, la página se recargaría y perderíamos el resultado.
  evento.preventDefault();

  // Buscamos el campo de texto por su id
  const campo = document.getElementById("campo-numero");

  // '.value' contiene el texto escrito por el usuario (siempre es string)
  let texto = campo.value;

  // Comprobamos que no esté vacío
  if (texto.trim() === "") {
    console.warn("Aviso: el campo está vacío.");
    mostrarResultado("Error: escribe un número en el campo.");
    return;
  }

  // Convertimos el texto a número con Number()
  let numero = Number(texto);

  // Validación con isNaN por si el valor no es numérico
  if (isNaN(numero)) {
    console.error('ERROR: "' + texto + '" no es un número.');
    mostrarResultado('"' + texto + '" no es un número válido.');
    return;
  }

  // Comprobamos par/impar con la misma estructura if / else del Ejercicio 5
  if (esPar(numero)) {
    // Rama PAR
    console.log("Número leído del input:", numero, "-> PAR");
    mostrarResultado(numero + " ➜ ES PAR\n(leído del campo input con input.value)");
  } else {
    // Rama IMPAR
    console.log("Número leído del input:", numero, "-> IMPAR");
    mostrarResultado(numero + " ➜ ES IMPAR\n(leído del campo input con input.value)");
  }

  // Limpiamos el campo para la siguiente prueba
  campo.value = "";
}

/* ------------------------------------------------------------
   3) EVENTOS DEL FORMULARIO (DOM)
   ------------------------------------------------------------ */

// getElementById recoge el <form> por su id
const formulario = document.getElementById("form-par-impar");

// 'submit' se dispara al pulsar el botón "Comprobar" (o al dar a Intro)
formulario.addEventListener("submit", comprobarDesdeInput);

// Botón "Limpiar": vacía el campo, la consola y el resultado
document.getElementById("btn-limpiar").addEventListener("click", () => {
  document.getElementById("campo-numero").value = ""; // Vaciamos el input
  limpiarConsola();                                   // Vaciamos salidas
  mostrarResultado("Salida limpiada.");               // Mensaje inicial
});
