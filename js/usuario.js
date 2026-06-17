document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("user");

    if (!token || !userRaw) {
        window.location.href = "login.html";
        return;
    }

    let usuario;

    try {
        usuario = JSON.parse(userRaw);
    } catch {
        window.location.href = "login.html";
        return;
    }

    // Validar que realmente sea usuario normal
    if (usuario.role !== "user") {
        window.location.href = "login.html";
        return;
    }

    // Saludo principal
    const saludo = document.getElementById("saludoBienvenida");

    if (saludo) {
        saludo.textContent =
            `¡Bienvenido/a, ${usuario.full_name}!`;
    }

    // Perfil rápido
    const nombre = document.getElementById("perfilRapidoNombre");
    const correo = document.getElementById("perfilRapidoCorreo");
    const rol = document.getElementById("perfilRapidoRol");

    if (nombre) nombre.textContent = usuario.full_name;
    if (correo) correo.textContent = usuario.email;
    if (rol) rol.textContent = usuario.role;
});