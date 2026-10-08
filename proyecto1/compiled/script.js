"use strict";
// script.ts
const contenedor = document.getElementById("mensaje-ts");
if (contenedor) {
    const textoBase = "Hola ";
    const textoDestacado = "Mundo (TypeScript)";
    contenedor.innerHTML = `${textoBase}<span class="texto-verde">${textoDestacado}</span>`;
}
