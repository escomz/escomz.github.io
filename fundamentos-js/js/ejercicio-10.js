/* ============================================================
   EJERCICIO 10 - Encontrar el número más grande de un array
   ------------------------------------------------------------
   Objetivo: crear una función que devuelva el máximo de un array
   usando Math.max() junto al operador de expansión (spread) ...
   ============================================================ */

/* ------------------------------------------------------------
   1) FUNCIÓN QUE DEVUELVE EL MÁXIMO
   ------------------------------------------------------------ */

/**
 * Devuelve el número más grande de un array.
 * @param {number[]} numeros Array de números
 * @returns {number} El mayor de todos
 */
function encontrarMaximo(numeros) {
  // Math.max() no recibe un array, recibe argumentos sueltos:
  //   Math.max(4, 19, 7)  -> 19
  // El operador '...' (spread / expansión) "desempaqueta" el array:
  //   Math.max(...[4, 19, 7])  ->  Math.max(4, 19, 7)
  let maximo = Math.max(...numeros);

  // Devolvemos el resultado
  return maximo;
}

/**
 * Versión alternativa con un bucle for (para comparar en clase).
 * @param {number[]} numeros Array de números
 * @returns {number} El mayor de todos
 */
function encontrarMaximoConBucle(numeros) {
  // Suponemos inicialmente que el primer elemento es el mayor
  let maximo = numeros[0];

  // Recorremos el array desde la posición 1 (el 0 ya lo tenemos)
  for (let i = 1; i < numeros.length; i++) {
    // Si encontramos un valor más grande, lo guardamos
    if (numeros[i] > maximo) {
      maximo = numeros[i];
    }
  }

  return maximo;
}

/* ------------------------------------------------------------
   2) LEER EL ARRAY DESDE EL CAMPO DE TEXTO
   ------------------------------------------------------------ */

/**
 * Lee el array del input, calcula el máximo y muestra el resultado.
 */
function calcularDesdeCampo() {
  // Recogemos el campo de texto
  const campo = document.getElementById("campo-array");

  // split(",") convierte "4, 19, 7" en ["4", " 19", " 7"]
  let textoValores = campo.value.split(",");

  // map() crea un NUEVO array aplicando una función a cada elemento.
  // trim() quita los espacios sobrantes y Number() convierte a número.
  let numeros = textoValores
    .map((texto) => texto.trim())       // Quitamos espacios: " 19" -> "19"
    .filter((texto) => texto !== "")    // Eliminamos elementos vacíos
    .map((texto) => Number(texto));     // Convertimos a número: "19" -> 19

  // Validación: debe haber al menos un valor y todos numéricos
  if (numeros.length === 0 || numeros.some((n) => isNaN(n))) {
    console.error("Error: introduce números separados por comas. Ej: 4, 19, 7");
    mostrarResultado('Error: valor incorrecto. Ejemplo válido: "4, 19, 7, 100, 2"');
    return;
  }

  // Calculamos el máximo con la función del enunciado
  let maximo = encontrarMaximo(numeros);

  // Calculamos también con bucle para comprobar que coinciden
  let maximoBucle = encontrarMaximoConBucle(numeros);

  // Mostramos todo por consola
  console.log("==== Número más grande ====");
  console.log("Array original:", numeros);
  console.log("Math.max(...array):", maximo);
  console.log("Versión con bucle :", maximoBucle);

  // Resultado en la capa distinta de la página
  mostrarResultado(
    "Array: [" + numeros.join(", ") + "]\n" +
    "Máximo (Math.max + ...): " + maximo + "\n" +
    "Máximo (bucle for)      : " + maximoBucle
  );
}

/* ------------------------------------------------------------
   3) GENERAR UN ARRAY ALEATORIO PARA PROBAR
   ------------------------------------------------------------ */

/**
 * Rellena el campo de texto con 10 números aleatorios.
 */
function generarArrayAleatorio() {
  // Creamos un array vacío
  let numeros = [];

  // Añadimos 10 valores aleatorios entre 1 y 100
  for (let i = 0; i < 10; i++) {
    numeros.push(Math.floor(Math.random() * 100) + 1);
  }

  // Escribimos el array en el campo de texto (join une con ", ")
  document.getElementById("campo-array").value = numeros.join(", ");

  // Recalculamos el máximo automáticamente
  calcularDesdeCampo();
}

/* ------------------------------------------------------------
   4) EVENTOS DE LOS BOTONES (DOM)
   ------------------------------------------------------------ */

// Botón principal: calcular el máximo
document.getElementById("btn-calcula").addEventListener("click", calcularDesdeCampo);

// Botón auxiliar: array aleatorio
document.getElementById("btn-azar").addEventListener("click", generarArrayAleatorio);

// Botón limpiar
document.getElementById("btn-limpiar").addEventListener("click", () => {
  document.getElementById("campo-array").value = ""; // Vaciamos el campo
  limpiarConsola();
  mostrarResultado("Introduce números separados por comas.");
});
