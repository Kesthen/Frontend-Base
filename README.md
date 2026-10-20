# OllaCercana — Arquitectura y diseño del frontend

> Documento de arquitectura y diseño del frontend. Describe la rama `develop` y distingue la implementación disponible de la integración planificada con el backend.

| Dato | Valor |
|---|---|
| Proyecto | OllaCercana |
| Rama documentada | `develop` |
| Épica | `EPIC-01: OllaCercana` |
| Versión del documento | 1.1 |
| Última revisión | 20 de octubre de 2026 |
| Prototipo | [Abrir prototipo](https://ollacercana.netlify.app/) · [Ver/guardar QR en PNG](https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=https%3A%2F%2Follacercana.netlify.app%2F) |
| Material de documentación | [`repo-front`](https://github.com/JulianMorales2003/repo-front): flujos de pantallas (`docs/flujo`), capturas (`docs/pantallas`) y manual de identidad (`docs/identidad`) |

## Contenido

- [Prototipo y código QR](#prototipo-y-código-qr)
- [1. Introducción](#1-introducción)
- [2. Alcance y tecnologías](#2-alcance-y-tecnologías)
  - [2.1 Tecnologías implementadas en `develop`](#21-tecnologías-implementadas-en-develop)
  - [2.2 Ejecución local](#22-ejecución-local)
- [3. Roles y permisos](#3-roles-y-permisos)
- [4. Navegación y flujo de pantallas](#4-navegación-y-flujo-de-pantallas)
  - [4.1 Modelo de flujo de pantallas](#41-modelo-de-flujo-de-pantallas)
  - [4.2 Flujo del visitante (sin sesión)](#42-flujo-del-visitante-sin-sesión)
  - [4.3 Flujo del comprador](#43-flujo-del-comprador)
  - [4.4 Flujo de la cocinera](#44-flujo-de-la-cocinera)
  - [4.5 Flujo del administrador](#45-flujo-del-administrador)
  - [4.6 Redirecciones de seguridad](#46-redirecciones-de-seguridad)
  - [4.7 Recorrido visual: pantallas por funcionalidad](#47-recorrido-visual-pantallas-por-funcionalidad)
- [5. Funcionalidades](#5-funcionalidades)
  - [5.1 Estados de dominio de referencia](#51-estados-de-dominio-de-referencia)
- [6. Modelos de referencia](#6-modelos-de-referencia)
- [7. Identidad visual](#7-identidad-visual)
  - [7.1 Marca y voz](#71-marca-y-voz)
  - [7.2 Logo](#72-logo)
  - [7.3 Paleta de colores](#73-paleta-de-colores)
  - [7.4 Tipografía](#74-tipografía)
  - [7.5 Iconografía](#75-iconografía)
  - [7.6 Componentes de interfaz](#76-componentes-de-interfaz)
  - [7.7 Fotografía y personaje](#77-fotografía-y-personaje)
- [8. Estructura y conexión planificada con backend](#8-estructura-y-conexión-planificada-con-backend)
  - [8.1 Estructura actual](#81-estructura-actual)
  - [8.2 Integración propuesta](#82-integración-propuesta)
  - [8.3 Estructura del repositorio de documentación](#83-estructura-del-repositorio-de-documentación)
- [9. Referencias y materiales](#9-referencias-y-materiales)
- [10. Historial de revisión](#10-historial-de-revisión)

## Prototipo y código QR

Abrir el [prototipo de OllaCercana](https://ollacercana.netlify.app/) o escanear el código con la cámara del celular. El PNG se genera a partir del mismo enlace y se puede abrir o guardar desde [este enlace](https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=https%3A%2F%2Follacercana.netlify.app%2F).

![Código QR del prototipo OllaCercana](https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=https%3A%2F%2Follacercana.netlify.app%2F)

## 1. Introducción

OllaCercana conecta a cocineras de un conjunto residencial con vecinos que buscan comida casera cercana. El frontend permite explorar platos y cocinas, crear una cuenta, solicitar porciones y coordinar la entrega. La interfaz también ofrece herramientas para que las cocineras administren publicaciones y reservas, y para que administración modere reportes.

Este repositorio es el frontend funcional de demostración. Las pantallas y flujos están implementados en Next.js; la persistencia actual usa `localStorage` y datos de demostración. No se debe interpretar como integración activa con el backend: esta conexión queda planificada y se describe en la sección 9.

Este documento incorpora además el material de documentación del repositorio [`repo-front`](https://github.com/JulianMorales2003/repo-front): el modelo de flujo de pantallas por rol (sección 4), las pantallas explicadas por funcionalidad con sus capturas (sección 4.7) y el resumen del manual de identidad (sección 7). Ese repositorio contiene únicamente documentación; no incluye código.

## 2. Alcance y tecnologías

### 2.1 Tecnologías implementadas en `develop`

| Área | Tecnología | Uso |
|---|---|---|
| Framework y enrutamiento | Next.js 16, App Router | Rutas de `app/` y renderizado de la aplicación. |
| Interfaz | React 19 | Componentes y estado de las pantallas. |
| Lenguaje | TypeScript 5 | Tipado de componentes y modelos del frontend. |
| Estilos | Tailwind CSS 4 y CSS global | Diseño adaptable, temas y estilos de marca. |
| Animación | Framer Motion | Transiciones y elementos animados. |
| Iconos | Lucide React | Iconografía de interfaz. |
| Persistencia de demostración | `localStorage` | Datos locales del navegador; no sincroniza usuarios o dispositivos. |
| Calidad | ESLint 9 | Reglas estáticas del proyecto. |

La tarea menciona React, Vite, React Router y Axios como tecnologías planeadas. **No corresponden al stack actual de esta rama**: el proyecto ya usa Next.js con App Router. No se propone migrar a Vite ni instalar un segundo router. Para la conexión HTTP futura puede adoptarse Axios o `fetch`; la decisión debe acordarse con el equipo backend antes de implementar el cliente.

### 2.2 Ejecución local

Requisitos: Node.js 20 o superior y npm.

```bash
npm install
npm run dev
```

Abrir <http://localhost:3000>. Comandos disponibles: `npm run dev`, `npm run build`, `npm run start` y `npm run lint`.

## 3. Roles y permisos

La matriz resume las pantallas implementadas y el acceso previsto por rol. Las rutas y roles deben conservar los mismos identificadores del contrato backend: `comprador`, `cocinera` y `admin`.

| Pantalla / capacidad | Visitante | Comprador | Cocinera | Admin |
|---|:---:|:---:|:---:|:---:|
| Portada y ayuda | Ver | Ver | Ver | Ver |
| Menú `/menu` | Explorar | Explorar y reservar | Explorar | Explorar |
| Mapa `/cocineras-cercanas` | Ver | Ver | Ver | Ver |
| Directorio y perfil público `/cocineras` | Ver | Ver | Ver | Ver |
| Registro e inicio `/cuenta`, `/cuenta/registro` | Usar | Usar | Usar | Usar |
| Pedido `/pedido` | Requiere sesión | Crear solicitud | — | — |
| Reservas y chats `/cuenta/reservas`, `/cuenta/chats` | — | Consultar y conversar | Consultar solicitudes propias y conversar | — |
| Cocina `/cuenta/cocina` | — | — | Gestionar platos y solicitudes propias | — |
| Perfil y ajustes `/cuenta/perfil`, `/cuenta/ajustes` | — | Gestionar perfil | Gestionar perfil de cocina | Gestionar perfil |
| Avisos `/cuenta/avisos` | — | Consultar | Consultar | Consultar |
| Vecino Fiel `/vecino-fiel` | — | Consultar progreso | — | — |
| Moderación `/cuenta/admin` | — | — | — | Revisar reportes |
| Acceso denegado y sesión expirada | Ver estado | Ver estado | Ver estado | Ver estado |

La tabla describe la experiencia del frontend. En producción, el backend debe validar cada permiso en cada operación; ocultar una ruta o botón en el navegador no constituye control de acceso. Las redirecciones de seguridad por sesión y por rol se detallan en la sección 4.6.

## 4. Navegación y flujo de pantallas

### 4.1 Modelo de flujo de pantallas

El visitante entra por **Inicio** (portada → animación → cocina de la abuelita → *ending page*), explora el **Menú** o el **Mapa de cocineras** sin sesión y, al intentar añadir o reservar, se le pide **iniciar sesión o registrarse**. Según su rol, aterriza en el **Menú** (comprador), el **Modo Cocinera** (cocinera) o el **Panel de comunidad** (administrador). El comprador envía su pedido desde **Confirmar pedido** y lo sigue en **Mis pedidos**; la cocinera gestiona las solicitudes en **Modo Cocinera**. Si la sesión vence o el rol no corresponde, se muestran **Sesión expirada** o **Acceso denegado**, que llevan de nuevo al inicio de sesión.

**Recorrido principal:** el visitante entra por la portada y puede descubrir el menú, el mapa o el directorio público. Para enviar una reserva debe iniciar sesión o registrarse. El comprador revisa sus reservas y coordina la recogida por chat. La cocinera atiende las solicitudes desde su panel; puede aceptarlas o rechazarlas y actualizar el estado de entrega. Administración revisa reportes de la comunidad. Si una reserva queda pendiente más de 10 minutos, expira. La dirección exacta de la cocinera no se expone antes de confirmar la reserva.

El flujo se documenta en cuatro diagramas, uno por rol (ticket **OC-314**), que muestran las rutas, los modales, los guards de acceso, los errores y los estados vacíos de cada pantalla:

| Flujo | Cómo se entra | Pantalla de inicio | Condición de acceso |
|---|---|---|---|
| [Visitante](#42-flujo-del-visitante-sin-sesión) | Sin sesión | `/` (Portada) | Rutas públicas; `/pedido` y `/cuenta/*` piden cuenta o sesión |
| [Comprador](#43-flujo-del-comprador) | Inicio de sesión o registro con rol Comprador | `/menu` | `/pedido` y `/cuenta/reservas` exigen sesión + rol comprador |
| [Cocinera](#44-flujo-de-la-cocinera) | Inicio de sesión o registro con rol Cocinera | `/cuenta/cocina` | Esa ruta exige sesión + rol cocinera |
| [Administrador](#45-flujo-del-administrador) | Perfil «Admin» en el inicio de sesión (no hay registro de admin) | `/cuenta/admin` | Esa ruta exige sesión + rol admin |

**Cómo leer los diagramas**

| Elemento | Significado |
|---|---|
| Nodo gris | Entrada al sitio (Portada) |
| Nodo azul | Pantalla / ruta |
| Nodo morado | Modal |
| Nodo ámbar | Guard (ruta que exige sesión y/o rol) |
| Nodo rojo | Redirección de error (Sesión expirada, Acceso denegado, 404) |
| Nodo verde | Éxito |
| Recuadros dentro del nodo | **Errores** y **Estados vacíos** de la pantalla, junto con sus acciones y modales |
| Flecha gris continua | Navegación |
| Flecha verde | Éxito |
| Flecha morada de puntos (· · ·) | Abre un modal |
| Flecha roja discontinua (- - -) | Bloqueo / redirección |

Cada diagrama se acompaña de la transcripción de sus pantallas y transiciones, para poder leerlos y buscarlos como texto.

### 4.2 Flujo del visitante (sin sesión)

[![Flujo de pantallas · Visitante (sin sesión)](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/flujo/01-visitante.png)](https://github.com/JulianMorales2003/repo-front/blob/main/docs/flujo/01-visitante.svg)

*OllaCercana · OC-314 · rutas públicas, acciones que piden cuenta y paso a login/registro.* Clic en la imagen para abrir el diagrama vectorial (SVG) a tamaño completo · [PNG de alta resolución](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/flujo/01-visitante.png).

Sin sesión se puede recorrer todo lo público: portada, Libretón, mapa de cocinas cercanas, directorio y perfil de cocineras, Vecino Fiel y ayuda. Añadir o reservar un plato abre un aviso para iniciar sesión o crear cuenta, `/pedido` exige sesión y rol comprador, y las rutas de `/cuenta/*` sin sesión llevan a *Sesión expirada*.

**Pantallas del flujo**

**1 · Acceso**

| Pantalla | Contenido | Acciones y modales | Errores y estados vacíos |
|---|---|---|---|
| **Portada**<br>`/`<br>_Entrada_ | • Entrada del sitio<br>• Botón «Mi cuenta» | — | — |
| **Iniciar sesión**<br>`/cuenta`<br>_Pantalla / ruta_ | • Identificador (correo o celular) + contraseña<br>• Perfil de ingreso: Comprador · Cocinera · Admin<br>• Recordarme · enlace «Olvidé mi contraseña»<br>• Con sesión activa redirige al inicio del rol | — | **Errores**<br>• Campos vacíos<br>• Correo inválido o celular que no tiene 10 dígitos (inicia en 3)<br>• El usuario no existe<br>• La contraseña no coincide |
| **Ayuda**<br>`/ayuda`<br>_Pantalla / ruta_ | • Preguntas frecuentes<br>• Recuperación automática de contraseña: aún no habilitada | — | — |
| **Registro**<br>`/cuenta/registro`<br>_Pantalla / ruta_ | • Nombre · correo · celular · contraseña<br>• Rol: Comprador o Cocinera · aceptar términos | — | **Errores**<br>• Nombre obligatorio<br>• Correo inválido o ya registrado (409)<br>• Celular inválido o ya registrado (409)<br>• Contraseña sin mayúscula, minúscula o número<br>• Contraseñas distintas · términos sin aceptar |

**2 · Pantallas públicas**

| Pantalla | Contenido | Acciones y modales | Errores y estados vacíos |
|---|---|---|---|
| **Libretón (menú)**<br>`/menu`<br>_Pantalla / ruta_ | • Antojo del día · recetario · buscador<br>• Filtros: categoría, dieta, distancia<br>• Se puede explorar sin sesión | **Acciones**<br>• Añadir / Reservar → pide iniciar sesión<br>**Modales**<br>• Aviso «inicia sesión»: Iniciar sesión · Crear cuenta | **Estados vacíos**<br>• «No encontramos platos con esa búsqueda.»<br>• «Tu pedido está vacío.» |
| **Cocinas cercanas**<br>`/cocineras-cercanas`<br>_Pantalla / ruta_ | • Mapa ilustrado de cocineras<br>• Filtros: 500 m · 1 km · 1.5 km · 2 km · abiertas ahora | — | **Estados vacíos**<br>• «No encontramos fogones con ese filtro» |
| **Nuestras cocineras**<br>`/cocineras`<br>_Pantalla / ruta_ | • Listado de cocineras del barrio | — | **Estados vacíos**<br>• «Todavía no encontramos…» |
| **Perfil de cocinera**<br>`/cocineras/[id]`<br>_Pantalla / ruta_ | • Platos publicados de la cocinera | — | **Errores**<br>• «No encontramos este perfil» |
| **Vecino Fiel**<br>`/vecino-fiel`<br>_Pantalla / ruta_ | • Insignias y retos comunitarios | — | — |
| **Página no encontrada**<br>`404`<br>_Redirección de error_ | • Enlaces a Inicio · Menú · Cocinas cercanas | — | — |

**3 · Rutas protegidas**

| Pantalla | Contenido | Acciones y modales | Errores y estados vacíos |
|---|---|---|---|
| **Confirmar pedido**<br>`/pedido`<br>_Guard_ | • Exige sesión y rol comprador | — | — |
| **Sesión expirada**<br>`/cuenta/sesion-expirada`<br>_Redirección de error_ | • Al abrir /cuenta/perfil, /avisos, /reservas, /cocina o /admin sin sesión | **Acciones**<br>• Iniciar sesión → /cuenta<br>• Volver al menú → /menu | — |

**Transiciones**

| Desde | Acción / condición | Hacia | Tipo |
|---|---|---|---|
| Portada | Mi cuenta | → Iniciar sesión | Navegación |
| Portada | ¿Cómo hago un pedido? | → Ayuda | Navegación |
| Portada | Recetas | → Libretón (menú) | Navegación |
| Portada | Mapa | → Cocinas cercanas | Navegación |
| Portada | Cocineras | → Nuestras cocineras | Navegación |
| Iniciar sesión | ¿No tienes cuenta? / ¿Ya tienes cuenta? | ↔ Registro | Navegación |
| Iniciar sesión | ¿Olvidaste tu contraseña? | → Ayuda | Navegación |
| Iniciar sesión | éxito · perfil según perfil | → Libretón (menú) | Éxito |
| Registro | éxito · rol según perfil | → Libretón (menú) | Éxito |
| Ayuda | Crear cuenta | → Registro | Navegación |
| Libretón (menú) | Iniciar sesión | → Iniciar sesión | Abre modal |
| Libretón (menú) | Crear cuenta | → Registro | Abre modal |
| Libretón (menú) | Cocinas cercanas | → Cocinas cercanas | Navegación |
| Libretón (menú) | Nuestras cocineras | → Nuestras cocineras | Navegación |
| Cocinas cercanas | Explorar el Libretón | → Libretón (menú) | Navegación |
| Nuestras cocineras | Ver cocinera | → Perfil de cocinera | Navegación |
| Perfil de cocinera | Ver platos | → Libretón (menú) | Navegación |
| Vecino Fiel | Ver platos | → Libretón (menú) | Navegación |
| Confirmar pedido | redirige a /cuenta | → Iniciar sesión | Bloqueo / redirección |
| Sesión expirada | Iniciar sesión | → Iniciar sesión | Navegación |

### 4.3 Flujo del comprador

[![Flujo de pantallas · Comprador](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/flujo/02-comprador.png)](https://github.com/JulianMorales2003/repo-front/blob/main/docs/flujo/02-comprador.svg)

*OllaCercana · OC-314 · inicio en /menu · /pedido y /cuenta/reservas exigen sesión + rol comprador.* Clic en la imagen para abrir el diagrama vectorial (SVG) a tamaño completo · [PNG de alta resolución](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/flujo/02-comprador.png).

El comprador inicia en `/menu`. Desde allí explora cocinas y cocineras, reserva (`/pedido`), sigue sus pedidos (`/cuenta/reservas`) y gestiona perfil, avisos y ajustes desde el menú lateral. `/pedido` y `/cuenta/reservas` exigen sesión y rol comprador.

> Las pantallas de **Acceso** (Portada, Iniciar sesión, Registro y Ayuda) son las mismas del flujo del visitante (sección 4.2).

**Pantallas del flujo**

**2 · Explorar y pedir**

| Pantalla | Contenido | Acciones y modales | Errores y estados vacíos |
|---|---|---|---|
| **Libretón (menú)**<br>`/menu`<br>_Pantalla / ruta_ | • Antojo del día · recetario · buscador<br>• Filtros: categoría, dieta, distancia<br>• Carrito «Tu pedido» | **Acciones**<br>• Añadir al pedido<br>• Reservar / ¡A comer! → /pedido<br>• Barra: Cocinas cercanas · Nuestras cocineras · Mis pedidos · Ajustes · Perfil<br>**Modales**<br>• Reportar plato: motivo, explicación ≥ 10 caracteres, evidencia < 900 KB<br>• Ver reputación de la cocinera | **Estados vacíos**<br>• «No encontramos platos con esa búsqueda.»<br>• «Tu pedido está vacío.» |
| **Exploración pública**<br>`/cocineras-cercanas`<br>_Pantalla / ruta_ | • Mapa de cocineras cercanas<br>• También: /cocineras y /cocineras/[id] | — | **Errores**<br>• Perfil inexistente: «No encontramos este perfil»<br>**Estados vacíos**<br>• Mapa: «No encontramos fogones con ese filtro»<br>• Listado: «Todavía no encontramos…» |
| **Confirmar pedido**<br>`/pedido`<br>_Pantalla / ruta_ | • Método de pago: Nequi · Llaves · Efectivo<br>• Hora de recogida | **Acciones**<br>• Enviar solicitud | **Errores**<br>• Celular sin verificar → ir al perfil<br>• Sin porciones suficientes del plato<br>• No se pudo guardar la solicitud<br>• No se pudo leer el pedido guardado<br>**Estados vacíos**<br>• Pedido vacío → «Explorar platos» |
| **Solicitud enviada**<br>_Éxito_ | • La reserva queda pendiente y vence a los 10 min | **Acciones**<br>• Ver mis pedidos → /cuenta/reservas<br>• Volver al Libretón → /menu | — |

**3 · Mi cuenta · navegación con menú lateral (Perfil · Mis pedidos · Avisos · Ajustes · Ver platos · Cerrar sesión)**

| Pantalla | Contenido | Acciones y modales | Errores y estados vacíos |
|---|---|---|---|
| **Mis pedidos**<br>`/cuenta/reservas`<br>_Pantalla / ruta_ | • Pestañas: Activas · Historial<br>• Avance: enviada → cocinera confirma → pago → entrega → recibido<br>• Rechazado: muestra el motivo · /cuenta/chats redirige aquí | **Acciones**<br>• Adjuntar comprobante (pago distinto de efectivo)<br>• Marcar recibido y cerrar chat (con comprobante o efectivo)<br>• Chat con la cocinera · Calificar · Volver a pedir | **Errores**<br>• Comprobante: sin archivo, PDF > 350 KB, imagen > 8 MB<br>• Comprobante: imagen ilegible o no se pudo guardar<br>**Estados vacíos**<br>• «No tienes pedidos activos»<br>• «Tu historial está vacío» → Explorar platos |
| **Perfil**<br>`/cuenta/perfil`<br>_Pantalla / ruta_ | • Datos personales y teléfono<br>• Insignia Vecino Fiel → /vecino-fiel | **Acciones**<br>• Guardar perfil<br>• Cambiar teléfono → verificación<br>**Modales**<br>• Verificación OTP (6 dígitos, 5 min) | **Errores**<br>• «Ingresa el código completo de 6 dígitos.»<br>• «Código incorrecto o expirado.» |
| **Ajustes**<br>`/cuenta/ajustes`<br>_Pantalla / ruta_ | • Preferencias y notificaciones<br>• Se guardan automáticamente | — | — |
| **Avisos**<br>`/cuenta/avisos`<br>_Pantalla / ruta_ | • Notificaciones de estado de los pedidos | **Acciones**<br>• Marcar todas como leídas<br>• Leído (por aviso) | **Estados vacíos**<br>• «Todo tranquilo por aquí» |

**Modales de pedido**

| Pantalla | Contenido | Acciones y modales | Errores y estados vacíos |
|---|---|---|---|
| **Chat con la cocinera**<br>_Modal_ | • Conversación por pedido<br>• Al cerrar el pedido abre la calificación | — | — |
| **Calificar intercambio**<br>_Modal_ | • Estrellas + comentario (máx. 400) | **Acciones**<br>• Enviar · Ahora no | **Errores**<br>• «Debe seleccionar al menos una estrella»<br>• «Por favor escribir un comentario» |

**Redirecciones de seguridad**

| Pantalla | Contenido | Acciones y modales | Errores y estados vacíos |
|---|---|---|---|
| **Sesión expirada**<br>`/cuenta/sesion-expirada`<br>_Redirección de error_ | • «La sesión se enfrió»<br>• Aplica también a /cuenta/perfil y /cuenta/avisos (solo piden sesión) | **Acciones**<br>• Iniciar sesión → /cuenta<br>• Volver al menú → /menu | — |
| **Acceso denegado**<br>`/cuenta/acceso-denegado`<br>_Redirección de error_ | • «Esta puerta no es para tu rol»<br>• Se muestra cuando el rol no es comprador | **Acciones**<br>• Cambiar de cuenta → /cuenta<br>• Volver al menú → /menu | — |

**Transiciones**

| Desde | Acción / condición | Hacia | Tipo |
|---|---|---|---|
| Portada | Mi cuenta | → Iniciar sesión | Navegación |
| Iniciar sesión | ¿No tienes cuenta? / ¿Ya tienes cuenta? | ↔ Registro | Navegación |
| Iniciar sesión | ¿Olvidaste tu contraseña? | → Ayuda | Navegación |
| Iniciar sesión | éxito · perfil Comprador | → Libretón (menú) | Éxito |
| Registro | éxito · rol Comprador | → Libretón (menú) | Éxito |
| Libretón (menú) | Cocinas cercanas · Nuestras cocineras | → Exploración pública | Navegación |
| Libretón (menú) | Reservar / ¡A comer! | → Confirmar pedido | Navegación |
| Libretón (menú) | Mis pedidos | → Mis pedidos | Navegación |
| Libretón (menú) | Perfil | → Perfil | Navegación |
| Libretón (menú) | Ajustes | → Ajustes | Navegación |
| Exploración pública | Ver platos / Libretón | → Libretón (menú) | Navegación |
| Confirmar pedido | sin sesión o rol ≠ comprador | → Iniciar sesión | Bloqueo / redirección |
| Confirmar pedido | Enviar solicitud | → Solicitud enviada | Éxito |
| Confirmar pedido | celular sin verificar | → Perfil | Bloqueo / redirección |
| Solicitud enviada | Ver mis pedidos | → Mis pedidos | Navegación |
| Mis pedidos | Chat | → Chat con la cocinera | Abre modal |
| Mis pedidos | Calificar | → Calificar intercambio | Abre modal |
| Mis pedidos | sin sesión | → Sesión expirada | Bloqueo / redirección |
| Mis pedidos | rol ≠ comprador | → Acceso denegado | Bloqueo / redirección |
| Chat con la cocinera | al cerrar el pedido | → Calificar intercambio | Abre modal |

### 4.4 Flujo de la cocinera

[![Flujo de pantallas · Cocinera](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/flujo/03-cocinera.png)](https://github.com/JulianMorales2003/repo-front/blob/main/docs/flujo/03-cocinera.svg)

*OllaCercana · OC-314 · inicio en /cuenta/cocina · esa ruta exige sesión + rol cocinera.* Clic en la imagen para abrir el diagrama vectorial (SVG) a tamaño completo · [PNG de alta resolución](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/flujo/03-cocinera.png).

La cocinera inicia en `/cuenta/cocina` (Modo Cocinera), que exige sesión y rol cocinera. Desde allí publica platos, gestiona las reservas entrantes (confirmar, rechazar con motivo, cerrar la entrega), revisa su historial de ventas y accede a perfil, avisos y ajustes. El Libretón es el mismo menú para todos los roles.

> Las pantallas de **Acceso** (Portada, Iniciar sesión, Registro y Ayuda) son las mismas del flujo del visitante (sección 4.2).

**Pantallas del flujo**

**2 · Libretón (mismo menú para todos los roles)**

| Pantalla | Contenido | Acciones y modales | Errores y estados vacíos |
|---|---|---|---|
| **Libretón (menú)**<br>`/menu`<br>_Pantalla / ruta_ | • Ver los platos publicados<br>• No cambia según el rol | **Acciones**<br>• Reservar → /pedido<br>• Mis pedidos → /cuenta/reservas | — |
| **Confirmar pedido**<br>`/pedido`<br>_Guard_ | • Exige rol comprador<br>• Una cocinera vuelve a /cuenta y de ahí a su inicio | — | — |

**3 · Modo Cocinera**

| Pantalla | Contenido | Acciones y modales | Errores y estados vacíos |
|---|---|---|---|
| **Modo Cocinera**<br>`/cuenta/cocina`<br>_Pantalla / ruta_ | • Resumen: porciones entregadas<br>• Mis platos con porciones disponibles | **Acciones**<br>• Publicar nuevo plato<br>• Editar porciones de un plato<br>• Historial de ventas | **Errores**<br>• Plato modificado por otra reserva: «refresca los datos»<br>• No se pueden reducir porciones por debajo de lo ya reservado |
| **Reservas entrantes**<br>`/cuenta/cocina`<br>_Pantalla / ruta_ | • PENDIENTE: cuenta regresiva (vence a los 10 min)<br>• Con comprobante: «Comprobante recibido» → Revisar comprobante<br>• CONFIRMADO: Cierre de entrega<br>• CERRADO: «Transacción completada» (cierre automático a las 24 h)<br>• RECHAZADO | **Acciones**<br>• Confirmar reserva<br>• Rechazar → pide motivo<br>• Marcar Pagado y Entregado → Confirmar cierre<br>• Chat con el comprador | — |
| **Publicar plato**<br>_Modal_ | • Nombre ≤ 50 · descripción ≤ 200<br>• Precio $1 – $50.000 · porciones 1 – 20<br>• Foto JPG / PNG | — | **Errores**<br>• Teléfono sin verificar<br>• Nombre o descripción vacíos o demasiado largos<br>• Precio inválido o mayor a $50.000<br>• Porciones fuera de 1 – 20<br>• Límite de 3 publicaciones activas<br>• Imagen que no es JPG / PNG |
| **Historial de ventas**<br>_Modal_ | • Ingresos referenciales y reputación | — | **Estados vacíos**<br>• «Aún no has registrado pedidos o reservas de porciones.» |
| **Rechazar solicitud**<br>_Modal_ | • Motivo: Sin porciones disponibles · No alcancé a entregar · Pedido incompatible · Otro | **Acciones**<br>• Confirmar rechazo | **Errores**<br>• «Escribe una breve observación cuando selecciones ‘Otro’.» |
| **Chat con el comprador**<br>_Modal_ | • Conversación por pedido | — | — |
| **Verificar celular**<br>_Modal_ | • Teléfono + código OTP de 4 dígitos | — | **Errores**<br>• «Por favor ingresa un número de teléfono válido.»<br>• «Ingresa el código OTP de 4 dígitos enviado a tu teléfono.» |

**4 · Mi cuenta · menú lateral (Perfil · Modo Cocinera · Avisos · Ajustes · Ver platos · Cerrar sesión)**

| Pantalla | Contenido | Acciones y modales | Errores y estados vacíos |
|---|---|---|---|
| **Perfil**<br>`/cuenta/perfil`<br>_Pantalla / ruta_ | • Nombre comercial · bio · conjunto residencial<br>• Métodos de pago · insignias | **Acciones**<br>• Guardar perfil<br>• Cambiar teléfono → verificación<br>**Modales**<br>• Verificación OTP (6 dígitos, 5 min) | **Errores**<br>• «Ingresa el código completo de 6 dígitos.»<br>• «Código incorrecto o expirado.» |
| **Avisos**<br>`/cuenta/avisos`<br>_Pantalla / ruta_ | • Notificaciones de la cuenta | **Acciones**<br>• Marcar todas como leídas<br>• Leído (por aviso) | **Estados vacíos**<br>• «Todo tranquilo por aquí» |
| **Ajustes**<br>`/cuenta/ajustes`<br>_Pantalla / ruta_ | • Preferencias y notificaciones<br>• Se guardan automáticamente | — | — |

**Redirecciones de seguridad**

| Pantalla | Contenido | Acciones y modales | Errores y estados vacíos |
|---|---|---|---|
| **Sesión expirada**<br>`/cuenta/sesion-expirada`<br>_Redirección de error_ | • «La sesión se enfrió»<br>• Aplica también a /cuenta/perfil y /cuenta/avisos (solo piden sesión) | **Acciones**<br>• Iniciar sesión → /cuenta<br>• Volver al menú → /menu | — |
| **Acceso denegado**<br>`/cuenta/acceso-denegado`<br>_Redirección de error_ | • «Esta puerta no es para tu rol»<br>• Se muestra cuando el rol no es cocinera | **Acciones**<br>• Cambiar de cuenta → /cuenta<br>• Volver al menú → /menu | — |

**Transiciones**

| Desde | Acción / condición | Hacia | Tipo |
|---|---|---|---|
| Portada | Mi cuenta | → Iniciar sesión | Navegación |
| Iniciar sesión | ¿No tienes cuenta? / ¿Ya tienes cuenta? | ↔ Registro | Navegación |
| Iniciar sesión | ¿Olvidaste tu contraseña? | → Ayuda | Navegación |
| Iniciar sesión | éxito · perfil Cocinera | → Modo Cocinera | Éxito |
| Registro | éxito · rol Cocinera | → Modo Cocinera | Éxito |
| Modo Cocinera | reservas de mis platos | → Reservas entrantes | Navegación |
| Modo Cocinera | Publicar nuevo plato | → Publicar plato | Abre modal |
| Modo Cocinera | Historial de ventas | → Historial de ventas | Abre modal |
| Modo Cocinera | menú lateral | → Perfil | Navegación |
| Modo Cocinera | sin sesión | → Sesión expirada | Bloqueo / redirección |
| Modo Cocinera | rol ≠ cocinera | → Acceso denegado | Bloqueo / redirección |
| Libretón (menú) | Reservar | → Confirmar pedido | Navegación |
| Libretón (menú) | Mis pedidos (rol ≠ comprador) | → Acceso denegado | Bloqueo / redirección |
| Confirmar pedido | redirige a /cuenta (con sesión vuelve a /cuenta/cocina) | → Iniciar sesión | Bloqueo / redirección |
| Reservas entrantes | Rechazar | → Rechazar solicitud | Abre modal |
| Reservas entrantes | Chat | → Chat con el comprador | Abre modal |
| Publicar plato | teléfono sin verificar | → Verificar celular | Abre modal |

### 4.5 Flujo del administrador

[![Flujo de pantallas · Administrador](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/flujo/04-admin.png)](https://github.com/JulianMorales2003/repo-front/blob/main/docs/flujo/04-admin.svg)

*OllaCercana · OC-314 · no hay registro de admin: se entra con el perfil «Admin» en el login · inicio en /cuenta/admin.* Clic en la imagen para abrir el diagrama vectorial (SVG) a tamaño completo · [PNG de alta resolución](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/flujo/04-admin.png).

No hay registro de administrador: se entra con el perfil «Admin» en el inicio de sesión. El administrador inicia en `/cuenta/admin` (Panel de moderación), donde revisa los reportes de la comunidad, los desestima o toma una decisión, y reactiva perfiles pausados.

> Las pantallas de **Acceso** (Portada, Iniciar sesión y Ayuda) son las mismas del flujo del visitante (sección 4.2); en este flujo no hay registro.

**Pantallas del flujo**

**2 · Panel de moderación**

| Pantalla | Contenido | Acciones y modales | Errores y estados vacíos |
|---|---|---|---|
| **Panel de administración**<br>`/cuenta/admin`<br>_Pantalla / ruta_ | • Lista de reportes de la comunidad<br>• Perfiles pausados por reactivar | **Acciones**<br>• Seleccionar un reporte<br>• Reactivar perfil pausado | **Errores**<br>• Sin permiso: «No tienes permiso para ver esta sección» (si el rol no es admin, dentro del panel)<br>**Estados vacíos**<br>• «No hay reportes todavía.»<br>• «Selecciona un reporte»<br>• «No hay perfiles pausados por reactivar.» |
| **Detalle del reporte**<br>_Pantalla / ruta_ | • Motivo · descripción · quién reportó<br>• Ver evidencia (imagen) | **Acciones**<br>• Desestimar<br>• Tomar decisión | — |
| **Confirmar decisión**<br>_Modal_ | • Resolver: «¿Confirmas la infracción?» (inhabilita el plato)<br>• Desestimar: «¿Desestimas este reporte?» (conserva el contenido) | **Acciones**<br>• Confirmar · Volver | — |
| **Reporte actualizado**<br>_Éxito_ | • Estado: Abierto → Resuelto o Desestimado | — | — |

**3 · Mi cuenta · menú lateral (Perfil · Admin · Avisos · Ajustes · Ver platos · Cerrar sesión)**

| Pantalla | Contenido | Acciones y modales | Errores y estados vacíos |
|---|---|---|---|
| **Perfil**<br>`/cuenta/perfil`<br>_Pantalla / ruta_ | • Datos de la cuenta | **Acciones**<br>• Guardar perfil<br>• Cambiar teléfono → verificación<br>**Modales**<br>• Verificación OTP (6 dígitos, 5 min) | **Errores**<br>• «Ingresa el código completo de 6 dígitos.»<br>• «Código incorrecto o expirado.» |
| **Avisos**<br>`/cuenta/avisos`<br>_Pantalla / ruta_ | • Notificaciones de la cuenta | **Acciones**<br>• Marcar todas como leídas<br>• Leído (por aviso) | **Estados vacíos**<br>• «Todo tranquilo por aquí» |
| **Ajustes**<br>`/cuenta/ajustes`<br>_Pantalla / ruta_ | • Preferencias y notificaciones<br>• Se guardan automáticamente | — | — |

**Redirecciones de seguridad**

| Pantalla | Contenido | Acciones y modales | Errores y estados vacíos |
|---|---|---|---|
| **Sesión expirada**<br>`/cuenta/sesion-expirada`<br>_Redirección de error_ | • «La sesión se enfrió»<br>• Aplica también a /cuenta/perfil y /cuenta/avisos (solo piden sesión) | **Acciones**<br>• Iniciar sesión → /cuenta<br>• Volver al menú → /menu | — |
| **Acceso denegado**<br>`/cuenta/acceso-denegado`<br>_Redirección de error_ | • «Esta puerta no es para tu rol»<br>• Se muestra cuando el rol no es admin | **Acciones**<br>• Cambiar de cuenta → /cuenta<br>• Volver al menú → /menu | — |

**Transiciones**

| Desde | Acción / condición | Hacia | Tipo |
|---|---|---|---|
| Portada | Mi cuenta | → Iniciar sesión | Navegación |
| Iniciar sesión | ¿Olvidaste tu contraseña? | → Ayuda | Navegación |
| Iniciar sesión | éxito · perfil Admin | → Panel de administración | Éxito |
| Panel de administración | seleccionar reporte | → Detalle del reporte | Navegación |
| Panel de administración | menú lateral | → Perfil | Navegación |
| Panel de administración | sin sesión | → Sesión expirada | Bloqueo / redirección |
| Panel de administración | rol ≠ admin | → Acceso denegado | Bloqueo / redirección |
| Detalle del reporte | Desestimar / Tomar decisión | → Confirmar decisión | Abre modal |
| Confirmar decisión | Confirmar | → Reporte actualizado | Éxito |
| Reporte actualizado | volver a la lista | → Panel de administración | Navegación |

### 4.6 Redirecciones de seguridad

Resumen de los guards de los cuatro diagramas. Recordar que en producción cada permiso debe validarse también en el backend (sección 3).

| Situación | Resultado |
|---|---|
| Abrir `/cuenta/perfil`, `/cuenta/avisos`, `/cuenta/reservas`, `/cuenta/cocina` o `/cuenta/admin` sin sesión | **Sesión expirada** (`/cuenta/sesion-expirada`, «La sesión se enfrió»): *Iniciar sesión* → `/cuenta`; *Volver al menú* → `/menu`. Perfil y avisos solo piden sesión, no un rol concreto |
| Entrar a una ruta de otro rol (`/cuenta/reservas` sin ser comprador, `/cuenta/cocina` sin ser cocinera, `/cuenta/admin` sin ser admin) | **Acceso denegado** (`/cuenta/acceso-denegado`, «Esta puerta no es para tu rol»): *Cambiar de cuenta* → `/cuenta`; *Volver al menú* → `/menu` |
| Usuario sin permiso dentro del panel de administración | «No tienes permiso para ver esta sección» |
| `/pedido` sin sesión (visitante) | Redirige a `/cuenta` |
| `/pedido` con rol distinto de comprador (cocinera) | Vuelve a `/cuenta` y de ahí a su inicio (`/cuenta/cocina`) |
| «Mis pedidos» pulsado desde el Libretón por una cocinera (rol ≠ comprador) | **Acceso denegado** |
| Añadir o Reservar en el Libretón sin sesión | Aviso «inicia sesión» con *Iniciar sesión* y *Crear cuenta* |
| Reservar con el celular sin verificar (comprador) | Lleva al perfil para verificarlo |
| Publicar un plato con el teléfono sin verificar (cocinera) | Abre el modal *Verificar celular* |
| Iniciar sesión con la sesión ya activa | Redirige al inicio del rol |
| `/cuenta/chats` | Redirige a `/cuenta/reservas` |
| Ruta inexistente | Página no encontrada (404), con enlaces a Inicio, Menú y Cocinas cercanas |

### 4.7 Recorrido visual: pantallas por funcionalidad

Cada pantalla indica el **rol** que la ve y la **historia de usuario (HU)** y **feature (FEAT)** del Jira (épica `EPIC-01: OllaCercana`) a las que responde. Las capturas están en [`docs/pantallas`](https://github.com/JulianMorales2003/repo-front/tree/main/docs/pantallas) del repositorio de documentación y muestran el estado de la interfaz en sus casos de éxito (*happy path*) y de error o estado vacío.

| Pantalla | Ruta | Rol | HU · FEAT |
|---|---|---|---|
| [4.7.1 Inicio y cocina de la abuelita](#471-inicio-y-cocina-de-la-abuelita) | `/` | Todos | — |
| [4.7.2 Ending page](#472-ending-page) | `/` (sección final) | Todos | HU-11, HU-14, HU-21 |
| [4.7.3 Registro e inicio de sesión](#473-registro-e-inicio-de-sesión) | `/cuenta`, `/cuenta/registro` | Todos | HU-01, HU-02 · FEAT-04 |
| [4.7.4 Menú de platos El Libretón](#474-menú-de-platos-el-libretón) | `/menu` | Comprador (visitantes pueden explorar) | HU-06, HU-07, HU-08, HU-11, HU-14, HU-16 · FEAT-06 |
| [4.7.5 Mapa de cocineras cercanas](#475-mapa-de-cocineras-cercanas) | `/cocineras-cercanas` | Comprador (público) | HU-06, HU-09, HU-10 · FEAT-06 |
| [4.7.6 Directorio y perfil público de cocinera](#476-directorio-y-perfil-público-de-cocinera) | `/cocineras`, `/cocineras/[id]` | Comprador (público) | HU-03, HU-22 · FEAT-08 |
| [4.7.7 Reservar porción y confirmar pedido](#477-reservar-porción-y-confirmar-pedido) | modal de reserva y `/pedido` | Comprador | HU-05, HU-11, HU-12, HU-14 · FEAT-07 |
| [4.7.8 Mis pedidos y chat](#478-mis-pedidos-y-chat) | `/cuenta/reservas` | Comprador | HU-11, HU-13, HU-15, HU-17, HU-18, HU-23 · FEAT-07, FEAT-11 |
| [4.7.9 Calificar y reportar](#479-calificar-y-reportar) | modales dentro de Mis pedidos | Comprador y cocinera | HU-15, HU-18 · FEAT-08, FEAT-09 |
| [4.7.10 Modo Cocinera](#4710-modo-cocinera) | `/cuenta/cocina` | Cocinera | HU-04, HU-05, HU-12, HU-20, HU-23, HU-24 · FEAT-05, FEAT-07 |
| [4.7.11 Perfil](#4711-perfil) | `/cuenta/perfil` | Todos | HU-03, HU-21 · FEAT-04 |
| [4.7.12 Avisos](#4712-avisos) | `/cuenta/avisos` | Comprador, cocinera y admin | HU-17 · FEAT-11 |
| [4.7.13 Vecino Fiel](#4713-vecino-fiel) | `/vecino-fiel` | Comprador | HU-21 · FEAT-08 |
| [4.7.14 Panel de moderación](#4714-panel-de-moderación) | `/cuenta/admin` | Administrador | HU-19 · FEAT-09 |
| [4.7.15 Sesión expirada y acceso denegado](#4715-sesión-expirada-y-acceso-denegado) | `/cuenta/sesion-expirada`, `/cuenta/acceso-denegado` | Todos | HU-02 · FEAT-04 |
| [4.7.16 Ajustes y ayuda](#4716-ajustes-y-ayuda) | `/cuenta/ajustes`, `/ayuda` | Todos | — |
| [4.7.17 Página no encontrada (404)](#4717-página-no-encontrada-404) | cualquier ruta inexistente | Todos | — |

#### 4.7.1 Inicio y cocina de la abuelita

| Campo | Detalle |
|---|---|
| **Ruta** | `/` |
| **Rol que la ve** | Todos (sin sesión) |
| **Responde a** | — (transversal, puerta de entrada) |

**Happy path.** Portada con la casa del barrio, el logo y el eslogan «Comida casera a un paso de tu puerta.». El botón **«Explora la cocina y sus accesos»** (o deslizar hacia abajo) activa la animación de entrar a la casa y muestra la cocina de la abuelita, la mascota de la marca, que lleva a la *ending page* (sección 4.7.2). El botón flotante **«¿Te ayudo?»** está disponible en todas las pantallas.

![Inicio — portada](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/01-inicio-happy.png)

![Inicio — cocina de la abuelita](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/01-inicio-cocina.png)

**Estado de error / vacío.** Si la ruta no existe se muestra la pantalla 404 (ver 4.7.17).

---

#### 4.7.2 Ending page

| Campo | Detalle |
|---|---|
| **Ruta** | `/` (sección final, tras la animación) |
| **Rol que la ve** | Todos (sin sesión); la guía cambia según el rol elegido |
| **Responde a** | HU-11, HU-14, HU-21 (contenido informativo) |

**Happy path.** Al terminar la animación se llega al final de la experiencia, que reúne cuatro bloques:

1. **Carrusel «Visor espacial»** («Lo cercano también alimenta»): pestañas Mapa Cercano, Plato Teaser, La Abuelita, Modo Cocinera y Vecino Comensal, con tarjetas como «La Abuelita te da la bienvenida» (0 % comisiones, *Descubrir El Libretón*), un plato de muestra con **Apartar esta porción**, *Explorar Mapa en Vivo*, *Conocer Modo Cocinera* y *Ver Mis Reservas*.
2. **Por qué OllaCercana:** Sello Olla Verde, reseñas del barrio, economía del barrio (ahorro frente a domicilios de apps tradicionales) y confianza vecinal (vecinas verificadas, pago directo al recibir, sin comisiones abusivas).
3. **«¿Cómo se vive OllaCercana?»:** guía con selector **Como Comprador / Como Cocinera**, cada uno con tres pasos y un botón de acceso:
   - Comprador: *Explorar el Menú* → Menú (4.7.4), *Abrir Mapa Cercano* → Mapa (4.7.5), *Ver Mis Reservas* → Mis pedidos (4.7.8).
   - Cocinera: *Publicar un Plato*, *Gestionar Reservas* y *Mi Perfil de Cocinera* → Modo Cocinera y Perfil (4.7.10).
4. **Centro de Ayuda:** preguntas frecuentes (pago, entrega, qué pasa si una porción no se confirma en 10 minutos, vender sin ser restaurante, frescura), botón **Hablar con la Abuelita** → Ayuda (4.7.16) y **Volver a la cocina de la abuelita**.

![Ending page — catálogo destacado](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/02-ending-catalogo.png)

![Ending page — valor, reseñas, economía y confianza](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/02-ending-valor.png)

![Ending page — guía como comprador](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/02-ending-guia-comprador.png)

![Ending page — guía como cocinera](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/02-ending-guia-cocinera.png)

![Ending page — centro de ayuda](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/02-ending-ayuda.png)

**Estado de error / vacío.** Si un visitante sin sesión pulsa **Apartar porción**, aparece el aviso «¡Estás a un paso de tu comida!» con **Iniciar Sesión** y **Crear Cuenta de Vecino**, recordando que la porción se guarda 10 minutos y que el pago se hace al recibir en portería.

![Ending page — apartar porción sin sesión](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/02-ending-apartar-sin-sesion.png)

---

#### 4.7.3 Registro e inicio de sesión

| Campo | Detalle |
|---|---|
| **Ruta** | `/cuenta`, `/cuenta/registro` |
| **Rol que la ve** | Todos (comprador, cocinera, admin) |
| **Responde a** | HU-01, HU-02 · FEAT-04 |

**Happy path.** El usuario se registra con nombre, correo, celular, contraseña y rol (comprador o cocinera) y entra a su espacio: comprador → Menú, cocinera → Modo Cocinera, admin → Panel de comunidad. En el login elige su rol y entra con correo o celular.

![Registro e inicio de sesión — happy path](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/03-registro-happy.png)

**Estado de error / vacío.** Mensajes de error: «El nombre es obligatorio», correo o celular inválido (celular de 10 dígitos que empieza por 3), contraseña sin mayúscula/minúscula/número, contraseñas que no coinciden, términos sin aceptar, correo o celular ya registrado, «El usuario no existe» y «La contraseña no coincide».

![Registro e inicio de sesión — error o vacío](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/03-registro-error.png)

---

#### 4.7.4 Menú de platos El Libretón

| Campo | Detalle |
|---|---|
| **Ruta** | `/menu` |
| **Rol que la ve** | Comprador (los visitantes pueden explorar) |
| **Responde a** | HU-06, HU-07, HU-08, HU-11, HU-14, HU-16 · FEAT-06 |

**Happy path.** Catálogo de platos caseros del día con filtros por categoría (Almuerzos, Sopas, Vegetariano, Postres), etiquetas dietéticas (Vegetariano, Sin Gluten, Sin Lactosa, Vegano) y distancia; búsqueda, «Antojo del Día», porciones disponibles sincronizadas y métodos de pago visibles. El comprador agrega platos a «Tu pedido». La pantalla abre con «Hoy se come rico», «Antojo del Día» y la abuelita («Ubica tu antojo» → *Ver mapa*); más abajo están las fichas de cada plato con precio por porción, distancia, conjunto, métodos de pago y los botones **Añadir** y **Reservar**, el panel **Tu pedido** (subtotal, entrega estimada y total con el botón «¡A comer!»), el banner del **Sello Olla Verde** y el acceso a **Vecino Fiel**. Al entrar al Libretón se muestra la animación del libro (se puede desactivar en Ajustes) y el menú también tiene modo oscuro.

![Menú de platos El Libretón — happy path](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/04-menu-happy.png)

![Menú — platos, «Tu pedido» y reservar](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/04-menu-platos.png)

![Menú — banner del Sello Olla Verde](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/04-menu-olla-verde.png)

![Menú — Vecino Fiel y «De la olla a tu mesa»](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/04-menu-vecino-fiel.png)

![Menú — modo oscuro](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/04-menu-modo-oscuro.png)

![Transición de pasar la página: el Libretón](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/04-menu-transicion-libreton.png)

**Estado de error / vacío.** Búsqueda sin coincidencias: «No encontramos platos con esa búsqueda.». Pedido sin platos: «Tu pedido está vacío.». Si un visitante sin sesión intenta añadir o reservar aparece «Un momentico…» con opciones de iniciar sesión o crear cuenta (el equivalente en la ending page está en 4.7.2).

---

#### 4.7.5 Mapa de cocineras cercanas

| Campo | Detalle |
|---|---|
| **Ruta** | `/cocineras-cercanas` |
| **Rol que la ve** | Comprador (público) |
| **Responde a** | HU-06, HU-09, HU-10 · FEAT-06 |

**Happy path.** Mapa ilustrado con anillos de 500 m y 1 km, pines seleccionables por cocinera y filtros Todas, 500 m, 1 km, 1.5 km, 2 km y Abiertas. La dirección exacta no se muestra; se comparte al confirmar la reserva. Debajo del plano, «Fogones activos en tu radio» lista cada cocina con su plato estrella, calificación, estado (Cocinando ahora / Cerrada hoy) y el botón «Ver plato y pedir en Libretón».

![Mapa de cocineras cercanas — happy path](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/05-mapa-happy.png)

![Mapa — fogones activos en tu radio](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/05-mapa-fogones.png)

**Estado de error / vacío.** Sin resultados para el filtro: «No encontramos fogones con ese filtro», con sugerencia de ampliar el radio o ver todas las cocineras.

---

#### 4.7.6 Directorio y perfil público de cocinera

<!-- Sin captura en docs/pantallas para esta pantalla; se describe solo en texto. -->

| Campo | Detalle |
|---|---|
| **Ruta** | `/cocineras`, `/cocineras/[id]` |
| **Rol que la ve** | Comprador (público) |
| **Responde a** | HU-03, HU-22 · FEAT-08 |

**Happy path.** Directorio de vecinas cocineras con buscador. El perfil muestra la historia de la cocinera («La historia detrás del fogón»), sus platos («Lo que sale de su cocina») y su reputación con reseñas.

**Estado de error / vacío.** Búsqueda sin resultados: «Todavía no encontramos cocineras con ese nombre.». Perfil inexistente: «No encontramos este perfil». Reseñas filtradas por estrella sin datos: «No hay opiniones registradas para esta estrella.».

---

#### 4.7.7 Reservar porción y confirmar pedido

| Campo | Detalle |
|---|---|
| **Ruta** | modal de reserva y `/pedido` |
| **Rol que la ve** | Comprador |
| **Responde a** | HU-05, HU-11, HU-12, HU-14 · FEAT-07 |

**Happy path.** El comprador elige porciones, método de pago (Efectivo, Nequi, Daviplata o Llaves; el pago no se procesa en la plataforma) y envía la solicitud. La reserva queda **pendiente** y expira a los **10 minutos** si la cocinera no responde. La pantalla «Revisa tu pedido» separa una solicitud por cocina, deja elegir el pago (Nequi, Llaves o Efectivo), muestra el total estimado y el botón «Enviar N solicitudes», e indica que OllaCercana no procesa pagos.

![Reservar porción y confirmar pedido — happy path](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/07-pedido-happy.png)

**Estado de error / vacío.** «Debes verificar tu número de celular antes de realizar una reserva», «Este plato ya no tiene porciones disponibles», «Solo hay N porción(es) disponible(s)», plato sin stock suficiente al enviar y «No se pudo guardar la solicitud. Inténtalo de nuevo.».

---

#### 4.7.8 Mis pedidos y chat

| Campo | Detalle |
|---|---|
| **Ruta** | `/cuenta/reservas` |
| **Rol que la ve** | Comprador |
| **Responde a** | HU-11, HU-13, HU-15, HU-17, HU-18, HU-23 · FEAT-07, FEAT-11 |

**Happy path.** Lista de pedidos activos e historial con cuenta regresiva de la reserva, chat con la cocinera para coordinar la entrega, confirmación de entrega y pago, calificación del intercambio y reporte de la publicación o del usuario. Al completarse, el chat pasa a solo lectura. Cada reserva muestra su cuenta regresiva, el estado («En espera») y el avance: Solicitud enviada → Cocinera confirma → Adjunta comprobante → Preparación y entrega → Recibido, con el botón «Chat con cocinera»; a la derecha, el resumen de pedidos.

![Mis pedidos y chat — happy path](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/08-pedidos-happy.png)

**Estado de error / vacío.** Sin pedidos: «No tienes pedidos activos» (pestaña activas) o «Tu historial está vacío». Comprobante de pago sin adjunto: «Adjunta una imagen o un archivo PDF.». Sesión vencida: redirige a Sesión expirada.

---

#### 4.7.9 Calificar y reportar

<!-- Sin captura en docs/pantallas para esta pantalla; se describe solo en texto. -->

| Campo | Detalle |
|---|---|
| **Ruta** | modales dentro de Mis pedidos |
| **Rol que la ve** | Comprador y cocinera |
| **Responde a** | HU-15, HU-18 · FEAT-08, FEAT-09 |

**Happy path.** Tras completarse la entrega, cada parte califica de 1 a 5 estrellas con comentario. Cualquier usuario puede reportar una publicación o usuario con motivo, explicación y evidencia en imagen.

**Estado de error / vacío.** Calificación: «Debe seleccionar al menos una estrella» y «Por favor escribir un comentario». Reporte: motivo sin elegir, explicación de menos de 10 caracteres, evidencia sin adjuntar o imagen de más de 900 KB.

---

#### 4.7.10 Modo Cocinera

<!-- Sin captura en docs/pantallas para esta pantalla; se describe solo en texto. -->

| Campo | Detalle |
|---|---|
| **Ruta** | `/cuenta/cocina` |
| **Rol que la ve** | Cocinera |
| **Responde a** | HU-04, HU-05, HU-12, HU-20, HU-23, HU-24 · FEAT-05, FEAT-07 |

**Happy path.** Panel para publicar platos con nombre, descripción, etiquetas, precio por porción, porciones y foto (máximo 3 publicaciones activas); aceptar o rechazar solicitudes con motivo, confirmar pago y entrega, actualizar porciones, pausar la cocina y ver historial de ventas e ingresos referenciales.

**Estado de error / vacío.** Publicar plato: nombre/descripción obligatorios (50 y 200 caracteres máx.), precio mayor a $0 y hasta $50.000, 1 a 20 porciones, foto JPG o PNG de hasta 5 MB y celular sin verificar. Conflicto de stock: «El plato fue modificado por otra reserva, refresca los datos.». Historial sin movimientos: «Aún no has registrado pedidos o reservas de porciones.».

---

#### 4.7.11 Perfil

| Campo | Detalle |
|---|---|
| **Ruta** | `/cuenta/perfil` |
| **Rol que la ve** | Todos |
| **Responde a** | HU-03, HU-21 · FEAT-04 |

**Happy path.** Datos de la cuenta, perfil de cocina (nombre comercial, biografía, conjunto residencial y foto), verificación del celular con código y progreso de insignias. Muestra el «Pasaporte de Vecino Fiel» (HU-21) y el formulario de perfil y datos comerciales con medios de pago (Efectivo, Nequi, Llaves).

![Perfil — happy path](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/11-perfil-happy.png)

**Estado de error / vacío.** Código incompleto: «Ingresa el código completo de 6 dígitos.». Código errado: «Código incorrecto o expirado.».

---

#### 4.7.12 Avisos

| Campo | Detalle |
|---|---|
| **Ruta** | `/cuenta/avisos` |
| **Rol que la ve** | Comprador, cocinera y admin |
| **Responde a** | HU-17 · FEAT-11 |

**Happy path.** Lista de novedades de reservas y mensajes de chat.

**Estado de error / vacío.** Sin novedades: «Todo tranquilo por aquí».

![Avisos — error o vacío](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/12-avisos-error.png)

---

#### 4.7.13 Vecino Fiel

<!-- Sin captura en docs/pantallas para esta pantalla; se describe solo en texto. -->

| Campo | Detalle |
|---|---|
| **Ruta** | `/vecino-fiel` |
| **Rol que la ve** | Comprador |
| **Responde a** | HU-21 · FEAT-08 |

**Happy path.** Seguimiento de la racha: con 3 entregas en un mismo mes con la misma cocinera se otorga la insignia **Vecino Fiel** y 5 % de descuento en el siguiente pedido.

**Estado de error / vacío.** Racha en progreso: indica cuántas entregas faltan. Si pasa un mes sin pedidos, el contador se reinicia.

---

#### 4.7.14 Panel de moderación

| Campo | Detalle |
|---|---|
| **Ruta** | `/cuenta/admin` |
| **Rol que la ve** | Administrador |
| **Responde a** | HU-19 · FEAT-09 |

**Happy path.** «Cuidado de la comunidad»: bandeja de reportes para revisar y resolver, y perfiles pausados por reactivar.

**Estado de error / vacío.** Sin reportes: «No hay reportes todavía…». Sin pausados: «No hay perfiles pausados por reactivar.». Sin permiso: «No tienes permiso para ver esta sección».

![Panel de moderación — error o vacío](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/14-admin-error.png)

---

#### 4.7.15 Sesión expirada y acceso denegado

| Campo | Detalle |
|---|---|
| **Ruta** | `/cuenta/sesion-expirada`, `/cuenta/acceso-denegado` |
| **Rol que la ve** | Todos |
| **Responde a** | HU-02 (seguridad de acceso) · FEAT-04 |

**Happy path.** Pantallas de estado: «La sesión se enfrió» (botón Iniciar sesión) y «Esta puerta no es para tu rol» (botón Cambiar de cuenta), ambas con acceso para volver al menú.

**Estado de error / vacío.** Estas dos pantallas son en sí los estados de error de sesión y de rol.

![Sesión expirada y acceso denegado — error o vacío](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/15-estados-error.png)

---

#### 4.7.16 Ajustes y ayuda

| Campo | Detalle |
|---|---|
| **Ruta** | `/cuenta/ajustes`, `/ayuda` |
| **Rol que la ve** | Todos |
| **Responde a** | — (transversal) |

**Happy path.** **Ayuda de la Casa**: buscador por palabra clave (Sello Olla Verde, portería, Nequi, 10 minutos, cocinera…), caja para preguntarle directo a Doña Rosa (la abuelita) y respuestas sobre cuenta, pedidos, pagos y recogida. A ella se llega desde «Hablar con la Abuelita» o el botón flotante «¿Te ayudo?». **Ajustes** permite cambiar la apariencia de la interfaz. Incluye modo claro u oscuro, activar o quitar la transición de pasar la página, reducir animaciones y tamaño del texto (Estándar o Grande); las preferencias se guardan en el dispositivo.

![Ajustes y ayuda — happy path](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/16-ajustes-ayuda-happy.png)

![Ajustes — modo claro](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/16-ajustes-claro.png)

![Ajustes — modo oscuro](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/16-ajustes-oscuro.png)

**Estado de error / vacío.** La ayuda aclara que la recuperación de contraseña por correo aún no está habilitada.

---

#### 4.7.17 Página no encontrada (404)

| Campo | Detalle |
|---|---|
| **Ruta** | Cualquier ruta inexistente |
| **Rol que la ve** | Todos |
| **Responde a** | — (transversal) |

**Estado de error.** La abuelita avisa «¡Ay, qué pena! Esta página se nos perdió entre las recetas», con los botones **Volver al inicio**, **Ver el libretón** (Menú) y **Explorar cocinas cercanas** (Mapa).

![Página no encontrada](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/pantallas/17-pagina-no-encontrada.png)

## 5. Funcionalidades

Los identificadores funcionales usan las historias de usuario del backlog incluido en `public/Jira.csv` (`HU-01` a `HU-24`). Se conserva esta nomenclatura para que el equipo la coteje con el documento backend. La implementación del frontend no implica que cada endpoint o flujo de servidor esté conectado. La tabla de la sección 4.7 indica qué HU y FEAT atiende cada pantalla.

| ID / nombre | Descripción y pantalla | Happy path | Errores y estados vacíos |
|---|---|---|---|
| HU-01 · Registro de Cuenta en la Plataforma | `/cuenta/registro`; alta de comprador o cocinera. | Completar datos y crear cuenta. | Datos requeridos o inválidos, teléfono sin verificar o cuenta duplicada. |
| HU-02 · Inicio de Sesión de Usuario | `/cuenta`; acceso por correo o celular y rol. | Ingresar y llegar al espacio correspondiente. | Credenciales inválidas, sesión expirada o rol no autorizado. |
| HU-03 · Configuración de Perfil de Cocinera y Conjunto Residencial | `/cuenta/perfil`, `/cocineras/[id]`; datos y perfil público. | Configurar información de la cocinera y conjunto. | Datos inválidos o perfil no disponible. |
| HU-04 · Publicar Oferta de Comida Casera del Día | `/cuenta/cocina`; formulario de publicación. | Publicar plato con descripción, precio, porciones y foto. | Campos inválidos, límites excedidos o foto no compatible. |
| HU-05 · Establecer Porciones Disponibles y Precio por Porción | `/cuenta/cocina`; disponibilidad y precio. | Definir cantidad y precio antes de publicar. | Cantidad o precio fuera de los límites permitidos. |
| HU-06 · Consultar Platos Disponibles por Radio de Distancia | `/menu`, `/cocineras-cercanas`; catálogo por proximidad. | Explorar platos disponibles en el radio seleccionado. | Sin platos disponibles para la búsqueda. |
| HU-07 · Filtrar Platos por Tipo de Menú | `/menu`; filtros por categoría. | Seleccionar categoría y revisar el catálogo filtrado. | Sin coincidencias; limpiar filtros para volver al catálogo. |
| HU-08 · Filtrar Platos por Etiquetas Dietéticas | `/menu`; etiquetas de alimentación. | Aplicar una o más etiquetas compatibles. | Sin platos que coincidan con las etiquetas. |
| HU-09 · Consultar Mapa Interactivo de Cocineras | `/cocineras-cercanas`; mapa y filtros de radio. | Explorar cocineras y abrir sus platos/perfiles. | Mapa o filtro sin resultados. |
| HU-10 · Ocultamiento de Dirección Exacta de la Cocinera | Mapa, perfil y confirmación de reserva. | Mostrar solo ubicación aproximada antes de confirmar. | No exponer dirección exacta antes del estado permitido. |
| HU-11 · Apartar Porciones de Comida Casera | `/menu`, modal de reserva, `/pedido`. | Elegir porciones y enviar solicitud. | Sin sesión, teléfono sin verificar, stock insuficiente o fallo al guardar. |
| HU-12 · Aceptar o Rechazar Solicitudes de Reserva | `/cuenta/cocina`, `/cuenta/reservas`. | Cocinera revisa solicitud y la acepta o rechaza. | Solicitud expirada, stock en conflicto o solicitud no disponible. |
| HU-13 · Coordinación de Entrega entre Comprador y Cocinera | `/cuenta/reservas`, `/cuenta/chats`. | Acordar hora y recogida por chat. | Reserva no disponible o coordinación pendiente. |
| HU-14 · Visualización de Métodos de Pago Disponibles | Menú, pedido y perfil de cocina. | Consultar medios aceptados y acordar pago directo. | Medio no disponible; la plataforma no procesa el pago. |
| HU-15 · Calificación del Intercambio Comunitario | Modal desde una reserva completada. | Enviar calificación y comentario del intercambio. | Reserva sin completar o datos requeridos incompletos. |
| HU-16 · Sincronización en Tiempo Real de Porciones Disponibles | Menú, publicación y reserva. | Reflejar cambios de disponibilidad para evitar sobreventa. | Conflicto de versión/stock; recargar la disponibilidad. |
| HU-17 · Recepción de Avisos del Estado de la Reserva y Mensajes | `/cuenta/avisos`. | Consultar cambios de reserva y mensajes nuevos. | Estado vacío: no hay novedades. |
| HU-18 · Reportar Publicaciones o Usuarios por Incumplimiento | Modal de reporte; publicación o perfil. | Enviar motivo y explicación para revisión. | Motivo o explicación incompletos o error de envío. |
| HU-19 · Gestión y Resolución de Reportes de la Comunidad | `/cuenta/admin`; bandeja de moderación. | Revisar, resolver o desestimar reportes. | Sin reportes, sin perfiles pausados o acceso denegado. |
| HU-20 · Consulta de Resumen de Historial e Ingresos Referenciales | `/cuenta/cocina`; historial de ventas. | Consultar actividad e ingresos referenciales. | Historial sin movimientos. |
| HU-21 · Participación en Retos Comunitarios e Insignias de Fidelidad | `/vecino-fiel`; progreso e insignias. | Completar el reto de fidelidad con la misma cocinera. | Racha en progreso o reiniciada al cambiar el periodo. |
| HU-22 · Consulta de Reputación e Historial de Reseñas de Cocinera | `/cocineras/[id]`; reputación y reseñas. | Consultar promedio e historial de opiniones. | Sin reseñas o filtro sin resultados. |
| HU-23 · Confirmar Entrega y Cerrar Transacción | `/cuenta/reservas`; acciones de comprador y cocinera. | Ambas partes confirman la entrega y se cierra la reserva. | Falta confirmación de una parte o reserva no elegible. |
| HU-24 · Actualizar Disponibilidad de Porciones | `/cuenta/cocina`; inventario del plato. | Ajustar porciones disponibles después de cambios. | Conflicto con una reserva concurrente o plato no disponible. |

**Nota sobre correspondencia:** los nombres e IDs anteriores siguen el alcance descrito por las historias del proyecto; antes de liberar la integración, cotejar cada fila con los nombres/IDs exactos del documento de backend y del contrato API. El backlog especifica casos de error HTTP como `400` para validaciones y `409` para duplicados o conflicto de versión. El frontend debe mostrar el mensaje recibido del backend, sin reemplazarlo por textos inventados.

### 5.1 Estados de dominio de referencia

Los valores siguientes están definidos en el store frontend. Deben acordarse con el backend y mantenerse idénticos en mayúsculas y acentos si forman parte del contrato:

- **Reserva:** `PENDIENTE` → `CONFIRMADO` → `COMPLETADA`; salidas alternativas `RECHAZADA` y `EXPIRADA`.
- **Plato:** `DISPONIBLE`, `AGOTADO`, `EXPIRADO`, `INHABILITADO`.
- **Reporte:** `Abierto`, `Resuelto`, `Desestimado`.
- **Reseña:** `Pendiente`, `Publicada`.
- **Roles:** `comprador`, `cocinera`, `admin`.

## 6. Modelos de referencia

Los modelos de UI viven en `lib/ollacercana-store.ts`. Son una referencia para mapear DTOs del servidor; **no sustituyen los nombres ni validaciones del contrato backend**. Adaptar las respuestas mediante una capa de mapeo evita acoplar componentes a DTOs de transporte.

| Modelo frontend | Campos principales | Relación / uso |
|---|---|---|
| `UserProfile` | `name`, `email`, `phone`, `role`, `commercialName`, `residentialComplex`, `phoneVerified` | Cuenta y perfil de cocina. |
| `DishItem` | `id`, `name`, `category`, `price`, `cookId`, `availablePortions`, `status` | Plato publicado por una cocinera. |
| `Reservation` | `id`, `dishId`, `cookId`, `buyerEmail`, `portions`, `totalPrice`, `preferredPaymentMethod`, `status`, `createdAt`, `expiresAt` | Solicitud de compra relacionada con plato, comprador y cocinera. |
| `Review` | `id`, `cookId`, `reservationId`, `rating`, `comment`, `status` | Evaluación asociada a una reserva. |
| `ChatMessage` | `id`, `reservationId`, `sender`, `text`, `timestamp` | Mensaje dentro de la coordinación de una reserva. |
| `CommunityReport` | `id`, `targetId`, `targetType`, `reason`, `explanation`, `status` | Reporte de publicación o usuario. |
| `AppNotification` | `id`, `targetEmail`, `title`, `message`, `read`, `timestamp` | Aviso dirigido a una cuenta. |

**Reglas de relación:** una cocinera publica muchos platos; una reserva identifica un plato, comprador y cocinera; una conversación y una reseña pueden referenciar la reserva; los reportes apuntan a una publicación o usuario. Los pagos se coordinan entre las partes: la plataforma no procesa dinero. Los métodos mostrados son Efectivo, Nequi, Daviplata y Llaves.

## 7. Identidad visual

La guía de marca de la rama está en [`public/OllaCercana_ManualIdentidad_Actualizado.html`](public/OllaCercana_ManualIdentidad_Actualizado.html). El nombre y el tono buscan transmitir cocina casera, cercanía, confianza y comunidad.

![Logo de OllaCercana](https://raw.githubusercontent.com/SantiagoAndresGarciaAlmario01/Frontend-Base/develop/public/brand/ollacercana-icon.svg)

![Abuelita, personaje de ayuda de la marca](https://raw.githubusercontent.com/SantiagoAndresGarciaAlmario01/Frontend-Base/develop/public/images/abuelita_3d_mascot.jpg)

Resumen del Manual de Identidad OllaCercana **v3.0** (Oct. 2026). Marca hogareña: la calidez de la cocina del conjunto hecha sistema visual.

> **Eslogan:** "Comida casera a un paso de tu puerta."

El manual completo está en el repositorio de documentación: [`OllaCercana_ManualIdentidad_v0.html`](https://github.com/JulianMorales2003/repo-front/blob/main/docs/identidad/OllaCercana_ManualIdentidad_v0.html) (versión web) y [`OllaCercana_ManualIdentidad_v3.pptx`](https://github.com/JulianMorales2003/repo-front/blob/main/docs/identidad/OllaCercana_ManualIdentidad_v3.pptx) (presentación).

### 7.1 Marca y voz

- **Nombre:** *Olla* = cocina tradicional, fuego lento, calor del hogar. *Cercana* = proximidad hiperlocal y coordinación vecinal.
- **Valores:** Cercanía, Confianza, Sostenibilidad, Comunidad.
- **Público:** Cocineras (personas que cocinan en casa y ofrecen platos a su zona) y Compradores (vecinos que buscan comida casera cercana).
- **Voz:** directa y cálida (frases cortas, español cotidiano, ej. "apartar porción") y honesta (no prometer precios/disponibilidad garantizados, ni dirección exacta antes de confirmar la reserva, ni pagos procesados por la plataforma).

### 7.2 Logo

| Versión | Archivo |
|---|---|
| Principal (full color) | ![Logo principal](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/identidad/logo-principal.png) |
| Isotipo (la olla) | <img src="https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/identidad/isotipo.png" width="96" alt="Isotipo"> |

- Variantes oficiales: principal, isotipo y monocromático (escala de grises); versiones para fondo claro y oscuro.
- **Área de reserva:** 1X = altura del isotipo de la olla. Ningún texto ni elemento ajeno debe invadirla.

| Contexto | Versión | Tamaño mínimo (referencia) |
|---|---|---|
| Digital | Horizontal completa | 32 px de alto |
| Digital | Solo isotipo / favicon | 24 px de alto |
| Impresión | Horizontal completa | 15 mm de alto |
| Impresión | Solo isotipo | 8 mm de alto |

**Usos incorrectos:** deformar el logo · colores fuera de paleta · sombras o degradados · reordenar isotipo y tipografía · bajo contraste con el fondo · separar la olla del nombre fuera de las variantes oficiales.

### 7.3 Paleta de colores

**Colores de marca**

| Color | HEX | Uso |
|---|---|---|
| Naranja Olla | `#F0822D` | Acción principal y selección (primario / CTA). |
| Verde Cercana | `#62B869` | Disponibilidad y éxito. |
| Amarillo Cálido | `#F4C430` | Calificación y confianza. |
| Vino Abuela | `#901C21` | Personaje y recursos de portada (hero). |
| Madera Cálida | `#8B5E34` | Bordes y tarjetas destacadas (tarjetas / contornos). |
| Terracota (Buscar) | `#C84B31` | Búsqueda y acentos (foco / acción). |
| Púrpura Admin | `#A855F7` | Rol y panel de administración. |
| Error | `#E5484D` | Estados de error. |
| Fondo tinta | `#2B2117` | Fondos y superficies oscuras. |
| Papel | `#EFE0C2` | Tarjetas y superficies cálidas. |
| Crema | `#FAF6F0` | Superficies claras. |

**Color por rol:** comprador `#62B869`; cocinera `#F0822D`; admin `#A855F7`.

**Colores de interfaz**

| Grupo | Colores |
|---|---|
| Fondos y superficies | `#000000` global · `#17130F` nocturno · `#2A1E17` mapa · `#CBA679` Libretón · `#28221B` panel nocturno · `#3A3025` panel oscuro del menú · `#EFE0C2` papel · `#FAF6F0` crema · `#F5E9D2` cabecera menú · `#F7EDDB` ficha clara · `#DCE4CE` verde claro · `#46513B` verde oscuro |
| Texto y bordes | `#F4F3EF` texto claro · `#F0E5D3` texto claro tema oscuro · `#2C241E` texto mapa · `#2B2117` tinta · `#5B4A38` texto secundario · `#52663D` texto verde · `#AA8B5E` borde cálido · `#705A40` / `#715A3E` bordes oscuros · `#71805D` borde verde · `#F0E3CE` texto menú oscuro |
| Señales | `#448A9C` azul del mapa / agua |

**Equivalencias de impresión (orientativas)**

| Color | RGB | CMYK | Pantone |
|---|---|---|---|
| Naranja Olla | 240,130,45 | 0,58,90,0 | PMS 151 C |
| Verde Cercana | 98,184,105 | 64,0,76,0 | PMS 7488 C |
| Amarillo Cálido | 244,196,48 | 4,22,92,0 | PMS 123 C |
| Vino Abuela | 144,28,33 | 23,98,93,20 | PMS 188 C* |
| Madera Cálida | 139,94,52 | 35,56,87,22 | PMS 7567 C* |
| Terracota Buscar | 200,75,49 | 15,83,90,5 | PMS 7607 C* |
| Púrpura Admin | 168,85,247 | 48,73,0,0 | PMS 2587 C* |

**Accesibilidad (WCAG AA):** mantener contraste accesible; no usar texto blanco sobre Amarillo Cálido; el naranja `#F0822D` requiere texto oscuro en texto normal. Comprobar las combinaciones según WCAG AA y verificar el contraste de cada una antes de publicar.

### 7.4 Tipografía

| Uso | Fuente | Peso |
|---|---|---|
| Display / H1 (titulares editoriales) | Playfair Display | 700 |
| H2 / etiquetas, navegación | Outfit | 700 |
| Cuerpo y formularios | Outfit | 400 |
| Precios, nombres de platos, citas (acento manuscrito) | Caveat | 700 |

- Caveat no se usa en párrafos largos ni formularios.
- **Contingencia:** Playfair → Georgia/Merriweather · Outfit → Open Sans/Helvetica/Arial · Caveat → Outfit Italic (nunca Comic Sans ni Brush Script).
- Tipografías de marca: Playfair Display, Outfit y Caveat (Google Fonts), según el manual actualizado.

### 7.5 Iconografía

- Estilo lineal y cálido, cuadrícula **24×24 px**, trazo **2 px**, terminales y uniones redondeadas, un solo color según el estado del componente.
- Set base: Chat, Reserva, Pago, Calificación, Ubicación, Tiempo, Aviso, Perfil, Cocina.
- Pilares: Alimentación, Cercanía, Comunidad.

### 7.6 Componentes de interfaz

- **Tarjetas** estilo papel kraft (`#EFE0C2`) con borde `#D8C39C`; contorno madera `#8B5E34` en tarjetas destacadas.
- **Pizarra** (fondo `#26332A`, marco de madera) para listados de platos con precios en Caveat amarillo.
- **Chips:** Reservar (naranja), Disponible (verde), Calificación (amarillo), Error (borde rojo).
- **Inputs:** fondo `#FBF3E7`, borde `#D9B68C`, texto `#4A3222`, placeholder `#A88B6F`.
- **Filtros de proximidad:** Todas, 500 m, 1 km, 1.5 km, 2 km y Abiertas.
- **Mapa:** anillos de 500 m y 1 km, pines ilustrados; la dirección exacta no se muestra hasta confirmar la reserva.

### 7.7 Fotografía y personaje

- **Fotografía:** luz natural lateral y difusa; cenital 90° para bandejas y picado 45° para sopas/cazuelas; menaje tradicional (ollas de barro, cucharas de madera, paños). Nunca acabados de alta cocina ni luz de estudio.
- **Personaje "La abuela de la cuadra":** ilustración 3D simbólica (no es la foto de una cocinera real). Rasgos fijos: gorro de cocinera, gafas redondas, cardigan vino, camisa a cuadros rojo/blanco, corbata azul a rayas, aretes de perla, sosteniendo la olla. Úsala en portada, onboarding y botón de ayuda; no como foto de perfil ni en lugar de fotos reales de comida.

![La abuela](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/identidad/personaje-abuela.jpg)

**Hoja oficial del personaje:** poses (amigable, cercana, siempre activa y en tu conjunto), expresiones y paleta de colores.

![Hoja oficial del personaje](https://raw.githubusercontent.com/JulianMorales2003/repo-front/main/docs/identidad/hoja-personaje.png)

## 8. Estructura y conexión planificada con backend

### 8.1 Estructura actual

```text
app/                         Rutas y layouts de Next.js App Router
  cuenta/                    Acceso, perfil, reservas, cocina y administración
  cocineras/                  Directorio y perfil público
  cocineras-cercanas/         Mapa de cocineras
  menu/                       Catálogo
  pedido/                     Carrito y confirmación
  ayuda/                      Centro de ayuda
  vecino-fiel/                Progreso de fidelidad
components/                   Navegación, marca, chat y componentes de pantalla
  modals/                    Reserva, publicación, chat, reportes y reseñas
lib/ollacercana-store.ts      Modelos, estado y persistencia local de demostración
public/                      Imágenes, marca, videos, fuentes y Jira.csv
```

### 8.2 Integración propuesta

```text
Navegador
  └─ Next.js / React (app y componentes)
       └─ Cliente HTTP futuro (Axios o fetch; decisión pendiente)
            └─ API REST sobre HTTPS
                 └─ Backend Spring Boot
                      ├─ Controllers → Services → Repositories
                      └─ PostgreSQL (persistencia prevista en la arquitectura backend)
```

La integración concreta debe seguir el contrato vigente del equipo backend. El backlog también menciona Mapbox y FCM como servicios externos previstos; el frontend actual usa un mapa ilustrado y avisos locales, por lo que ambos servicios requieren integración explícita antes de considerarlos activos.

Plan de conexión:

1. Acordar URL base por entorno, rutas, DTOs, roles, estados y formato de errores con backend; guardar configuración no secreta en variables `NEXT_PUBLIC_*` solo si debe exponerse al navegador.
2. Crear un cliente HTTP y adaptadores bajo `lib/api/`; no llamar endpoints directamente desde cada componente.
3. Reemplazar las lecturas y escrituras del store local con servicios para cuentas, platos, reservas, reseñas, reportes, chat y avisos.
4. Manejar autenticación de acuerdo con el mecanismo backend; no persistir contraseñas ni confiar en un rol enviado por el navegador.
5. Traducir respuestas de servidor a modelos de vista y conservar los nombres/IDs acordados con backend. Mostrar errores `400`, `401`, `403`, `404`, `409` y `5xx` con la acción correspondiente.
6. Retirar datos de demostración y `localStorage` para datos compartidos una vez la API cubra los flujos; puede conservarse almacenamiento local únicamente para preferencias no sensibles.

### 8.3 Estructura del repositorio de documentación

El material visual de este documento vive en [`repo-front`](https://github.com/JulianMorales2003/repo-front), un repositorio solo de documentación:

```text
repo-front/
├── README.md
└── docs/
    ├── flujo/       4 diagramas de flujo por rol (PNG y SVG):
    │                01-visitante, 02-comprador, 03-cocinera y 04-admin
    ├── pantallas/   28 capturas: happy path y error / estado vacío
    └── identidad/   logo, isotipo, personaje y hoja del personaje (imágenes),
                     más el manual de identidad en HTML (v0) y PowerPoint (v3)
```

## 9. Referencias y materiales

- Prototipo navegable: [https://ollacercana.netlify.app/](https://ollacercana.netlify.app/).
- Backlog funcional: [`public/Jira.csv`](public/Jira.csv), épica `EPIC-01: OllaCercana`.
- Manual de identidad: [`public/OllaCercana_ManualIdentidad_Actualizado.html`](public/OllaCercana_ManualIdentidad_Actualizado.html).
- Manual de identidad en el repositorio de documentación: [HTML v0](https://github.com/JulianMorales2003/repo-front/blob/main/docs/identidad/OllaCercana_ManualIdentidad_v0.html) y [PowerPoint v3](https://github.com/JulianMorales2003/repo-front/blob/main/docs/identidad/OllaCercana_ManualIdentidad_v3.pptx).
- Flujos de pantallas por rol (OC-314): [`docs/flujo`](https://github.com/JulianMorales2003/repo-front/tree/main/docs/flujo).
- Capturas de pantallas: [`docs/pantallas`](https://github.com/JulianMorales2003/repo-front/tree/main/docs/pantallas).
- Implementación de modelos y persistencia de demostración: [`lib/ollacercana-store.ts`](lib/ollacercana-store.ts).
- Rutas de interfaz: carpeta [`app/`](app/).
- Diagrama backend: coordinar con el documento de arquitectura del backend para mantener nombres de componentes y contratos consistentes.

## 10. Historial de revisión

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0 | 19 oct 2026 | Reorganización del README con base en `develop`; se documentan stack real, roles, navegación, funcionalidades, modelos, paleta e integración futura. Se señalan el prototipo y la validación de IDs backend como pendientes. |
| 1.1 | 20 oct 2026 | La sección 4 pasa a usar el modelo de flujo de pantallas del repositorio `repo-front` (diagramas de visitante, comprador, cocinera y administrador, OC-314) en lugar del recorrido anterior. Se incorporan las 17 pantallas por funcionalidad con todas sus capturas (4.7), el resumen completo del manual de identidad v3.0 con sus imágenes (sección 7) y la estructura de `docs/` (8.3). Se enlaza el prototipo en las referencias. |

---
