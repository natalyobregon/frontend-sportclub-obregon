document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("user");

    // Si por alguna razón falta información, forzar redirección al login
    if (!token || !userRaw) {
        window.location.href = "login.html";
        return;
    }

    // Convertir el string de localStorage a objeto JavaScript
    const usuarioObjeto = JSON.parse(userRaw);

    // Seleccionar la etiqueta del saludo e inyectar el nombre real devuelto por la API
    const saludoCoach = document.getElementById("saludoCoach");
    if (saludoCoach && usuarioObjeto.full_name) {
        saludoCoach.textContent = `¡Bienvenido/a, Coach ${usuarioObjeto.full_name || "Entrenador"}!`;
    }
});

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();

        localStorage.clear();

        window.location.href = "login.html";
    });
}