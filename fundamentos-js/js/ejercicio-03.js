/* ============================================================
   EJERCICIO 3 - Objeto persona con todos los tipos de dato
   ------------------------------------------------------------
   Objetivo: crear un objeto con propiedades de todos los tipos
   de JavaScript (string, number, boolean, null, undefined, array
   y otro objeto) y mostrarlo con console.log y console.table.
   ============================================================ */

/* ------------------------------------------------------------
   1) DECLARACIÓN DEL OBJETO PERSONA
   ------------------------------------------------------------ */

// Creamos el objeto con llaves { } y pares propiedad: valor separados por coma.
// const porque la referencia al objeto no va a cambiar (sus datos sí pueden).
const persona = {
  // string: texto entre comillas
  nombre: "Laura",

  // string: apellidos
  apellidos: "García López",

  // number: entero (edad en años)
  edad: 19,

  // number: decimal (nota media)
  notaMedia: 8.75,

  // boolean: solo true o false
  aprobado: true,

  // null: valor vacío a propósito (aún no tiene foto de perfil)
  foto: null,

  // undefined: la clave EXISTE pero no se le ha asignado valor
  telefonoMovil: undefined,

  // array: lista ordenada de notas (todas son numbers)
  notas: [7, 8.5, 9, 6.5, 10],

  // objeto anidado: otra propiedad cuyo valor es a su vez un objeto
  direccion: {
    calle: "Mayor 12",        // string dentro del objeto "direccion"
    ciudad: "Madrid",         // string
    cp: 28013                 // number (código postal sin ceros a la izquierda)
  },

  // función (método): una propiedad cuyo valor es una función
  presentarse: function () {
    // 'this' hace referencia al propio objeto persona
    // Devolvemos un texto concatenando varias propiedades
    return "Soy " + this.nombre + " " + this.apellidos + ", tengo " + this.edad + " años.";
  }
};

/* ------------------------------------------------------------
   2) MOSTRAR CON console.log
   ------------------------------------------------------------ */

/**
 * Muestra el objeto completo y cada propiedad por separado
 * junto a su tipo de dato (typeof).
 */
function mostrarConLog() {
  // Cabecera
  console.log("==== console.log(objeto persona) ====");

  // Imprimimos el objeto entero (los navegadores lo muestran desplegable)
  console.log("Objeto completo:", persona);

  // for...in recorre TODAS las claves (propiedades) de un objeto
  for (let clave in persona) {
    // Accedemos al valor con notación de punto: persona.nombre, persona.edad...
    let valor = persona[clave];

    // typeof devuelve el tipo; para arrays y null también dice "object"
    console.log(clave, "=>", valor, "| tipo:", typeof valor);
  }

  // Mostramos el array de notas por separado (nota: typeof es "object")
  console.log("Array 'notas':", persona.notas, "| tipo:", typeof persona.notas, "| isArray:", Array.isArray(persona.notas));

  // Mostramos el objeto anidado 'direccion'
  console.log("Objeto 'direccion':", persona.direccion, "| tipo:", typeof persona.direccion);

  // Mostramos la dirección con notación encadenada (objeto.propiedad.propiedad)
  console.log("Dirección completa:", persona.direccion.calle, "-", persona.direccion.ciudad, "-", persona.direccion.cp);

  // Llamamos al método presentarse() y mostramos lo que devuelve
  console.info("Método presentarse():", persona.presentarse());

  // Resultado en la capa de la página
  mostrarResultado(
    "console.log -> objeto persona mostrado completo y propiedad a propiedad.\n" +
    "Tipos usados: string, number, boolean, null, undefined, array (notas) y objeto (direccion)."
  );
}

/* ------------------------------------------------------------
   3) MOSTRAR CON console.table
   ------------------------------------------------------------ */

/**
 * Muestra el objeto como tabla con console.table().
 * Si le pasamos un objeto, pinta una fila por cada propiedad.
 * Si le pasamos un array de objetos, pinta una fila por objeto.
 */
function mostrarConTable() {
  // Tabla del objeto principal: una fila por propiedad
  console.table(persona);

  // Tabla del array de notas: una fila por nota (muy visual)
  console.table(persona.notas);

  // Creamos un array de "filas" a partir de las propiedades del objeto
  // Object.entries() devuelve un array de pares [clave, valor]
  const filas = Object.entries(persona).map(([clave, valor]) => ({
    propiedad: clave,                              // Nombre de la propiedad
    tipo: typeof valor,                            // Tipo de dato
    valor: typeof valor === "object" && valor !== null
      ? JSON.stringify(valor)                      // Serializamos objetos/array a texto
      : String(valor)                              // El resto, directamente a texto
  }));

  // Mostramos esa tabla resumen también en consola
  console.table(filas);

  // Resultado en la capa de la página
  mostrarResultado(
    "console.table -> 3 tablas generadas (objeto, array notas y resumen de propiedades).\n" +
    "Mira la consola del navegador (F12) para verlas dibujadas."
  );
}

/* ------------------------------------------------------------
   4) MOSTRAR LA INFORMACIÓN EN EL HTML (DOM)
   ------------------------------------------------------------ */

/**
 * Escribe el nombre y el correo de la persona en la página
 * usando manipulación del DOM (getElementById + textContent/href).
 */
function pintarEnHTML() {
  // Buscamos el encabezado h3 por su id
  const titulo = document.getElementById("nombre-persona");

  // Cambiamos su texto de forma segura (no interpreta HTML)
  titulo.textContent = persona.nombre + " " + persona.apellidos + " (" + persona.edad + " años)";

  // Buscamos el enlace por su id
  const enlace = document.getElementById("enlace-correo");

  // Montamos un mailto: con el nombre como asunto
  enlace.href = "mailto:ejemplo@correo.com?subject=Contacto con " + encodeURIComponent(persona.nombre);
}

/* ------------------------------------------------------------
   5) EVENTOS DE LOS BOTONES (DOM)
   ------------------------------------------------------------ */

// Recogemos los botones por su id
const btnLog = document.getElementById("btn-log");
const btnTable = document.getElementById("btn-table");
const btnLimpiar = document.getElementById("btn-limpiar");

// addEventListener asigna la función que se ejecuta al hacer clic
btnLog.addEventListener("click", mostrarConLog);
btnTable.addEventListener("click", mostrarConTable);
btnLimpiar.addEventListener("click", limpiarConsola);

/* ------------------------------------------------------------
   6) EJECUCIÓN AL CARGAR LA PÁGINA
   ------------------------------------------------------------ */

// Pintamos el nombre en el HTML de la sección de elementos
pintarEnHTML();

// Mostramos automáticamente la salida principal
mostrarConLog();
