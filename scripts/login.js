import { getFavorites } from "./favorites.js";  // Importa la función getFavorites desde favorites.js

let loggedIn = false;  // Variable para indicar si el usuario ha iniciado sesión

// Función para verificar el inicio de sesión del usuario
function checkLogin() {
    console.log("Checking session...");
    const formData = new URLSearchParams();
    formData.append('checkLogin', true);  // Añade el parámetro checkLogin

    const options = {
        method: 'POST',
        body: formData
    };

    fetch("./login.php", options)
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            console.log(data);
            if (data != "-1") {  // Si el usuario ha iniciado sesión
                loggedIn = true;
                document.querySelector(".boton-login").style = "background-color:orange ;";
                document.querySelector(".user-menu button").disabled = false;
                document.querySelector(".user-menu button").innerHTML = data;
                document.querySelector('.upload-photo-button').style.display = "block";
                document.querySelector('.show-photo-button').style.display = "block";
                return true;
            } else {  // Si el usuario no ha iniciado sesión
                loggedIn = false;
                document.querySelector(".boton-login").style = "background-color:lightblue ;";
                document.querySelector(".user-menu button").disabled = true;
                document.querySelector(".user-menu button").innerHTML = "";
                document.querySelector('.upload-photo-button').style.display = "none";
                document.querySelector('.show-photo-button').style.display = "none";
                return false;
            }
        })
        .then((result) => {
            if (result) {
                getFavorites();  // Si el usuario ha iniciado sesión, obtiene sus favoritos
            }
        })
        .catch((error) => { console.log(error); });
}

// Función para iniciar sesión del usuario
function requestLogin(event) {
    console.log("logging in...");
    let user = document.querySelector('form input[name="user"]').value;  // Obtiene el nombre de usuario
    let password = document.querySelector('form input[name="password"]').value;  // Obtiene la contraseña
    const formData = new URLSearchParams();
    formData.append('user', user);
    formData.append('password', password);
    formData.append('login', true);

    const options = {
        method: 'POST',
        body: formData
    };

    fetch("./login.php", options)
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            console.log(data);
            if (data == "1") {
                checkLogin();  // Verifica el inicio de sesión después de iniciarlo
            }
            $('#loginModal').modal('hide');
        })
        .catch((error) => { console.log(error); });
}

// Función para cerrar sesión del usuario
function requestLogout() {
    console.log("logging out...");
    const formData = new URLSearchParams();
    formData.append('logout', true);  // Añade el parámetro logout

    const options = {
        method: 'POST',
        body: formData
    };

    fetch("./login.php", options)
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            console.log(data);
            checkLogin();  // Verifica el inicio de sesión después de cerrarlo
        })
        .catch((error) => { console.log(error); });
}

export { requestLogin, requestLogout, checkLogin, loggedIn };
