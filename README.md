# The Training Compass / La Brújula del Entrenamiento

Página estática (HTML, CSS y JavaScript sin frameworks) para descargar gratis los cuatro PDF de la Brújula del Entrenamiento. Sin registro, sin formularios y sin servicios externos: la fuente y las imágenes van incluidas en el proyecto.

## Estructura

```
training-compass/
├── index.html                  Página única
├── .nojekyll                   Le indica a GitHub Pages que sirva los archivos tal cual
├── README.md
├── assets/
│   ├── css/styles.css
│   ├── js/main.js              Cambio de idioma y traducciones de la página
│   ├── fonts/                  Archivo (variable, licencia OFL incluida)
│   └── img/
│       ├── favicon.svg
│       └── covers/             Miniaturas de la primera página de cada PDF
└── resources/
    ├── en/
    │   ├── training_compass_guide_en.pdf
    │   └── training_compass_workbook_en.pdf
    └── es/
        ├── brujula_entrenamiento_guia_es.pdf
        └── brujula_entrenamiento_cuaderno_es.pdf
```

Todas las rutas son relativas, así que la página funciona igual en `https://usuario.github.io/nombre-del-repo/` que en un dominio propio.

## Antes de publicar: tu Instagram

En `index.html`, busca `YOUR_INSTAGRAM_HANDLE` y reemplázalo por tu usuario de Instagram, sin la arroba. Es el único dato pendiente.

## Actualizar un PDF

Los cuatro PDF ya están en `resources/`. Para cambiar uno por una versión nueva:

1. Reemplaza el archivo en `resources/en/` o `resources/es/` **con el mismo nombre**.
2. Si cambió el número de páginas o el tamaño, actualiza la línea `doc__meta` de ese documento en `index.html`.
3. Si cambió la portada, regenera la miniatura (opcional), por ejemplo con Poppler:
   ```
   pdftoppm -f 1 -l 1 -jpeg -scale-to-x 420 -scale-to-y -1 -singlefile resources/es/brujula_entrenamiento_guia_es.pdf assets/img/covers/brujula_entrenamiento_guia_es
   ```

Si prefieres otro nombre de archivo, cámbialo también en los tres lugares donde aparece dentro de `index.html` (`href` del botón, `download` y el enlace «Abrir en el navegador»).

## Probar en tu computadora

Abre una terminal en la carpeta del proyecto y ejecuta:

```
python3 -m http.server 8000
```

Luego visita `http://localhost:8000`. Revisa:

- Que los botones English / Español cambien los documentos y el texto de la página.
- Que los cuatro botones de descarga bajen su PDF.
- `http://localhost:8000/?lang=es` abre directamente en español.
- En el celular: con la computadora y el teléfono en la misma red wifi, abre `http://IP-DE-TU-COMPUTADORA:8000`.

## Publicar en GitHub Pages (gratis)

1. Crea un repositorio público en GitHub, por ejemplo `training-compass`.
2. Sube **el contenido** de esta carpeta a la raíz del repositorio (que `index.html` quede en la raíz). Puedes arrastrar los archivos en «Add file → Upload files» o usar git:
   ```
   git init
   git add .
   git commit -m "Landing de la Brújula del Entrenamiento"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/training-compass.git
   git push -u origin main
   ```
3. En el repositorio: **Settings → Pages → Build and deployment**. En «Source» elige *Deploy from a branch*, rama `main`, carpeta `/ (root)`, y guarda.
4. En uno o dos minutos la página estará en `https://TU-USUARIO.github.io/training-compass/`.

## Enlace para la historia de Instagram

- Español: `https://TU-USUARIO.github.io/training-compass/?lang=es`
- Inglés: `https://TU-USUARIO.github.io/training-compass/?lang=en`

Sin `?lang`, la página elige el idioma del teléfono del visitante y recuerda su última elección.

## Notas

- Sin JavaScript, la página muestra los cuatro documentos a la vez, así que las descargas siempre funcionan.
- En iPhone, Safari a veces abre el PDF en lugar de descargarlo; desde ahí se guarda con el botón de compartir. Por eso cada documento tiene también «Abrir en el navegador».
- Respeta el modo oscuro del dispositivo y la preferencia de movimiento reducido.
