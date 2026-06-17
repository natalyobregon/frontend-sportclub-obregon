// 1. Captura de elementos del DOM (ajustados a tu login.html)
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("correo"); 
const passwordInput = document.getElementById("password");
const errorMessage = document.querySelector(".mensaje-error"); 
const successMessage = document.querySelector(".mensaje-exito"); 

// Convertimos la función a asíncrona para usar await
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); 
    
    // Limpiamos mensajes previos
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
    if (successMessage) {
        successMessage.textContent = "";
        successMessage.style.display = "none";
    }

    // --- SE AGREGA: Limpiar bordes rojos antes de validar de nuevo ---
    emailInput.classList.remove("is-invalid");
    passwordInput.classList.remove("is-invalid");

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;

    // Validación básica en el frontend
    if (!emailValue || !passwordValue) {
        errorMessage.textContent = "Por favor, completa todos los campos.";
        errorMessage.style.display = "block";
        
        // --- SE AGREGA: Poner borde rojo si están vacíos ---
        if (!emailValue) emailInput.classList.add("is-invalid");
        if (!passwordValue) passwordInput.classList.add("is-invalid");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {

        errorMessage.textContent = "Ingresa un correo electrónico válido.";
        errorMessage.style.display = "block";

        emailInput.classList.add("is-invalid");

        return;
    }

    try {
        // --- ESTRUCTURA DE PETICIÓN SOLICITADA ---
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                email: emailValue,      // Envía el correo dinámico del input
                password: passwordValue  // Envía la contraseña dinámica del input
            })
        });

        // Captura de la respuesta en formato JSON
        const data = await response.json();

        // --- ESTRUCTURA DE RESPUESTA EVALUADA ---
        // El backend responde con un objeto que contiene { ok, message, data: { token, user: { role } } }
        if (response.ok && data.ok === true) {
            
            if (successMessage) {
                successMessage.textContent = data.message || "Login exitoso."; // Usa el "Login exitoso." del backend
                successMessage.style.display = "block";
            }

            // Guardar el token en localStorage usando la estructura exacta devuelta (data.data.token)
            localStorage.setItem("token", data.data.token);
            
            // Guardar el usuario completo en localStorage por si tus dashboards lo necesitan
            localStorage.setItem("user", JSON.stringify(data.data.user));

            // Redirección dinámica leyendo el rol exacto de la respuesta (data.data.user.role)
            setTimeout(() => {
                redirectByRole(data.data.user.role);
            }, 1200);

        } else {
            // Si el backend devuelve ok: false o un código de error, muestra el mensaje del servidor
            errorMessage.textContent = data.message || "Credenciales incorrectas";
            errorMessage.style.display = "block";

            // --- SE AGREGA: Poner borde rojo si el backend rechaza los datos ---
            emailInput.classList.add("is-invalid");
            passwordInput.classList.add("is-invalid");
        }

    } catch (error) {
        // Manejo de errores por si el servidor se cae o no hay conexión
        console.error("Error en la conexión:", error);
        errorMessage.textContent = "No se pudo conectar con el servidor. Inténtalo más tarde.";
        errorMessage.style.display = "block";
    }
});

// Función encargada de la redirección según el rol retornado por el backend
function redirectByRole(role) {
    switch (role) {
        case "user":
            window.location.href = "dashboard_usuario.html";
            break;
        case "coach":
            window.location.href = "dashboard_coach.html";
            break;
        case "admin":
            window.location.href = "dashboard_admin.html";
            break;
        default:
            errorMessage.textContent = "Error: Rol de usuario no reconocido.";
            errorMessage.style.display = "block";
            break;
    }
}