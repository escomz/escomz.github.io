/* ============================================================
   EJERCICIO 14 - Verificar si una palabra es un palíndromo
   ------------------------------------------------------------
   Objetivo: comprobar si una palabra se lee igual al derecho que
   al revés, comparando la original con su versión invertida
   (split + reverse + join).
   ============================================================ */

/* ------------------------------------------------------------
   1) FUNCIÓN QUE INVIERTE (igual que en el Ejercicio 9)
   ------------------------------------------------------------ */

/**
 * Devuelve la cadena con los caracteres en orden inverso.
 * @param {string} cadena Texto original
 * @returns {string} Cadena invertida
 */
function invertir(cadena) {
  // split("") -> array de caracteres | reverse() -> lo invierte | join("") -> texto
  return cadena.split("").reverse().join("");
}

/* ------------------------------------------------------------
   2) FUNCIÓN QUE COMPRUEBA EL PALÍNDROMO
   ------------------------------------------------------------ */

/**
 * Comprueba si el texto introducido es un palíndromo.
 * @param {string} texto Palabra o frase a comprobar
 * @returns {boolean} true si es palíndromo
 */
function esPalindromo(texto) {
  // Normalizamos a minúsculas para que "Anita" y "anita" cuenten igual.
  // toLowerCase() devuelve una copia en minúscula (no modifica el original).
  let original = texto.toLowerCase();

  // Opcional: nos quedamos SOLO con letras, quitando espacios y signos.
  // replace(/[^a-záéíóúñ]/g, "") borra todo lo que NO sea una letra.
  original = original.replace(/[^a-záéíóúñ]/g, "");

  // Creamos la versión invertida con split + reverse + join
  let invertida = invertir(original);

  // Comparamos ambas cadenas con el operador ===
  // Si son idénticas, la palabra es un palíndromo.
  return original === invertida;
}

/* ------------------------------------------------------------
   3) FUNCIÓN PRINCIPAL
   ------------------------------------------------------------ */

/**
 * Lee la palabra del formulario, comprueba si es palíndromo y muestra todo.
 * @param {Event} evento Evento 'submit'
 */
function comprobar(evento) {
  // Evitamos la recarga de la página
  evento.preventDefault();

  // Leemos el valor del campo
  const campo = document.getElementById("campo-palabra");
  let palabra = campo.value;

  // Validación de entrada vacía
  if (palabra.trim() === "") {
    mostrarResultado("Error: escribe una palabra primero.");
    return;
  }

  // Procesamos la palabra (minúsculas y sin signos)
  let limpia = palabra.toLowerCase().replace(/[^a-záéíóúñ]/g, "");

  // Calculamos la versión invertida para mostrarla
  let invertida = invertir(limpia);

  // Ejecutamos la comprobación
  let resultado = esPalindromo(palabra);

  // Mostramos todo por consola
  console.log("==== Palíndromo ====");
  console.log("Original :", palabra);
  console.log("Procesada:", limpia);
  console.log("Invertida:", invertida);
  console.log("¿Es palíndromo?", resultado);

  // Resultado en la capa distinta de la página
  mostrarResultado(
    "Palabra: " + palabra + "\n" +
    "Procesada: " + limpia + "\n" +
    "Invertida: " + invertida + "\n" +
    "--------------------------------\n" +
    (resultado ? "SI es un palíndromo" : "NO es un palíndromo")
  );
}

/* ------------------------------------------------------------
   4) LISTA DE PALABRAS PARA LA PRUEBA ALEATORIA
   ------------------------------------------------------------ */

// Array con palabras palíndromo y otras que no lo son
const PALABRAS = ["oso", "reconocer", "anita", "javascript", "rever", "nivel", "hola", "salas"];

/* ------------------------------------------------------------
   5) EVENTOS (DOM)
   ------------------------------------------------------------ */

// Formulario
document.getElementById("form-palindromo").addEventListener("submit", comprobar);

// Botón: elige una palabra al azar del array y la comprueba
document.getElementById("btn-azar").addEventListener("click", () => {
  // Math.random()*PALABRAS.length -> decimal | Math.floor -> índice válido
  let indice = Math.floor(Math.random() * PALABRAS.length);
  let palabra = PALABRAS[indice];

  // Escribimos la palabra en el campo y lanzamos la comprobación
  document.getElementById("campo-palabra").value = palabra;
  comprobar(new Event("submit"));
});

// Botón limpiar
document.getElementById("btn-limpiar").addEventListener("click", () => {
  document.getElementById("campo-palabra").value = "";
  limpiarConsola();
  mostrarResultado("Escribe una palabra y pulsa \"Comprobar\".");
});
