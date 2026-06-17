# Documentación de Uso de Inteligencia Artificial

## Herramientas utilizadas

* ChatGPT
* Gemini

## Fecha de desarrollo

Mayo de 2026

## Prompts utilizados

### Prompt 1

 Necesito ayuda paso a paso para desarrollar una página de Login utilizando HTML5 y CSS3 a partir de una plantilla entregada por el profesor, explicando cada parte del proceso.

### Prompt 2

 ¿Cómo puedo estructurar un sistema de alertas visuales integrado en la interfaz para el registro y la recuperación de contraseñas sin usar la función alert() de JavaScript?

### Prompt 3

 Tengo un único archivo CSS para tres dashboards de diferentes roles. ¿Cómo puedo aplicar estilos específicos y colores de identidad para cada perfil usando clases en el body sin afectar el diseño general?

## Resultado obtenido

Las herramientas de inteligencia artificial fueron utilizadas como apoyo durante el desarrollo del proyecto para resolver dudas técnicas y comprender mejor distintos conceptos relacionados con HTML y CSS.

A través de estas consultas se obtuvieron ejemplos de código, recomendaciones para organizar los archivos del proyecto y sugerencias para construir interfaces más ordenadas y fáciles de mantener. También se recibieron orientaciones sobre el uso de Flexbox y Grid para la distribución de elementos, además de propuestas para diferenciar visualmente los distintos perfiles de usuario dentro del sistema.

## Modificaciones realizadas

A partir de las sugerencias entregadas por las herramientas de IA, se realizaron diversas adaptaciones para ajustarlas a los requerimientos específicos del proyecto:

* Se desarrollaron páginas independientes para Login, Registro y Recuperación de Contraseña, manteniendo una estructura organizada y fácil de navegar.
* Se modificó la paleta de colores propuesta inicialmente para utilizar los colores corporativos de SportClub, empleando el morado `#2E1A47` y el amarillo `#F2B705` como colores principales.
* Se incorporaron mensajes visuales de éxito y error dentro de los formularios, evitando el uso de ventanas emergentes y respetando las indicaciones de la pauta de evaluación.
* Se implementó un sistema de estilos basado en clases aplicadas al elemento `body` para diferenciar los dashboards según el rol del usuario, permitiendo reutilizar un único archivo CSS.
* Se ajustaron espacios, tamaños, tipografías y efectos visuales para mejorar la presentación general y lograr una interfaz más atractiva y consistente.

## Justificación del uso de IA

El uso de herramientas de inteligencia artificial tuvo como objetivo apoyar el aprendizaje y facilitar la resolución de problemas específicos durante el desarrollo del proyecto. En ningún momento se utilizó para generar el trabajo completo de forma automática, sino como una fuente de orientación y consulta técnica.

Durante el proceso se solicitaron explicaciones detalladas sobre conceptos, etiquetas y propiedades utilizadas en el código, con el fin de comprender su funcionamiento antes de aplicarlas. Esto permitió reforzar conocimientos relacionados con la maquetación web, la organización de estilos y la construcción de interfaces de usuario.

Las decisiones finales respecto a la estructura del sistema, la organización de las páginas, el diseño visual y la implementación de las funcionalidades fueron tomadas personalmente, utilizando las recomendaciones de la IA como apoyo para mejorar la calidad del desarrollo.

En conclusión, la inteligencia artificial fue utilizada como una herramienta de acompañamiento y aprendizaje, contribuyendo a resolver dudas, comprender mejores prácticas y optimizar el proceso de desarrollo sin reemplazar el trabajo ni la toma de decisiones del estudiante.

## Prompts Adicionales Utilizados

### Gestión de Usuarios (Administrador)

Prompt:
"Necesito implementar un módulo CRUD de usuarios para un dashboard de administrador utilizando JavaScript y consumo de API REST, incluyendo listar, crear, editar y eliminar usuarios."

Uso:
- Desarrollo del archivo admin.js.
- Implementación de formularios de creación y edición.
- Consumo de endpoints GET, POST, PUT y DELETE.
- Validaciones de formularios y manejo de mensajes de éxito/error.

### Perfil de Usuario

Prompt:
"¿Cómo puedo desarrollar una página de perfil que permita visualizar y actualizar los datos del usuario autenticado utilizando localStorage, JavaScript y una API REST?"

Uso:
- Desarrollo de perfil.html.
- Implementación de carga de datos desde /api/auth/me.
- Actualización de nombre y fecha de nacimiento.
- Sincronización de datos actualizados en localStorage.

---

### Cambio de Contraseña

Prompt:
"Necesito implementar un formulario para cambio de contraseña conectado a una API REST, validando contraseña actual, nueva contraseña y confirmación."

Uso:
- Desarrollo del formulario de seguridad en perfil.html.
- Validaciones frontend.
- Consumo del endpoint PUT /api/auth/me/password.
- Manejo de errores devueltos por la API.

### Gestión de Roles y Navegación

Prompt:
"¿Cómo puedo redirigir dinámicamente a diferentes dashboards según el rol del usuario almacenado en localStorage?"

Uso:
- Redirección entre Dashboard Administrador.
- Dashboard Coach.
- Dashboard Usuario.
- Configuración dinámica del botón Inicio en perfil.html.

### Depuración y Corrección de Errores

Prompt:
"Ayúdame a identificar y corregir errores de JavaScript relacionados con fetch, localStorage, validaciones y consumo de API REST."

Uso:
- Corrección de errores de variables no definidas.
- Corrección de payloads enviados al backend.
- Resolución de errores HTTP 400.
- Corrección de validaciones y sincronización de datos.