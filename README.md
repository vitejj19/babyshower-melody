# Baby Shower — Melody Elianna

Invitación web para el Baby Shower de **Melody Elianna Martínez Mariscal**.

El proyecto está desarrollado como un sitio web estático con HTML, CSS y JavaScript, utilizando Google Apps Script y Google Sheets para el registro de confirmaciones de asistencia.

---

## Datos del evento

- **Bebé:** Melody Elianna Martínez Mariscal
- **Papás:** Noelia Mariscal y Jassiel Martínez
- **Fecha:** Domingo 8 de noviembre de 2026
- **Hora:** 2:00 p. m.
- **Lugar:** Centro Social Pensamientos
- **Ubicación:** San Pablo de las Salinas, Tultitlán, Estado de México

---

## URL del evento

La invitación está preparada para publicarse en:

```text
https://babymelody.momentosvr.com.mx
```

Se utiliza una sola URL para todos los invitados.

No se utilizan códigos individuales ni enlaces personalizados por familia.

---

## Estructura del proyecto

```text
babyshower-melody/
├── index.html
├── main.js
├── styles.css
├── responsive.css
├── README.md
│
├── assets/
│   ├── audio/
│   │   └── en-mi-corazon-viviras.mp3
│   │
│   └── images/
│       ├── decoracion-dorada.png
│       ├── elefantita-corazon.png
│       ├── elefantita-portada.png
│       ├── globos.png
│       ├── noelia.webp
│       ├── nubes.png
│       ├── ositos.png
│       ├── papas.webp
│       ├── ultrasonido.webp
│       └── vista-previa.jpg
│
└── backend/
    └── Code.gs
```

> La carpeta `backup/` se utiliza únicamente de forma local para conservar versiones de trabajo y no forma parte de los archivos destinados a producción.

---

## Archivos principales

### `index.html`

Contiene la estructura completa de la invitación.

Incluye:

- Portada de apertura.
- Bienvenida.
- Presentación de Melody Elianna.
- Sección de sus papás.
- Dulce espera.
- Cuenta regresiva.
- Fecha y hora.
- Ubicación.
- Confirmación de asistencia.
- Mensaje final.
- Metadatos Open Graph para WhatsApp.
- Reproductor de audio.

---

### `styles.css`

Contiene los estilos principales del sitio para escritorio.

Incluye:

- Paleta de colores.
- Tipografías.
- Tarjetas.
- Botones.
- Decoraciones.
- Formularios.
- Cuenta regresiva.
- Animaciones.
- Diseño de las diferentes secciones.

---

### `responsive.css`

Contiene los ajustes para dispositivos móviles y pantallas pequeñas.

El diseño ha sido optimizado principalmente para:

- Smartphones.
- Tablets.
- Pantallas menores a 600 px.
- Pantallas menores a 420 px.

---

### `main.js`

Contiene la lógica principal de la invitación.

Administra:

- Apertura de la invitación.
- Reproducción de música.
- Pausa y reanudación del audio.
- Cuenta regresiva.
- Animaciones al hacer scroll.
- Incremento y decremento del número de asistentes.
- Validación del formulario.
- Comunicación con Google Apps Script.
- Registro de confirmaciones.
- Actualización de confirmaciones existentes.
- Mensajes de confirmación.

---

### `backend/Code.gs`

Contiene una copia local del backend de Google Apps Script.

El backend real se ejecuta dentro de Google Apps Script.

Este archivo se conserva en el proyecto para:

- Respaldo.
- Control de versiones.
- GitHub.
- Recuperación del código.
- Documentación técnica.

Cada cambio realizado en Google Apps Script debe copiarse también a:

```text
backend/Code.gs
```

para mantener ambas versiones sincronizadas.

---

## Diseño visual

La identidad visual está basada en una temática infantil elegante en tonos:

- Rosa pastel.
- Rosa empolvado.
- Marfil.
- Crema.
- Dorado.
- Gris suave.

El personaje principal de la invitación es una **elefantita bebé**.

Los ositos se utilizan como elementos secundarios.

Las principales tipografías utilizadas son:

```text
Great Vibes
Cormorant Garamond
Montserrat
```

---

## Confirmación de asistencia

El formulario solicita únicamente:

1. Nombre de quien confirma.
2. Número de asistentes.

No se solicita:

- Correo electrónico.
- Teléfono.
- Código de invitación.
- Familia.
- Mensaje adicional.

---

## Google Apps Script

La comunicación con Google Apps Script se realiza desde `main.js`.

La URL actual del Web App es:

```text
https://script.google.com/macros/s/AKfycbwdOYjJbHn7z4vACVb0E5jIqi_ugbcjhcxR4FeIBCfyZqApc4rE4x6x2RguzcYGmeMx/exec
```

En `main.js` se encuentra configurada mediante:

```javascript
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwdOYjJbHn7z4vACVb0E5jIqi_ugbcjhcxR4FeIBCfyZqApc4rE4x6x2RguzcYGmeMx/exec";
```

---

## Prueba de disponibilidad del backend

