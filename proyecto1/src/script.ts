// script.ts
const contenedor = document.getElementById("mensaje-ts") as HTMLElement;

if (contenedor) {
    const textoBase: string = "Hola ";
    const textoDestacado: string = "Mundo (TypeScript)";
    
    contenedor.innerHTML = `${textoBase}<span class="texto-verde">${textoDestacado}</span>`;
}
