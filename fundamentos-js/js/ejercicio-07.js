/* ============================================================
   EJERCICIO 7 - Contar vocales en una palabra
   ------------------------------------------------------------
   Objetivo: recibir una palabra y contar cuántas vocales tiene
   recorriendo cada carácter con un bucle for y usando el método
   includes() para comprobar si el carácter es una vocal.
   ============================================================ */

/* ------------------------------------------------------------
   1) CONSTANTES DEL PROGRAMA
   ------------------------------------------------------------ */

// Cadena con todas las vocales en minúscula (la usaremos para comprobar).
const VOCALES = "aeiou";

/* ------------------------------------------------------------
   2) FUNCIÓN QUE CUENTA LAS VOCALES
   ------------------------------------------------------------ */

/**
 * Cuenta las vocales de una palabra.
 * @param {string} palabra Texto a analizar
 * @returns {number} Número total de vocales encontradas
 */
function contarVocales(palabra) {
  // Variable contador: empieza en 0 y se irá incrementando.
  // 'let' porque su valor cambia durante el bucle.
  let contador = 0;

  // Recorremos la palabra carácter a carácter con un bucle for.
  // - i empieza en 0 (primera posición de la cadena)
  // - la condición es i < palabra.length (length = nº de caracteres)
  // - i++ suma 1 en cada vuelta
  for (let i = 0; i < palabra.length; i++) {
    // charAt(i) devuelve el carácter que ocupa la posición i.
    // toLowerCase() lo pasa a minúscula para que 'A' y 'a' cuenten igual.
    let caracter = palabra.charAt(i).toLowerCase();

    // includes(subcadena) devuelve true si VOCALES contiene ese carácter.
    if (VOCALES.includes(caracter)) {
      // Es vocal: incrementamos el contador
      contador++;
      console.debug("Vocal encontrada en posición " + i + ": '" + caracter + "'");
    }
    // Si no es vocal, no hacemos nada y seguimos con la siguiente vuelta
  }

  // Devolvemos el total de vocales
  return contador;
}

/* ------------------------------------------------------------
   3) FUNCIÓN PRINCIPAL: LEER INPUT, CONTAR Y MOSTRAR
   ------------------------------------------------------------ */

/**
 * Lee la palabra del formulario, cuenta las vocales y pinta el resultado.
 * @param {Event} evento Evento 'submit' del formulario
 */
function procesar(evento) {
  // Evitamos que la página se recargue al enviar el formulario
  evento.preventDefault();

  // Buscamos el campo de texto y leemos su valor (string)
  const campo = document.getElementById("campo-palabra");
  let palabra = campo.value;

  // Si está vacío, mostramos un aviso y salimos
  if (palabra.trim() === "") {
    mostrarResultado("Error: escribe una palabra primero.");
    return;
  }

  // Llamamos a la función y guardamos el resultado
  let total = contarVocales(palabra);

  // Mostramos el detalle por consola
  console.log("==== Conteo de vocales ====");
  console.log("Palabra:", palabra);
  console.log("Longitud:", palabra.length, "caracteres");
  console.log("Vocales encontradas:", total);

  // Resultado en la capa distinta de la página
  mostrarResultado(
    "Palabra: " + palabra + "\n" +
    "Longitud: " + palabra.length + " caracteres\n" +
    "VOCALES: " + total
  );
}

/* ------------------------------------------------------------
   4) EVENTOS (DOM)
   ------------------------------------------------------------ */

// Formulario: se lanza al pulsar "Contar vocales" o al dar a Intro
document.getElementById("form-vocales").addEventListener("submit", procesar);

// Botón de ejemplo: rellena el campo con una palabra y la procesa
document.getElementById("btn-ejemplo").addEventListener("click", () => {
  const campo = document.getElementById("campo-palabra");
  campo.value = "Desarrollo";        // Palabra de ejemplo (5 vocales)
  procesar(new Event("submit"));      // Reutilizamos la misma función
});

// Botón limpiar
document.getElementById("btn-limpiar").addEventListener("click", () => {
  document.getElementById("campo-palabra").value = ""; // Vacía el input
  limpiarConsola();                                    // Vacía salidas
  mostrarResultado("Escribe una palabra y pulsa \"Contar vocales\".");
});
