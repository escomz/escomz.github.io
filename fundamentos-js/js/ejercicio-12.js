/* ============================================================
   EJERCICIO 12 - Filtrar números pares de un array
   ------------------------------------------------------------
   Objetivo: recibir un array de números y devolver SOLO los pares
   usando el método filter() y el operador resto (%).
   ============================================================ */

/* ------------------------------------------------------------
   1) FUNCIÓN QUE FILTRA LOS PARES
   ------------------------------------------------------------ */

/**
 * Devuelve un nuevo array con los números pares del array recibido.
 * @param {number[]} numeros Array original de números
 * @returns {number[]} Array nuevo SOLO con los pares
 */
function filtrarPares(numeros) {
  // filter() recorre el array y se queda con los elementos para los
  // que la función de callback devuelve true.
  // IMPORTANTE: NO modifica el array original, devuelve uno nuevo.
  let pares = numeros.filter((numero) => {
    // '%' devuelve el resto de la división entre 2.
    // Si el resto es 0 -> el número es par -> devolvemos true.
    return numero % 2 === 0;
  });

  // Devolvemos el array ya filtrado
  return pares;
}

/**
 * Versión alternativa con bucle for (para comparar en clase).
 * @param {number[]} numeros Array original
 * @returns {number[]} Array con los pares
 */
function filtrarParesConBucle(numeros) {
  // Array nuevo vacío que iremos rellenando
  let pares = [];

  // Recorremos el array original posición a posición
  for (let i = 0; i < numeros.length; i++) {
    // Comprobamos si el valor actual es par
    if (numeros[i] % 2 === 0) {
      pares.push(numeros[i]); // Lo añadimos al array nuevo
    }
  }

  return pares;
}

/* ------------------------------------------------------------
   2) LEER EL ARRAY DESDE EL CAMPO DE TEXTO
   ------------------------------------------------------------ */

/**
 * Lee el array del input, filtra los pares y muestra el resultado.
 */
function filtrarDesdeCampo() {
  // Recogemos el campo de texto por su id
  const campo = document.getElementById("campo-array");

  // Convertimos el texto "3, 4, 5" en un array de números
  let numeros = campo.value
    .split(",")              // Separa por comas -> ["3", " 4", " 5"]
    .map((texto) => texto.trim())   // Quita espacios
    .filter((texto) => texto !== "") // Elimina huecos vacíos
    .map((texto) => Number(texto)); // Convierte a número

  // Validación del array
  if (numeros.length === 0 || numeros.some((n) => isNaN(n))) {
    console.error('Error: introduce números separados por comas. Ej: "1, 2, 3"');
    mostrarResultado('Error: valor incorrecto. Ejemplo: "1, 2, 3, 4, 5"');
    return;
  }

  // Aplicamos la función del enunciado
  let pares = filtrarPares(numeros);

  // Aplicamos la versión con bucle para comparar resultados
  let paresBucle = filtrarParesConBucle(numeros);

  // Mostramos los resultados por consola
  console.log("==== Filtrar números pares ====");
  console.log("Array original:", numeros);
  console.log("Pares (filter):", pares);
  console.log("Pares (bucle) :", paresBucle);

  // Resultado en la capa distinta de la página
  mostrarResultado(
    "Original: [" + numeros.join(", ") + "]\n" +
    "PARES   : [" + pares.join(", ") + "]\n" +
    "--------------------------------\n" +
    "filter() ha creado un array nuevo con " + pares.length + " de " + numeros.length + " elementos."
  );
}

/* ------------------------------------------------------------
   3) GENERAR UN ARRAY ALEATORIO
   ------------------------------------------------------------ */

/**
 * Rellena el campo con 12 números aleatorios (mezcla de pares e impares).
 */
function generarArrayAleatorio() {
  let numeros = [];
  for (let i = 0; i < 12; i++) {
    numeros.push(Math.floor(Math.random() * 50) + 1); // 1 a 50
  }
  document.getElementById("campo-array").value = numeros.join(", ");
  filtrarDesdeCampo(); // Filtramos automáticamente
}

/* ------------------------------------------------------------
   4) EVENTOS DE LOS BOTONES (DOM)
   ------------------------------------------------------------ */

// Botón principal: filtrar
document.getElementById("btn-filtrar").addEventListener("click", filtrarDesdeCampo);

// Botón auxiliar: array aleatorio
document.getElementById("btn-azar").addEventListener("click", generarArrayAleatorio);

// Botón limpiar
document.getElementById("btn-limpiar").addEventListener("click", () => {
  document.getElementById("campo-array").value = "";
  limpiarConsola();
  mostrarResultado("Introduce números separados por comas.");
});
