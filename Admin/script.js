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
    fetch('../api.php?calzado=true')
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

localStorage.setItem('num', 1);
if (localStorage.getItem('num') === 1) {
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
    localStorage.setItem('num', 2);
}



// Fetch all the forms we want to apply custom Bootstrap validation styles to
var form = document.getElementById('formCrearCalzado')

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
                if (data == 'Error al agregar el producto') {
                    Swal.fire({
                        title: 'Error al agregar el producto',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    })
                } else if (data == 'Error al subir la imagen') {
                    Swal.fire({
                        title: 'Error al subir la imagen',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    })
                } else {
                    Swal.fire({
                        title: 'Producto agregado correctamente',
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
var formEditar = document.getElementById('formEditarCalzado')

// Loop over them and prevent submission
formEditar.addEventListener('submit', event => {
    if (!form.checkValidity()) {
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
                console.log(data)
            })
    }

    formEditar.classList.add('was-validated')
}, false)




function editarCalzado(id) {
    fetch(`../api.php?calzado=calzado&id=${id}`)
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
        title: "¿Estás seguro de eliminar el producto?",
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
                            title: 'Error al eliminar el producto',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true
                        })
                    } else {
                        Swal.fire({
                            title: 'Producto Eliminado Correctamente',
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


