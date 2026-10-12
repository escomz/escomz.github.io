/* ============================================================
   EJERCICIO 15 - Encontrar los números primos en un rango
   ------------------------------------------------------------
   Objetivo: crear la función esPrimo(num) y usarla para listar
   todos los números primos entre 1 y un número dado por el
   usuario.
   ============================================================ */

/* ------------------------------------------------------------
   1) FUNCIÓN esPrimo(num)
   ------------------------------------------------------------ */

/**
 * Comprueba si un número entero es primo.
 * - Los números menores que 2 NO son primos.
 * - Un número es primo si solo admite división exacta entre 1 y él mismo.
 * @param {number} num Número entero a comprobar
 * @returns {boolean} true si es primo
 */
function esPrimo(num) {
  // Casos especiales: 0, 1 y los negativos no son primos
  if (num < 2) {
    return false; // Salimos devolviendo false
  }

  // 2 es el único número par primo (caso especial directo)
  if (num === 2) {
    return true;
  }

  // Si es par y distinto de 2, no puede ser primo (sería divisible entre 2)
  if (num % 2 === 0) {
    return false;
  }

  // Bucle: buscamos divisores desde 3 hasta la raíz cuadrada de num.
  // i * i <= num es equivalente a i <= Math.sqrt(num) pero evita
  // calcular la raíz en cada vuelta (es más eficiente).
  // Empezamos en 3 y avanzamos de 2 en 2 (solo probamos impares).
  for (let i = 3; i * i <= num; i += 2) {
    // '%' resto de la división. Si el resto es 0 -> tiene divisor -> no es primo
    if (num % i === 0) {
      return false; // Encontramos un divisor: no es primo
    }
  }

  // Si llegamos hasta aquí, no tiene divisores: ES primo
  return true;
}

/* ------------------------------------------------------------
   2) LISTAR LOS PRIMOS DE 1 A n
   ------------------------------------------------------------ */

/**
 * Devuelve un array con todos los primos entre 1 y limite (incluido).
 * @param {number} limite Número superior del rango
 * @returns {number[]} Array con los primos encontrados
 */
function primosHasta(limite) {
  // Array donde guardaremos los primos
  let primos = [];

  // Recorremos todos los números de 2 hasta el límite
  for (let numero = 2; numero <= limite; numero++) {
    // Solo añadimos los que la función esPrimo() considere primos
    if (esPrimo(numero)) {
      primos.push(numero);
    }
  }

  return primos;
}

/* ------------------------------------------------------------
   3) FUNCIÓN PRINCIPAL: LEER LÍMITE Y MOSTRAR
   ------------------------------------------------------------ */

/**
 * Lee el límite del campo input, calcula los primos y los muestra.
 * @param {Event} evento Evento 'submit' del formulario
 */
function buscarPrimos(evento) {
  // Evitamos la recarga de la página
  evento.preventDefault();

  // Leemos el valor del campo numérico
  const campo = document.getElementById("campo-limite");
  let limite = Number(campo.value);

  // Validaciones
  if (isNaN(limite) || limite < 1) {
    console.error("Debes indicar un número entero mayor o igual que 1.");
    mostrarResultado("Error: introduce un número mayor o igual que 1.");
    return;
  }

  // 'Math.trunc' quita los decimales para trabajar solo con enteros
  limite = Math.trunc(limite);

  // Calculamos los primos con la función auxiliar
  let primos = primosHasta(limite);

  // Salida por consola
  console.log("==== Números primos de 1 a " + limite + " ====");
  console.log("Total encontrados:", primos.length);
  console.table(primos);

  // Resultado en la capa distinta de la página
  mostrarResultado(
    "Números primos entre 1 y " + limite + ":\n" +
    (primos.length > 0 ? primos.join(", ") : "(ninguno)") + "\n" +
    "--------------------------------\n" +
    "Total: " + primos.length + " números primos"
  );
}

/* ------------------------------------------------------------
   4) EVENTOS DEL FORMULARIO (DOM)
   ------------------------------------------------------------ */

// Se dispara al pulsar "Buscar primos" o con la tecla Intro
document.getElementById("form-primos").addEventListener("submit", buscarPrimos);

// Botón limpiar
document.getElementById("btn-limpiar").addEventListener("click", () => {
  document.getElementById("campo-limite").value = "";
  limpiarConsola();
  mostrarResultado("Introduce un número límite y pulsa \"Buscar primos\".");
});
