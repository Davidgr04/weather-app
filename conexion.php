<?php
    $dbservername = "localhost";
    $dbusername = "root";
    $dbpassword = "";
    $dbname = "weatherapp";

    // Crear conexión
    $conex = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);

    // Verificar conexión
    if ($conex->connect_error) {
        die("Conexión fallida: " . $conex->connect_error);
    }

    return $conex;
?>
