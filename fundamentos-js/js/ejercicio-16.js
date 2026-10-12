/* ============================================================
   EJERCICIO 16 - Convertir grados Celsius a Fahrenheit
   ------------------------------------------------------------
   Objetivo: aplicar la fórmula Fahrenheit = (Celsius * 9/5) + 32
   a un valor introducido por el usuario.
   ============================================================ */

/* ------------------------------------------------------------
   1) FUNCIÓN DE CONVERSIÓN
   ------------------------------------------------------------ */

/**
 * Convierte una temperatura de grados Celsius a grados Fahrenheit.
 * @param {number} celsius Temperatura en °C
 * @returns {number} Temperatura en °F
 */
function celsiusAFahrenheit(celsius) {
  // Aplicamos la fórmula del enunciado tal cual:
  //   (Celsius * 9/5) + 32
  // Ojo con el orden: primero la multiplicación, después la suma.
  let fahrenheit = (celsius * 9 / 5) + 32;

  // Devolvemos el valor convertido
  return fahrenheit;
}

/* ------------------------------------------------------------
   2) FUNCIÓN PRINCIPAL
   ------------------------------------------------------------ */

/**
 * Lee los grados Celsius del campo, convierte y muestra el resultado.
 * @param {Event} evento Evento 'submit' del formulario
 */
function convertir(evento) {
  // Evitamos la recarga de la página
  evento.preventDefault();

  // Recogemos el campo numérico y leemos su valor como número
  const campo = document.getElementById("campo-celsius");
  let celsius = Number(campo.value);

  // Validamos que el valor sea un número
  if (isNaN(celsius)) {
    console.error("Debes indicar una temperatura válida en grados Celsius.");
    mostrarResultado("Error: introduce un número de grados Celsius.");
    return;
  }

  // Llamamos a la función de conversión
  let fahrenheit = celsiusAFahrenheit(celsius);

  // toFixed(2) devuelve un STRING con 2 decimales (útil para mostrar)
  let fahrenheitRedondeado = fahrenheit.toFixed(2);

  // Mostramos la operación paso a paso por consola
  console.log("==== Celsius -> Fahrenheit ====");
  console.log("Celsius:", celsius);
  console.log("Fórmula: (" + celsius + " * 9/5) + 32");
  console.log("Resultado:", fahrenheit, "°F");

  // Resultado en la capa distinta de la página
  mostrarResultado(
    "Celsius   : " + celsius + " °C\n" +
    "Fórmula  : (" + celsius + " * 9/5) + 32\n" +
    "--------------------------------\n" +
    "FAHRENHEIT: " + fahrenheitRedondeado + " °F"
  );
}

/* ------------------------------------------------------------
   3) EVENTOS DEL FORMULARIO (DOM)
   ------------------------------------------------------------ */

// Se dispara al pulsar el botón o con Intro
document.getElementById("form-temperatura").addEventListener("submit", convertir);

// Botón limpiar
document.getElementById("btn-limpiar").addEventListener("click", () => {
  document.getElementById("campo-celsius").value = "";
  limpiarConsola();
  mostrarResultado("Introduce grados Celsius y pulsa el botón.");
});
