/* ============================================================
   EJERCICIO 9 - Revertir una cadena de texto
   ------------------------------------------------------------
   Objetivo: invertir una cadena usando los tres pasos clásicos:
   split("") -> reverse() -> join("")
   ============================================================ */

/* ------------------------------------------------------------
   1) FUNCIÓN QUE INVIERTE LA CADENA
   ------------------------------------------------------------ */

/**
 * Devuelve la cadena introducida con los caracteres en orden inverso.
 * @param {string} cadena Texto original
 * @returns {string} Cadena invertida
 */
function invertirCadena(cadena) {
  // PASO 1: split("") divide la cadena en un array de caracteres.
  // "hola" -> ["h", "o", "l", "a"]
  // El argumento "" (cadena vacía) indica que separe en CADA carácter.
  let letras = cadena.split("");

  // PASO 2: reverse() invierte el orden de los elementos del array.
  // ["h", "o", "l", "a"] -> ["a", "l", "o", "h"]
  // IMPORTANTE: reverse() MODIFICA el array original (no crea uno nuevo).
  letras.reverse();

  // PASO 3: join("") une los elementos del array en una sola cadena,
  // sin poner nada entre ellos (por eso el argumento es "").
  // ["a", "l", "o", "h"] -> "aloh"
  let invertida = letras.join("");

  // Devolvemos la cadena ya invertida
  return invertida;
}

/* ------------------------------------------------------------
   2) VERSIÓN EN UNA SOLA LÍNEA (encadenando los tres métodos)
   ------------------------------------------------------------ */

/**
 * Misma función pero encadenando los métodos sin variables intermedias.
 * @param {string} cadena Texto original
 * @returns {string} Cadena invertida
 */
function invertirCadenaCorta(cadena) {
  // Cada método devuelve un resultado sobre el que se aplica el siguiente
  return cadena.split("").reverse().join("");
}

/* ------------------------------------------------------------
   3) FUNCIÓN PRINCIPAL: LEER, INVERTIR Y MOSTRAR
   ------------------------------------------------------------ */

/**
 * Lee el texto del formulario, lo invierte y muestra el resultado.
 * @param {Event} evento Evento 'submit' del formulario
 */
function procesar(evento) {
  // Evitamos la recarga de la página al enviar el formulario
  evento.preventDefault();

  // Recogemos el campo de texto y su valor
  const campo = document.getElementById("campo-texto");
  let texto = campo.value;

  // Validación: no procesamos cadenas vacías
  if (texto.trim() === "") {
    mostrarResultado("Error: escribe una cadena de texto primero.");
    return;
  }

  // Llamamos a la función y guardamos la cadena invertida
  let resultado = invertirCadena(texto);

  // Mostramos el proceso paso a paso por consola
  console.log("==== Revertir cadena ====");
  console.log("Original :", texto);
  console.log("split(''):", texto.split(""));
  console.log("reverse():", texto.split("").reverse());
  console.log("join('') :", resultado);
  console.log("Versión en una línea:", invertirCadenaCorta(texto));

  // Resultado en la capa distinta de la página
  mostrarResultado(
    "Original:  " + texto + "\n" +
    "Invertida: " + resultado + "\n" +
    "--------------------------------\n" +
    'split("") + reverse() + join("") = "' + resultado + '"'
  );
}

/* ------------------------------------------------------------
   4) EVENTOS (DOM)
   ------------------------------------------------------------ */

// Formulario: se lanza al pulsar el botón o con la tecla Intro
document.getElementById("form-invertir").addEventListener("submit", procesar);

// Botón con un ejemplo ya preparado
document.getElementById("btn-ejemplo").addEventListener("click", () => {
  document.getElementById("campo-texto").value = "JavaScript"; // Texto de ejemplo
  procesar(new Event("submit")); // Reutilizamos la función principal
});

// Botón limpiar
document.getElementById("btn-limpiar").addEventListener("click", () => {
  document.getElementById("campo-texto").value = ""; // Vaciamos el campo
  limpiarConsola();
  mostrarResultado("Escribe una cadena y pulsa \"Invertir cadena\".");
});
