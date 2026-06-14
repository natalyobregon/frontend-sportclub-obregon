// 1. Capturar los elementos del DOM (basados exactamente en los id de tu registro.html)
const registroForm = document.getElementById('registroForm');
const nombreInput = document.getElementById('nombre');
const fechaInput = document.getElementById('fecha');
const correoInput = document.getElementById('correo');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmar-password');

const errorDiv = document.querySelector('.mensaje-error');
const exitoDiv = document.querySelector('.mensaje-exito');

// Aseguramos que los contenedores de mensajes partan limpios y ocultos al cargar la página
errorDiv.textContent = '';
errorDiv.style.display = 'none';
exitoDiv.textContent = '';
exitoDiv.style.display = 'none';

// 2. Escuchar el evento de envío (submit) del formulario
registroForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue e interrumpa el proceso

    // Limpiamos los mensajes y ocultamos los contenedores en cada intento
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
    exitoDiv.textContent = '';
    exitoDiv.style.display = 'none';

    // --- SE AGREGA: Limpiar todos los bordes rojos previos antes de volver a evaluar ---
    nombreInput.classList.remove('is-invalid');
    correoInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');
    confirmPasswordInput.classList.remove('is-invalid');

    // Obtener y limpiar los valores que el usuario escribió
    const fullName = nombreInput.value.trim();
    const email = correoInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const birthDate = fechaInput.value; 

    // --- REQUISITOS DE VALIDACIÓN EN FRONTEND (Punto 4 de la guía) ---

    // A. Campos obligatorios
    if (!fullName || !email || !password || !confirmPassword) {
        mostrarError('Por favor, completa todos los campos obligatorios.');
        
        // --- SE AGREGA: Marcar con rojo las casillas específicas que quedaron vacías ---
        if (!fullName) nombreInput.classList.add('is-invalid');
        if (!email) correoInput.classList.add('is-invalid');
        if (!password) passwordInput.classList.add('is-invalid');
        if (!confirmPassword) confirmPasswordInput.classList.add('is-invalid');
        return;
    }

    // B. Email válido (Comprueba que tenga formato de correo real usando una expresión regular)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarError('Por favor, ingresa un correo electrónico válido.');
        correoInput.classList.add('is-invalid'); // --- SE AGREGA: Borde rojo en el correo ---
        return;
    }

    // C. Contraseña mínimo 8 caracteres
    if (password.length < 8) {
        mostrarError('La contraseña debe tener al menos 8 caracteres.');
        passwordInput.classList.add('is-invalid'); // --- SE AGREGA: Borde rojo en password ---
        return;
    }

    // D. Contraseña segura (Debe incluir obligatoriamente letras y números)
    const tieneLetras = /[a-zA-Z]/.test(password);
    const tieneNumeros = /[0-9]/.test(password);
    if (!tieneLetras || !tieneNumeros) {
        mostrarError('La contraseña debe incluir tanto letras como números.');
        passwordInput.classList.add('is-invalid'); // --- SE AGREGA: Borde rojo en password ---
        return;
    }

    // E. Las contraseñas deben coincidir
    if (password !== confirmPassword) {
        mostrarError('Las contraseñas no coinciden.');
        confirmPasswordInput.classList.add('is-invalid'); // --- SE AGREGA: Borde rojo en confirmación ---
        return;
    }

    // --- CONEXIÓN CON EL BACKEND MEDIANTE FETCH (Punto 5 de la guía) ---
    try {
        // Creamos el objeto con la estructura JSON exacta solicitada por el backend
        const nuevoUsuario = {
            "full_name": fullName,
            "email": email,
            "password": password,
            "role": "user", // Rol asignado por defecto
            "must_change_password": false,
            "birth_date": birthDate || "2000-01-10", // Si no pone fecha, enviamos una por defecto requerida
            "metadata": {
                "sports": [] // Estructura básica obligatoria de la actividad
            }
        };

        // Realizamos la petición POST a la API de registro
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoUsuario)
        });

        const data = await response.json();

        // 3. Evaluar la respuesta del servidor
        if (response.ok) {
            // Si el backend lo guarda con éxito, mostramos el mensaje en el div verde
            exitoDiv.textContent = data.message || '¡Usuario registrado correctamente!';
            exitoDiv.style.display = 'block';
            
            registroForm.reset(); // Reseteamos todas las casillas del formulario

            // Redirigimos al Login automáticamente después de 2 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);

        } else {
            // Si el backend rechaza el registro (ej: el correo ya está registrado en la base de datos)
            mostrarError(data.message || 'Error al registrar el usuario.');
            
            // --- SE AGREGA: Si el correo ya existe, es buena práctica pintar esa casilla de rojo
            if (data.message && data.message.toLowerCase().includes('email') || data.message.toLowerCase().includes('correo')) {
                correoInput.classList.add('is-invalid');
            }
        }

    } catch (error) {
        // En caso de que se apague el backend o falle la red
        console.error('Error en el fetch de registro:', error);
        mostrarError('No se pudo conectar con el servidor. Inténtalo más tarde.');
    }
});

// Función auxiliar para reutilizar el despliegue visual de errores
function mostrarError(mensaje) {
    errorDiv.textContent = mensaje;
    errorDiv.style.display = 'block';
}