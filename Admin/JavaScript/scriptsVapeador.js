if (localStorage.getItem("usuario") == null) {
    window.location.href = '../singIn.html';
}
window.addEventListener("load", function () {
    // Selecciona el elemento con la clase "page-loader"
    const pageLoader = document.querySelector(".page-loader");
    if (pageLoader) {
        // Aplica la transición y oculta el elemento
        pageLoader.style.transition = "opacity 0.6s";
        pageLoader.style.opacity = "0";

        // Espera hasta que la animación termine y oculta el elemento completamente
        setTimeout(() => {
            pageLoader.style.display = "none";
        }, 600); // 600ms corresponde al tiempo de la transición
    }
});

function LogOut() {
    Swal.fire({
        title: "¿Estás seguro de salir?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Salir",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            window.location.href = '/';
        }
    });
}

function cargarVapeadores() {
    fetch('../api.php?tabla=vapeadores')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tbody');
            data.forEach(vapeador => {
                var tr = document.createElement('tr');
                tr.classList.add('tr');
                tr.innerHTML = `
                    <td>${vapeador.NombreVapeador}</td>
                    <td>$ ${Intl.NumberFormat().format(vapeador.Precio)}</td>
                    <td>${vapeador.Etiqueta}</td>
                    <td><img src="../imagenes/vapeadores/${vapeador.Imagen}" width="100px">
                    <td><div class="d-flex mt-4 d-flex justify-content-around">
                        <button class="btn btn-warning btn-sm me-2" onclick="editarVapeador(${vapeador.ID})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarVapeador(${vapeador.ID})">Eliminar</button>
                    </div>
                    </td`;
                tbody.appendChild(tr);

            })
            $('#tablaProductos').DataTable({
                scrollX: true,
                layout: {
                    bottomEnd: {
                        paging: {
                            firstLast: false,
                        },
                    },
                },
                language: {
                    processing: "",
                    search: "<i class='fa-solid fa-magnifying-glass'></i> Buscar&nbsp;:",
                    lengthMenu: "Agrupar de _MENU_ Vapeadores",
                    info: "Mostrando del vapeador _START_ al _END_ de un total de _TOTAL_ vapeadores",
                    infoEmpty: "No existen datos.",
                    infoFiltered: "(filtrado de _MAX_ productos en total)",
                    infoPostFix: "",
                    loadingRecords: "Cargando...",
                    zeroRecords: "No se encontraron vapeadores con tu busqueda",
                    emptyTable: "No hay datos disponibles en la tabla.",
                    paginate: {
                        previous: "<i class='fa-solid fa-arrow-left'></i> Anterior",
                        next: "Siguiente <i class='fa-solid fa-arrow-right'></i>",
                    },
                    sortAscending: '<i class="fa-solid fa-sort-up"></i>',
                    sortDescending: '<i class="fa-solid fa-sort-down"></i>',
                },
                lengthMenu: [
                    [5, 10, 25, -1],
                    [5, 10, 25, "Todos"],
                ],
            });

        })
}

document.addEventListener("DOMContentLoaded", event => {
    cargarVapeadores();
})

var form = document.getElementById('formCrearVapeador')

document.getElementById('crearVapeador').addEventListener('hidden.bs.modal', function () {
    form.classList.remove('was-validated');
});


// Loop over them and prevent submission
form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    } else {
        event.preventDefault();
        const formData = new FormData(document.getElementById('formCrearVapeador'))
        fetch("../api.php", {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data == "El vapeador ya existe") {
                    Swal.fire({
                        title: data,
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                } else if (data == "Error al subir la imagen") {
                    Swal.fire({
                        title: data,
                        icon: 'question',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                } else if (data == "Error al agregar el vapeador") {
                    Swal.fire({
                        title: data,
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                } else {
                    Swal.fire({
                        title: data,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    }).then(function () {
                        var table = $('#tablaProductos').DataTable();
                        table.destroy();
                        var tr = document.querySelectorAll('.tr');
                        tr.forEach(element => {
                            element.remove();
                        });
                        cargarVapeadores();
                        $('#crearVapeador').modal('hide');
                        form.reset();
                    });
                }
            })
    }

    form.classList.add('was-validated')
}, false)



// Fetch all the forms we want to apply custom Bootstrap validation styles to
var formEditar = document.getElementById('formEditarVapeador');
document.getElementById('EditarVapeador').addEventListener('hidden.bs.modal', function () {
    formEditar.reset();
    formEditar.classList.remove('was-validated');
    document.getElementById('ImagenEditar').src = '';
});


formEditar.addEventListener('submit', event => {
    if (!formEditar.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    } else {
        event.preventDefault()
        const formData = new FormData(document.getElementById('formEditarVapeador'))
        fetch('../api.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data == "Error al subir la imagen") {
                    Swal.fire({
                        title: data,
                        icon: 'question',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    })
                } else if (data == "Error al actualizar el vapeador") {
                    Swal.fire({
                        title: data,
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    })
                } else {
                    Swal.fire({
                        title: data,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    }).then(function () {
                        var table = $('#tablaProductos').DataTable();
                        table.destroy();
                        var tr = document.querySelectorAll('.tr');
                        tr.forEach(element => {
                            element.remove();
                        });
                        cargarVapeadores();
                        $('#EditarVapeador').modal('hide');
                        formEditar.reset();
                        document.getElementById('ImagenEditar').src = '';
                    });
                }
            })
    }

    formEditar.classList.add('was-validated')
}, false)

function editarVapeador(id) {
    fetch(`../api.php?tabla=vapeadores&id=${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('idEditar').value = data.ID;
            document.getElementById('nombreEditar').value = data.NombreVapeador;
            document.getElementById('precioEditar').value = data.Precio;
            var imagen = document.getElementById('ImagenEditar');
            document.getElementById('nombreImagen').value = data.Imagen
            imagen.src = `../imagenes/vapeadores/${data.Imagen}`;
            document.getElementById('etiquetaEditar').value = data.Etiqueta;
            var modal = new bootstrap.Modal(document.getElementById('EditarVapeador'));
            modal.show();
        })
}

function eliminarVapeador(id) {
    Swal.fire({
        title: "¿Estás seguro de eliminar la camisa?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            var tabla = 'vapeadores';
            fetch('../api.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tabla, id })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data == 'Error al eliminar el producto') {
                        Swal.fire({
                            title: 'Error al eliminar el vapeador',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true
                        })
                    } else {
                        Swal.fire({
                            title: 'Vapeador Eliminado Correctamente',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true
                        }).then(function () {
                            var table = $('#tablaProductos').DataTable();
                            table.destroy();
                            var tr = document.querySelectorAll('.tr');
                            tr.forEach(element => {
                                element.remove();
                            });
                            cargarVapeadores();
                        });
                    }

                })
        }
    });
}