El backend dispone de una acción de prueba:

```text
?action=health
```

Ejemplo:

```text
https://script.google.com/macros/s/AKfycbwdOYjJbHn7z4vACVb0E5jIqi_ugbcjhcxR4FeIBCfyZqApc4rE4x6x2RguzcYGmeMx/exec?action=health
```

La respuesta esperada es:

```json
{
  "success": true,
  "message": "API Baby Shower Melody activa"
}
```

---

## Google Sheets

El backend está conectado al archivo:

```text
BabyShower_Melody_Elianna
```

El archivo contiene dos pestañas:

```text
Confirmaciones
Resumen
```

---

## Pestaña `Confirmaciones`

Columnas:

```text
Nombre
Nombre_Normalizado
Asistentes
Primera_Confirmacion
Ultima_Actualizacion
```

### Nombre

Nombre introducido por el invitado.

Ejemplo:

```text
María Hernández
```

### Nombre_Normalizado

Campo utilizado internamente para identificar registros duplicados.

Ejemplo:

```text
maria hernandez
```

Esta columna puede permanecer oculta en Google Sheets.

### Asistentes

Número de personas confirmadas.

### Primera_Confirmacion

Fecha y hora en que se creó por primera vez el registro.

### Ultima_Actualizacion

Fecha y hora del último cambio realizado por el invitado.

---

## Pestaña `Resumen`

Muestra automáticamente:

- Confirmaciones recibidas.
- Total de asistentes.
- Última actualización.

Ejemplo:

```text
Baby Shower Melody Elianna

Confirmaciones recibidas    15
Total de asistentes         43
Última actualización        22/09/2026 22:17
```

---

## Control de duplicados

El sistema normaliza el nombre antes de buscar coincidencias.

Por ejemplo:

```text
María Hernández
maria hernandez
MARÍA HERNÁNDEZ
MARÍA   HERNÁNDEZ
```

se consideran el mismo registro.

La normalización:

- Elimina espacios adicionales.
- Convierte el texto a minúsculas.
- Elimina acentos.
- Conserva una única separación entre palabras.

Ejemplo:

```text
MARÍA   HERNÁNDEZ
```

se convierte en:

```text
maria hernandez
```

---

## Actualización de confirmaciones

Si el nombre normalizado no existe:

```text
Se crea una fila nueva.
```

Si el nombre normalizado ya existe:

```text
Se actualiza la misma fila.
```

El sistema:

- No crea un duplicado.
- Actualiza el nombre visible.
- Actualiza el número de asistentes.
- Conserva la primera fecha de confirmación.
- Actualiza la fecha de última modificación.

Ejemplo:

```text
Primera confirmación

María Hernández
3 asistentes
```

Posteriormente:

```text
MARÍA HERNÁNDEZ
5 asistentes
```

Resultado:

```text
Una sola fila
5 asistentes
Primera confirmación conservada
Última actualización modificada
```

---

## Protección de datos enviados a Sheets

El backend utiliza una función de sanitización para evitar que un nombre enviado por un visitante pueda interpretarse como una fórmula de Google Sheets.

Se protegen tanto:

```text
Nombre
Nombre_Normalizado
```

Los valores que comiencen con caracteres como:

```text
=
+
-
@
```

se almacenan como texto.

---

## Límite de asistentes

El número máximo configurado actualmente es:

```text
20 asistentes
```

Esta validación existe tanto en:

```text
main.js
```

como en:

```text
backend/Code.gs
```

---

## Fecha límite de confirmación

Las confirmaciones permanecerán abiertas durante todo el:

```text
25 de octubre de 2026
```

El bloqueo comienza el:

```text
26 de octubre de 2026
00:00 horas
```

La zona horaria utilizada es:

```text
America/Mexico_City
```

---

## Cuenta regresiva

La cuenta regresiva utiliza como fecha del evento:

```javascript
new Date("2026-11-08T14:00:00-06:00");
```

Muestra:

- Días.
- Horas.
- Minutos.
- Segundos.

Cuando el evento comienza, la cuenta regresiva se oculta y se muestra el mensaje correspondiente al día del evento.

---

## Música

La canción utilizada es:

```text
En mi corazón vivirás
```

Archivo:

```text
assets/audio/en-mi-corazon-viviras.mp3
```

El audio comienza después de que el usuario pulsa:

```text
Abrir invitación
```

Esto permite cumplir con las restricciones de reproducción automática de navegadores móviles y de escritorio.

El usuario dispone además de un control flotante para:

- Pausar.
- Reanudar.

El archivo de audio utiliza:

```html
preload="metadata"
```

para evitar cargar completamente el MP3 antes de que el usuario abra la invitación.

---

## Google Maps

El botón:

```text
Cómo llegar
```

abre directamente la ubicación del:

```text
Centro Social Pensamientos
```

Ubicación utilizada:

```text
Dentro de Unidad Habitacional Pensamientos
Pensamiento Manzana 034
Granjas San Pablo
54930 San Pablo de las Salinas
Tultitlán, Estado de México
```

---

## Vista previa de WhatsApp

