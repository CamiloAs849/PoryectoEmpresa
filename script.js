function cargarCalzado() {
    fetch("api.php?calzado=true")
        .then((response) => response.json())
        .then((data) => {
            const portfolio = document.getElementById("portfolioCalzado");
            data.forEach((zapato) => {
                const div = document.createElement("div");
                div.classList.add("col-xs-12", "col-sm-4", `${zapato.Tipo}`, `${zapato.Etiqueta.split(" ").join("")}`
                );
                div.innerHTML = `<div class="portfolio_single_content">
                                    <img src="./imagenes/Calzado/${zapato.Imagen}" width="20px" height="350px" alt="${zapato.NombreCalzado}" />
                                    <div>
                                    <h3 style="margin-top: 20px;">${zapato.NombreCalzado}</h3>
                                    <p><b>Talla: </b> ${zapato.Talla}</p>
                                    <h3 style="margin-top: 30px;"> $ ${Intl.NumberFormat().format(zapato.Precio)}</h3>
                                    <a class="btn btn-blank" href="" target="_blank"
                                    role="button">Comprar!</a>
                                    </div>
                                </div>`;
                portfolio.appendChild(div);
            });
        });
}


document.addEventListener("DOMContentLoaded", (e) => {
    cargarCalzado();
});


