/* ============================================================
   EJERCICIO 1 - Variables de varios tipos y tipos de dato
   ------------------------------------------------------------
   Objetivo: declarar variables de todos los tipos de dato
   habituales de JavaScript y mostrar su valor junto a su tipo
   (typeof) usando console.log, console.error, console.info y
   console.debug.
   ============================================================ */

/* ------------------------------------------------------------
   1) DECLARACIÓN DE VARIABLES
   ------------------------------------------------------------ */

// var: forma antigua (ámbito de función). Se puede redeclarar.
// Guardamos aquí un número entero de ejemplo.
var anio = 2026;

// let: forma moderna con ámbito de bloque. Permite reasignar el valor.
// Guardamos el nombre de un alumno como cadena de texto (string).
let nombre = "Laura";

// const: constante. NO se puede reasignar (intentarlo da error).
// Guardamos el código de un módulo como texto.
const MODULO = "ADSI";

// Cadena de texto (string): texto entre comillas.
let apellido = "García";

// Número entero (number): en JS todos los números son tipo "number".
let edad = 19;

// Número decimal (también es tipo "number", no existe tipo distinto).
let nota = 8.75;

// Booleano (boolean): solo puede ser true o false.
let aprobado = true;

// null: valor vacío asignado INTENCIONADAMENTE por el programador.
// Ojo: en JS typeof null devuelve "object" (es un fallo histórico del lenguaje).
let alumnoSinFoto = null;

// undefined: variable declarada pero sin valor asignado.
let direccion;
// 'direccion' ahora vale undefined y su tipo es "undefined".

// Array (también es tipo "object"): lista ordenada de valores.
let notas = [7, 8.5, 9, 6];

// Objeto (object): conjunto de pares propiedad: valor.
let alumno = {
  nombre: "Laura",     // propiedad de tipo string
  edad: 19,            // propiedad de tipo number
  aprobado: true       // propiedad de tipo boolean
};

// Función (typeof devuelve "function"): bloque de código reutilizable.
function saludar() {
  return "Hola, " + nombre; // Devolvemos un saludo usando la variable 'nombre'
}

/* ------------------------------------------------------------
   2) FUNCIONES AUXILIARES PARA MOSTRAR EN CONSOLA
   ------------------------------------------------------------ */

/**
 * Muestra un valor por consola junto a su tipo de dato.
 * @param {*} valor Cualquier valor (string, number, boolean, object...)
 * @param {string} etiqueta Texto explicativo que acompañará al valor
 */
function mostrarTipo(valor, etiqueta) {
  // console.log imprime varios argumentos separados por espacio.
  // typeof devuelve una cadena con el nombre del tipo del valor.
  console.log(etiqueta + " =>", valor, "| tipo:", typeof valor);
}

/**
 * Recorre el array 'notas' y muestra cada nota con su posición.
 * Se usa for clásico para explicar bucles en clase.
 */
function mostrarNotas() {
  // for (inicio; condición; incremento): estructura de control repetitiva
  for (let i = 0; i < notas.length; i++) {
    // notación de corchetes: notas[0], notas[1], notas[2]...
    console.log("notas[" + i + "] =", notas[i], "| tipo:", typeof notas[i]);
  }
}

/* ------------------------------------------------------------
   3) LOS 4 TIPOS DE SALIDA DE CONSOLA QUE PIDE EL ENUNCIADO
   ------------------------------------------------------------ */

/**
 * console.log: salida general / por defecto.
 * Muestra todos los tipos de datos declarados.
 */
function salidaLog() {
  // Cabecera con console.log
  console.log("==== console.log(): variables y tipos ====");

  // Mostramos una a una las variables con su tipo
  mostrarTipo(anio, "anio (var)");            // number
  mostrarTipo(nombre, "nombre (let)");        // string
  mostrarTipo(MODULO, "MODULO (const)");      // string
  mostrarTipo(apellido, "apellido");          // string
  mostrarTipo(edad, "edad");                  // number
  mostrarTipo(nota, "nota");                  // number
  mostrarTipo(aprobado, "aprobado");          // boolean
  mostrarTipo(alumnoSinFoto, "alumnoSinFoto"); // null (typeof: object)
  mostrarTipo(direccion, "direccion");        // undefined
  mostrarTipo(notas, "notas (array)");        // object
  mostrarTipo(alumno, "alumno (objeto)");     // object
  mostrarTipo(saludar, "saludar (función)");  // function

  // Llamamos a la función para recorrer el array
  mostrarNotas();

  // Resultado visible en la capa de la página (capa distinta)
  mostrarResultado(
    "console.log -> 12 variables mostradas con typeof.\n" +
    "Tipos vistos: string, number, boolean, object (null, array y objeto) y function."
  );
}

