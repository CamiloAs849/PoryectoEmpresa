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

function cargarProductos() {
    fetch('../api.php')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tbody');
            var html = '';
            data.data.forEach(producto => {
                var tr = document.createElement('tr');
                tr.innerHTML = `<tr>
                                    <td>${producto.ProductoID}</td>
                                    <td>${producto.NombreProducto}</td>
                                    <td>$ ${Intl.NumberFormat().format(producto.Precio)}</td>
                                    <td>${producto.Descripcion}</td>
                                     <td>${producto.Etiqueta}</td>
                                    <td><img src="../imagenes/${producto.imagen}" width="100px"></td>
                                    <td><div class="d-flex mt-4 d-flex justify-content-around">
                                        <button class="btn btn-sm btn-warning me-2" onclick="editarProducto(${producto.ProductoID})">Editar</button>
                                        <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${producto.ProductoID})">Eliminar</button>
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
                    lengthMenu: "Agrupar de _MENU_ productos",
                    info: "Mostrando del producto _START_ al _END_ de un total de _TOTAL_ productos",
                    infoEmpty: "No existen datos.",
                    infoFiltered: "(filtrado de _MAX_ productos en total)",
                    infoPostFix: "",
                    loadingRecords: "Cargando...",
                    zeroRecords: "No se encontraron productos con tu busqueda",
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
    cargarProductos();
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

(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } else {
                event.preventDefault();
                const formData = new FormData(document.getElementById('formCrearProducto'))
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
                                resetForm();
                                $('#crearProducto').modal('hide');
                            });
                        }
                    })
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

function resetForm() {
    document.getElementById('formCrearProducto').reset();
}


function eliminarProducto(id) {
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
            fetch('../api.php', {
                method: 'DELETE',
                body: `id=${id}`
            })
                .then(response => response.json())
                .then(data => {
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



