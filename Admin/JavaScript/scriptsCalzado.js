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

function cargarCalzado() {
    fetch('../api.php?tabla=calzado')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tbody');
            data.forEach(producto => {
                var tr = document.createElement('tr');
                tr.innerHTML = `<tr>
                                    <td>${producto.NombreCalzado}</td>
                                    <td>$ ${Intl.NumberFormat().format(producto.Precio)}</td>
                                    <td>${producto.Talla}</td>
                                     <td>${producto.Tipo}</td>
                                     <td>${producto.Etiqueta}</td>
                                    <td><img src="../imagenes/Calzado/${producto.Imagen}" width="100px"></td>
                                    <td><div class="d-flex mt-4 d-flex justify-content-around">
                                        <button class="btn btn-sm btn-warning me-2" onclick="editarCalzado(${producto.ID})">Editar</button>
                                        <button class="btn btn-sm btn-danger" onclick="eliminarCalzado(${producto.ID})">Eliminar</button>
                                        </div>
                                    </td>
                                </tr>`;
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
                    lengthMenu: "Agrupar de _MENU_ Zapatos",
                    info: "Mostrando del zapato _START_ al _END_ de un total de _TOTAL_ zapatos",
                    infoEmpty: "No existen datos.",
                    infoFiltered: "(filtrado de _MAX_ productos en total)",
                    infoPostFix: "",
                    loadingRecords: "Cargando...",
                    zeroRecords: "No se encontraron zapatos con tu busqueda",
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

document.addEventListener("DOMContentLoaded", event => {
    cargarCalzado();
})

if (localStorage.getItem('num')) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
    Toast.fire({
        icon: "success",
        title: "Has entrado como administrador"
    });
    localStorage.removeItem('num');
}


// Fetch all the forms we want to apply custom Bootstrap validation styles to
var form = document.getElementById('formCrearCalzado')

document.getElementById('crearCalzado').addEventListener('hidden.bs.modal', function () {
    form.classList.remove('was-validated');
});


// Loop over them and prevent submission
form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    } else {
        event.preventDefault();
        const formData = new FormData(document.getElementById('formCrearCalzado'))
        fetch("../api.php", {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data == 'Error al agregar el zapato') {
                    Swal.fire({
                        title: data,
                        icon: 'danger',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    })
                } else if (data == 'Error al subir la imagen') {
                    Swal.fire({
                        title: data,
                        icon: 'danger',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    })
                } else if (data == 'El zapato ya existe') {
                    var alerta = document.getElementById('alerta');
                    alerta.innerHTML = data;
                    alerta.classList.remove('visually-hidden');
                    setTimeout(() => {
                        alerta.classList.add('visually-hidden');
                    }, 5000);
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
var formEditar = document.getElementById('formEditarCalzado');
document.getElementById('EditarCalzado').addEventListener('hidden.bs.modal', function () {
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
        const formData = new FormData(document.getElementById('formEditarCalzado'))
        fetch('../api.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data == 'Error al subir la imagen') {
                    Swal.fire({
                        title: 'Error al subir la imagen',
                        icon: 'question',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    })
                } else if (data == 'Error al actualizar el producto') {
                    Swal.fire({
                        title: 'Error al actualizar el producto',
                        icon: 'danger',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    })
                } else {
                    Swal.fire({
                        title: 'Producto actualizado correctamente',
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




function editarCalzado(id) {
    fetch(`../api.php?tabla=calzado&id=${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('idEditar').value = data.ID;
            document.getElementById('nombreEditar').value = data.NombreCalzado;
            document.getElementById('precioEditar').value = data.Precio;
            document.getElementById('tallaEditar').value = data.Talla;
            document.getElementById('tipoEditar').value = data.Tipo;
            var imagen = document.getElementById('ImagenEditar');
            imagen.src = '../imagenes/Calzado/' + data.Imagen;
            document.getElementById('etiquetaEditar').value = data.Etiqueta;
            document.getElementById('nombreImagen').value = data.Imagen
        });
    var modal = new bootstrap.Modal(document.getElementById('EditarCalzado'));
    modal.show();
}


function eliminarCalzado(id) {
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
            var tabla = 'calzado';
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
                            title: 'Error al eliminar el zapato',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true
                        })
                    } else {
                        Swal.fire({
                            title: 'Zapato Eliminado Correctamente',
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





