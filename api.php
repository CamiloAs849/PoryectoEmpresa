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
                echo json_encode("Calzado no encontrado");
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
            echo json_encode("El producto ya existe");
        } else {
            if (move_uploaded_file($imagen['tmp_name'], $path)) {
                $sql = "INSERT INTO calzado (NombreCalzado, Precio, Talla, Tipo, Imagen, Etiqueta) VALUES (?,?,?,?,?,?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param('ssisss', $nombre, $precio, $talla, $tipo, $nombreImagen, $etiqueta);
                if ($stmt->execute()) {
                    echo json_encode("Producto agregado correctamente");
                } else {
                    echo json_encode("Error al agregar el producto");
                }
            } else {
                echo json_encode("Error al subir la imagen");
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

    $sql = "DELETE FROM calzado WHERE ID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);

    if ($stmt->execute()) {
        echo json_encode("Producto eliminado correctamente");
    } else {
        echo json_encode("Error al eliminar el producto");
    }
}
