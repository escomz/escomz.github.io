/* ============================================================
   EJERCICIO 8 - Número aleatorio entero entre un intervalo
   ------------------------------------------------------------
   Objetivo: crear la función azar(min, max) que devuelve un
   entero aleatorio dentro del rango [min, max] (inclusive).
   Ejemplo: azar(-5, 10) -> 3
   ============================================================ */

/* ------------------------------------------------------------
   1) FUNCIÓN azar(min, max)
   ------------------------------------------------------------ */

/**
 * Devuelve un número entero aleatorio entre min y max (ambos incluidos).
 * @param {number} min Límite inferior del intervalo
 * @param {number} max Límite superior del intervalo
 * @returns {number} Entero aleatorio dentro del intervalo
 */
function azar(min, max) {
  // Math.random() devuelve un decimal entre 0 (includo) y 1 (excluido).
  // Ej: 0.0000, 0.4821, 0.9999...

  // 'max - min + 1' es el número de valores posibles del intervalo.
  // Ej con azar(-5, 10): 10 - (-5) + 1 = 16 valores posibles.
  let rango = max - min + 1;

  // Multiplicamos el aleatorio por el tamaño del rango:
  // obtenemos un decimal entre 0 y 16 (sin incluir 16).
  let aleatorio = Math.random() * rango;

  // Math.floor() redondea hacia abajo -> obtenemos un entero de 0 a 15.
  let desplazamiento = Math.floor(aleatorio);

  // Sumamos 'min' para desplazar el intervalo al valor deseado.
  // 0 + (-5) = -5 | 15 + (-5) = 10 -> resultado entre -5 y 10.
  return desplazamiento + min;
}

/* ------------------------------------------------------------
   2) LEER EL INTERVALO DE LOS CAMPOS INPUT
   ------------------------------------------------------------ */

/**
 * Lee mínimo y máximo de la página, valida y genera un valor.
 * @param {number} cantidad Cuántos valores generar (1 o varios)
 */
function generarValores(cantidad) {
  // Recogemos los dos campos de número por su id
  const campoMin = document.getElementById("campo-min");
  const campoMax = document.getElementById("campo-max");

  // Convertimos el texto de los campos a número
  let min = Number(campoMin.value);
  let max = Number(campoMax.value);

  // Validamos que sean números
  if (isNaN(min) || isNaN(max)) {
    console.error("Debes indicar un mínimo y un máximo numéricos.");
    mostrarResultado("Error: introduce dos números válidos.");
    return;
  }

  // Validamos que el mínimo no sea mayor que el máximo
  if (min > max) {
    console.error("El mínimo no puede ser mayor que el máximo.");
    mostrarResultado("Error: el mínimo (" + min + ") es mayor que el máximo (" + max + ").");
    return;
  }

  // Si cantidad = 1 mostramos un único valor
  if (cantidad === 1) {
    let valor = azar(min, max); // Llamada a la función del enunciado

    // Mostramos la llamada y su resultado con console.log
    console.log("azar(" + min + ", " + max + ") =", valor);

    // Resultado en la capa de la página
    mostrarResultado("azar(" + min + ", " + max + ") = " + valor);
    return;
  }

  // Si cantidad > 1 generamos una lista de valores (por defecto 20)
  let lista = [];
  for (let i = 0; i < cantidad; i++) {
    // Cada vuelta del bucle genera un número nuevo
    lista.push(azar(min, max));
  }

  // Mostramos la lista completa en consola
  console.log("20 valores de azar(" + min + ", " + max + "):", lista);

  // Mostramos también una tabla para verlo mejor
  console.table(lista);

  // Resultado en la capa de la página
  mostrarResultado(
    "Generados " + cantidad + " valores con azar(" + min + ", " + max + "):\n" +
    lista.join(", ")
  );
}

/* ------------------------------------------------------------
   3) EVENTOS DE LOS BOTONES (DOM)
   ------------------------------------------------------------ */

// Botón de un solo valor
document.getElementById("btn-azar").addEventListener("click", () => {
  generarValores(1);
});

// Botón de 20 valores seguidos
document.getElementById("btn-veinte").addEventListener("click", () => {
  generarValores(20);
});

// Botón limpiar
document.getElementById("btn-limpiar").addEventListener("click", () => {
  limpiarConsola();
  mostrarResultado("Pulsa un botón para generar valores aleatorios.");
});
