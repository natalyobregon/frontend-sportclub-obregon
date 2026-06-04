// 1. Base de datos de usuarios: 3 roles con 2 cuentas cada uno
const users = [
    { user: "user1@sportclub.cl", fullname: "Juan Pérez Gómez", password: "1234", role: "user" },
    { user: "user2@sportclub.cl", fullname: "Javier Morales Cid", password: "1234", role: "user" },

    { user: "coach1@sportclub.cl", fullname: "Ana María Silva", password: "1234", role: "coach" },
    { user: "coach2@sportclub.cl", fullname: "Pedro Urrutia Jara", password: "1234", role: "coach" },
    
    { user: "admin1@sportclub.cl", fullname: "Administrador Central", password: "1234", role: "admin" },
    { user: "admin2@sportclub.cl", fullname: "Soporte TI SportClub", password: "1234", role: "admin" }
];

// 2. Captura de elementos del DOM (ajustados a tu login.html)
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("correo"); // Cambiado de 'email' a 'correo'
const passwordInput = document.getElementById("password");
// Usamos la clase que ya definiste en tu HTML para mostrar los errores
const errorMessage = document.querySelector(".mensaje-error"); 

loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); 
    
    // Limpiamos mensajes previos
    errorMessage.textContent = "";
    errorMessage.style.display = "none";

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;

    // Validación de credenciales
    const matchedUser = users.find(u => u.user === emailValue && u.password === passwordValue);

    if (matchedUser) {
        // Estructura para guardar en localStorage
        const sessionUser = {
            user: matchedUser.user,
            fullname: matchedUser.fullname,
            role: matchedUser.role
        };
        
        // Guardar el usuario logueado
        localStorage.setItem("user", JSON.stringify(sessionUser));

        // Redirección según el rol
        redirectByRole(matchedUser.role);
    } else {
        // Mostrar mensaje de error en pantalla sin usar alert
        errorMessage.textContent = "Credenciales incorrectas";
        errorMessage.style.display = "block"; // Asegura que sea visible si tu CSS lo oculta por defecto
    }
});

// Función encargada de la redirección (con los nombres de tus archivos reales)
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