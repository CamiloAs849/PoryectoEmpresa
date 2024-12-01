if (localStorage.getItem("usuario") == null) {
    window.location.href = '../singIn.html';
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

function cargarPantalon() {
    fetch('../api.php?tabla=pantalones')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tbody');
            data.forEach(pantalon => {
                var tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${pantalon.NombrePantalon}</td>
                <td>$ ${Intl.NumberFormat().format(pantalon.Precio)}</td>
                <td>${pantalon.Talla}</td>
                <td>${pantalon.Color}</td>
                <td>${pantalon.Sexo}</td>
                <td>${pantalon.Tipo}</td>
                <td>${pantalon.Etiqueta}</td>
                <td><img src="../imagenes/pantalones/${pantalon.Imagen}" width="100px"></td>
                <td><div class="d-flex mt-4 d-flex justify-content-around">
                    <button class="btn btn-warning btn-sm me-2" onclick="editarPantalon(${pantalon.ID})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarPantalon(${pantalon.ID})">Eliminar</button>
                    </div>
                </td>
            `;
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
                    lengthMenu: "Agrupar de _MENU_ Pantalón",
                    info: "Mostrando del pantalón _START_ al _END_ de un total de _TOTAL_ pantalones",
                    infoEmpty: "No existen datos.",
                    infoFiltered: "(filtrado de _MAX_ productos en total)",
                    infoPostFix: "",
                    loadingRecords: "Cargando...",
                    zeroRecords: "No se encontraron pantalones con tu busqueda",
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
    cargarPantalon();
})


var form = document.getElementById('formCrearPantalon')

document.getElementById('crearPantalon').addEventListener('hidden.bs.modal', function () {
    form.classList.remove('was-validated');
});


// Loop over them and prevent submission
form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    } else {
        event.preventDefault();
        const formData = new FormData(document.getElementById('formCrearPantalon'))
        fetch("../api.php", {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data == "El pantalón ya existe") {
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
                } else if (data == "Error al agregar el pantalón") {
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
                        window.location.reload();
                    });
                }
            })
    }

    form.classList.add('was-validated')
}, false)



// Fetch all the forms we want to apply custom Bootstrap validation styles to
var formEditar = document.getElementById('formEditarPantalon');
document.getElementById('EditarPantalon').addEventListener('hidden.bs.modal', function () {
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
        const formData = new FormData(document.getElementById('formEditarPantalon'))
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
                } else if (data == "Error al actualizar el pantalón") {
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


function editarPantalon(id) {
    fetch(`../api.php?tabla=pantalones&id=${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('idEditar').value = data.ID;
            document.getElementById('nombreEditar').value = data.NombrePantalon;
            document.getElementById('precioEditar').value = data.Precio;
            document.getElementById('tallaEditar').value = data.Talla;
            document.getElementById('colorEditar').value = data.Color;
            document.getElementById('tipoEditar').value = data.Tipo;
            document.getElementById('sexoEditar').value = data.Sexo;
            var imagen = document.getElementById('ImagenEditar');
            imagen.src = '../imagenes/pantalones/' + data.Imagen;
            document.getElementById('etiquetaEditar').value = data.Etiqueta;
            document.getElementById('nombreImagen').value = data.Imagen
        });
    var modal = new bootstrap.Modal(document.getElementById('EditarPantalon'));
    modal.show();
}

function eliminarPantalon(id) {
    Swal.fire({
        title: "¿Estás seguro de eliminar el zapato?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            var tabla = 'pantalones';
            fetch('../api.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tabla, id })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data == "Error al eliminar el producto") {
                        Swal.fire({
                            title: 'Error al eliminar el pantalón',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true
                        })
                    } else {
                        Swal.fire({
                            title: 'Pantalón Eliminado Correctamente',
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