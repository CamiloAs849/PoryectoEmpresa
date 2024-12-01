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

function cargarPerfumes() {
    fetch('../api.php?tabla=perfumes')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tbody');
            data.forEach(perfume => {
                var tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${perfume.NombrePerfume}</td>
                    <td>${Intl.NumberFormat().format(perfume.Precio)}</td>
                    <td>${perfume.Tipo}</td>
                    <td>${perfume.Etiqueta}</td>
                    <td><img src='../imagenes/perfumes/${perfume.Imagen}' width='100px'></td>
                    <td><div class="d-flex mt-4 d-flex justify-content-around">
                        <button type='button' onclick='editarPerfume(${perfume.ID})' class='btn btn-warning'>Editar</button>
                        <button type='button' onclick='eliminarPerfume(${perfume.ID})' class='btn btn-danger'>Eliminar</button>
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
                    lengthMenu: "Agrupar de _MENU_ Perfumes",
                    info: "Mostrando del perfume _START_ al _END_ de un total de _TOTAL_ perfumes",
                    infoEmpty: "No existen datos.",
                    infoFiltered: "(filtrado de _MAX_ productos en total)",
                    infoPostFix: "",
                    loadingRecords: "Cargando...",
                    zeroRecords: "No se encontraron perfumes con tu busqueda",
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
    cargarPerfumes();
});

var form = document.getElementById('formCrearPerfume')

document.getElementById('crearPerfume').addEventListener('hidden.bs.modal', function () {
    form.classList.remove('was-validated');
});


// Loop over them and prevent submission
form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    } else {
        event.preventDefault();
        const formData = new FormData(document.getElementById('formCrearPerfume'))
        fetch("../api.php", {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data == "El perfume ya existe") {
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
                } else if (data == "Error al agregar el perfume") {
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
var formEditar = document.getElementById('formEditarPerfume');
document.getElementById('EditarPerfume').addEventListener('hidden.bs.modal', function () {
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
        const formData = new FormData(document.getElementById('formEditarPerfume'))
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
                } else if (data == "Error al actualizar el perfume") {
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

function editarPerfume(id) {
    fetch(`../api.php?tabla=perfumes&id=${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('idEditar').value = data.ID;
            document.getElementById('nombreEditar').value = data.NombrePerfume;
            document.getElementById('precioEditar').value = data.Precio;
            document.getElementById('tipoEditar').value = data.Tipo;
            var imagen = document.getElementById('ImagenEditar');
            document.getElementById('nombreImagen').value = data.Imagen
            imagen.src = `../imagenes/perfumes/${data.Imagen}`;
            document.getElementById('etiquetaEditar').value = data.Etiqueta;
            var modal = new bootstrap.Modal(document.getElementById('EditarPerfume'));
            modal.show();
        })
}


function eliminarPerfume(id) {
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
            var tabla = 'perfumes';
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
                            title: 'Error al eliminar el perfume',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true
                        })
                    } else {
                        Swal.fire({
                            title: 'Perfume Eliminado Correctamente',
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