/**
 * console.info: información destacada (icono de "i" en algunos navegadores).
 * Aquí mostramos el resultado de llamar a la función.
 */
function salidaInfo() {
  // console.info funciona igual que console.log pero marca la salida como info
  console.info("==== console.info(): llamando a la función saludar() ====");

  // Guardamos el valor devuelto por la función en una variable
  let mensaje = saludar();

  // Mostramos el mensaje devuelto y su tipo (siempre es string)
  console.info("saludar() devuelve:", mensaje, "| tipo:", typeof mensaje);

  // Refrescamos la capa de resultado de la página
  mostrarResultado("console.info -> saludar() devolvió: " + mensaje);
}

/**
 * console.error: salida con estilo de error (roja).
 * Se usa para avisos o problemas. Aquí simulamos un error al convertir texto.
 */
function salidaError() {
  // Cabecera en rojo
  console.error("==== console.error(): ejemplo de dato incorrecto ====");

  // 'notaTexto' es una cadena, NO se puede hacer media aritmética con ella
  let notaTexto = "ocho";

  // parseInt intenta convertir la cadena a número; como no puede, devuelve NaN
  // (NaN = Not a Number, "no es un número").
  let notaConvertida = parseInt(notaTexto);

  // isNaN comprueba si el valor es NaN y devuelve true
  if (isNaN(notaConvertida)) {
    // Mensaje de error: no se pudo convertir la nota
    console.error('ERROR: "' + notaTexto + '" no se puede convertir a número → NaN');
  }

  // Refrescamos la capa de resultado de la página
  mostrarResultado("console.error -> 'ocho' convertida con parseInt() da NaN (error controlado).");
}

/**
 * console.debug: salida de depuración (suele ocultarse por defecto
 * en la pestaña "Console" si el nivel de verbosidad es "Info").
 * Se usa para trazas internas del programador.
 */
function salidaDebug() {
  // Esta línea puede no verse si el filtro de consola está en "Info"
  console.debug("==== console.debug(): trazas de depuración ====");

  // Mostramos valores intermedios que solo interesan al programador
  console.debug("Edad antes de incrementar:", edad);
  console.debug("Tipo de 'alumnoSinFoto':", typeof alumnoSinFoto, "→ ¡ojo, es object!");

  // Modificamos una variable para ver el cambio
  edad = edad + 1; // Sumamos 1 al valor de edad (19 -> 20)

  console.debug("Edad después de incrementar:", edad);

  // Refrescamos la capa de resultado de la página
  mostrarResultado("console.debug -> edad incrementada: 19 -> " + edad + " (mira la consola F12)");
}

/* ------------------------------------------------------------
   4) EVENTOS DE LOS BOTONES (MANIPULACIÓN DEL DOM)
   ------------------------------------------------------------ */

// document.getElementById("...") busca un elemento por su id y lo devuelve.
// Guardamos cada botón en una constante para poder "escuchar" sus clics.
const btnLog = document.getElementById("btn-log");
const btnInfo = document.getElementById("btn-info");
const btnError = document.getElementById("btn-error");
const btnDebug = document.getElementById("btn-debug");
const btnLimpiar = document.getElementById("btn-limpiar");

// addEventListener("click", ...) ejecuta una función cuando se pulsa el botón.
btnLog.addEventListener("click", salidaLog);      // Botón console.log()
btnInfo.addEventListener("click", salidaInfo);    // Botón console.info()
btnError.addEventListener("click", salidaError);  // Botón console.error()
btnDebug.addEventListener("click", salidaDebug);  // Botón console.debug()

// Al pulsar "Limpiar" vaciamos las capas de salida (función de consola.js)
btnLimpiar.addEventListener("click", limpiarConsola);

/* ------------------------------------------------------------
   5) EJECUCIÓN AUTOMÁTICA AL CARGAR LA PÁGINA
   ------------------------------------------------------------ */

// Mostramos inmediatamente la salida principal para que algo se vea
// sin necesidad de pulsar ningún botón.
salidaLog();

// Aprovechamos para enseñar también info, error y debug de una vez
salidaInfo();
salidaError();
salidaDebug();
