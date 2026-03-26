/* ================= APADRINAMIENTO ================= */

    let formApadrinar = document.getElementById("formApadrinar");
    let mensajeA = document.getElementById("mensajeApadrinar");

    let formPagoA = document.getElementById("formPagoApadrinar");
    let confirmarA = document.getElementById("confirmarApadrinamiento");
    let cancelarA = document.getElementById("cancelarApadrinamiento");

    let datosApadrinamiento = {};

    /* ===== PASO 1: FORMULARIO PRINCIPAL ===== */
    if (formApadrinar) {
        formApadrinar.addEventListener("submit", function (e) {
            e.preventDefault();

            let nombre = document.getElementById("nombreApadrinar").value.trim();
            let correo = document.getElementById("correoApadrinar").value.trim();
            let especie = document.getElementById("especie").value;

            if (nombre.length === 0 || correo.length === 0) {
                mensajeA.textContent = "Complete todos los campos.";
                return;
            }

            // Guardar datos temporalmente
            datosApadrinamiento = { nombre, correo, especie };

            // Mostrar formulario de pago
            formPagoA.style.display = "block";
            mensajeA.textContent = "";
        });
    }

    /* ===== FORMATO TARJETA ===== */
    let inputTarjetaA = document.getElementById("tarjetaA");
    let tipoTarjetaA = document.getElementById("tipoTarjetaA");

    if (inputTarjetaA && tipoTarjetaA) {
        inputTarjetaA.addEventListener("input", function () {

            let valor = inputTarjetaA.value.replace(/\D/g, "").substring(0, 16);
            let partes = valor.match(/.{1,4}/g);

            inputTarjetaA.value = partes ? partes.join(" ") : valor;

            if (valor.startsWith("4")) {
                tipoTarjetaA.textContent = "💳 Visa";
            } else if (/^5[1-5]/.test(valor)) {
                tipoTarjetaA.textContent = "💳 MasterCard";
            } else {
                tipoTarjetaA.textContent = "";
            }
        });
    }

    /* ===== FORMATO FECHA ===== */
    let inputFechaA = document.getElementById("fechaA");

    if (inputFechaA) {
        inputFechaA.addEventListener("input", function () {
            let valor = inputFechaA.value.replace(/\D/g, "");

            if (valor.length >= 2) {
                valor = valor.substring(0, 2) + "/" + valor.substring(2, 4);
            }

            inputFechaA.value = valor.substring(0, 5);
        });
    }

    /* ===== CONFIRMAR SUSCRIPCIÓN ===== */
    if (confirmarA && cancelarA) {

        confirmarA.addEventListener("click", function () {

            let nombreT = document.getElementById("nombreTarjetaA").value;
            let tarjeta = document.getElementById("tarjetaA").value;
            let fecha = document.getElementById("fechaA").value;
            let cvv = document.getElementById("cvvA").value;

            if (!nombreT || !tarjeta || !fecha || !cvv) {
                mensajeA.textContent = "Complete todos los datos de pago.";
                return;
            }

            if (cvv.length < 3 || cvv.length > 4) {
                mensajeA.textContent = "CVV inválido.";
                return;
            }

            let confirmar = confirm(
                `¿Desea suscribirse por $10 mensuales para apadrinar un ${datosApadrinamiento.especie}?`
            );

            if (confirmar) {

                mensajeA.textContent =
                    `🐾 Gracias ${datosApadrinamiento.nombre}, ahora estás apadrinando un ${datosApadrinamiento.especie}. Recibirás fotos y actualizaciones en tu correo.`;

                formApadrinar.reset();
                formPagoA.style.display = "none";

            } else {
                mensajeA.textContent = "Apadrinamiento cancelado.";
            }
        });

        cancelarA.addEventListener("click", function () {
            formPagoA.style.display = "none";
            mensajeA.textContent = "Apadrinamiento cancelado.";
        });
    }


