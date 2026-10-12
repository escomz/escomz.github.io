/* ============================================================
   EJERCICIO 21 - Filtrar números mayores que un valor
   ------------------------------------------------------------
   Objetivo: recibir un array de números y un valor de referencia,
   y devolver un NUEVO array solo con los números mayores que ese
   valor usando filter().
   ============================================================ */

/* ------------------------------------------------------------
   1) FUNCIÓN DE FILTRADO
   ------------------------------------------------------------ */

/**
 * Devuelve un array nuevo con los números mayores que 'valor'.
 * @param {number[]} numeros Array original de números
 * @param {number} valor Umbral de comparación
 * @returns {number[]} Array nuevo con los mayores que 'valor'
 */
function filtrarMayores(numeros, valor) {
  // filter() crea un array nuevo con los elementos cuya función
  // de callback devuelve true. El original queda intacto.
  let mayores = numeros.filter((numero) => {
    // Condición: ¿es este número mayor que el valor indicado?
    return numero > valor;
  });

  // Devolvemos el resultado
  return mayores;
}

/**
 * Versión alternativa con bucle for (para comparar en clase).
 * @param {number[]} numeros Array original
 * @param {number} valor Umbral
 * @returns {number[]} Array con los mayores
 */
function filtrarMayoresConBucle(numeros, valor) {
  let resultado = []; // Array nuevo vacío
  for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] > valor) {     // Comparamos cada valor con el umbral
      resultado.push(numeros[i]);  // Si cumple, lo añadimos
    }
  }
  return resultado;
}

/* ------------------------------------------------------------
   2) LEER DATOS Y MOSTRAR RESULTADO
   ------------------------------------------------------------ */

/**
 * Lee el array y el valor de los campos, filtra y muestra todo.
 * @param {Event} evento Evento 'submit' del formulario
 */
function filtrarDesdeFormulario(evento) {
  // Evitamos la recarga de la página
  evento.preventDefault();

  // Recogemos los dos campos del formulario
  const campoArray = document.getElementById("campo-array");
  const campoValor = document.getElementById("campo-valor");

  // Convertimos el texto del primer campo en un array de números
  let numeros = campoArray.value
    .split(",")
    .map((texto) => texto.trim())
    .filter((texto) => texto !== "")
    .map((texto) => Number(texto));

  // Leemos el valor de referencia y lo convertimos a número
  let valor = Number(campoValor.value);

  // Validamos que los datos sean correctos
  if (numeros.length === 0 || numeros.some((n) => isNaN(n)) || isNaN(valor)) {
    console.error("Error: revisa el array y el valor de comparación.");
    mostrarResultado('Error: usa números separados por comas y un valor numérico. Ej: "3, 8, 1, 20" y 5');
    return;
  }

  // Aplicamos la función del enunciado
  let mayores = filtrarMayores(numeros, valor);

  // Aplicamos también la versión con bucle para comparar
  let mayoresBucle = filtrarMayoresConBucle(numeros, valor);

  // Mostramos todo por consola
  console.log("==== Filtrar mayores que " + valor + " ====");
  console.log("Array original:", numeros);
  console.log("Valor de referencia:", valor);
  console.log("Mayores (filter):", mayores);
  console.log("Mayores (bucle) :", mayoresBucle);

  // Resultado en la capa distinta de la página
  mostrarResultado(
    "Original : [" + numeros.join(", ") + "]\n" +
    "Mayores que " + valor + "\n" +
    "--------------------------------\n" +
    "RESULTADO: [" + mayores.join(", ") + "]\n" +
    "filter() ha seleccionado " + mayores.length + " de " + numeros.length + " números."
  );
}

/* ------------------------------------------------------------
   3) EVENTOS DEL FORMULARIO (DOM)
   ------------------------------------------------------------ */

// Se dispara al pulsar "Filtrar mayores" o con la tecla Intro
document.getElementById("form-filtro").addEventListener("submit", filtrarDesdeFormulario);

// Botón limpiar
document.getElementById("btn-limpiar").addEventListener("click", () => {
  document.getElementById("campo-array").value = "";
  document.getElementById("campo-valor").value = "";
  limpiarConsola();
  mostrarResultado("Introduce un array y un valor de referencia.");
});
