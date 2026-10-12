/* ============================================================
   EJERCICIO 2 - Array de 100 números aleatorios
   ------------------------------------------------------------
   Objetivo: crear un array con 100 números al azar, mostrarlo
   con console.table() y filtrar los valores que estén dentro de
   un rango indicado por el usuario (mínimo y máximo).
   ============================================================ */

/* ------------------------------------------------------------
   1) VARIABLES GLOBALES DEL EJERCICIO
   ------------------------------------------------------------ */

// Tamaño fijo del array: el enunciado pide exactamente 100 números.
const TAMANO = 100;

// Array vacío que se irá rellenando con valores aleatorios.
// let porque lo vamos a reasignar (al regenerar los datos).
let numeros = [];

/* ------------------------------------------------------------
   2) GENERACIÓN DEL ARRAY
   ------------------------------------------------------------ */

/**
 * Rellena el array 'numeros' con 100 valores aleatorios del 0 al 99.
 * Math.random() devuelve un decimal entre 0 (incluido) y 1 (excluido).
 * Math.floor() redondea hacia abajo (quita los decimales).
 * Multiplicamos por 100 para obtener valores enteros de 0 a 99.
 */
function generarArray() {
  // Reiniciamos el array vacío por si ya había datos de una ejecución anterior
  numeros = [];

  // Bucle for: recorre las 100 posiciones del array
  for (let i = 0; i < TAMANO; i++) {
    // Calculamos un entero aleatorio entre 0 y 99
    let valorAzar = Math.floor(Math.random() * 100);

    // push() añade un nuevo elemento al FINAL del array
    numeros.push(valorAzar);
  }

  // Avisamos por consola de que el array está listo
  console.log("Array generado con " + numeros.length + " elementos.");

  // Mostramos el resultado en la capa de la página
  mostrarResultado(
    "Array generado: 100 números aleatorios entre 0 y 99.\n" +
    "Primeros 10 valores: " + numeros.slice(0, 10).join(", ")
  );
}

/* ------------------------------------------------------------
   3) MOSTRAR CON console.table
   ------------------------------------------------------------ */

/**
 * Muestra el array completo usando console.table().
 * console.table() dibuja una tabla en las herramientas de desarrollo
 * con una columna para el índice y otra para el valor.
 */
function mostrarTabla() {
  // Comprobamos que haya datos antes de mostrarlos
  if (numeros.length === 0) {
    console.error("Primero pulsa 'Generar 100 números'.");
    mostrarResultado("Error: primero genera el array.");
    return; // Salimos de la función sin continuar
  }

  // Mostramos el array como tabla en la consola real
  console.table(numeros);

  // En la página mostramos un resumen (la tabla completa es muy larga)
  mostrarResultado(
    "console.table() ejecutado con 100 filas (ver consola F12).\n" +
    "Mínimo: " + Math.min(...numeros) + " | Máximo: " + Math.max(...numeros)
  );
}

/* ------------------------------------------------------------
   4) FILTRADO POR RANGO
   ------------------------------------------------------------ */

/**
 * Filtra los números que estén dentro del rango [min, max] (inclusive).
 * Usa el método filter() que crea un array NUEVO solo con los elementos
 * para los que la función devuelva true.
 */
function filtrarPorRango() {
  // Leemos los valores escritos por el usuario en los campos input
  const inputMin = document.getElementById("valor-min");
  const inputMax = document.getElementById("valor-max");

  // value devuelve SIEMPRE un string, por eso usamos Number() para convertirlo
  let min = Number(inputMin.value);
  let max = Number(inputMax.value);

  // Validación: si no son números, avisamos con console.error
  if (isNaN(min) || isNaN(max)) {
    console.error("Debes indicar un mínimo y un máximo numéricos.");
    mostrarResultado("Error: introduce dos números válidos en los campos.");
    return;
  }

  // Validación: si el mínimo es mayor que el máximo, los intercambiamos
  if (min > max) {
    // Variable auxiliar para intercambiar sin perder valores
    let auxiliar = min;
    min = max;
    max = auxiliar;
    console.info("Aviso: se han intercambiado mínimo y máximo.");
  }

  // Comprobamos que existan datos
  if (numeros.length === 0) {
    mostrarResultado("Error: primero genera el array con el botón correspondiente.");
    return;
  }

  // filter(): crea un array nuevo con los elementos que cumplen la condición
  // '%': operador resto (módulo). Aquí NO lo usamos, comparamos con >= y <=
  let filtrados = numeros.filter((valor) => {
    return valor >= min && valor <= max; // true si está dentro del rango
  });

  // Mostramos el resultado de la consola
  console.log("Valores dentro del rango [" + min + ", " + max + "]:");
  console.table(filtrados);

  // Refrescamos la capa de resultado de la página
  mostrarResultado(
    "Filtrado de valores entre " + min + " y " + max + ":\n" +
    "Coincidencias: " + filtrados.length + " de " + numeros.length + "\n" +
    "Valores: " + (filtrados.length ? filtrados.join(", ") : "(ninguno)")
  );

  // Pintamos el filtrado también en la tabla HTML de la página
  pintarTablaHTML(filtrados);
}

/**
 * Pinta los valores filtrados en la tabla HTML #tabla-resultado.
 * @param {Array} datos Array de números ya filtrados
 */
function pintarTablaHTML(datos) {
  // Limpiamos el cuerpo de la tabla (tbody) para no duplicar filas
  limpiarTablaResultado();

  // Recorremos cada valor del array filtrado con forEach
  datos.forEach((valor, indice) => {
    // Creamos una fila <tr> con createElement
    const fila = document.createElement("tr");

    // Primera celda: la posición original dentro del array completo
    const celdaIndice = document.createElement("td");
    // indexOf devuelve la PRIMERA posición de un valor en el array
    celdaIndice.textContent = numeros.indexOf(valor);

    // Segunda celda: el valor en sí
    const celdaValor = document.createElement("td");
    celdaValor.textContent = valor;

    // Añadimos las dos celdas a la fila
    fila.appendChild(celdaIndice);
    fila.appendChild(celdaValor);

    // Y la fila completa a la tabla
    const tabla = document.getElementById("tabla-resultado");
    tabla.querySelector("tbody").appendChild(fila);
  });
}

/* ------------------------------------------------------------
   5) EVENTOS DE LOS BOTONES (MANIPULACIÓN DEL DOM)
   ------------------------------------------------------------ */

// Recogemos los botones del formulario mediante su id
const btnGenerar = document.getElementById("btn-generar");
const btnTabla = document.getElementById("btn-tabla");
const btnFiltrar = document.getElementById("btn-filtrar");
const btnLimpiar = document.getElementById("btn-limpiar");

// addEventListener("click", fn) llama a fn cuando se pulsa el botón
btnGenerar.addEventListener("click", generarArray);     // Genera el array
btnTabla.addEventListener("click", mostrarTabla);       // console.table()
btnFiltrar.addEventListener("click", filtrarPorRango);  // Filtra por rango
btnLimpiar.addEventListener("click", () => {
  limpiarConsola();          // Vacía consola y resultado
  limpiarTablaResultado();   // Vacía la tabla HTML
  mostrarResultado("Salida limpiada. Pulsa 'Generar 100 números'.");
});

/* ------------------------------------------------------------
   6) EJECUCIÓN AUTOMÁTICA AL ABRIR LA PÁGINA
   ------------------------------------------------------------ */

// Generamos el array y mostramos la tabla nada más cargar,
// para que la página no esté vacía.
generarArray();
mostrarTabla();
