/* ============================================================
   EJERCICIO 5 - Verificar si un número es par o impar (prompt)
   ------------------------------------------------------------
   Objetivo: pedir un número al usuario con prompt(), convertirlo
   con Number() y comprobar si es par o impar usando el operador
   resto (%) y una estructura if / else.
   ============================================================ */

/* ------------------------------------------------------------
   1) FUNCIÓN QUE DETERMINA SI UN NÚMERO ES PAR
   ------------------------------------------------------------ */

/**
 * Devuelve true si el número es par, false si es impar.
 * Un número es PAR cuando su resto al dividir entre 2 es 0.
 * @param {number} numero Número entero a comprobar
 * @returns {boolean} true = par, false = impar
 */
function esPar(numero) {
  // '%' es el operador resto (devuelve lo que "sobra" de la división).
  // Ejemplos: 4 % 2 = 0 (par) | 7 % 2 = 1 (impar) | 0 % 2 = 0 (par)
  return numero % 2 === 0; // true si el resto es exactamente 0
}

/* ------------------------------------------------------------
   2) PROGRAMA PRINCIPAL
   ------------------------------------------------------------ */

function verificarParImpar() {
  // Pedimos el número al usuario con prompt()
  let texto = prompt("Introduce un número entero:");

  // Si cancela la operación, salimos
  if (texto === null) {
    mostrarResultado("Operación cancelada.");
    return;
  }

  // Convertimos la cadena a número con Number()
  let numero = Number(texto);

  // Validamos que el valor introducido sea realmente un número
  if (isNaN(numero)) {
    // Mostramos el error en la consola (y en la página)
    console.error('ERROR: "' + texto + '" no es un número válido.');
    mostrarResultado('"' + texto + '" no es un número. Inténtalo de nuevo.');
    return;
  }

  // Estructura de control condicional: comprobamos par o impar
  if (esPar(numero)) {
    // Rama que se ejecuta cuando esPar() devuelve true
    console.log(numero + " es PAR (porque " + numero + " % 2 = " + (numero % 2) + ")");
    mostrarResultado(numero + " ➜ ES PAR");
  } else {
    // Rama que se ejecuta cuando esPar() devuelve false
    console.log(numero + " es IMPAR (porque " + numero + " % 2 = " + (numero % 2) + ")");
    mostrarResultado(numero + " ➜ ES IMPAR");
  }
}

/* ------------------------------------------------------------
   3) EVENTOS DE LOS BOTONES (DOM)
   ------------------------------------------------------------ */

// getElementById busca el botón con id="btn-pedir"
const btnPedir = document.getElementById("btn-pedir");

// addEventListener("click", ...) asocia la función al evento de clic
btnPedir.addEventListener("click", verificarParImpar);

// Botón de limpiar: vacía las capas de salida
document.getElementById("btn-limpiar").addEventListener("click", () => {
  limpiarConsola();
  mostrarResultado("Salida limpiada. Pulsa el botón para empezar.");
});
