/* ============================================================
   EJERCICIO 20 - Convertir una cadena a mayúsculas y minúsculas
   ------------------------------------------------------------
   Objetivo: usar toUpperCase() y toLowerCase() para mostrar una
   cadena en los dos formatos, sin modificar el texto original.
   ============================================================ */

/* ------------------------------------------------------------
   1) FUNCIÓN QUE MUESTRA LAS DOS CONVERSIONES
   ------------------------------------------------------------ */

/**
 * Convierte la cadena a mayúsculas y a minúsculas mostrando ambos.
 * @param {string} texto Cadena original
 * @returns {string} Texto con los dos resultados para la página
 */
function convertirCadena(texto) {
  // toUpperCase() devuelve una NUEVA cadena completamente en mayúsculas.
  // El texto original NO se modifica (las cadenas son inmutables en JS).
  let enMayusculas = texto.toUpperCase();

  // toLowerCase() devuelve una NUEVA cadena completamente en minúsculas.
  let enMinusculas = texto.toLowerCase();

  // Mostramos los tres valores por consola con console.log
  console.log("==== Mayúsculas y minúsculas ====");
  console.log("Original   :", texto, "| longitud:", texto.length);
  console.log("Mayúsculas :", enMayusculas);
  console.log("Minúsculas :", enMinusculas);

  // Devolvemos un texto multi-línea listo para la capa de resultado
  return (
    "Original   : " + texto + "\n" +
    "Mayúsculas : " + enMayusculas + "\n" +
    "Minúsculas : " + enMinusculas + "\n" +
    "--------------------------------\n" +
    "toUpperCase() y toLowerCase() devuelven copias: el original no cambia."
  );
}

/* ------------------------------------------------------------
   2) FUNCIÓN EXTRA: ALTERNAR MAYÚSCULAS/MINÚSCULAS
   ------------------------------------------------------------ */

/**
 * Invierte el formato de cada letra (a->A, A->a).
 * @param {string} texto Cadena original
 * @returns {string} Cadena con el formato alternado
 */
function alternarCadena(texto) {
  // split("") convierte la cadena en array de caracteres
  let caracteres = texto.split("");

  // map() crea un array nuevo aplicando la función a cada carácter
  let alternados = caracteres.map((letra) => {
    // Si la letra está en mayúscula...
    if (letra === letra.toUpperCase()) {
      // ... la pasamos a minúscula
      return letra.toLowerCase();
    }
    // Si no (está en minúscula), la pasamos a mayúscula
    return letra.toUpperCase();
  });

  // join("") vuelve a unir los caracteres en una sola cadena
  return alternados.join("");
}

/* ------------------------------------------------------------
   3) EVENTO DEL FORMULARIO (DOM)
   ------------------------------------------------------------ */

/**
 * Lee el texto del campo y muestra las conversiones.
 * @param {Event} evento Evento 'submit'
 */
function procesar(evento) {
  // Evitamos la recarga de la página
  evento.preventDefault();

  // Recogemos el campo y su valor
  const campo = document.getElementById("campo-texto");
  let texto = campo.value;

  // Validación de cadena vacía
  if (texto.trim() === "") {
    mostrarResultado("Error: escribe una cadena de texto primero.");
    return;
  }

  // Llamamos a la función principal y mostramos en la capa de resultado
  mostrarResultado(convertirCadena(texto));
}

/* ------------------------------------------------------------
   4) EVENTOS DE LOS BOTONES (DOM)
   ------------------------------------------------------------ */

// Formulario: botón "Convertir" o tecla Intro
document.getElementById("form-texto").addEventListener("submit", procesar);

// Botón auxiliar: alterna el formato de la cadena y la escribe en el campo
document.getElementById("btn-invertir-mayus").addEventListener("click", () => {
  const campo = document.getElementById("campo-texto");

  // Aplicamos la función de alternancia sobre el valor actual
  campo.value = alternarCadena(campo.value);

  console.log("Cadena alternada:", campo.value);

  // Refrescamos la capa de resultado
  mostrarResultado("Cadena alternada:\n" + campo.value);
});

// Botón limpiar
document.getElementById("btn-limpiar").addEventListener("click", () => {
  document.getElementById("campo-texto").value = "";
  limpiarConsola();
  mostrarResultado("Escribe una cadena de texto y pulsa \"Convertir\".");
});
