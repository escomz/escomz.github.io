/* ============================================================
   EJERCICIO 19 - Calcular el promedio de un array de números
   ------------------------------------------------------------
   Objetivo: sumar todos los elementos con reduce() y dividir
   entre la longitud del array para obtener el promedio.
   ============================================================ */

/* ------------------------------------------------------------
   1) FUNCIÓN QUE CALCULA EL PROMEDIO
   ------------------------------------------------------------ */

/**
 * Devuelve el promedio aritmético de un array de números.
 * @param {number[]} numeros Array con los valores a promediar
 * @returns {number} Promedio (suma / cantidad)
 */
function calcularPromedio(numeros) {
  // Caso especial: si el array está vacío, evitamos dividir entre 0
  if (numeros.length === 0) {
    return 0;
  }

  // reduce((acumulador, valorActual) => ..., valorInicial) recorre el array
  // acumulando un único resultado.
  //   1ª vuelta: acumulador = 0,            valor = 7     -> 0 + 7   = 7
  //   2ª vuelta: acumulador = 7,            valor = 8.5   -> 7 + 8.5 = 15.5
  //   ... y así hasta el final
  // El 0 del final es el VALOR INICIAL del acumulador.
  let suma = numeros.reduce((acumulador, valor) => {
    return acumulador + valor; // Devolvemos la nueva suma
  }, 0);

  // Promedio = suma total / cantidad de elementos (length)
  let promedio = suma / numeros.length;

  // Redondeamos a 2 decimales para que el resultado sea más limpio
  // Math.round(x * 100) / 100 devuelve el número redondeado (no string)
  promedio = Math.round(promedio * 100) / 100;

  return promedio;
}

/**
 * Versión alternativa con bucle for (para comparar en clase).
 * @param {number[]} numeros Array de números
 * @returns {number} Promedio
 */
function calcularPromedioConBucle(numeros) {
  let suma = 0; // Acumulador que empieza en 0
  for (let i = 0; i < numeros.length; i++) {
    suma = suma + numeros[i]; // Sumamos cada valor
  }
  return numeros.length === 0 ? 0 : suma / numeros.length;
}

/* ------------------------------------------------------------
   2) LEER EL ARRAY Y MOSTRAR
   ------------------------------------------------------------ */

/**
 * Lee el array del campo, calcula el promedio y lo muestra.
 */
function promediarDesdeCampo() {
  // Recogemos el campo de texto
  const campo = document.getElementById("campo-array");

  // Convertimos el texto en array de números
  let numeros = campo.value
    .split(",")
    .map((texto) => texto.trim())
    .filter((texto) => texto !== "")
    .map((texto) => Number(texto));

  // Validación
  if (numeros.length === 0 || numeros.some((n) => isNaN(n))) {
    console.error('Error: introduce números separados por comas. Ej: "7, 8.5, 9"');
    mostrarResultado('Error: valor incorrecto. Ejemplo: "7, 8.5, 9, 6.5, 10"');
    return;
  }

  // Calculamos con reduce y con bucle (para comparar)
  let promedio = calcularPromedio(numeros);
  let promedioBucle = calcularPromedioConBucle(numeros);

  // Salida por consola
  console.log("==== Promedio con reduce() ====");
  console.log("Array      :", numeros);
  console.log("reduce()   :", numeros.reduce((a, v) => a + v, 0));
  console.log("Longitud   :", numeros.length);
  console.log("Promedio   :", promedio);
  console.log("Con bucle  :", promedioBucle);

  // Resultado en la capa distinta de la página
  mostrarResultado(
    "Array   : [" + numeros.join(", ") + "]\n" +
    "Suma    : " + numeros.reduce((a, v) => a + v, 0) + "\n" +
    "Valores : " + numeros.length + "\n" +
    "--------------------------------\n" +
    "PROMEDIO: " + promedio
  );
}

/**
 * Genera 5 notas aleatorias entre 4 y 10 y las calcula.
 */
function notasAleatorias() {
  let notas = [];
  for (let i = 0; i < 5; i++) {
    // Nota aleatoria con un decimal entre 4.0 y 10.0
    let nota = Math.round((Math.random() * 6 + 4) * 10) / 10;
    notas.push(nota);
  }
  document.getElementById("campo-array").value = notas.join(", ");
  promediarDesdeCampo(); // Calculamos automáticamente
}

/* ------------------------------------------------------------
   3) EVENTOS DE LOS BOTONES (DOM)
   ------------------------------------------------------------ */

// Botón principal
document.getElementById("btn-promediar").addEventListener("click", promediarDesdeCampo);

// Botón auxiliar: notas aleatorias
document.getElementById("btn-azar").addEventListener("click", notasAleatorias);

// Botón limpiar
document.getElementById("btn-limpiar").addEventListener("click", () => {
  document.getElementById("campo-array").value = "";
  limpiarConsola();
  mostrarResultado("Introduce números separados por comas.");
});
