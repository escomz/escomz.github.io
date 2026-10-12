/* ============================================================
   EJERCICIO 4 - Suma de dos números pedidos con prompt()
   ------------------------------------------------------------
   Objetivo: pedir dos números al usuario con prompt(),
   convertirlos con Number(), sumarlos y mostrar el resultado
   con console.log().
   ============================================================ */

/* ------------------------------------------------------------
   1) PEDIR DATOS AL USUARIO
   ------------------------------------------------------------ */

/**
 * Pide los dos números, los convierte, los suma y muestra el resultado.
 */
function pedirYSumar() {
  // prompt(mensaje) abre una ventana de diálogo con un campo de texto.
  // Devuelve SIEMPRE una cadena (string), o null si el usuario pulsa Cancelar.
  let texto1 = prompt("Introduce el PRIMER número:");

  // Si el usuario cancela, prompt() devuelve null: salimos del programa.
  if (texto1 === null) {
    console.warn("Has cancelado la introducción del primer número.");
    mostrarResultado("Operación cancelada por el usuario.");
    return; // Detenemos la función aquí mismo
  }

  // Pedimos el segundo número de la misma manera
  let texto2 = prompt("Introduce el SEGUNDO número:");

  // Comprobamos también la cancelación del segundo número
  if (texto2 === null) {
    console.warn("Has cancelado la introducción del segundo número.");
    mostrarResultado("Operación cancelada por el usuario.");
    return;
  }

  /* ------------------------------------------------------------
     2) CONVERSIÓN A NÚMERO
     ------------------------------------------------------------ */

  // Number("texto") convierte la cadena a número.
  // - Number("12")   -> 12   (number)
  // - Number("3.5")  -> 3.5  (number)
  // - Number("hola") -> NaN  (Not a Number)
  let numero1 = Number(texto1);
  let numero2 = Number(texto2);

  // Comprobamos con isNaN() si la conversión ha fallado
  if (isNaN(numero1) || isNaN(numero2)) {
    // console.error imprime en rojo: señal de que hay un problema
    console.error('ERROR: uno de los valores no es un número. Valores recibidos: "' + texto1 + '", "' + texto2 + '"');
    mostrarResultado('Error: "' + texto1 + '" o "' + texto2 + '" no es un número válido.');
    return;
  }

  /* ------------------------------------------------------------
     3) CÁLCULO Y MOSTRAR RESULTADO
     ------------------------------------------------------------ */

  // Suma aritmética con el operador +
  let suma = numero1 + numero2;

  // Mostramos todos los datos con console.log (varios argumentos)
  console.log("==== Suma con prompt() ====");
  console.log("Valor 1 (texto):", texto1, "-> convertido:", numero1, "| tipo:", typeof numero1);
  console.log("Valor 2 (texto):", texto2, "-> convertido:", numero2, "| tipo:", typeof numero2);
  console.log("Suma:", numero1, "+", numero2, "=", suma);

  // Mostramos el resultado también en la capa distinta de la página
  mostrarResultado(
    "Primer número:  " + texto1 + "\n" +
    "Segundo número: " + texto2 + "\n" +
    "--------------------------------\n" +
    "SUMA = " + suma
  );
}

/* ------------------------------------------------------------
   4) EVENTOS DE LOS BOTONES (DOM)
   ------------------------------------------------------------ */

// Recogemos los botones por su id dentro del documento
const btnPedir = document.getElementById("btn-pedir");
const btnLimpiar = document.getElementById("btn-limpiar");

// Al pulsar "Pedir los dos números" ejecutamos la función principal
btnPedir.addEventListener("click", pedirYSumar);

// Al pulsar "Limpiar" vaciamos consola y resultado
btnLimpiar.addEventListener("click", () => {
  limpiarConsola(); // Función definida en consola.js
  mostrarResultado("Salida limpiada. Pulsa el botón para empezar.");
});