/* ================= DONACIONES ================= */

    let formDonacion = document.getElementById("formDonacion");
    let barra = document.getElementById("barraProgreso");
    let contador = document.getElementById("contadorAnimado");
    let mensajeDonacion = document.getElementById("mensajeDonacion");

    let formPago = document.getElementById("formPago");
    let confirmarBtn = document.getElementById("confirmarPago");
    let cancelarBtn = document.getElementById("cancelarPago");

    let montoGlobal = 0;

    /* ===== FORMATO FECHA (MM/AA) ===== */
    let inputFecha = document.getElementById("fecha");

    if (inputFecha) {
        inputFecha.addEventListener("input", function () {

            let valor = inputFecha.value.replace(/\D/g, "");

            if (valor.length >= 2) {
                valor = valor.substring(0, 2) + "/" + valor.substring(2, 4);
            }

            inputFecha.value = valor.substring(0, 5);
        });
    }

    /* ===== FORMATO, DETECTECCION E ICONO DE LA TARJETA (XXXX XXXX XXXX XXXX) ===== */
    let inputTarjeta = document.getElementById("tarjeta");
    let tipoTarjeta = document.getElementById("tipoTarjeta");

        if (inputTarjeta && tipoTarjeta) {

            inputTarjeta.addEventListener("input", function () {

                // Limpiar espacios
                let numero = inputTarjeta.value.replace(/\s/g, "");

                // Detectar tipo
                if (numero.startsWith("4")) {
                    tipoTarjeta.textContent = "💳 Visa";
                } 
                else if (/^5[1-5]/.test(numero)) {
                    tipoTarjeta.textContent = "💳 MasterCard";
                } 
                else {
                    tipoTarjeta.textContent = "";
                }
            });
        }

        if (inputTarjeta) {
            inputTarjeta.addEventListener("input", function () {

                // Eliminar todo lo que no sea número
                let valor = inputTarjeta.value.replace(/\D/g, "");

                // Agrupar en bloques de 4
                valor = valor.substring(0, 16); // máximo 16 dígitos

                let partes = valor.match(/.{1,4}/g); // divide cada 4

                if (partes) {
                    inputTarjeta.value = partes.join(" ");
                } else {
                    inputTarjeta.value = valor;
                }
            });
        }

    /* ===== VALIDACIÓN Luhn para tarjeta de crédito ===== */
    function validarTarjetaLuhn(numero) {
        let suma = 0;
        let alternar = false;

        for (let i = numero.length - 1; i >= 0; i--) {
            let n = parseInt(numero.charAt(i));

            if (alternar) {
                n *= 2;
                if (n > 9) n -= 9;
            }

            suma += n;
            alternar = !alternar;
        }

        return (suma % 10 === 0);
    }

    /* ===== ANIMACIÓN CONTADOR ===== */
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

    /* ===== FORMULARIO DONACIÓN ===== */
    if (formDonacion && barra && contador && mensajeDonacion) {

        formDonacion.addEventListener("submit", function (e) {
            e.preventDefault();

            let montoInput = document.getElementById("montoDonacion");
            if (!montoInput) return;

            let monto = parseFloat(montoInput.value);

            if (!isNaN(monto) && monto > 0) {

                montoGlobal = monto;
                formPago.style.display = "block";

                mensajeDonacion.textContent = "";

            } else {
                mensajeDonacion.textContent = "Por favor ingresa un monto válido mayor que 0.";
            }
        });
    }

    /* ===== CONFIRMAR PAGO ===== */
    if (confirmarBtn && cancelarBtn) {

        confirmarBtn.addEventListener("click", function () {

            let nombre = document.getElementById("nombre").value;
            let tarjeta = document.getElementById("tarjeta").value;
            let fecha = document.getElementById("fecha").value;
            let cvv = document.getElementById("cvv").value;
            let tarjetaLimpia = tarjeta.replace(/\s/g, "");

            // Validar longitud basica
            if (tarjetaLimpia.length < 13 || tarjetaLimpia.length > 16) {
                mensajeDonacion.textContent = "Número de tarjeta inválido.";
                return;
            }

            // Validar con Luhn
            if (!validarTarjetaLuhn(tarjetaLimpia)) {
                mensajeDonacion.textContent = "La tarjeta no es válida.";
                return;
            }

            if (!nombre || !tarjeta || !fecha || !cvv) {
                mensajeDonacion.textContent = "Complete todos los campos.";
                return;
            }

            if (cvv.length < 3 || cvv.length > 4) {
                mensajeDonacion.textContent = "El CVV debe tener 3 o 4 dígitos.";
                return;
            }

            let confirmar = confirm(`¿Desea donar $${montoGlobal.toFixed(2)}?`);

            if (confirmar) {

                let totalAnterior = totalDonaciones;
                totalDonaciones += montoGlobal;

                mensajeDonacion.textContent =
                    "Gracias por tu donación de $" + montoGlobal.toFixed(2);

                animarContador(totalAnterior, totalDonaciones, 800);

                let porcentajeMeta = Math.min((totalDonaciones / metaMensual) * 100, 100);
                barra.style.width = porcentajeMeta + "%";

                formDonacion.reset();
                formPago.style.display = "none";

            } else {
                mensajeDonacion.textContent = "Donación cancelada.";
            }
        });

        cancelarBtn.addEventListener("click", function () {
            formPago.style.display = "none";
            mensajeDonacion.textContent = "Donación cancelada.";
        });
    }
