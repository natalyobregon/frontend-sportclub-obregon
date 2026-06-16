const perfilForm = document.getElementById("perfilForm");
const passwordForm = document.getElementById("passwordForm");

const nombreInput = document.getElementById("nombre");
const correoInput = document.getElementById("correo"); 
const rolInput = document.getElementById("rol");       
const fechaInput = document.getElementById("fecha_nacimiento");

const actualPasswordInput = document.getElementById("password_actual");
const nuevaPasswordInput = document.getElementById("password_nueva");
const confirmarPasswordInput = document.getElementById("password_confirmar");

const errorDiv = document.querySelector(".mensaje-error");
const exitoDiv = document.querySelector(".mensaje-exito");

const token = localStorage.getItem("token");

// Validación inicial y redirección dinámica del botón inicio
document.addEventListener("DOMContentLoaded", () => {
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // CORRECCIÓN: Configurar dinámicamente el destino del botón "Inicio" según el rol guardado en la sesión
    const userRaw = localStorage.getItem("user");
    const btnInicio = document.getElementById("btnInicio");

    if (userRaw && btnInicio) {
        const usuarioSesion = JSON.parse(userRaw);
        
        if (usuarioSesion.role === "admin") {
            btnInicio.href = "dashboard_admin.html";
        } else if (usuarioSesion.role === "coach") {
            btnInicio.href = "dashboard_coach.html";
        } else {
            btnInicio.href = "dashboard_usuario.html";
        }
    }

    cargarDatosPerfil();
});

// Cargar datos del perfil logueado
async function cargarDatosPerfil() {
    try {
        const response = await fetch("http://localhost:3000/api/auth/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (response.ok && data.ok === true) {
            const usuario = data.data;
            nombreInput.value = usuario.full_name;
            correoInput.value = usuario.email;
            rolInput.value = usuario.role;

            if (usuario.birth_date) {
                const fechaLimpia = usuario.birth_date.split("T")[0]; 
                fechaInput.value = fechaLimpia;
            }
        } else {
            mostrarMensaje("error", "No se pudieron cargar los datos del perfil.");
        }
    } catch (error) {
        console.error("Error al cargar perfil:", error);
        mostrarMensaje("error", "Error de conexión con el servidor.");
    }
}

// Editar Perfil
perfilForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    limpiarEstilos();

    const fullName = nombreInput.value.trim();
    const birthDate = fechaInput.value;

    if (!fullName) {
        mostrarMensaje("error", "El nombre completo es obligatorio.");
        nombreInput.classList.add("is-invalid");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/auth/me", {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ full_name: fullName, birth_date: birthDate })
        });

        const data = await response.json();

        if (response.ok) {

            const userGuardado = JSON.parse(localStorage.getItem("user"));

            if (userGuardado) {
                userGuardado.full_name = fullName;
                localStorage.setItem("user", JSON.stringify(userGuardado));
            }

            mostrarMensaje("exito", data.message || "Perfil actualizado correctamente.");

        } else {
            mostrarMensaje("error", data.message || "Error al actualizar el perfil.");
        }
    } catch (error) {
        mostrarMensaje("error", "Fallo en la comunicación con el servidor.");
    }
});

// Cambiar Contraseña
passwordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    limpiarEstilos();

    const currentPassword = actualPasswordInput.value;
    const newPassword = nuevaPasswordInput.value;
    const confirmPassword = confirmarPasswordInput.value;

    if (!currentPassword || !newPassword || !confirmPassword) {
        mostrarMensaje("error", "Todos los campos de contraseña son obligatorios.");
        if (!currentPassword) actualPasswordInput.classList.add("is-invalid");
        if (!newPassword) nuevaPasswordInput.classList.add("is-invalid");
        if (!confirmPassword) confirmarPasswordInput.classList.add("is-invalid");
        return;
    }

    if (newPassword.length < 8) {
        mostrarMensaje("error", "La nueva contraseña debe tener al menos 8 caracteres.");
        nuevaPasswordInput.classList.add("is-invalid");
        return;
    }

    if (newPassword !== confirmPassword) {
        mostrarMensaje("error", "La nueva contraseña y la confirmación no coinciden.");
        confirmarPasswordInput.classList.add("is-invalid");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/auth/me/password", {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ current_password: currentPassword, new_password: newPassword })
        });

        const data = await response.json();

        if (response.ok) {
            mostrarMensaje("exito", data.message || "Contraseña actualizada con éxito.");
            passwordForm.reset();
        } else {
            mostrarMensaje("error", data.message || "Error al cambiar la contraseña.");
            actualPasswordInput.classList.add("is-invalid");
        }
    } catch (error) {
        mostrarMensaje("error", "Error de red al intentar cambiar la contraseña.");
    }
});

function mostrarMensaje(tipo, mensaje) {
    if (tipo === "error") {
        errorDiv.textContent = mensaje;
        errorDiv.style.display = "block";
    } else {
        exitoDiv.textContent = mensaje;
        exitoDiv.style.display = "block";
    }
}

function limpiarEstilos() {
    errorDiv.style.display = "none";
    exitoDiv.style.display = "none";
    nombreInput.classList.remove("is-invalid");
    actualPasswordInput.classList.remove("is-invalid");
    nuevaPasswordInput.classList.remove("is-invalid");
    confirmarPasswordInput.classList.remove("is-invalid");
}