La imagen utilizada para Open Graph y WhatsApp es:

```text
assets/images/vista-previa.jpg
```

Dimensiones:

```text
1734 × 907 px
```

URL pública esperada:

```text
https://babymelody.momentosvr.com.mx/assets/images/vista-previa.jpg
```

Los metadatos Open Graph están configurados en:

```text
index.html
```

con información del Baby Shower de Melody Elianna.

---

## Imágenes utilizadas

Principales recursos gráficos:

```text
assets/images/elefantita-portada.png
assets/images/elefantita-corazon.png
assets/images/globos.png
assets/images/nubes.png
assets/images/ositos.png
assets/images/decoracion-dorada.png
```

Fotografías:

```text
assets/images/noelia.webp
assets/images/papas.webp
assets/images/ultrasonido.webp
```

Vista previa:

```text
assets/images/vista-previa.jpg
```

---

## Animaciones

La invitación utiliza:

- Animaciones de entrada.
- Efectos al hacer scroll.
- Movimiento suave de elementos.
- Corazones flotantes.
- Estrellas flotantes.
- Lunas flotantes.
- Movimiento de los ositos.
- Transiciones de portada.
- Scroll suave después de confirmar.

Cuando el dispositivo tiene activada la preferencia:

```text
prefers-reduced-motion
```

se reducen o eliminan ciertas animaciones.

---

## Formulario de confirmación

Estados principales:

### Nueva confirmación

Ejemplo:

```text
¡Gracias, María Hernández!
Hemos registrado tu asistencia para 3 personas. 💕
```

### Actualización

Ejemplo:

```text
¡Gracias, MARÍA HERNÁNDEZ!
Hemos actualizado tu asistencia para 5 personas. 💕
```

### Durante el envío

El botón cambia temporalmente a:

```text
Confirmando...
```

y se muestra:

```text
Estamos registrando tu asistencia...
```

Esto también evita envíos duplicados mientras Google Apps Script procesa la solicitud.

---

## Flujo de confirmación

```text
Invitado
   │
   ▼
Formulario web
   │
   ├── Nombre
   └── Número de asistentes
   │
   ▼
main.js
   │
   ▼
Google Apps Script
   │
   ├── Valida información
   ├── Normaliza nombre
   ├── Busca coincidencias
   │
   ├── Registro nuevo
   │        │
   │        ▼
   │    Crea fila
   │
   └── Registro existente
            │
            ▼
       Actualiza fila
            │
            ▼
       Google Sheets
```

---

## Publicación

El proyecto está preparado para publicarse mediante:

```text
GitHub
GitHub Pages
Cloudflare
```

Dominio previsto:

```text
babymelody.momentosvr.com.mx
```

---

## Pruebas realizadas

Se han validado:

- Apertura de la invitación.
- Reproducción de música.
- Pausa y reanudación.
- Cuenta regresiva.
- Diseño de escritorio.
- Diseño móvil.
- Vista iPhone.
- Navegación entre secciones.
- Google Maps.
- Formulario de confirmación.
- Validación de nombre.
- Incremento de asistentes.
- Decremento de asistentes.
- Registro nuevo en Google Sheets.
- Actualización de registro existente.
- Normalización de nombres.
- Prevención de registros duplicados.
- Resumen automático.
- Google Apps Script Web App.
- Endpoint de salud.
- Mensajes de éxito.
- Manejo de errores.
- Vista previa Open Graph preparada.

---

## Respaldo

Antes de realizar cambios importantes se recomienda crear una copia de:

```text
index.html
styles.css
responsive.css
main.js
backend/Code.gs
```

Las versiones de trabajo pueden conservarse en:

```text
backup/
```

Esta carpeta es local y no necesita publicarse en producción.

---

## Recomendación de sincronización

Cuando se modifique el backend:

1. Editar Google Apps Script.
2. Guardar los cambios.
3. Crear una nueva versión de la implementación.
4. Mantener la misma URL `/exec`.
5. Copiar el código actualizado a:

```text
backend/Code.gs
```

6. Guardar el cambio en GitHub.

De esta manera Google Apps Script y el repositorio permanecen sincronizados.

---

## Estado actual del proyecto

```text
Diseño                         ✅
Responsive                     ✅
Música                         ✅
Cuenta regresiva               ✅
Google Maps                    ✅
Formulario                     ✅
Validaciones                   ✅
Google Apps Script             ✅
Google Sheets                  ✅
Control de duplicados          ✅
Resumen de asistentes          ✅
Seguridad básica de Sheets     ✅
Open Graph / WhatsApp          ✅
Backend local                  ✅
Pruebas funcionales            ✅
```

Pendiente:

```text
Publicación en GitHub
GitHub Pages
Configuración de babymelody.momentosvr.com.mx
Validación final de WhatsApp en producción
```

---

## Evento

**Baby Shower de Melody Elianna Martínez Mariscal**

Con mucho cariño:

**Noelia Mariscal & Jassiel Martínez**

Domingo 8 de noviembre de 2026 · 2:00 p. m.
