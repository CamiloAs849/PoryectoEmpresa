if (localStorage.getItem("usuario") == null) {
    window.location.href = "../singIn.html";
}
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

document.addEventListener('DOMContentLoaded', event => {
    cargarCamisas();
})

function cargarCamisas() {
    fetch('../api.php?tabla=camisas')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById("tbody");
            data.forEach(camisa => {
                var tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${camisa.NombreCamiseta}</td>
                    <td>$ ${Intl.NumberFormat().format(camisa.Precio)}</td>
                    <td>${camisa.Talla}</td>
                    <td>${camisa.Color}</td>
                    <td>${camisa.Tipo}</td>
                    <td>${camisa.Etiqueta}</td>
                    <td><img src='../imagenes/camisas/${camisa.Imagen}' width="100px"</td>
                    <td><div class="d-flex mt-4 d-flex justify-content-around">
                            <button class="btn btn-sm btn-warning me-2" onclick="editarCamisa(${camisa.ID})">Editar</button>
                            <button class="btn btn-sm btn-danger" onclick="eliminarCamisa(${camisa.ID})">Eliminar</button>
                        </div>
                    </td>
                    `
                tbody.appendChild(tr);
            });

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
                    lengthMenu: "Agrupar de _MENU_ Camisas",
                    info: "Mostrando del camisa _START_ al _END_ de un total de _TOTAL_ camisas",
                    infoEmpty: "No existen datos.",
                    infoFiltered: "(filtrado de _MAX_ camisas en total)",
                    infoPostFix: "",
                    loadingRecords: "Cargando...",
                    zeroRecords: "No se encontraron camisas con tu busqueda",
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

        });
}

var form = document.getElementById('formCrearCamisa')

document.getElementById('crearCamisa').addEventListener('hidden.bs.modal', function () {
    form.classList.remove('was-validated');
});


// Loop over them and prevent submission
form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    } else {
        event.preventDefault();
        const formData = new FormData(document.getElementById('formCrearCamisa'))
        fetch("../api.php", {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data == 'Error al agregar la camisa') {
                    Swal.fire({
                        title: data,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    })
                } else if (data == "Error al subir la imagen") {
                    Swal.fire({
                        title: data,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    })
                } else if (data == '"La camisa ya existe"') {
                    var alerta = document.getElementById('alerta');
                    alerta.classList.remove('visually-hidden');
                    alerta.innerHTML = data;
                } else {
                    Swal.fire({
                        title: data,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    }).then(function () {
                        window.location.reload();
                    });
                }
            })
    }
    form.classList.add('was-validated')
}, false)


function editarCamisa(id) {
    fetch(`../api.php?tabla=camisas&id=${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('idEditar').value = data.ID;
            document.getElementById('nombreEditar').value = data.NombreCamiseta;
            document.getElementById('precioEditar').value = data.Precio;
            document.getElementById('tallaEditar').value = data.Talla;
            document.getElementById('colorEditar').value = data.Color;
            document.getElementById('tipoEditar').value = data.Tipo;
            var imagen = document.getElementById('ImagenEditar');
            document.getElementById('nombreImagen').value = data.Imagen
            imagen.src = `../imagenes/camisas/${data.Imagen}`;
            document.getElementById('etiquetaEditar').value = data.Etiqueta;
            var modal = new bootstrap.Modal(document.getElementById('EditarCamisa'));
            modal.show();
        })
}


var formEditar = document.getElementById('formEditarCamisa');
document.getElementById('EditarCamisa').addEventListener('hidden.bs.modal', function () {
    formEditar.reset();
    formEditar.classList.remove('was-validated');
    document.getElementById('ImagenEditar').src = '';
});

// Loop over them and prevent submission
formEditar.addEventListener('submit', event => {
    if (!formEditar.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    } else {
        event.preventDefault()
        const formData = new FormData(document.getElementById('formEditarCamisa'))
        fetch('../api.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data == "Error al actualizar la camisa") {
                    Swal.fire({
                        title: data,
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    })
                } else if (data == "Error al subir la imagen") {
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
                        window.location.reload();
                    });
                }
            })
    }

    formEditar.classList.add('was-validated')
}, false)


function eliminarCamisa(id) {
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
            var tabla = 'camisas';
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
                            title: 'Error al eliminar la camisa',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true
                        })
                    } else {
                        Swal.fire({
                            title: 'Camisa Eliminado Correctamente',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true
                        }).then(function () {
                            window.location.reload();
                        });
                    }

                })
        }
    });
}
