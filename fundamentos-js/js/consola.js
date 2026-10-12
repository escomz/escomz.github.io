/* ============================================================
   consola.js - Captura la consola del navegador y la pinta en pantalla
   ------------------------------------------------------------
   Muchos ejercicios piden usar console.log / console.error /
   console.info / console.debug / console.table. Esas llamadas no se
   ven en la página, solo en las herramientas de desarrollo (F12).
   Este script "envuelve" esos métodos para que, además de escribirse
   en la consola real, se muestren también dentro de la capa
   <div id="consola"> de la página.
   ============================================================ */

// Guardamos las funciones originales de console para no perderlas
// (si no las guardáramos, al sobrescribirlas entraríamos en bucle infinito).
const consolaOriginal = {
  log: console.log,       // Función original de console.log
  info: console.info,      // Función original de console.info
  error: console.error,    // Función original de console.error
  debug: console.debug,    // Función original de console.debug
  table: console.table     // Función original de console.table
};

/**
 * Convierte cualquier valor pasado a console.* en un texto legible.
 * - Los objetos/array se serializan con JSON.stringify para verlos completos.
 * - Los textos, números y booleanos se pasan a cadena con String().
 * @param {*} valor Cualquier tipo de dato (string, number, object, array...)
 * @returns {string} Texto listo para pintar en el HTML
 */
function convertirATexto(valor) {
  if (typeof valor === "string") {   // Si ya es texto...
    return valor;                    // ... lo devolvemos tal cual
  }
  try {
    return JSON.stringify(valor);    // Si es objeto/array/número... lo serializamos
  } catch (error) {
    return String(valor);            // Si falla la serialización, usamos String()
  }
}

/**
 * Añade una línea de texto a la capa #consola de la página.
 * @param {string} clase Clase CSS que colorea la línea (c-log, c-error, etc.)
 * @param {string} texto Texto final que se mostrará
 */
function pintarEnPantalla(clase, texto) {
  // Buscamos la capa de consola en el DOM (puede no existir en algunas páginas)
  const capa = document.getElementById("consola");
  if (!capa) return; // Si no existe, no hacemos nada (salimos de la función)

  // Creamos un elemento <span> para cada línea de salida
  const linea = document.createElement("span");
  linea.className = "linea " + clase;      // Le asignamos la clase de color
  linea.textContent = texto;               // Le ponemos el texto (seguro, sin HTML)
  capa.appendChild(linea);                 // Lo añadimos dentro de la capa

  // Dejamos siempre la consola bajada a la última línea añadida
  capa.scrollTop = capa.scrollHeight;
}

/**
 * Sobrescribe un método de console para que pinte también en pantalla.
 * @param {string} metodo Nombre del método: "log", "info", "error", "debug"
 * @param {string} clase Clase CSS asociada a ese método
 */
function capturarMetodo(metodo, clase) {
  // Guardamos la función original en una variable local
  const original = consolaOriginal[metodo];

  // Sustituimos el método por una función flecha nueva
  console[metodo] = (...argumentos) => {
    // 1) Llamamos al método original para que siga funcionando la consola real
    original.apply(console, argumentos);

    // 2) Unimos todos los argumentos con un espacio y los pintamos en pantalla
    const texto = argumentos.map(convertirATexto).join(" ");
    pintarEnPantalla(clase, texto);
  };
}

// Capturamos los 4 métodos básicos que piden los ejercicios 1 y 3
capturarMetodo("log", "c-log");     // console.log   -> línea gris claro
capturarMetodo("info", "c-info");   // console.info  -> línea azul
capturarMetodo("error", "c-error"); // console.error -> línea roja
capturarMetodo("debug", "c-debug"); // console.debug -> línea violeta

// Capturamos también console.table (ejercicios 2 y 3)
console.table = (datos) => {
  // Mostramos la tabla real en las herramientas de desarrollo
  consolaOriginal.table(datos);

  // Y pintamos una representación textual en la capa de la página
  if (Array.isArray(datos)) {
    // Si es un array de cosas simples, pintamos una fila por elemento
    pintarEnPantalla("c-tabla", "┌─ tabla (array) ─");
    datos.forEach((elemento, posicion) => {
      const contenido = typeof elemento === "object" && elemento !== null
        ? convertirATexto(elemento)  // Objeto/array anidado -> JSON
        : String(elemento);          // Valor simple -> texto
      pintarEnPantalla("c-tabla", `│ [${posicion}] ${contenido}`);
    });
    pintarEnPantalla("c-tabla", "└──────────────────");
  } else if (typeof datos === "object" && datos !== null) {
    // Si es un objeto, pintamos una línea por propiedad
    pintarEnPantalla("c-tabla", "┌─ tabla (objeto) ─");
    Object.keys(datos).forEach((clave) => {
      const contenido = typeof datos[clave] === "object" && datos[clave] !== null
        ? convertirATexto(datos[clave]) // Valor complejo -> JSON
        : String(datos[clave]);         // Valor simple -> texto
      pintarEnPantalla("c-tabla", `│ ${clave}: ${contenido}`);
    });
    pintarEnPantalla("c-tabla", "└──────────────────");
  } else {
    // Cualquier otra cosa la pintamos tal cual
    pintarEnPantalla("c-tabla", "tabla: " + convertirATexto(datos));
  }
};

/**
 * Borra todo el contenido de las capas de salida.
 * Utilidad para botones de "Limpiar".
 */
function limpiarConsola() {
  const capaConsola = document.getElementById("consola");   // Capa de consola
  const capaResultado = document.getElementById("resultado"); // Capa de resultado
  if (capaConsola) capaConsola.innerHTML = "";   // Vaciamos la consola
  if (capaResultado) capaResultado.innerHTML = ""; // Vaciamos el resultado
}

/**
 * Escribe un texto dentro de la capa principal de resultado (#resultado).
 * Es la "capa distinta" donde se muestra el resultado del ejercicio.
 * @param {string} texto Texto a mostrar (se interpreta como texto plano)
 */
function mostrarResultado(texto) {
  const capa = document.getElementById("resultado"); // Buscamos la capa de resultado
  if (capa) capa.textContent = texto;                // Escribimos el texto dentro
}

/**
 * Añade una fila a la tabla de resultado (#tabla-resultado) si existe.
 * Se usa en ejercicios que piden tablas (2, 11, etc.)
 * @param {Array|Object} fila Datos de la fila
 */
function agregarFilaTabla(fila) {
  const tabla = document.getElementById("tabla-resultado"); // Tabla de resultado
  if (!tabla) return;                    // Si no hay tabla en la página, salimos
  const tbody = tabla.querySelector("tbody"); // Buscamos el cuerpo de la tabla
  const tr = document.createElement("tr");     // Creamos una fila <tr>
  const datos = Array.isArray(fila) ? fila : Object.values(fila); // Array u objeto -> array
  datos.forEach((valor) => {                    // Recorremos cada valor
    const td = document.createElement("td");    // Creamos una celda <td>
    td.textContent = typeof valor === "object" && valor !== null
      ? convertirATexto(valor)  // Valor complejo -> JSON
      : String(valor);          // Valor simple -> texto
    tr.appendChild(td);         // Añadimos la celda a la fila
  });
  tbody.appendChild(tr);        // Añadimos la fila al cuerpo de la tabla
}

/**
 * Vacía el cuerpo de la tabla de resultado (para poder regenerarla).
 */
function limpiarTablaResultado() {
  const tabla = document.getElementById("tabla-resultado");
  if (!tabla) return;
  const tbody = tabla.querySelector("tbody");
  if (tbody) tbody.innerHTML = "";
}
