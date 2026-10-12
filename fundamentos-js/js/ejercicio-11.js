/* ============================================================
   EJERCICIO 11 - 100 números del 1 al 20 y su recuento
   ------------------------------------------------------------
   Objetivo: generar 100 números aleatorios entre 1 y 20 y
   mostrar cuántos números distintos han aparecido al menos una
   vez (junto al recuento completo de apariciones).
   ============================================================ */

/* ------------------------------------------------------------
   1) CONSTANTES Y VARIABLES
   ------------------------------------------------------------ */

// Total de números que vamos a generar (lo pide el enunciado)
const TOTAL_NUMEROS = 100;

// Rango de valores posibles: del 1 al 20 (ambos incluidos)
const MIN_VALOR = 1;
const MAX_VALOR = 20;

// Array donde guardaremos los 100 números generados
let numeros = [];

/* ------------------------------------------------------------
   2) GENERAR LOS 100 NÚMEROS
   ------------------------------------------------------------ */

/**
 * Rellena el array 'numeros' con 100 valores aleatorios del 1 al 20.
 */
function generarNumeros() {
  // Reiniciamos el array (por si ya había datos)
  numeros = [];

  // Bucle for: 100 vueltas
  for (let i = 0; i < TOTAL_NUMEROS; i++) {
    // Fórmula del entero aleatorio acotado:
    // Math.random() -> 0..1 | *20 -> 0..20 | floor -> 0..19 | +1 -> 1..20
    let valor = Math.floor(Math.random() * MAX_VALOR) + MIN_VALOR;

    // Añadimos el valor al array
    numeros.push(valor);
  }

  console.log("Generados " + numeros.length + " números entre " + MIN_VALOR + " y " + MAX_VALOR + ".");
}

/* ------------------------------------------------------------
   3) CONTAR APARICIONES
   ------------------------------------------------------------ */

/**
 * Cuenta cuántas veces aparece cada número del 1 al 20.
 * @returns {Object} Objeto con clave = número y valor = veces que aparece
 */
function contarApariciones() {
  // Creamos un objeto vacío que hará de "contador".
  // Ejemplo final: { 1: 4, 2: 7, 3: 0, ... }
  let contador = {};

  // Inicializamos todos los números del 1 al 20 a 0 apariciones
  for (let n = MIN_VALOR; n <= MAX_VALOR; n++) {
    contador[n] = 0; // Creamos la clave con valor 0
  }

  // Recorremos los 100 números generados
  for (let i = 0; i < numeros.length; i++) {
    let numero = numeros[i];     // Número actual (entre 1 y 20)
    contador[numero] = contador[numero] + 1; // Sumamos 1 a su contador
  }

  // Devolvemos el objeto con todos los recuentos
  return contador;
}

/* ------------------------------------------------------------
   4) CONTAR LOS QUE HAN APARECIDO AL MENOS UNA VEZ
   ------------------------------------------------------------ */

/**
 * Cuenta cuántos números del objeto tienen apariciones >= 1.
 * @param {Object} contador Objeto devuelto por contarApariciones()
 * @returns {number} Cuántos números distintos han aparecido
 */
function contarHanAparecido(contador) {
  // Variable acumulador
  let total = 0;

  // for...in recorre las CLAVES de un objeto (aquí: "1", "2", ... "20")
  for (let clave in contador) {
    // Solo incrementamos si el número apareció al menos una vez
    if (contador[clave] >= 1) {
      total++;
    }
  }

  return total;
}

/* ------------------------------------------------------------
   5) MOSTRAR RESULTADOS
   ------------------------------------------------------------ */

/**
 * Genera los números, cuenta y pinta todo en la página.
 */
function analizar() {
  // Paso 1: generar la tirada
  generarNumeros();

  // Paso 2: contar apariciones de cada número
  let contador = contarApariciones();

  // Paso 3: contar cuántos han aparecido al menos una vez
  let hanAparecido = contarHanAparecido(contador);

  // Mostramos el array completo por consola
  console.log("Tirada de 100 números:", numeros);

  // Mostramos el recuento como tabla (una fila por número)
  console.table(contador);

  // Mensaje resumen con console.log
  console.log(
    "Números que han aparecido al menos una vez: " +
    hanAparecido + " de " + (MAX_VALOR - MIN_VALOR + 1)
  );

  // Resultado en la capa distinta de la página
  mostrarResultado(
    "Números distintos que han aparecido al menos una vez:\n" +
    hanAparecido + " de " + (MAX_VALOR - MIN_VALOR + 1) + "\n" +
    "--------------------------------\n" +
    "Ejemplo de tirada (10 primeros): " + numeros.slice(0, 10).join(", ")
  );

  // Pintamos el recuento en la tabla HTML de la página
  pintarTabla(contador);
}

/**
 * Pinta el objeto contador en la tabla HTML #tabla-resultado.
 * @param {Object} contador Recuento por número
 */
function pintarTabla(contador) {
  // Vaciamos el cuerpo de la tabla para no duplicar filas
  limpiarTablaResultado();

  // Recorremos los números del 1 al 20
  for (let n = MIN_VALOR; n <= MAX_VALOR; n++) {
    // Creamos la fila
    const fila = document.createElement("tr");

    // Celda 1: el número
    const tdNumero = document.createElement("td");
    tdNumero.textContent = n;

    // Celda 2: cuántas veces aparece
    const tdVeces = document.createElement("td");
    tdVeces.textContent = contador[n];

    // Celda 3: Sí / No según si apareció
    const tdAparece = document.createElement("td");
    tdAparece.textContent = contador[n] >= 1 ? "Sí" : "No"; // Operador ternario

    // Añadimos las tres celdas a la fila
    fila.appendChild(tdNumero);
    fila.appendChild(tdVeces);
    fila.appendChild(tdAparece);

    // Añadimos la fila a la tabla
    document.getElementById("tabla-resultado").querySelector("tbody").appendChild(fila);
  }
}

/* ------------------------------------------------------------
   6) EVENTOS DE LOS BOTONES (DOM)
   ------------------------------------------------------------ */

// Botón principal: genera y analiza
document.getElementById("btn-generar").addEventListener("click", analizar);

// Botón: muestra la tirada completa con console.table()
document.getElementById("btn-tabla").addEventListener("click", () => {
  if (numeros.length === 0) {
    console.error("Primero genera los números.");
    return;
  }
  console.table(numeros); // Una fila por cada uno de los 100 números
  mostrarResultado("console.table() ejecutado con los 100 números (mira F12).");
});

// Botón limpiar
document.getElementById("btn-limpiar").addEventListener("click", () => {
  limpiarConsola();
  limpiarTablaResultado();
  mostrarResultado("Pulsa \"Generar 100 números\" para comenzar.");
});

/* ------------------------------------------------------------
   7) EJECUCIÓN AUTOMÁTICA AL ABRIR LA PÁGINA
   ------------------------------------------------------------ */

analizar();
