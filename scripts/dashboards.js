import { variables, imageVariables } from "./maps.js";  // Importa variables y variables de imagen desde maps.js
import { checkLogin } from "./login.js";  // Importa la función checkLogin desde login.js

// Función asíncrona para configurar el tablero del usuario
async function setUserDashboard() {
    checkLogin();  // Llama a la función para verificar el inicio de sesión
}

// Función para desconfigurar el tablero del usuario (vacía por ahora)
function unsetUserDashboard() {

}

// Función para actualizar el tablero con datos y ubicación
function updateDashboard(data, location) {
    document.querySelector(".ph-current-location").innerHTML = location.name;  // Actualiza la ubicación actual

    // Actualiza las variables meteorológicas
    for (let [variableSet, values] of Object.entries(variables)) {
        for (let variable of values) {
            updateVariable(variableSet, variable, data[variableSet][variable], data[`${variableSet}_units`][variable]);
        }
    }

    // Actualiza las imágenes meteorológicas
    for (let [imageVariableSet, values] of Object.entries(imageVariables)) {
        for (let variable of values) {
            updateWMO(imageVariableSet, variable, data[imageVariableSet][variable], data[imageVariableSet]["is_day"]);
            updateWindDirection(imageVariableSet, variable, data[imageVariableSet][variable]);
        }
    }

    // Actualiza el icono de favoritos
    if (location.isFavorite) {
        document.querySelector('.add-favorite-button').classList.add("is-favorite");
    } else {
        document.querySelector('.add-favorite-button').classList.remove("is-favorite");
    }
}

// Función para actualizar una variable meteorológica específica
function updateVariable(variableSet, variable, value, units) {
    const targetClass = `.ph-${variableSet}-${variable}`;
    let elements = document.querySelectorAll(targetClass);

    if (variableSet != "current") {
        for (let [index, element] of Array.from(elements).entries()) {
            if (variable == "sunrise" || variable == "sunset") {
                element.innerHTML = value[index].slice(11, 16);
            } else if (variable == "temperature_2m_max" || variable == "temperature_2m_min") {
                element.innerHTML = Math.round(parseInt(value[index])) + " " + units;
            } else if (variable == "time") {
                element.innerHTML = value[index].slice(8, 10) + "/" + value[index].slice(5, 7);
            } else if (variableSet == "hourly") {
                element.innerHTML = Math.round(parseInt(value[index * 3 + 2])) + " " + units;
            } else {
                element.innerHTML = Math.round(parseInt(value[index])) + " " + units;
            }
        }
    } else {
        let element = Array.from(elements)[0];
        if (variable == "time") {
            element.innerHTML = value.slice(8, 10) + "/" + value.slice(5, 7);
        } else {
            element.innerHTML = Math.round(parseInt(value)) + " " + units;
        }
    }
}

// Función para actualizar el ícono meteorológico
function updateWMO(variableSet, variable, value, isDay) {
    const targetClass = `.ph-${variableSet}-${variable}`;
    let elements = document.querySelectorAll(targetClass);

    if (variable == "weather_code") {
        if (variableSet != "current") {
            for (let [index, element] of Array.from(elements).entries()) {
                if (variableSet == "hourly") {
                    if (isDay[index * 3 + 2]) {
                        element.src = `./assets/images/weather_icons/${value[index * 3 + 2]}d.png`;
                    } else {
                        element.src = `./assets/images/weather_icons/${value[index * 3 + 2]}n.png`;
                    }
                } else {
                    element.src = `./assets/images/weather_icons/${value[index]}d.png`;
                }
            }
        } else {
            let element = Array.from(elements)[0];
            element.src = `./assets/images/weather_icons/${value}d.png`;
        }
    }
}

// Función para actualizar la dirección del viento
function updateWindDirection(variableSet, variable, value) {
    const targetClass = `.ph-${variableSet}-${variable}`;
    let elements = document.querySelectorAll(targetClass);

    if (variable == "wind_direction_10m") {
        if (variableSet != "current") {
            for (let [index, element] of Array.from(elements).entries()) {
                if (variableSet == "hourly") {
                    element.style = `transform:rotate(${value[index * 3 + 2]}deg);`;
                }
            }
        }
    }
}

// Función para actualizar las sugerencias de búsqueda
function updateSuggestions(data) {
    let datalist = document.querySelector("#suggestions");
    datalist.innerHTML = "";
    data.forEach((item, index) => {
        let option = document.createElement('option');
        option.setAttribute("lat", item["latitude"]);
        option.setAttribute("lon", item["longitude"]);
        if (item["admin1"] != "" & item["admin1"] != undefined) {
            option.value = `${item["name"]}, ${item["admin1"]}, ${item["country"]}`;
        } else {
            option.value = `${item["name"]}, ${item["country"]}`;
        }
        datalist.appendChild(option);
    });
}

export { updateDashboard, setUserDashboard, unsetUserDashboard, updateSuggestions };
