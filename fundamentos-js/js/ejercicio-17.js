/* ============================================================
   EJERCICIO 17 - Ordenar un array de números (menor a mayor)
   ------------------------------------------------------------
   Objetivo: ordenar números con sort() usando una función de
   comparación, y comparar el resultado con el orden por defecto
   (que ordena como si fueran textos).
   ============================================================ */

/* ------------------------------------------------------------
   1) LEER EL ARRAY DESDE EL CAMPO
   ------------------------------------------------------------ */

/**
 * Convierte el texto del campo en un array de números.
 * @returns {number[]} Array de números (vacío si hay error)
 */
function leerArray() {
  // Recogemos el campo de texto
  const campo = document.getElementById("campo-array");

  // convertimos "5, 3, 9" en [5, 3, 9]
  let numeros = campo.value
    .split(",")                     // Separa por comas
    .map((texto) => texto.trim())   // Quita espacios
    .filter((texto) => texto !== "") // Elimina huecos
    .map((texto) => Number(texto)); // Convierte a número

  // Si está vacío o hay valores no numéricos, avisamos
  if (numeros.length === 0 || numeros.some((n) => isNaN(n))) {
    console.error('Error: introduce números separados por comas. Ej: "5, 3, 9"');
    mostrarResultado('Error: valor incorrecto. Ejemplo: "5, 3, 9, 1, 100"');
    return [];
  }

  return numeros;
}

/* ------------------------------------------------------------
   2) ORDENAR (menor a mayor)
   ------------------------------------------------------------ */

/**
 * Ordena los números de menor a mayor con sort() y comparación numérica.
 * @param {number[]} numeros Array a ordenar
 * @returns {number[]} El mismo array ordenado
 */
function ordenarAscendente(numeros) {
  // sort(comparacion) reordena el array IN-SITU (modifica el original).
  // La función de comparación recibe dos valores (a y b):
  //   - Si devuelve NEGATIVO -> a va ANTES que b
  //   - Si devuelve POSITIVO -> b va ANTES que a
  //   - Si devuelve 0        -> su orden no cambia
  numeros.sort((a, b) => {
    return a - b; // Resta numérica: correcta para números
  });

  // Devolvemos el array ordenado (es el mismo objeto, ya modificado)
  return numeros;
}

/**
 * Ordena de mayor a menor invirtiendo el signo de la resta.
 * @param {number[]} numeros Array a ordenar
 * @returns {number[]} El mismo array ordenado
 */
function ordenarDescendente(numeros) {
  // b - a invierte el criterio: los grandes salen primero
  numeros.sort((a, b) => b - a);
  return numeros;
}

/* ------------------------------------------------------------
   3) MOSTRAR RESULTADOS
   ------------------------------------------------------------ */

/**
 * Muestra la diferencia entre el orden por defecto y el correcto.
 */
function ordenarDesdeCampo() {
  // Leemos el array del campo
  let numeros = leerArray();
  if (numeros.length === 0) return; // Salimos si hubo error

  // Guardamos una copia del array original con slice() (no modifica el original)
  let original = numeros.slice();

  // 1) Orden por defecto: convierte a texto y compara cadenas.
  //    Por eso 100 aparece antes que 20 ("1" < "2").
  let ordenPorDefecto = numeros.slice().sort();

  // 2) Orden numérico correcto (el que pide el enunciado)
  let ordenCorrecto = ordenarAscendente(numeros.slice());

  // Mostramos las tres versiones por consola
  console.log("==== Ordenar array ====");
  console.log("Original          :", original);
  console.log("sort() por defecto:", ordenPorDefecto, "(¡orden lexicográfico!)");
  console.log("sort() con a - b  :", ordenCorrecto, "(orden numérico)");

  // Resultado en la capa distinta de la página
  mostrarResultado(
    "Original          : [" + original.join(", ") + "]\n" +
    "sort() por defecto: [" + ordenPorDefecto.join(", ") + "]  <- ordena como texto\n" +
    "sort() con (a-b)  : [" + ordenCorrecto.join(", ") + "]  <- orden numérico"
  );
}

/**
 * Ordena de mayor a menor (botón secundario).
 */
function ordenarDescendenteDesdeCampo() {
  let numeros = leerArray();
  if (numeros.length === 0) return;

  let ordenado = ordenarDescendente(numeros.slice());

  console.log("Orden descendente (b - a):", ordenado);

  mostrarResultado(
    "Original            : [" + numeros.join(", ") + "]\n" +
    "Mayor a menor (b-a) : [" + ordenado.join(", ") + "]"
  );
}

/* ------------------------------------------------------------
   4) EVENTOS DE LOS BOTONES (DOM)
   ------------------------------------------------------------ */

// Botón principal: menor a mayor
document.getElementById("btn-ordenar").addEventListener("click", ordenarDesdeCampo);

// Botón secundario: mayor a menor
document.getElementById("btn-invertir-orden").addEventListener("click", ordenarDescendenteDesdeCampo);

// Botón limpiar
document.getElementById("btn-limpiar").addEventListener("click", () => {
  document.getElementById("campo-array").value = "";
  limpiarConsola();
  mostrarResultado("Introduce números separados por comas.");
});
