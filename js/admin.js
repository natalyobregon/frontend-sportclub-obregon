// 1. Capturar elementos del DOM
const tablaUsuariosBody = document.getElementById("tablaUsuariosBody");
const userForm = document.getElementById("userForm");
const errorDiv = document.querySelector(".mensaje-error");
const exitoDiv = document.querySelector(".mensaje-exito");

// Campos del formulario Crear/Editar
const userIdInput = document.getElementById("userId");
const nombreInput = document.getElementById("adminNombre");
const correoInput = document.getElementById("adminCorreo");
const rolSelect = document.getElementById("adminRol");
const passwordInput = document.getElementById("adminPassword");

// Obtener el token guardado en el Login
const token = localStorage.getItem("token");

// Al cargar la página, verificamos seguridad y listamos los usuarios
document.addEventListener("DOMContentLoaded", () => {
    if (!token) {
        window.location.href = "login.html";
        return;
    }
    listarUsuarios();
});

// --- FUNCIÓN 1: RENDERIZAR TABLA DINÁMICA (GET /api/users) ---
async function listarUsuarios() {
    try {
        const response = await fetch("http://localhost:3000/api/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (response.ok && data.ok === true) {
            tablaUsuariosBody.innerHTML = ""; // Limpiar tabla previa

            data.data.forEach(usuario => {
                const tr = document.createElement("tr");

                // Configurar color de los Badges según el rol (Requisito UI de la rúbrica)
                let badgeClass = "bg-success"; 
                if (usuario.role === "admin") badgeClass = "bg-danger"; 
                if (usuario.role === "coach") badgeClass = "bg-primary"; 

                // Formatear Fecha (DD/MM/AAAA)
                const fechaOriginal = usuario.createdAt || usuario.birth_date || "";
                let fechaFormateada = "No registrada";
                if (fechaOriginal) {
                    const d = new Date(fechaOriginal);
                    if (!isNaN(d.getTime())) {
                        fechaFormateada = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
                    }
                }

                tr.innerHTML = `
                    <td>${usuario.id || usuario._id}</td>
                    <td>${usuario.full_name}</td>
                    <td>${usuario.email}</td>
                    <td><span class="badge ${badgeClass}">${usuario.role}</span></td>
                    <td>${fechaFormateada}</td>
                    <td>
                        <button class="btn btn-warning btn-sm me-1" onclick="cargarUsuarioParaEditar('${usuario.id || usuario._id}')">✏️ Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarUsuario('${usuario.id || usuario._id}')">🗑️ Eliminar</button>
                    </td>
                `;
                tablaUsuariosBody.appendChild(tr);
            });
        } else {
            mostrarMensaje("error", "No se pudo obtener la lista de usuarios.");
        }
    } catch (error) {
        console.error("Error al listar usuarios:", error);
        mostrarMensaje("error", "Error de red al conectar con el servidor.");
    }
}

// --- FUNCIÓN 2: CARGAR DATOS EN EL FORMULARIO PARA EDITAR ---
window.cargarUsuarioParaEditar = async function(id) {
    limpiarEstilos();
    try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok && data.ok === true) {
            const usuario = data.data;
            
            userIdInput.value = usuario.id || usuario._id; 
            nombreInput.value = usuario.full_name;
            correoInput.value = usuario.email;
            rolSelect.value = usuario.role;
            
            document.getElementById("formTitulo").textContent = "Formulario Usuario (Editando ✏️)";
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Sube la pantalla suavemente al formulario
        }
    } catch (error) {
        mostrarMensaje("error", "Error al cargar los detalles del usuario.");
    }
};

// --- FUNCIÓN 3: CREAR O EDITAR USUARIO (POST o PUT) ---
userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    limpiarEstilos();

    const id = userIdInput.value; 
    const full_name = nombreInput.value.trim();
    const email = correoInput.value.trim();
    const role = rolSelect.value;
    const password = passwordInput.value;

    if (!full_name || !email || !role) {
        mostrarMensaje("error", "Por favor completa todos los campos requeridos.");
        if (!full_name) nombreInput.classList.add("is-invalid");
        if (!email) correoInput.classList.add("is-invalid");
        return;
    }

    const url = id ? `http://localhost:3000/api/users/${id}` : `http://localhost:3000/api/users`;
    const metodo = id ? "PUT" : "POST";

    const datosUsuario = { full_name, email, role };
    if (!id) {
        if (!password || password.length < 8) {
            mostrarMensaje("error", "La contraseña es obligatoria y debe tener mínimo 8 caracteres para nuevos usuarios.");
            passwordInput.classList.add("is-invalid");
            return;
        }
        datosUsuario.password = password;
    }

    try {
        const response = await fetch(url, {
            method: metodo,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosUsuario)
        });

        const data = await response.json();

        if (response.ok) {
            mostrarMensaje("exito", id ? "Usuario actualizado con éxito." : "Usuario creado con éxito.");
            userForm.reset();
            userIdInput.value = ""; 
            document.getElementById("formTitulo").textContent = "Formulario Usuario (Crear / Editar)";
            listarUsuarios(); 
        } else {
            mostrarMensaje("error", data.message || "Error al procesar la solicitud.");
        }
    } catch (error) {
        mostrarMensaje("error", "Error en la conexión con el servidor.");
    }
});

// --- FUNCIÓN 4: ELIMINAR USUARIO ---
window.eliminarUsuario = async function(id) {
    limpiarEstilos();
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

    try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.ok) {
            mostrarMensaje("exito", "Usuario eliminado correctamente.");
            listarUsuarios(); 
        } else {
            const data = await response.json();
            mostrarMensaje("error", data.message || "No se pudo eliminar el usuario.");
        }
    } catch (error) {
        mostrarMensaje("error", "Error de red al intentar eliminar.");
    }
};

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
    correoInput.classList.remove("is-invalid");
    passwordInput.classList.remove("is-invalid");
}