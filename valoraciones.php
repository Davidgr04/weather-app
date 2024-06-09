<?php
include './conexion.php'; // Archivo conexión 

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['Enviar'])) {
    if (
        strlen($_POST['Usuario']) >= 1 &&
        strlen($_POST['Estrellas']) >= 1 &&
        strlen($_POST['Comentario']) >= 1
    ) {
        $Usuario = trim($_POST['Usuario']);
        $Estrellas = trim($_POST['Estrellas']); 
        $Comentario = trim($_POST['Comentario']); 
        $fecha = date("Y-m-d");
        $consulta = "INSERT INTO Valoracion(Usuario, Estrellas, Comentario, fecha)
            VALUES('$Usuario', '$Estrellas', '$Comentario', '$fecha')";
        $resultado = mysqli_query($conex, $consulta);
    } else {
        $mensajes = "<br>Llena todos los campos<br>";
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Valoraciones</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .form-box {
            margin-bottom: 20px;
        }
        .form-box h2 {
            margin-top: 0;
            color: #000;
        }
        .inputbox {
            margin-bottom: 15px;
        }
        .inputbox label {
            display: block;
            font-weight: bold;
            color: #555;
        }
        .inputbox input[type="text"],
        .inputbox select {
            width: 95%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            outline: none;
            color: #333;
        }
        .inputbox input[type="text"]:focus,
        .inputbox select:focus {
            border-color: #333;
        }
        .boton {
            padding: 10px 20px;
            background-color: #000;
            color: #fff;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }
        .boton:hover {
            background-color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
            color: #333;
            cursor: pointer;
        }
        th {
            background-color: #000;
            color: #fff;
        }
        tr:nth-child(even) {
            background-color: #f3f3f3;
        }
        tr:nth-child(odd) {
            background-color: #fff;
        }
        .error {
            color: red;
        }
        .header {
            background-color: #222;
            color: #ddd;
            padding: 10px 0;
            font-family: Arial, sans-serif;
        }
        .header__title {
            margin: 0;
            font-weight: 300;
        }
        .header__menu {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .header__menu-item {
            display: inline-block;
            margin-left: 20px;
        }
        .header__menu-item:first-child {
            margin-left: 0;
        }
        .header__menu-item a {
            color: #ddd;
            text-decoration: none;
            font-weight: 300;
        }
        .footer {
            background-color: #222;
            color: #ddd;
            padding: 10px 0;
            margin-top: 50px;
            font-family: Arial, sans-serif;
        }
        .footer__copyright {
            margin: 0;
            font-weight: 300;
        }
        .footer__social {
            margin-top: 10px;
        }
        .footer__social-link {
            color: #ddd;
            text-decoration: none;
            margin-right: 10px;
            font-weight: 300;
        }
        .footer__social-link:last-child {
            margin-right: 0;
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <h1 class="header__title" style="color: black;">Weather App</h1>
            <br>
            <ul class="header__menu">
                <li class="header__menu-item"><a href="./index.php" style="color: black;">Inicio</a></li>
            </ul>
        </div>
    </header>
    <div id="formulario" class="container">
        <div class="form-box">
            <h2>Crear Valoración</h2>
            <form method="POST" action="" onsubmit="return validarFormulario()">
                <div class="inputbox">
                    <label for="usuario">Usuario</label>
                    <input type="text" name="Usuario" id="usuario" required>
                </div>
                <div class="inputbox">
                    <label for="estrellas">Clasificación:</label>
                    <select name="Estrellas" id="estrellas" required>
                        <option disabled selected value="">Seleccione...</option>
                        <option value="1">★</option>
                        <option value="2">★★</option>
                        <option value="3">★★★</option>
                        <option value="4">★★★★</option>
                        <option value="5">★★★★★</option>
                    </select>
                </div>
                <div class="inputbox">
                    <label for="comentario">Comentario</label>
                    <input type="text" name="Comentario" id="comentario" required>
                </div>
                <input type="submit" name="Enviar" class="boton" value="Enviar">
                <p id="mensajes" class="error"></p>
            </form>

            <br>
        </div>

        <h2>Valoraciones</h2>
        <input type="text" id="filter-input" onkeyup="filterTable()" placeholder="Buscar por usuario...">
        <table id="valoraciones-table">
            <thead>
                <tr>
                    <th>Usuario</th>
                    <th>Estrellas</th>
                    <th>Comentario</th>
                </tr>
            </thead>
            <tbody>
                <?php
                include './conexion.php'; // Archivo conexión

                if ($conex !== null) {
                    $sql = "SELECT Usuario, Estrellas, Comentario FROM Valoracion";
                    $result = $conex->query($sql);

                    if ($result !== false && $result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            echo "<tr>";
                            echo "<td>" . $row["Usuario"] . "</td>";
                            echo "<td>" . $row["Estrellas"] . "</td>";
                            echo "<td>" . $row["Comentario"] . "</td>";
                            echo "</tr>";
                        }
                    } else {
                        echo "<tr><td colspan='3'>0 resultados</td></tr>";
                    }
                    $conex->close();
                } else {
                    echo "<tr><td colspan='3' class='error'>Error: La conexión a la base de datos es nula.</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </div>

    <footer class="footer">
        <div class="container">
            <p class="footer__copyright" style="color: black;">© 2024 Weather App</p>
            <div class="footer__social">
                <a href="https://www.etpxavier.com/ca/" target="_blank" style="color: black;" class="footer__social-link">Página ETPXavier</a>
                <a href="https://github.com/Davidgr04" target="_blank" style="color: black;" class="footer__social-link">Github</a>
            </div>
        </div>
    </footer>
    <!-- Filtrar por letra -->
    <script>
        function filterTable() {
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("filter-input");
            filter = input.value.toLowerCase();
            table = document.getElementById("valoraciones-table");
            tr = table.getElementsByTagName("tr");

            for (i = 1; i < tr.length; i++) {
                tr[i].style.display = "none";
                td = tr[i].getElementsByTagName("td");
                for (var j = 0; j < td.length; j++) {
                    if (td[j]) {
                        if (td[j].innerHTML.toLowerCase().indexOf(filter) > -1) {
                            tr[i].style.display = "";
                            break;
                        }
                    }
                }
            }
        }
    </script>
    <!-- Gestión de eventos -->
<script>
        function cambiarColorFondo() {
            var formulario = document.getElementById("formulario");
            formulario.style.backgroundColor = "rgb(212, 212, 212)";
        }

        document.addEventListener("DOMContentLoaded", function() {
            var formulario = document.getElementById("formulario");
            formulario.addEventListener("click", cambiarColorFondo);
        });
    </script>

</body>
</html>
