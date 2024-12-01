<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json; charset=UTF-8");

// Manejo de la solicitud OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$database = "productos";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if (isset($_GET['username']) && isset($_GET['password'])) {
        $username = $_GET['username'];
        $password = $_GET['password'];
        $sql = "SELECT * FROM usuario WHERE Documento = ? AND Password = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = mysqli_fetch_assoc($result);

        if (mysqli_num_rows($result) === 1) {
            if ($data['Documento'] == $username && $data['Password'] == $password) {
                echo json_encode($data);
            } else {
                echo json_encode("Usuario o contraseña incorrectos");
            }
        } else {
            echo json_encode("Usuario o contraseña incorrectos");
        }
    } else if (isset($_GET['tabla'])) {
        $tabla = $_GET['tabla'];

        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $sql = "SELECT * FROM $tabla WHERE ID =?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('i', $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = mysqli_fetch_assoc($result);
            if (mysqli_num_rows($result) === 1) {
                echo json_encode($data);
            } else {
                echo json_encode("dato en la tabla $tabla no encotrado");
            }
        } else {
            $sql = "SELECT * FROM $tabla";
            $result = $conn->query($sql);
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            echo json_encode($rows);
        }
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['calzado'])) {
        if (isset($_POST['id'])) {
            $id = $_POST['id'];
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $talla = $_POST['talla'];
            $tipo = $_POST['tipo'];
            $etiqueta = $_POST['etiqueta'];
            if (isset($_FILES['imagen']['name']) && $_FILES['imagen']['name'] != "") {
                unlink('./imagenes/calzado/' . $_POST['nombreImagen']);
                $imagen = $_FILES['imagen'];
                $nombreImagen = $imagen['name'];
                $path = $_SERVER['DOCUMENT_ROOT'] . './imagenes/calzado/' . $nombreImagen;
                if (!move_uploaded_file($imagen['tmp_name'], $path)) {
                    echo json_encode("Error al subir la imagen");
                } else {
                }
            } else {
                $nombreImagen = $_POST['nombreImagen'];
            }
            $sql = "UPDATE calzado SET NombreCalzado =?, Precio =?, Talla =?, Tipo =?, Etiqueta =?, Imagen = ? WHERE ID = $id";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('ssssss', $nombre, $precio, $talla, $tipo, $etiqueta, $nombreImagen);
            if ($stmt->execute()) {
                echo json_encode("Producto actualizado correctamente");
            } else {
                echo json_encode("Error al actualizar el producto");
            }
        } else {
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $talla = $_POST['talla'];
            $tipo = $_POST['tipo'];
            $etiqueta = $_POST['etiqueta'];
            $imagen = $_FILES['imagen'];
            $nombreImagen = $imagen['name'];
            $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/Calzado/' . $nombreImagen;

            $sql = "SELECT * FROM calzado WHERE NombreCalzado = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('s', $nombre);
            $stmt->execute();
            $result = $stmt->get_result();
            if (mysqli_num_rows($result) > 0) {
                echo json_encode("El zapato ya existe");
            } else {
                if (move_uploaded_file($imagen['tmp_name'], $path)) {
                    $sql = "INSERT INTO calzado (NombreCalzado, Precio, Talla, Tipo, Imagen, Etiqueta) VALUES (?,?,?,?,?,?)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param('ssisss', $nombre, $precio, $talla, $tipo, $nombreImagen, $etiqueta);
                    if ($stmt->execute()) {
                        echo json_encode("Zapato agregado correctamente");
                    } else {
                        echo json_encode("Error al agregar el zapato");
                    }
                } else {
                    echo json_encode("Error al subir la imagen");
                }
            }
        }
    } else if (isset($_POST['camisa'])) {

        if (isset($_POST['id'])) {
            $id = $_POST['id'];
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $talla = strtoupper($_POST['talla']);
            $tipo = $_POST['tipo'];
            $sexo = $_POST['sexo'];
            $etiqueta = $_POST['etiqueta'];
            $color = $_POST['color'];
            if (isset($_FILES['imagen']['name']) && $_FILES['imagen']['name'] != '') {
                unlink('./imagenes/camisas/' . $_POST['nombreImagen']);
                $imagen = $_FILES['imagen'];
                $nombreImagen = $imagen['name'];
                $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/camisas/' . $nombreImagen;
                if (!move_uploaded_file($imagen['tmp_name'], $path)) {
                    echo json_encode("Error al subir la imagen");
                } else {
                }
            } else {
                $nombreImagen = $_POST['nombreImagen'];
            }
            $sql = "UPDATE camisas SET NombreCamiseta =?, Precio =?, Talla =?, Sexo=?, Tipo =?, Etiqueta =?, Imagen =?, Color =? WHERE ID = $id";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('ssssssss', $nombre, $precio, $talla, $sexo, $tipo, $etiqueta, $nombreImagen, $color);
            if ($stmt->execute()) {
                echo json_encode("Camisa actualizada correctamente");
            } else {
                echo json_encode("Error al actualizar la camisa");
            }
        } else {
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $talla = strtoupper($_POST['talla']);
            $tipo = $_POST['tipo'];
            $etiqueta = $_POST['etiqueta'];
            $color = $_POST['color'];
            $sexo = $_POST['sexo'];
            $imagen = $_FILES['imagen'];
            $nombreImagen = $imagen['name'];
            $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/camisas/' . $nombreImagen;

            $sql = "SELECT * FROM camisas WHERE NombreCamiseta = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('s', $nombre);
            $stmt->execute();
            $result = $stmt->get_result();
            if (mysqli_num_rows($result) > 0) {
                echo json_encode("La camisa ya existe");
            } else {
                if (move_uploaded_file($imagen['tmp_name'], $path)) {
                    $sql = "INSERT INTO camisas (NombreCamiseta, Precio, Talla, Sexo, Tipo, Imagen, Etiqueta, Color) VALUES (?,?,?,?,?,?,?,?)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param('ssssssss', $nombre, $precio, $talla, $sexo, $tipo, $nombreImagen, $etiqueta, $color);
                    if ($stmt->execute()) {
                        echo json_encode("Camisa agregada correctamente");
                    } else {
                        echo json_encode("Error al agregar la camisa");
                    }
                } else {
                    echo json_encode("Error al subir la imagen");
                }
            }
        }
    } else if (isset($_POST['pantalon'])) {
        if (isset($_POST['id'])) {
            $id = $_POST['id'];
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $talla = $_POST['talla'];
            $tipo = $_POST['tipo'];
            $etiqueta = $_POST['etiqueta'];
            $sexo = $_POST['sexo'];
            $color = $_POST['color'];
            if (isset($_FILES['imagen']['name']) && $_FILES['imagen']['name'] != '') {
                unlink('./imagenes/pantalones/' . $_POST['nombreImagen']);
                $imagen = $_FILES['imagen'];
                $nombreImagen = $imagen['name'];
                $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/pantalones/' . $nombreImagen;
                if (!move_uploaded_file($imagen['tmp_name'], $path)) {
                    echo json_encode("Error al subir la imagen");
                } else {
                }
            } else {
                $nombreImagen = $_POST['nombreImagen'];
            }
            $sql = "UPDATE pantalones SET NombrePantalon =?, Precio =?, Talla =?, Tipo =?, Sexo=?, Etiqueta =?, Imagen =?, Color =? WHERE ID = $id";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('ssssssss', $nombre, $precio, $talla, $tipo, $sexo, $etiqueta, $nombreImagen, $color);
            if ($stmt->execute()) {
                echo json_encode("Pantalón actualizado correctamente");
            } else {
                echo json_encode("Error al actualizar el pantalón");
            }
        } else {
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $talla = $_POST['talla'];
            $tipo = $_POST['tipo'];
            $etiqueta = $_POST['etiqueta'];
            $color = $_POST['color'];
            $sexo = $_POST['sexo'];
            $imagen = $_FILES['imagen'];
            $nombreImagen = $imagen['name'];
            $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/pantalones/' . $nombreImagen;

            $sql = "SELECT * FROM pantalones WHERE NombrePantalon =?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('s', $nombre);
            $stmt->execute();
            $result = $stmt->get_result();
            if (mysqli_num_rows($result) > 0) {
                echo json_encode("El pantalón ya existe");
            } else {
                if (move_uploaded_file($imagen['tmp_name'], $path)) {
                    $sql = "INSERT INTO pantalones (NombrePantalon, Precio, Talla, Tipo, Sexo, Imagen, Etiqueta, Color) VALUES (?,?,?,?,?,?,?,?)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param('ssssssss', $nombre, $precio, $talla, $tipo, $sexo, $nombreImagen, $etiqueta, $color);
                    if ($stmt->execute()) {
                        echo json_encode("Pantalón agregado correctamente");
                    } else {
                        echo json_encode("Error al agregar el pantalón");
                    }
                } else {
                    echo json_encode("Error al subir la imagen");
                }
            }
        }
    } else if (isset($_POST['reloj'])) {
        if (isset($_POST['id'])) {
            $id = $_POST['id'];
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $etiqueta = $_POST['etiqueta'];
            if (isset($_FILES['imagen']['name']) && $_FILES['imagen']['name'] != '') {
                unlink('./imagenes/relojes/' . $_POST['nombreImagen']);
                $imagen = $_FILES['imagen'];
                $nombreImagen = $imagen['name'];
                $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/relojes/' . $nombreImagen;
                if (!move_uploaded_file($imagen['tmp_name'], $path)) {
                    echo json_encode("Error al subir la imagen");
                } else {
                }
            } else {
                $nombreImagen = $_POST['nombreImagen'];
            }
            $sql = "UPDATE relojes SET NombreReloj =?, Precio =?, Etiqueta =?, Imagen =? WHERE ID = $id";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('ssss', $nombre, $precio, $etiqueta, $nombreImagen);
            if ($stmt->execute()) {
                echo json_encode("Reloj actualizado correctamente");
            } else {
                echo json_encode("Error al actualizar el reloj");
            }
        } else {
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $etiqueta = $_POST['etiqueta'];
            $imagen = $_FILES['imagen'];
            $nombreImagen = $imagen['name'];
            $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/relojes/' . $nombreImagen;

            $sql = "SELECT * FROM relojes WHERE NombreReloj =?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('s', $nombre);
            $stmt->execute();
            $result = $stmt->get_result();
            if (mysqli_num_rows($result) > 0) {
                echo json_encode("El reloj ya existe");
            } else {
                if (move_uploaded_file($imagen['tmp_name'], $path)) {
                    $sql = "INSERT INTO relojes (NombreReloj, Precio, Etiqueta, Imagen) VALUES (?,?,?,?)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param('ssss', $nombre, $precio, $etiqueta, $nombreImagen);
                    if ($stmt->execute()) {
                        echo json_encode("Reloj agregado correctamente");
                    } else {
                        echo json_encode("Error al agregar el reloj");
                    }
                } else {
                    echo json_encode("Error al subir la imagen");
                }
            }
        }
    } else if (isset($_POST['gafas'])) {
        if (isset($_POST['id'])) {
            $id = $_POST['id'];
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $etiqueta = $_POST['etiqueta'];
            if (isset($_FILES['imagen']['name']) && $_FILES['imagen']['name'] != '') {
                unlink($path . $_POST['nombreImagen']);
                $imagen = $_FILES['imagen'];
                $nombreImagen = $imagen['name'];
                $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/gafas/' . $nombreImagen;
                if (!move_uploaded_file($imagen['tmp_name'], $path)) {
                    echo json_encode("Error al subir la imagen");
                } else {
                }
            } else {
                $nombreImagen = $_POST['nombreImagen'];
            }
            $sql = "UPDATE gafas SET NombreGafas =?, Precio =?, Etiqueta =?, Imagen =? WHERE ID = $id";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('ssss', $nombre, $precio, $etiqueta, $nombreImagen);
            if ($stmt->execute()) {
                echo json_encode("Gafas actualizadas correctamente");
            } else {
                echo json_encode("Error al actualizar las gafas");
            }
        } else {
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $etiqueta = $_POST['etiqueta'];
            $imagen = $_FILES['imagen'];
            $nombreImagen = $imagen['name'];
            $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/gafas/' . $nombreImagen;
            $sql = "SELECT * FROM gafas WHERE NombreGafas =?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('s', $nombre);
            $stmt->execute();
            $result = $stmt->get_result();
            if (mysqli_num_rows($result) > 0) {
                echo json_encode("Las gafas ya existe");
            } else {
                if (move_uploaded_file($imagen['tmp_name'], $path)) {
                    $sql = "INSERT INTO gafas (NombreGafas, Precio, Etiqueta, Imagen) VALUES (?,?,?,?)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param('ssss', $nombre, $precio, $etiqueta, $nombreImagen);
                    if ($stmt->execute()) {
                        echo json_encode("Gafas agregadas correctamente");
                    } else {
                        echo json_encode("Error al agregar las gafas");
                    }
                } else {
                    echo json_encode("Error al subir la imagen");
                }
            }
        }
    } else if (isset($_POST['perfume'])) {
        if (isset($_POST['id'])) {
            $id = $_POST['id'];
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $tipo = $_POST['tipo'];
            $etiqueta = $_POST['etiqueta'];
            if (isset($_FILES['imagen']['name']) && $_FILES['imagen']['name'] != '') {
                unlink($path . $_POST['nombreImagen']);
                $imagen = $_FILES['imagen'];
                $nombreImagen = $imagen['name'];
                $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/perfumes/' . $nombreImagen;
                if (!move_uploaded_file($imagen['tmp_name'], $path)) {
                    echo json_encode("Error al subir la imagen");
                } else {
                }
            } else {
                $nombreImagen = $_POST['nombreImagen'];
            }
            $sql = "UPDATE perfumes SET NombrePerfume =?, Tipo=?, Precio =?, Etiqueta =?, Imagen =? WHERE ID = $id";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('sssss', $nombre, $tipo, $precio,  $etiqueta, $nombreImagen);
            if ($stmt->execute()) {
                echo json_encode("Perfume actualizado correctamente");
            } else {
                echo json_encode("Error al actualizar el perfume");
            }
        } else {
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $etiqueta = $_POST['etiqueta'];
            $tipo = $_POST['tipo'];
            $imagen = $_FILES['imagen'];
            $nombreImagen = $imagen['name'];
            $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/perfumes/' . $nombreImagen;
            $sql = "SELECT * FROM perfumes WHERE NombrePerfume =?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('s', $nombre);
            $stmt->execute();
            $result = $stmt->get_result();
            if (mysqli_num_rows($result) > 0) {
                echo json_encode("El perfume ya existe");
            } else {
                if (move_uploaded_file($imagen['tmp_name'], $path)) {
                    $sql = "INSERT INTO perfumes (NombrePerfume, Precio, Tipo, Etiqueta, Imagen) VALUES (?,?,?,?,?)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param('sssss', $nombre, $precio, $tipo, $etiqueta, $nombreImagen);
                    if ($stmt->execute()) {
                        echo json_encode("Perfume agregado correctamente");
                    } else {
                        echo json_encode("Error al agregar el perfume");
                    }
                } else {
                    echo json_encode("Error al subir la imagen");
                }
            }
        }
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = file_get_contents("php://input");
    $data = json_decode($data, true);
    $id = $data['id'];
    $tabla = $data['tabla'];
    $sql = "SELECT Imagen FROM $tabla WHERE ID = $id";
    $result = $conn->query($sql);
    $row = mysqli_fetch_array($result);
    $path = "./imagenes/$tabla/";
    unlink($path . $row['Imagen']);

    $sql = "DELETE FROM $tabla WHERE ID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);

    if ($stmt->execute()) {
        echo json_encode("Producto eliminado correctamente");
    } else {
        echo json_encode("Error al eliminar el producto");
    }
}
