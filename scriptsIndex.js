function cargarCalzado() {
    fetch("api.php?tabla=calzado")
        .then((response) => response.json())
        .then((data) => {
            const portfolio = document.getElementById("portfolioCalzado");

            data.forEach((zapato) => {
                const div = document.createElement("div");
                if (zapato.Etiqueta == 'Agotado') {
                    var textoB = '<a class="btn btn-danger" role="button">Agotado!</a>';
                } else {
                    var textoB = `<a class="btn btn-blank" href="https://api.whatsapp.com/send?phone=573053396000&text=Hola%2C%20estoy%20interesado%20en%20los ${zapato.NombreCalzado}" target="_blank" role="button">Comprar ya!</a>`
                }
                div.classList.add("col-xs-12", "col-sm-4", `zapato`, `${zapato.Tipo.split(" ").join("")}`, `${zapato.Etiqueta.split(" ").join("")}`
                );
                div.innerHTML = `<div class="portfolio_single_content ">
                                    <img src="./imagenes/Calzado/${zapato.Imagen}" width="20px" height="400px" alt="${zapato.NombreCalzado}" />
                                    <div>
                                    <h3 style="margin-top: 100px;">${zapato.NombreCalzado}</h3>
                                    <p><b>Tallas: </b> ${zapato.Talla}</p>
                                    <h3 style="margin-top: 30px;"> $ ${Intl.NumberFormat().format(zapato.Precio)}</h3>
                                    ${textoB}
                                    </div>
                                </div>`;
                portfolio.appendChild(div);
            });
        });
}

function cargarCamisas() {
    fetch("api.php?tabla=camisas")
        .then((response) => response.json())
        .then((data) => {
            const portfolio = document.getElementById("portfolioCamisas");
            data.forEach((camisa) => {
                const div = document.createElement("div");
                if (camisa.Etiqueta == 'Agotado') {
                    var textoB = '<a class="btn btn-danger" role="button">Agotado!</a>';
                } else {
                    var textoB = `<a class="btn btn-blank" href="https://api.whatsapp.com/send?phone=573053396000&text=Hola%2C%20estoy%20interesado%20en%20la ${camisa.NombreCamiseta} " target="_blank" role="button">Comprar ya!</a>`
                }
                div.classList.add("col-xs-12", "col-sm-4", `${camisa.Sexo}`, `${camisa.Tipo.split(" ").join("")}`, `${camisa.Etiqueta.split(" ").join("")}`);
                div.innerHTML = `<div class="portfolio_single_content">
                                    <img src="./imagenes/Camisas/${camisa.Imagen}" width="20px" height="400px" alt="${camisa.NombreCamiseta}" />
                                    <div>
                                    <h3 style="margin-top: 100px;">${camisa.NombreCamiseta}</h3>
                                    <p><b>Tallas: </b> ${camisa.Talla}</p>
                                    <p><b>Color: </b> ${camisa.Color}</p>
                                    <h3 style="margin-top: 30px;"> $ ${Intl.NumberFormat().format(camisa.Precio)}</h3>
                                     ${textoB}
                                    `;

                portfolio.appendChild(div);
            })
        })
}

function cargarPantalones() {
    fetch("api.php?tabla=pantalones")
        .then((response) => response.json())
        .then((data) => {
            const portfolio = document.getElementById("portfolioPantalones");
            data.forEach((pantalon) => {
                const div = document.createElement("div");
                if (pantalon.Etiqueta == 'Agotado') {
                    var textoB = '<a class="btn btn-danger" role="button">Agotado!</a>';
                } else {
                    var textoB = `<a class="btn btn-blank" href="https://api.whatsapp.com/send?phone=573053396000&text=Hola%2C%20estoy%20interesado%20en el ${pantalon.NombrePantalon}" target="_blank" role="button">Comprar ya!</a>`
                }
                div.classList.add("col-xs-12", "col-sm-4", `${pantalon.Sexo}`, `${pantalon.Tipo.split(" ").join("")}`, `${pantalon.Etiqueta.split(" ").join("")}`);
                div.innerHTML = `<div class="portfolio_single_content">
                                    <img src="./imagenes/Pantalones/${pantalon.Imagen}" width="20px" height="400px" alt="${pantalon.NombrePantalon}" />
                                    <div>
                                    <h3 style="margin-top: 100px;">${pantalon.NombrePantalon}</h3>
                                    <p><b>Tallas: </b> ${pantalon.Talla}</p>
                                     <p><b>Color: </b> ${pantalon.Color}</p>
                                     <h3 style="margin-top: 30px;"> $ ${Intl.NumberFormat().format(pantalon.Precio)}</h3>
                                     ${textoB}`;
                portfolio.appendChild(div);
            })
        })
}

