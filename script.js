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
                    var textoB = '<a class="btn btn-blank" href="" target="_blank" role="button">Comprar ya!</a>'
                }
                div.classList.add("col-xs-12", "col-sm-4", `${zapato.Tipo.split(" ").join("")}`, `${zapato.Etiqueta.split(" ").join("")}`
                );
                div.innerHTML = `<div class="portfolio_single_content">
                                    <img src="./imagenes/Calzado/${zapato.Imagen}" width="20px" height="500px" alt="${zapato.NombreCalzado}" />
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
                    var textoB = '<a class="btn btn-blank" href="" target="_blank" role="button">Comprar ya!</a>'
                }
                div.classList.add("col-xs-12", "col-sm-4", `${camisa.Tipo.split(" ").join("")}`, `${camisa.Etiqueta.split(" ").join("")}`
                );
                div.innerHTML = `<div class="portfolio_single_content">
                                    <img src="./imagenes/Camisas/${camisa.Imagen}" width="20px" height="500px" alt="${camisa.NombreCamiseta}" />
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


document.addEventListener("DOMContentLoaded", (e) => {
    cargarCalzado();
    cargarCamisas();
});


