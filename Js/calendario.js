 /* ================= CALENDARIO ================= */
    const diasContainer = document.getElementById("diasCalendario");
    const mesActualTexto = document.getElementById("mesActual");

    let fecha = new Date();

    // Aqui se conectara la base de datos
    const eventos = {
        "2026-3-10": "Tour guiado",
        "2026-3-15": "Día de adopción",
        "2026-3-21": "Evento educativo"
    };

    function renderCalendario() {

        diasContainer.innerHTML = "";

        const year = fecha.getFullYear();
        const mes = fecha.getMonth();

        const primerDia = new Date(year, mes, 1).getDay();
        const ultimoDia = new Date(year, mes + 1, 0).getDate();

        const nombresMeses = [
            "Enero", "Febrero", "Marzo", "Abril",
            "Mayo", "Junio", "Julio", "Agosto",
            "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        mesActualTexto.textContent = `${nombresMeses[mes]} ${year}`;

        let fila = document.createElement("tr");

        // Espacios vacios
        for (let i = 0; i < primerDia; i++) {
            fila.appendChild(document.createElement("td"));
        }

        for (let dia = 1; dia <= ultimoDia; dia++) {

            const celda = document.createElement("td");
            celda.textContent = dia;

            const fechaClave = `${year}-${mes + 1}-${dia}`;

            // Si hay evento
            if (eventos[fechaClave]) {
                celda.classList.add("evento");
                celda.title = eventos[fechaClave];

                celda.innerHTML += `<br><small>${eventos[fechaClave]}</small>`;
            }

            fila.appendChild(celda);

            if ((dia + primerDia) % 7 === 0) {
                diasContainer.appendChild(fila);
                fila = document.createElement("tr");
            }
        }

        diasContainer.appendChild(fila);
    }

    document.getElementById("prevMes").addEventListener("click", () => {
        fecha.setMonth(fecha.getMonth() - 1);
        renderCalendario();
    });

    document.getElementById("nextMes").addEventListener("click", () => {
        fecha.setMonth(fecha.getMonth() + 1);
        renderCalendario();
    });

    renderCalendario();
