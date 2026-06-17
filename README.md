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

## Funcionalidades Implementadas

### Sistema de Autenticación

El sistema incorpora integración con API REST para la gestión de autenticación de usuarios.

Funcionalidades:

* Registro de usuarios mediante formulario validado.
* Inicio de sesión conectado al backend.
* Recuperación de contraseña.
* Gestión de sesión mediante LocalStorage.
* Protección de rutas según autenticación.
* Redirección automática según el rol del usuario.

### Gestión de Roles

El sistema contempla tres perfiles distintos:

#### Usuario

* Acceso a Dashboard Usuario.
* Visualización de reservas.
* Visualización de clases disponibles.
* Gestión de perfil personal.
* Cambio de contraseña.

#### Coach

* Acceso a Dashboard Coach.
* Visualización de alumnos asignados.
* Visualización de clases asignadas.
* Gestión de perfil personal.
* Cambio de contraseña.

#### Administrador

* Acceso a Dashboard Administrador.
* Gestión completa de usuarios.
* Creación de usuarios.
* Edición de usuarios.
* Eliminación de usuarios.
* Consulta de listado general.
* Gestión de perfil personal.
* Cambio de contraseña.

## Gestión de Perfil

Se implementó un módulo de perfil común para todos los roles.

Características:

* Consulta de datos personales desde la API.
* Actualización de nombre completo.
* Actualización de fecha de nacimiento.
* Sincronización de información almacenada en LocalStorage.
* Navegación dinámica al dashboard correspondiente según el rol.

## Cambio de Contraseña

El sistema incorpora una sección de seguridad que permite:

* Validar contraseña actual.
* Ingresar nueva contraseña.
* Confirmar nueva contraseña.
* Enviar actualización mediante API REST.
* Mostrar mensajes de éxito o error directamente en la interfaz.

## Validaciones Implementadas

### Frontend (JavaScript)

* Campos obligatorios.
* Formato válido de correo electrónico.
* Contraseña mínima de 8 caracteres.
* Confirmación de contraseña.
* Control de formularios vacíos.
* Manejo visual de errores mediante clases CSS.

### Backend (API)

* Verificación de credenciales.
* Validación de token JWT.
* Control de permisos según rol.
* Validación de payloads enviados desde el frontend.

## Tecnologías Utilizadas

Además de HTML5 y CSS3, se utilizaron:

* JavaScript ES6+
* Fetch API
* LocalStorage
* Bootstrap 5
* API REST
* JSON
* JWT (autenticación mediante token)

## Funcionalidades CRUD Administrador

El panel de administración permite realizar operaciones CRUD sobre los usuarios registrados:

* CREATE → Crear usuarios.
* READ → Listar usuarios.
* UPDATE → Editar usuarios.
* DELETE → Eliminar usuarios.

Todas las operaciones se realizan mediante consumo de servicios REST protegidos por autenticación.

## Consideraciones para la Evaluación

Para una correcta evaluación se debe:

1. Levantar el backend en localhost:3000.
2. Levantar el frontend mediante Live Server o servidor local.
3. Iniciar sesión con un usuario válido.
4. Verificar redirección automática según rol.
5. Probar edición de perfil.
6. Probar cambio de contraseña.
7. Probar funcionalidades CRUD del administrador.

El proyecto fue desarrollado utilizando una arquitectura Frontend + Backend desacoplada mediante consumo de API REST.
