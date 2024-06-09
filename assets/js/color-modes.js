(() => {
  'use strict'  // Habilita el modo estricto de JavaScript, que ayuda a escribir un código más seguro y menos propenso a errores

  // Función para obtener el tema almacenado en el localStorage del navegador
  const getStoredTheme = () => localStorage.getItem('theme');
  
  // Función para establecer el tema en el localStorage del navegador
  const setStoredTheme = theme => localStorage.setItem('theme', theme);

  // Función para obtener el tema preferido del usuario
  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();  // Obtiene el tema almacenado
    if (storedTheme) {  // Si hay un tema almacenado, lo retorna
      return storedTheme;
    }

    // Si no hay tema almacenado, retorna el tema basado en las preferencias del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Función para establecer el tema en el documento
  const setTheme = theme => {
    if (theme === 'auto') {  // Si el tema es 'auto', usa las preferencias del sistema
      document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    } else {  // De lo contrario, establece el tema explícitamente
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
  }

  // Establece el tema preferido cuando se carga el script
  setTheme(getPreferredTheme());

  // Función para mostrar el tema activo en el interruptor de temas
  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme');  // Selecciona el interruptor de temas

    if (!themeSwitcher) {  // Si no hay interruptor de temas, no hace nada
      return;
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text');  // Selecciona el texto del interruptor de temas
    const activeThemeIcon = document.querySelector('.theme-icon-active use');  // Selecciona el icono del tema activo
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);  // Selecciona el botón del tema activo
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href');  // Obtiene el SVG del icono del botón activo

    // Desactiva todos los botones de temas
    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active');
      element.setAttribute('aria-pressed', 'false');
    });

    // Activa el botón del tema seleccionado
    btnToActive.classList.add('active');
    btnToActive.setAttribute('aria-pressed', 'true');
    activeThemeIcon.setAttribute('href', svgOfActiveBtn);  // Cambia el icono del tema activo
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel);  // Actualiza la etiqueta aria del interruptor

    if (focus) {  // Si se debe enfocar, enfoca el interruptor de temas
      themeSwitcher.focus();
    }
  }

  // Evento para cambiar el tema cuando cambian las preferencias del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme();
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme());
    }
  });

  // Evento que se ejecuta cuando el DOM ha sido completamente cargado
  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme());  // Muestra el tema activo

    // Añade eventos a todos los botones de temas
    document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const theme = toggle.getAttribute('data-bs-theme-value');  // Obtiene el valor del tema
        setStoredTheme(theme);  // Almacena el tema
        setTheme(theme);  // Establece el tema
        showActiveTheme(theme, true);  // Muestra el tema activo
      });
    });
  });
})();
