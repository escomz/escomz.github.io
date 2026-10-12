/* ============================================================
   EJERCICIO 13 - Contar palabras en una frase
   ------------------------------------------------------------
   Objetivo: pedir una frase al usuario, dividirla en palabras con
   split() y mostrar cuántas palabras tiene usando .length.
   ============================================================ */

/* ------------------------------------------------------------
   1) FUNCIÓN QUE CUENTA LAS PALABRAS
   ------------------------------------------------------------ */

/**
 * Devuelve cuántas palabras hay en la frase.
 * @param {string} frase Texto introducido por el usuario
 * @returns {number} Cantidad de palabras
 */
function contarPalabras(frase) {
  // split(" ") divide la frase cada vez que encuentra un espacio.
  // "hola mundo cruel" -> ["hola", "mundo", "cruel"]
  let palabras = frase.split(" ");

  // Filtramos las cadenas vacías que aparecen cuando hay varios
  // espacios seguidos o la frase empieza/termina con espacio.
  // Ej: " hola  mundo " -> ["", "hola", "", "mundo", ""] -> nos quedamos con 2
  let palabrasValidas = palabras.filter((palabra) => palabra !== "");

  // length indica la cantidad de elementos del array
  return palabrasValidas.length;
}

/* ------------------------------------------------------------
   2) FUNCIÓN PRINCIPAL
   ------------------------------------------------------------ */

/**
 * Lee la frase del textarea, cuenta sus palabras y muestra el resultado.
 * @param {Event} evento Evento 'submit' del formulario
 */
function procesar(evento) {
  // Evitamos la recarga de la página al enviar el formulario
  evento.preventDefault();

  // Recogemos el textarea y su contenido
  const area = document.getElementById("campo-frase");
  let frase = area.value;

  // Validación: la frase no puede estar vacía
  if (frase.trim() === "") {
    console.warn("Aviso: no se ha escrito ninguna frase.");
    mostrarResultado("Error: escribe una frase para contar sus palabras.");
    return;
  }

  // Dividimos la frase para mostrar también el array resultante
  let palabras = frase.trim().split(" ").filter((p) => p !== "");

  // Contamos con la función principal
  let total = contarPalabras(frase);

  // Salida por consola con console.log
  console.log("==== Contar palabras ====");
  console.log("Frase:", frase);
  console.log("split(' '):", palabras);
  console.log("Número de palabras:", total);

  // Resultado en la capa distinta de la página
  mostrarResultado(
    "Frase: \"" + frase + "\"\n" +
    "Palabras: [" + palabras.join(" | ") + "]\n" +
    "--------------------------------\n" +
    "TOTAL DE PALABRAS: " + total
  );
}

/* ------------------------------------------------------------
   3) EVENTOS (DOM)
   ------------------------------------------------------------ */

// Formulario: se ejecuta al pulsar el botón o con Intro
document.getElementById("form-frase").addEventListener("submit", procesar);

// Botón con otra frase de ejemplo (tiene espacios dobles a propósito)
document.getElementById("btn-ejemplo").addEventListener("click", () => {
  document.getElementById("campo-frase").value = "Aprender  JavaScript  paso a paso";
  procesar(new Event("submit"));
});

// Botón limpiar
document.getElementById("btn-limpiar").addEventListener("click", () => {
  document.getElementById("campo-frase").value = "";
  limpiarConsola();
  mostrarResultado("Escribe una frase y pulsa \"Contar palabras\".");
});
