# SportClub - Sistema de Gestión Deportiva

Este proyecto es una plataforma web para la gestión de un club deportivo. Cuenta con un sistema de maquetación para el acceso de usuarios y tres paneles de control (dashboards) completamente independientes y diferenciados visualmente según el rol del perfil.


## Características Principales

- **Módulo de Acceso:** Maquetación completa de pantallas individuales para el Login, el Registro de nuevos usuarios y la Recuperación de Contraseña.

- **Alertas Integradas en la Interfaz:** El sistema de diseño para el registro y la recuperación ya cuenta con las cajas de mensajes de éxito o error incorporadas directamente en el flujo del HTML (mediante bloques de color verde y rojo), cumpliendo con la restricción de diseño de no utilizar ventanas de alerta flotantes.

- **Diferenciación por Roles (Estructura CSS):** El diseño del sitio adapta sus colores principales, bordes y elementos de forma automática según la clase del perfil que se visualice, permitiendo una separación de identidad limpia:
  - **Usuario General:** Interfaz basada en tonos Azules.
  - **Coach / Entrenador:** Interfaz basada en tonos Verdes.
  - **Administrador:** Interfaz basada en tonos Rojos.

- **Paneles de Control:** Estructuración de tarjetas de bienvenida, listas de reservas de clases, grillas de disciplinas disponibles y secciones de perfil rápido.


## Tecnologías Utilizadas

- **HTML5:** Estructuración semántica de las páginas, menús de navegación, contenedores de información y formularios de datos.

- **CSS3:** Maquetación completa y diseño adaptativo mediante Flexbox y Grid Layout, transiciones visuales en botones y enlaces (`hover`, `transform`), y personalización de estilos por roles mediante herencia de clases aplicadas en la etiqueta `<body>`.


## Estructura de Carpetas

El proyecto está organizado de la siguiente manera:

- `/assets/img/`: Contiene los logotipos e imágenes del gimnasio.
- `/css/`: Contiene las hojas de estilo unificadas (`style.css`, `style_registro.css`, `style_dashboard.css`).
- `/pages/`: Aloja las vistas secundarias del sistema (`login.html`, `registro.html`, `recuperar.html` y los tres dashboards).
- `index.html`: Página de inicio y bienvenida principal de la plataforma.

## Flujo de Navegación y Revisión

Para evaluar correctamente el cumplimiento de la pauta, se recomienda seguir este flujo de navegación:

1. **Punto de Entrada:** El proyecto inicia en el archivo `index.html` ubicado en la raíz del repositorio.

2. **Acceso a Módulos:** Desde el menú superior, diríjase a "Iniciar Sesión" para revisar la consistencia visual del Formulario de Login, el Formulario de Registro y la Vista de Recuperación de Contraseña (con sus respectivas alertas integradas).

3. **Verificación de Roles (CSS descendente):** Dentro de la carpeta `/pages/`, se pueden inspeccionar los tres dashboards independientes donde se aplica la herencia de estilos según la clase del `<body>`:
   - `dashboard_usuario.html` (Identidad Azul)
   - `dashboard_coach.html` (Identidad Verde)
   - `dashboard_admin.html` (Identidad Roja)