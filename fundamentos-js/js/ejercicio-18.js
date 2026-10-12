/* ============================================================
   EJERCICIO 18 - Encontrar la palabra más larga de una frase
   ------------------------------------------------------------
   Objetivo: dividir la frase en palabras con split() y recorrer
   el array con un bucle for buscando la palabra con más
   caracteres (.length).
   ============================================================ */

/* ------------------------------------------------------------
   1) FUNCIÓN QUE BUSCA LA PALABRA MÁS LARGA
   ------------------------------------------------------------ */

/**
 * Devuelve la palabra más larga de la frase.
 * @param {string} frase Texto introducido por el usuario
 * @returns {string} Palabra con más caracteres
 */
function palabraMasLarga(frase) {
  // Paso 1: dividimos la frase en un array de palabras con split(" ")
  // "hola mundo" -> ["hola", "mundo"]
  let palabras = frase.trim().split(" ").filter((p) => p !== "");

  // Si la frase no tiene palabras, devolvemos un texto de aviso
  if (palabras.length === 0) {
    return "(frase vacía)";
  }

  // Paso 2: suponemos que la PRIMERA palabra es la más larga
  let masLarga = palabras[0];

  // Paso 3: recorremos TODAS las palabras con un bucle for
  for (let i = 1; i < palabras.length; i++) {
    // .length nos da el número de caracteres de la palabra actual
    let longitudActual = palabras[i].length;

    // .length de la que hasta ahora era la más larga
    let longitudMaxima = masLarga.length;

    // Si la actual es MÁS larga (estrictamente mayor), la guardamos
    if (longitudActual > longitudMaxima) {
      masLarga = palabras[i];
      console.debug("Nueva palabra más larga en la posición " + i + ": '" + masLarga + "'");
    }
  }

  // Paso 4: devolvemos la palabra ganadora
  return masLarga;
}

/* ------------------------------------------------------------
   2) FUNCIÓN PRINCIPAL
   ------------------------------------------------------------ */

/**
 * Lee la frase, busca la palabra más larga y muestra el proceso.
 * @param {Event} evento Evento 'submit' del formulario
 */
function buscar(evento) {
  // Evitamos la recarga de la página
  evento.preventDefault();

  // Leemos el textarea
  const area = document.getElementById("campo-frase");
  let frase = area.value;

  // Validamos que no esté vacía
  if (frase.trim() === "") {
    mostrarResultado("Error: escribe una frase primero.");
    return;
  }

  // Dividimos la frase para poder mostrar el listado de palabras
  let palabras = frase.trim().split(" ").filter((p) => p !== "");

  // Buscamos la más larga con la función principal
  let resultado = palabraMasLarga(frase);

  // Salida por consola
  console.log("==== Palabra más larga ====");
  console.log("Frase  :", frase);
  console.log("Palabras:", palabras);
  console.log("Más larga:", resultado, "->", resultado.length, "caracteres");

  // Resultado en la capa distinta de la página
  mostrarResultado(
    "Frase: \"" + frase + "\"\n" +
    "Palabras: [" + palabras.join(" | ") + "]\n" +
    "--------------------------------\n" +
    "MÁS LARGA: \"" + resultado + "\" (" + resultado.length + " caracteres)"
  );
}

/* ------------------------------------------------------------
   3) EVENTOS (DOM)
   ------------------------------------------------------------ */

// Formulario: botón o tecla Intro
document.getElementById("form-frase").addEventListener("submit", buscar);

// Botón con otra frase de ejemplo
document.getElementById("btn-ejemplo").addEventListener("click", () => {
  document.getElementById("campo-frase").value = "El desarrollo de aplicaciones multiplataforma es completo";
  buscar(new Event("submit"));
});

// Botón limpiar
document.getElementById("btn-limpiar").addEventListener("click", () => {
  document.getElementById("campo-frase").value = "";
  limpiarConsola();
  mostrarResultado("Escribe una frase y pulsa \"Buscar la más larga\".");
});
