// script.js
document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("mensaje");
    
    if (contenedor) {
        const textoBase = "Hola ";
        const textoDestacado = "Mundo (JavaScript)";
        
        contenedor.innerHTML = `${textoBase}<span class="texto-rojo">${textoDestacado}</span>`;
    }
});
