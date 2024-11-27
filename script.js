function cargarProductos() {
    fetch("api.php")
        .then((response) => response.json())
        .then((data) => {
            const portfolio = document.getElementById("portfolio");
            data.data.forEach((producto) => {
                const div = document.createElement("div");
                div.classList.add("col-xs-12", "col-sm-4", `${producto.Etiqueta.split(" ").join("")}`
                );
                div.innerHTML = `<div class="portfolio_single_content">
                                    <img src="./imagenes/${producto.imagen}" width="20px" height="350px" alt="title" />
                                    <div>
                                        <a href="#">${producto.NombreProducto}</a>
                                        <span>${producto.Descripcion}</span>
                                    </div>
                                </div>`;
                portfolio.appendChild(div);
            });
        });
}


document.addEventListener("DOMContentLoaded", (e) => {
    cargarProductos();
});


