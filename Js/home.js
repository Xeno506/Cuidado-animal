document.addEventListener("DOMContentLoaded", function ()
{
    /* ================= TALLERES ================= */

    let talleres = document.querySelectorAll(".taller");

    talleres.forEach(function (taller)
    {
        let cuposDisponibles = parseInt(taller.getAttribute("data-cupos")) || 0;

        let spanCupos = taller.querySelector(".cupos");
        let form = taller.querySelector(".formTaller");
        let mensaje = taller.querySelector(".mensajeTaller");

        if (!form || !spanCupos || !mensaje) return;

        let boton = form.querySelector("button");
        if (!boton) return;

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            if (cuposDisponibles > 0) {

                cuposDisponibles--;
                spanCupos.textContent = cuposDisponibles;

                mensaje.textContent = "Reserva confirmada. Te esperamos en el taller.";
                mensaje.style.color = "green";

                form.reset();

                if (cuposDisponibles === 0) {
                    boton.disabled = true;
                    boton.textContent = "Cupos agotados";
                    mensaje.textContent = "Cupos agotados.";
                    mensaje.style.color = "red";
                }

            } else {
                mensaje.textContent = "No hay cupos disponibles.";
                mensaje.style.color = "red";
            }
        });
    });

});
