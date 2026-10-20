# OllaCercana — Arquitectura y diseño del frontend

> Documento de arquitectura y diseño del frontend. Describe la rama `develop` y distingue la implementación disponible de la integración planificada con el backend.

| Dato | Valor |
|---|---|
| Proyecto | OllaCercana |
| Rama documentada | `develop` |
| Épica | `EPIC-01: OllaCercana` |
| Versión del documento | 1.0 |
| Última revisión | 19 de octubre de 2026 |
| Prototipo | [Abrir prototipo](https://ollacercana.netlify.app/) · [Ver/guardar QR en PNG](https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=https%3A%2F%2Follacercana.netlify.app%2F) |

## Prototipo y código QR

Abrir el [prototipo de OllaCercana](https://ollacercana.netlify.app/) o escanear el código con la cámara del celular. El PNG se genera a partir del mismo enlace y se puede abrir o guardar desde [este enlace](https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=https%3A%2F%2Follacercana.netlify.app%2F).

![Código QR del prototipo OllaCercana](https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=https%3A%2F%2Follacercana.netlify.app%2F)

## 1. Introducción

OllaCercana conecta a cocineras de un conjunto residencial con vecinos que buscan comida casera cercana. El frontend permite explorar platos y cocinas, crear una cuenta, solicitar porciones y coordinar la entrega. La interfaz también ofrece herramientas para que las cocineras administren publicaciones y reservas, y para que administración modere reportes.

Este repositorio es el frontend funcional de demostración. Las pantallas y flujos están implementados en Next.js; la persistencia actual usa `localStorage` y datos de demostración. No se debe interpretar como integración activa con el backend: esta conexión queda planificada y se describe en la sección 8.

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

La tabla describe la experiencia del frontend. En producción, el backend debe validar cada permiso en cada operación; ocultar una ruta o botón en el navegador no constituye control de acceso.

## 4. Navegación

```text
Portada (/)
  └─ Cocina / sección de descubrimiento
      ├─ Menú (/menu) ── Añadir / Reservar ──> Pedido (/pedido)
      ├─ Mapa (/cocineras-cercanas) ──> Perfil de cocinera (/cocineras/[id])
      └─ Directorio (/cocineras) ─────> Perfil de cocinera (/cocineras/[id])

Pedido ── si falta sesión ──> Cuenta (/cuenta) ──> Registro (/cuenta/registro)
  └─ Enviar solicitud ──> Reservas (/cuenta/reservas) ──> Chat (/cuenta/chats)

Cuenta según rol:
  ├─ comprador ──> Menú, pedido, reservas, perfil, avisos, Vecino Fiel
  ├─ cocinera ───> Cocina (/cuenta/cocina), perfil, avisos, solicitudes y chats
  └─ admin ──────> Moderación (/cuenta/admin), perfil y avisos

Ruta inexistente ──> 404
Sesión vencida ────> /cuenta/sesion-expirada
Rol sin permiso ──> /cuenta/acceso-denegado
```

**Recorrido principal:** el visitante entra por la portada y puede descubrir el menú, el mapa o el directorio público. Para enviar una reserva debe iniciar sesión o registrarse. El comprador revisa sus reservas y coordina la recogida por chat. La cocinera atiende las solicitudes desde su panel; puede aceptarlas o rechazarlas y actualizar el estado de entrega. Administración revisa reportes de la comunidad. Si una reserva queda pendiente más de 10 minutos, expira. La dirección exacta de la cocinera no se expone antes de confirmar la reserva.

### 4.1 Recorrido visual de la aplicación

Las capturas muestran el estado de la interfaz documentado en la rama `develop`.

#### Portada y cocina

![Portada de OllaCercana](https://github.com/user-attachments/assets/38cb379f-8546-481f-87bb-691e8b5c1265)

![Cocina interactiva y accesos](https://github.com/user-attachments/assets/08e0f861-1a53-4597-877a-c341810607d4)

#### Descubrimiento y mapa

![Sección de descubrimiento de OllaCercana](https://github.com/user-attachments/assets/fdfa0c2d-c5fd-4b30-bafa-5dda95a28794)

![Mapa de cocineras cercanas](https://github.com/user-attachments/assets/54a73515-515b-48c5-aa5a-2e9b9f339463)

#### Menú y comunidad

![Inicio del menú de platos](https://github.com/user-attachments/assets/d7490957-1a95-4b69-ac4a-bd5857b86533)

![Recetario de platos y pedido](https://github.com/user-attachments/assets/a4faa39e-6f55-4d71-969e-ad10bf3bcabc)

![Sello Olla Verde](https://github.com/user-attachments/assets/f9d6aa32-1dc4-4dcf-ad65-a48c74736e69)

![Meta comunitaria Olla Verde](https://github.com/user-attachments/assets/ee2def97-610a-4f67-985b-97f56deadb14)

![Cómo funciona el pedido](https://github.com/user-attachments/assets/e3bb7e81-791b-4f64-aa34-136c8f9f6514)

#### Acceso

![Inicio de sesión](https://github.com/user-attachments/assets/13517fa3-6156-487b-ae23-765f2f3497b9)
## 5. Funcionalidades

Los identificadores funcionales usan las historias de usuario del backlog incluido en `public/Jira.csv` (`HU-01` a `HU-24`). Se conserva esta nomenclatura para que el equipo la coteje con el documento backend. La implementación del frontend no implica que cada endpoint o flujo de servidor esté conectado.

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
| HU-24 · Actualizar Disponibilidad de Porciones | `/cuenta/cocina`; inventario del plato. | Ajustar porciones disponibles después de cambios. | Conflicto con una reserva concurrente o plato no disponible. |**Nota sobre correspondencia:** los nombres e IDs anteriores siguen el alcance descrito por las historias del proyecto; antes de liberar la integración, cotejar cada fila con los nombres/IDs exactos del documento de backend y del contrato API. El backlog especifica casos de error HTTP como `400` para validaciones y `409` para duplicados o conflicto de versión. El frontend debe mostrar el mensaje recibido del backend, sin reemplazarlo por textos inventados.

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

| Color | HEX | Uso |
|---|---|---|
| Naranja Olla | `#F0822D` | Acción principal y selección. |
| Verde Cercana | `#62B869` | Disponibilidad y éxito. |
| Amarillo Cálido | `#F4C430` | Calificación y confianza. |
| Vino Abuela | `#901C21` | Personaje y recursos de portada. |
| Madera Cálida | `#8B5E34` | Bordes y tarjetas destacadas. |
| Terracota | `#C84B31` | Búsqueda y acentos. |
| Púrpura Admin | `#A855F7` | Rol y panel de administración. |
| Fondo tinta | `#2B2117` | Fondos y superficies oscuras. |
| Papel | `#EFE0C2` | Tarjetas y superficies cálidas. |
| Crema | `#FAF6F0` | Superficies claras. |

**Color por rol:** comprador `#62B869`; cocinera `#F0822D`; admin `#A855F7`. Mantener contraste accesible; no usar texto blanco sobre amarillo y comprobar combinaciones según WCAG AA. Tipografías de marca: Playfair Display, Outfit y Caveat, según el manual actualizado.

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

## 9. Referencias y materiales

- Prototipo navegable: **pendiente de agregar enlace**.
- Backlog funcional: [`public/Jira.csv`](public/Jira.csv), épica `EPIC-01: OllaCercana`.
- Manual de identidad: [`public/OllaCercana_ManualIdentidad_Actualizado.html`](public/OllaCercana_ManualIdentidad_Actualizado.html).
- Implementación de modelos y persistencia de demostración: [`lib/ollacercana-store.ts`](lib/ollacercana-store.ts).
- Rutas de interfaz: carpeta [`app/`](app/).
- Diagrama backend: coordinar con el documento de arquitectura del backend para mantener nombres de componentes y contratos consistentes.

## 10. Historial de revisión

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0 | 19 oct 2026 | Reorganización del README con base en `develop`; se documentan stack real, roles, navegación, funcionalidades, modelos, paleta e integración futura. Se señalan el prototipo y la validación de IDs backend como pendientes. |

---






