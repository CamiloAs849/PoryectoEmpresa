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
$database = "gestion_productos";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['username']) && isset($_GET['password'])) {
        $username = $_GET['username'];
        $password = $_GET['password'];
        $sql = "SELECT * FROM administrador WHERE AdminID = ? AND Password = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = mysqli_fetch_assoc($result);

        if (mysqli_num_rows($result) === 1) {
            if ($data['AdminID'] == $username && $data['Password'] == $password) {
                echo json_encode($data);
            } else {
                echo json_encode("Usuario o contraseña incorrectos");
            }
        } else {
            echo json_encode("Usuario o contraseña incorrectos");
        }
    } else {
        $sql = "SELECT * FROM producto";
        $result = $conn->query($sql);
        $rows = array();

        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        echo json_encode(["data" => $rows]);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];
    $etiqueta = $_POST['etiqueta'];
    $tamaño = $_POST['tamaño'];
    $imagen = $_FILES['imagen'];
    $nombreImagen = $imagen['name'];
    $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/' . $nombreImagen;

    $sql = "SELECT * FROM producto WHERE NombreProducto = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $NombreProducto);
    $stmt->execute();
    $result = $stmt->get_result();
    if (mysqli_num_rows($result) > 0) {
        echo json_encode("El producto ya existe");
    } else {
        if (move_uploaded_file($imagen['tmp_name'], $path)) {
            $sql = "INSERT INTO producto (NombreProducto, Descripcion, Precio, Etiqueta, imagen, tamaño) VALUES (?,?,?,?,?,?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('ssisss', $nombre, $descripcion, $precio, $etiqueta, $nombreImagen, $tamaño);
            if ($stmt->execute()) {
                echo json_encode("Producto agregado correctamente");
            } else {
                echo json_encode("Error al agregar el producto");
            }
        } else {
            echo json_encode("Error al subir la imagen");
        }
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"), $data);
    $id = $data['id'];
    $sql = "SELECT imagen FROM producto WHERE ProductoID = $id";
    $result = $conn->query($sql);
    $row = mysqli_fetch_array($result);
    $path = './imagenes/';
    unlink($path . $row['imagen']);

    $sql = "DELETE FROM producto WHERE ProductoID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
    if ($stmt->execute()) {
        echo json_encode("Producto eliminado correctamente");
    } else {
        echo json_encode("Error al eliminar el producto");
    }
}
