// Proyecto de ejemplo: contador interactivo.
(function () {
  "use strict";

  var valor = document.getElementById("valor");
  var estado = document.getElementById("estado");
  var btnSumar = document.getElementById("btn-sumar");
  var btnRestar = document.getElementById("btn-restar");
  var btnReset = document.getElementById("btn-reset");

  if (!valor || !estado || !btnSumar || !btnRestar || !btnReset) return;

  var contador = 0;

  function actualizar(mensaje) {
    valor.textContent = String(contador);
    estado.textContent = mensaje;
    console.log(mensaje, "→ contador =", contador);
  }

  btnSumar.addEventListener("click", function () {
    contador += 1;
    actualizar("Has sumado 1.");
  });

  btnRestar.addEventListener("click", function () {
    contador -= 1;
    actualizar("Has restado 1.");
  });

  btnReset.addEventListener("click", function () {
    contador = 0;
    actualizar("Contador reiniciado.");
  });

  actualizar("Contador inicializado en 0.");
})();
