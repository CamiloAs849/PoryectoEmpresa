<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json; charset=UTF-8");

// Manejo de la solicitud OPTIONS
try {
    $dsn = "mysql:host=localhost;dbname=productos";
    $username = "root";
    $password = "";

    $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if (isset($_GET['username']) && isset($_GET['password'])) {
        $username = $_GET['username'];
        $password = $_GET['password'];
        $sql = "SELECT * FROM usuario WHERE Documento = :documento AND Password = :password";
        $stmt = $conn->prepare($sql);
        $stmt->execute(['documento' => $username, 'password' => $password]);
        $data = $stmt->fetch();

        if ($data) {
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
            $sql = "SELECT * FROM $tabla WHERE ID = :id";
            $stmt = $conn->prepare($sql);
            $stmt->execute(['id' => $id]);
            $data = $stmt->fetch();
            if ($data) {
                echo json_encode($data);
            } else {
                echo json_encode("dato en la tabla $tabla no encotrado");
            }
        } else {
            $sql = "SELECT * FROM $tabla";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll();
            if ($rows) {
                echo json_encode($rows);
            } else {
                echo json_encode("No hay datos en la tabla $tabla");
            }
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
                $nombreImagen = preg_replace('/\.[^.]+$/', '.webp', $nombreImagen);
                $path = $_SERVER['DOCUMENT_ROOT'] . './imagenes/calzado/' . $nombreImagen;
                if (!move_uploaded_file($imagen['tmp_name'], $path)) {
                    echo json_encode("Error al subir la imagen");
                } else {
                }
            } else {
                $nombreImagen = $_POST['nombreImagen'];
            }
            $sql = "UPDATE calzado SET NombreCalzado = :nombreCalzado, Precio = :precio, Talla = :talla, Tipo = :tipo, Etiqueta =:etiqueta, Imagen = :imagen WHERE ID = $id";
            $stmt = $conn->prepare($sql);
            if ($stmt->execute(['nombreCalzado' => $nombre, 'precio' => $precio, 'talla' => $talla, 'tipo' => $tipo, 'etiqueta' => $etiqueta, 'imagen' => $nombreImagen])) {
                echo json_encode("Zapato actualizado correctamente");
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

            $sql = "SELECT * FROM calzado WHERE NombreCalzado = :nombreCalzado";
            $stmt = $conn->prepare($sql);
            $stmt->execute(['nombreCalzado' => $nombre]);
            $result = $stmt->fetch();
            if ($result) {
                echo json_encode("El zapato ya existe");
            } else {
                $nombreImagen = preg_replace('/\.[^.]+$/', '.webp', $nombreImagen);
                $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/calzado/' . $nombreImagen;
                if (move_uploaded_file($imagen['tmp_name'], $path)) {
                    $sql = "INSERT INTO calzado (NombreCalzado, Precio, Talla, Tipo, Imagen, Etiqueta) VALUES (:nombreCalzado, :precio, :talla, :tipo, :imagen, :etiqueta)";
                    $stmt = $conn->prepare($sql);
                    if ($stmt->execute(['nombreCalzado' => $nombre, 'precio' => $precio, 'talla' => $talla, 'tipo' => $tipo, 'imagen' => $nombreImagen, 'etiqueta' => $etiqueta])) {
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
                $nombreImagen = preg_replace('/\.[^.]+$/', '.webp', $nombreImagen);
                $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/camisas/' . $nombreImagen;
                if (!move_uploaded_file($imagen['tmp_name'], $path)) {
                    echo json_encode("Error al subir la imagen");
                } else {
                }
            } else {
                $nombreImagen = $_POST['nombreImagen'];
            }
            $sql = "UPDATE camisas SET NombreCamiseta = :nombreCamisa, Precio = :precio, Talla = :talla, Sexo= :sexo, Tipo = :tipo, Etiqueta = :etiqueta, Imagen =:imagen, Color = :color WHERE ID = $id";
            $stmt = $conn->prepare($sql);
            if ($stmt->execute(['nombreCamisa' => $nombre, 'precio' => $precio, 'talla' => $talla, 'sexo' => $sexo, 'tipo' => $tipo, 'etiqueta' => $etiqueta, 'imagen' => $nombreImagen, 'color' => $color])) {
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

            $sql = "SELECT * FROM camisas WHERE NombreCamiseta = :nombreCamiseta";
            $stmt = $conn->prepare($sql);
            $stmt->execute(['nombreCamiseta' => $nombre]);
            $result = $stmt->fetch();
            if ($result) {
                echo json_encode("La camisa ya existe");
            } else {
                $nombreImagen = preg_replace('/\.[^.]+$/', '.webp', $nombreImagen);
                $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/camisas/' . $nombreImagen;
                if (move_uploaded_file($imagen['tmp_name'], $path)) {
                    $sql = "INSERT INTO camisas (NombreCamiseta, Precio, Talla, Sexo, Tipo, Imagen, Etiqueta, Color) VALUES (:nombreCamisa, :precio, :talla, :sexo, :tipo, :imagen, :etiqueta, :color)";
                    $stmt = $conn->prepare($sql);
                    if ($stmt->execute(['nombreCamisa' => $nombre, 'precio' => $precio, 'talla' => $talla, 'sexo' => $sexo, 'tipo' => $tipo, 'imagen' => $nombreImagen, 'etiqueta' => $etiqueta, 'color' => $color])) {
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
                $nombreImagen = preg_replace('/\.[^.]+$/', '.webp', $nombreImagen);
                $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/pantalones/' . $nombreImagen;
                if (!move_uploaded_file($imagen['tmp_name'], $path)) {
                    echo json_encode("Error al subir la imagen");
                } else {
                }
            } else {
                $nombreImagen = $_POST['nombreImagen'];
            }
            $sql = "UPDATE pantalones SET NombrePantalon = :nombrePantalon, Precio = :precio, Talla = :talla, Tipo =:tipo, Sexo=:sexo, Etiqueta =:etiqueta, Imagen =:imagen, Color =:color WHERE ID = $id";
            $stmt = $conn->prepare($sql);
            if ($stmt->execute(['nombrePantalon' => $nombre, 'precio' => $precio, 'talla' => $talla, 'tipo' => $tipo, 'sexo' => $sexo, 'etiqueta' => $etiqueta, 'imagen' => $nombreImagen, 'color' => $color])) {
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

            $sql = "SELECT * FROM pantalones WHERE NombrePantalon = :nombrePantalon";
            $stmt = $conn->prepare($sql);
            $stmt->execute(['nombrePantalon' => $nombre]);
            $result = $stmt->fetch();
            if ($result) {
                echo json_encode("El pantalón ya existe");
            } else {
                $nombreImagen = preg_replace('/\.[^.]+$/', '.webp', $nombreImagen);
                $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/pantalones/' . $nombreImagen;
                if (move_uploaded_file($imagen['tmp_name'], $path)) {
                    $sql = "INSERT INTO pantalones (NombrePantalon, Precio, Talla, Tipo, Sexo, Imagen, Etiqueta, Color) VALUES (:nombrePantalon, :precio, :talla, :tipo, :sexo, :imagen, :etiqueta, :color)";
                    $stmt = $conn->prepare($sql);
                    if ($stmt->execute(['nombrePantalon' => $nombre, 'precio' => $precio, 'talla' => $talla, 'tipo' => $tipo, 'sexo' => $sexo, 'imagen' => $nombreImagen, 'etiqueta' => $etiqueta, 'color' => $color])) {
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
                $nombreImagen = preg_replace('/\.[^.]+$/', '.webp', $nombreImagen);
                $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/relojes/' . $nombreImagen;
                if (!move_uploaded_file($imagen['tmp_name'], $path)) {
                    echo json_encode("Error al subir la imagen");
                } else {
                }
            } else {
                $nombreImagen = $_POST['nombreImagen'];
            }
            $sql = "UPDATE relojes SET NombreReloj = :nombre, Precio = :precio, Etiqueta = :etiqueta, Imagen = :imagen WHERE ID = $id";
            $stmt = $conn->prepare($sql);
            if ($stmt->execute(['nombre' => $nombre, 'precio' => $precio, 'etiqueta' => $etiqueta, 'imagen' => $nombreImagen])) {
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

            $sql = "SELECT * FROM relojes WHERE NombreReloj = :nombre";
            $stmt = $conn->prepare($sql);
            $stmt->execute(['nombre' => $nombreImagen]);
            $result = $stmt->fetch();
            if ($result) {
                echo json_encode("El reloj ya existe");
            } else {
                $nombreImagen = preg_replace('/\.[^.]+$/', '.webp', $nombreImagen);
                $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/relojes/' . $nombreImagen;
                if (move_uploaded_file($imagen['tmp_name'], $path)) {
                    $sql = "INSERT INTO relojes (NombreReloj, Precio, Etiqueta, Imagen) VALUES (:nombre, :precio, :etiqueta, :imagen)";
                    $stmt = $conn->prepare($sql);
                    if ($stmt->execute(['nombre' => $nombre, 'precio' => $precio, 'etiqueta' => $etiqueta, 'imagen' => $nombreImagen])) {
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
                unlink('./imagenes/gafas/' . $_POST['nombreImagen']);
                $imagen = $_FILES['imagen'];
                $nombreImagen = $imagen['name'];
                $nombreImagen = preg_replace('/\.[^.]+$/', '.webp', $nombreImagen);
                $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/gafas/' . $nombreImagen;
                if (!move_uploaded_file($imagen['tmp_name'], $path)) {
                    echo json_encode("Error al subir la imagen");
                } else {
                }
            } else {
                $nombreImagen = $_POST['nombreImagen'];
            }
            $sql = "UPDATE gafas SET NombreGafas = :nombre, Precio = :precio, Etiqueta = :etiqueta, Imagen = :imagen WHERE ID = $id";
            $stmt = $conn->prepare($sql);
            if ($stmt->execute(['nombre' => $nombre, 'precio' => $precio, 'etiqueta' => $etiqueta, 'imagen' => $nombreImagen])) {
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
            $sql = "SELECT * FROM gafas WHERE NombreGafas = :nombre";
            $stmt = $conn->prepare($sql);
            $stmt->execute(['nombre' => $nombre]);
            $result = $stmt->fetch();
            if ($result) {
                echo json_encode("Las gafas ya existe");
            } else {
                $nombreImagen = preg_replace('/\.[^.]+$/', '.webp', $nombreImagen);
                $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/gafas/' . $nombreImagen;

                if (move_uploaded_file($imagen['tmp_name'], $path)) {
                    $sql = "INSERT INTO gafas (NombreGafas, Precio, Etiqueta, Imagen) VALUES (:nombre, :precio, :etiqueta, :imagen)";
                    $stmt = $conn->prepare($sql);
                    if ($stmt->execute(['nombre' => $nombre, 'precio' => $precio, 'etiqueta' => $etiqueta, 'imagen' => $nombreImagen])) {
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
                unlink('./imagenes/perfumes/' . $_POST['nombreImagen']);
                $imagen = $_FILES['imagen'];
                $nombreImagen = $imagen['name'];
                $nombreImagen = preg_replace('/\.[^.]+$/', '.webp', $nombreImagen);
                $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/perfumes/' . $nombreImagen;
                if (!move_uploaded_file($imagen['tmp_name'], $path)) {
                    echo json_encode("Error al subir la imagen");
                } else {
                }
            } else {
                $nombreImagen = $_POST['nombreImagen'];
            }
            $sql = "UPDATE perfumes SET NombrePerfume =:nombre, Tipo=:tipo, Precio =:precio, Etiqueta =:etiqueta, Imagen =:imagen WHERE ID = $id";
            $stmt = $conn->prepare($sql);
            if ($stmt->execute(['nombre' => $nombre, 'tipo' => $tipo, 'precio' => $precio, 'etiqueta' => $etiqueta, 'imagen' => $nombreImagen])) {
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
            $sql = "SELECT * FROM perfumes WHERE NombrePerfume = :nombre";
            $stmt = $conn->prepare($sql);
            $stmt->execute(['nombre' => $nombre]);
            $result = $stmt->fetch();
            if ($result) {
                echo json_encode("El perfume ya existe");
            } else {
                $nombreImagen = preg_replace('/\.[^.]+$/', '.webp', $nombreImagen);
                $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/perfumes/' . $nombreImagen;
                if (move_uploaded_file($imagen['tmp_name'], $path)) {
                    $sql = "INSERT INTO perfumes (NombrePerfume, Precio, Tipo, Etiqueta, Imagen) VALUES (:nombre, :precio, :tipo, :etiqueta, :imagen)";
                    $stmt = $conn->prepare($sql);
                    if ($stmt->execute(['nombre' => $nombre, 'precio' => $precio, 'tipo' => $tipo, 'etiqueta' => $etiqueta, 'imagen' => $nombreImagen])) {
                        echo json_encode("Perfume agregado correctamente");
                    } else {
                        echo json_encode("Error al agregar el perfume");
                    }
                } else {
                    echo json_encode("Error al subir la imagen");
                }
            }
        }
    } else if (isset($_POST['vapeador'])) {
        if (isset($_POST['id'])) {
            $id = $_POST['id'];
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $etiqueta = $_POST['etiqueta'];
            if (isset($_FILES['imagen']['name']) && $_FILES['imagen']['name'] != '') {
                unlink('./imagenes/vapeadores/' . $_POST['nombreImagen']);
                $imagen = $_FILES['imagen'];
                $nombreImagen = $imagen['name'];
                $nombreImagen = preg_replace('/\.[^.]+$/', '.webp', $nombreImagen);
                $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/vapeadores/' . $nombreImagen;
                if (!move_uploaded_file($imagen['tmp_name'], $path)) {
                    echo json_encode("Error al subir la imagen");
                } else {
                }
            } else {
                $nombreImagen = $_POST['nombreImagen'];
            }
            $sql = "UPDATE vapeadores SET NombreVapeador =:nombre, Precio =:precio, Etiqueta =:etiqueta, Imagen =:imagen WHERE ID = $id";
            $stmt = $conn->prepare($sql);
            if ($stmt->execute(['nombre' => $nombre, 'precio' => $precio, 'etiqueta' => $etiqueta, 'imagen' => $nombreImagen])) {
                echo json_encode("Vapeador actualizado correctamente");
            } else {
                echo json_encode("Error al actualizar el vapeador");
            }
        } else {
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $etiqueta = $_POST['etiqueta'];
            $imagen = $_FILES['imagen'];
            $nombreImagen = $imagen['name'];
            $sql = "SELECT * FROM vapeadores WHERE NombreVapeador = :nombre";
            $stmt = $conn->prepare($sql);
            $stmt->execute(['nombre' => $nombre]);
            $result = $stmt->fetch();
            if ($result) {
                echo json_encode("El vapeador ya existe");
            } else {
                // remplazar la extension de la imagen a webp
                $nombreImagen = preg_replace('/\.[^.]+$/', '.webp', $nombreImagen);
                $path = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/vapeadores/' . $nombreImagen;

                $sql = "INSERT INTO vapeadores (NombreVapeador, Precio, Etiqueta, Imagen) VALUES (:nombre, :precio, :etiqueta, :imagen)";
                $stmt = $conn->prepare($sql);
                if (move_uploaded_file($imagen['tmp_name'], $path)) {
                    $sql = "INSERT INTO vapeadores (NombreVapeador, Precio, Etiqueta, Imagen) VALUES (:nombre, :precio, :etiqueta, :imagen)";
                    $stmt = $conn->prepare($sql);
                    if ($stmt->execute(['nombre' => $nombre, 'precio' => $precio, 'etiqueta' => $etiqueta, 'imagen' => $nombreImagen])) {
                        echo json_encode("Vapeador agregado correctamente");
                    } else {
                        echo json_encode("Error al agregar el vapeador");
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
    $row = $result->fetch();
    $path = "./imagenes/$tabla/";
    unlink($path . $row['Imagen']);

    $sql = "DELETE FROM $tabla WHERE ID = :id";
    $stmt = $conn->prepare($sql);

    if ($stmt->execute(['id' => $id])) {
        echo json_encode("Producto eliminado correctamente");
    } else {
        echo json_encode("Error al eliminar el producto");
    }
}
