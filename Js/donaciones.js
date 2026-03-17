 /* ================= APADRINAMIENTO ================= */

    let totalDonaciones = 0;
    const metaMensual = 1000;

    let formApadrinar = document.getElementById("formApadrinar");

    if (formApadrinar) {
        formApadrinar.addEventListener("submit", function (e) {
            e.preventDefault();

            let nombreInput = document.getElementById("nombreApadrinar");
            let especieSelect = document.getElementById("especie");
            let mensaje = document.getElementById("mensajeApadrinar");

            if (nombreInput && especieSelect && mensaje) {

                let nombre = nombreInput.value.trim();
                let especie = especieSelect.value;

                if (nombre.length > 0) {
                    mensaje.textContent =
                        "Gracias " + nombre + " por apadrinar al " + especie +
                        ". Tu apoyo es fundamental para su cuidado.";

                    formApadrinar.reset();
                } else {
                    mensaje.textContent = "Por favor ingresa un nombre válido.";
                }
            }
        });
    }


    /* ================= DONACIONES ================= */

    let formDonacion = document.getElementById("formDonacion");
    let barra = document.getElementById("barraProgreso");
    let contador = document.getElementById("contadorAnimado");
    let mensajeDonacion = document.getElementById("mensajeDonacion");

    function animarContador(valorInicial, valorFinal, duracion) {
        if (!contador) return;

        let inicio = null;

        function paso(timestamp) {
            if (!inicio) inicio = timestamp;

            let progreso = timestamp - inicio;
            let porcentaje = Math.min(progreso / duracion, 1);

            let valorActual = valorInicial + (valorFinal - valorInicial) * porcentaje;
            contador.textContent = valorActual.toFixed(2);

            if (progreso < duracion) {
                requestAnimationFrame(paso);
            }
        }

        requestAnimationFrame(paso);
    }

    if (formDonacion && barra && contador && mensajeDonacion) {

        formDonacion.addEventListener("submit", function (e) {
            e.preventDefault();

            let montoInput = document.getElementById("montoDonacion");
            if (!montoInput) return;

            let monto = parseFloat(montoInput.value);

            if (!isNaN(monto) && monto > 0) {

                let totalAnterior = totalDonaciones;
                totalDonaciones += monto;

                mensajeDonacion.textContent =
                    "Gracias por tu donación de $" + monto.toFixed(2);

                animarContador(totalAnterior, totalDonaciones, 800);

                let porcentajeMeta = Math.min((totalDonaciones / metaMensual) * 100, 100);
                barra.style.width = porcentajeMeta + "%";

                formDonacion.reset();
            } else {
                mensajeDonacion.textContent =
                    "Por favor ingresa un monto válido mayor que 0.";
            }
        });
    }