function cargarRelojes() {
    fetch("api.php?tabla=relojes")
        .then((response) => response.json())
        .then((data) => {
            const portfolio = document.getElementById("portfolioRelojes");
            data.forEach((reloj) => {
                const div = document.createElement("div");
                if (reloj.Etiqueta == 'Agotado') {
                    var textoB = '<a class="btn btn-danger" role="button">Agotado!</a>';
                } else {
                    var textoB = `<a class="btn btn-blank" href="https://api.whatsapp.com/send?phone=573053396000&text=Hola%2C%20estoy%20interesado%20en el ${reloj.NombreReloj}" target="_blank" role="button">Comprar ya!</a>`
                }
                div.classList.add("col-xs-12", "col-sm-4", `${reloj.Etiqueta.split(" ").join("")}`);
                div.innerHTML = `<div class="portfolio_single_content">
                                    <img src="./imagenes/relojes/${reloj.Imagen}" width="20px" height="400px" alt="${reloj.MarcaReloj}" />
                                    <div>
                                    <h3 style="margin-top: 100px;">${reloj.NombreReloj}</h3>
                                    <h3 style="margin-top: 30px;"> $ ${Intl.NumberFormat().format(reloj.Precio)}</h3>
                                    ${textoB}`;
                portfolio.appendChild(div);
            })
        })
}

function cargarGafas() {
    fetch("api.php?tabla=gafas")
        .then((response) => response.json())
        .then((data) => {
            const portfolio = document.getElementById("portfolioGafas");
            data.forEach((gafas) => {
                const div = document.createElement("div");
                if (gafas.Etiqueta == 'Agotado') {
                    var textoB = '<a class="btn btn-danger" role="button">Agotado!</a>';
                } else {
                    var textoB = `<a class="btn btn-blank" href="https://api.whatsapp.com/send?phone=573053396000&text=Hola%2C%20estoy%20interesado%20en las ${gafas.NombreGafas}" target="_blank" role="button">Comprar ya!</a>`
                }
                div.classList.add("col-xs-12", "col-sm-4", `${gafas.Etiqueta.split(" ").join("")}`);
                div.innerHTML = `<div class="portfolio_single_content">
                                    <img src="./imagenes/Gafas/${gafas.Imagen}" width="20px" height="400px" alt="${gafas.MarcaGafas}" />
                                    <div>
                                    <h3 style="margin-top: 100px;">${gafas.NombreGafas}</h3>
                                    <h3 style="margin-top: 30px;"> $ ${Intl.NumberFormat().format(gafas.Precio)}</h3>
                                    ${textoB}`;
                portfolio.appendChild(div);
            })
        })
}

function cargarPerfumes() {
    fetch("api.php?tabla=perfumes")
        .then((response) => response.json())
        .then((data) => {
            const portfolio = document.getElementById("portfolioperfumes");
            data.forEach((perfume) => {
                const div = document.createElement("div");
                if (perfume.Etiqueta == 'Agotado') {
                    var textoB = '<a class="btn btn-danger" role="button">Agotado!</a>';
                } else {
                    var textoB = `<a class="btn btn-blank" href="https://api.whatsapp.com/send?phone=573053396000&text=Hola%2C%20estoy%20interesado%20en el ${perfume.NombrePerfume}" target="_blank" role="button">Comprar ya!</a>`
                }
                div.classList.add("col-xs-12", "col-sm-4", `${perfume.Tipo.split(".").join("_")}`, `${perfume.Etiqueta.split(" ").join("")}`);
                div.innerHTML = `<div class="portfolio_single_content">
                                    <img src="./imagenes/perfumes/${perfume.Imagen}" width="20px" height="400px" alt="${perfume.NombrePerfume}" />
                                    <div>
                                    <h3 style="margin-top: 100px;">${perfume.NombrePerfume}</h3>
                                    <h3 style="margin-top: 30px;">$ ${Intl.NumberFormat().format(perfume.Precio)}</h3>
                                     ${textoB}`;
                portfolio.appendChild(div);
            })
        })
}

function cargarVapeadores() {
    fetch("api.php?tabla=vapeadores")
        .then((response) => response.json())
        .then((data) => {
            const portfolio = document.getElementById("portfolioVapeadores");
            data.forEach((vapeador) => {
                const div = document.createElement("div");
                if (vapeador.Etiqueta == 'Agotado') {
                    var textoB = '<a class="btn btn-danger" role="button">Agotado!</a>';
                } else {
                    var textoB = `<a class="btn btn-blank" href="https://api.whatsapp.com/send?phone=573053396000&text=Hola%2C%20estoy%20interesado%20en el ${vapeador.NombreVapeador}" target="_blank" role="button">Comprar ya!</a>`
                }
                div.classList.add("col-xs-12", "col-sm-4", `${vapeador.Etiqueta.split(" ").join("")}`);
                div.innerHTML = `<div class="portfolio_single_content">
                                    <img src="./imagenes/vapeadores/${vapeador.Imagen}" width="20px" height="400px" alt="${vapeador.NombreVapeador}" />
                                    <div>
                                    <h3 style="margin-top: 100px;">${vapeador.NombreVapeador}</h3>
                                    <h3 style="margin-top: 30px;">$ ${Intl.NumberFormat().format(vapeador.Precio)}</h3>
                                     ${textoB}`;
                portfolio.appendChild(div);
            })
        })
}




document.addEventListener("DOMContentLoaded", (e) => {
    cargarCalzado();
    cargarCamisas();
    cargarPantalones();
    cargarRelojes();
    cargarGafas();
    cargarPerfumes();
    cargarVapeadores();
});


