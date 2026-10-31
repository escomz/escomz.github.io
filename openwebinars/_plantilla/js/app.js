// Lógica del proyecto. Este archivo se carga desde index.html.
(function () {
  "use strict";

  var boton = document.getElementById("btn-saludo");
  var resultado = document.getElementById("resultado");

  if (!boton || !resultado) return;

  var mensajes = [
    "¡Hola! JavaScript está funcionando.",
    "Puedes cambiar este mensaje en js/app.js.",
    "Abre la consola (F12) para ver más detalles."
  ];
  var indice = 0;

  boton.addEventListener("click", function () {
    resultado.textContent = mensajes[indice];
    console.log("Mensaje mostrado:", mensajes[indice]);
    indice = (indice + 1) % mensajes.length;
  });

  console.log("Proyecto cargado correctamente.");
})();
