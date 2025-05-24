# Centro Cultural Batahola Norte (CCBN) – Estructura y Guía de Desarrollo

Este repositorio contiene la estructura, diseño y listados de tareas para el desarrollo de la web institucional de CCBN con Next.js.

---

## 📁 Estructura de Carpetas

```markdown
├── public
│   ├── assets
│   │   ├── logo.svg
│   │   └── clouds.svg
│   └── ico.svg
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── auth.ts       # rutas de autenticación (/api/auth)
│   │   │   └── upload.ts     # subida de imágenes (/api/upload)
│   │   ├── layout.tsx        # Server layout + metadata
│   │   ├── page.tsx          # Home page (/)
│   │   ├── cursos
│   │   │   └── page.tsx      # Página de cursos (/cursos)
│   │   └── globals.css       # Tailwind base, scroll-behavior, variables CSS
│   ├── components
│   │   ├── Navbar.tsx
│   │   ├── SmoothWrapper.tsx
│   │   ├── HeroBanner.tsx
│   │   └── Footer.tsx
│   └── styles
│       ├── tailwind.config.ts
│       └── postcss.config.js
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🗂️ Páginas & Secciones

1. **INICIO** (`/`):
    - Header (Logo + Menú: INICIO, NOSOTROS, PROGRAMAS, CURSOS, NOVEDADES, CONTACTO)
    - HeroBanner con GSAP + nube SVG con parallax
    - Bloque “Valores” (Humanidad, Igualdad, Empoderamiento)


2. **NOSOTROS** (`/nosotros`):
    - “¿Quiénes somos?” + visual decorativo
    - Línea de tiempo: Historia en columnas
    - Galería de imágenes
    - Botón de contacto


3. **PROGRAMAS** (`/programas`):
    - “Líneas de trabajo” con 3 tarjetas (Educación, Arte y Cultura, Integridad)
    - Carrusel de imágenes
    - Botón “Contáctanos”


4. **CURSOS** (`/cursos`):
    - Título “APRENDE CON NOSOTROS”
    - Lista de cursos con íconos y botones “LEER MÁS”
    - Botón central “Contáctanos”
    - Footer institucional


5. **MÚSICA** (`/cursos/musica`):
    - Cabecera “Música”
    - Tarjetas de curso (Piano, Violín…) con datos clave y botón de contacto


6. **CONOCE MÁS DE NUESTRAS AVENTURAS** (`/aventuras`):
    - Encabezado + imagen decorativa
    - Módulos en cuadrícula con “Leer más” y carrusel


7. **NOTA O NOTICIA MULTIMEDIA** (`/novedades/[slug]`):
    - Título destacado
    - Video + texto editorial en columnas
    - Carrusel de imágenes


8. **CONTÁCTANOS** (`/contacto`):
    - Hero con fondo de nubes + título
    - Bloque de información (teléfono, WhatsApp, redes, mapa embed)
    - Formulario “QUEREMOS ESCUCHARTE”

---

## 🎨 Guía de Estilo & Justificación

- **Colores institucionales**:
    - Azul (`#293379`), Verde (`#68A32F`), Amarillo (`#FFD402`), Rojo (`#E32047`), Blanco, Gris, Negro.
  

- **Tipografía**: Poppins (400–700) con escala responsiva.


- **Formas**: esquinas redondeadas, iconografía clara.


- **Layout**: modular y vertical para facilitar actualizaciones y responsividad.

---

## ✅ Tareas Generales


### 1. Configurar Entorno
-  Inicializar proyecto Next.js con TypeScript y Turbopack
-  Instalar y configurar Tailwind CSS v4 (CSS-first)
-  Instalar y configurar Autoprefixer 

---

### 2. Autenticación y Portal de Administración
-  Elegir solución de Auth (NextAuth o Firebase Auth)
-  Instalar paquete de Auth (`npm install next-auth` o `firebase`)
-  Configurar proveedores (Google, email/password, etc.)
-  Definir modelo de usuario con roles (`admin`, `editor`)
-  Implementar middleware o `getServerSideProps` para proteger rutas `/admin`
-  Crear dashboard de administración bajo `src/app/admin`
-  Añadir logout, manejo de sesión y control de acceso

---

### 3. Sistema de Subida de Imágenes
-  Crear ruta API `src/app/api/upload/route.ts`
    -  Validar tipo (SVG, PNG, JPG) y tamaño máximo
    -  Guardar archivos en `public/assets` o servicio externo (S3, Firebase Storage)
    -  Devolver URL pública en la respuesta JSON
   

-  Crear formulario React en `src/app/admin/upload/page.tsx`
    -  Input de tipo `file` con preview de imagen
    -  Botón “Subir” con estado de carga y manejo de errores
    -  Asociar subida a sección destino (e.g. galería, slider de programas)

---

### 4. Desarrollo de Componentes
- **Navbar** (`components/Navbar.tsx`)
    - Estructura desktop + logo + menu
    - Menú hamburguesa responsive (`HiMenu`/`HiX`)
    - Animación de apertura (`scale-y`)


- **HeroBanner** (`components/HeroBanner.tsx`)
    - Texto responsivo (`text-3xl md:text-5xl`)
    - Nube SVG responsiva con escala móvil (`scale-[3] md:scale-100`)
    - Parallax GSAP (`ScrollTrigger`)


- **Sección Valores**
    - Tres tarjetas: Humanidad, Igualdad, Empoderamiento


- **Timeline Historia**
    - Grid o timeline vertical con hitos en columnas


- **Galería de Imágenes**
    - Grid responsivo + lightbox (react-image-lightbox o similar)
    - Lazy loading de cada imagen


- **Tarjetas Programas & Cursos**
    - Ícono + título + botón (“Leer más”)
    - Carrusel con Swiper.js o Embla Carousel


- **Noticias Multimedia**
    - Video embed + texto en columnas
    - Carrusel de imágenes asociado


- **Sección Contacto**
    - Formulario con validación (React Hook Form / Zod)
    - Integración de mapa embed (Google Maps / Leaflet)


- **Footer**
    - Links institucionales, redes sociales, copyright

---

### 5. Optimización & Accesibilidad
-  Añadir atributos ARIA a botones y menús
-  Verificar responsive en version mobile y dispositivos con pantallas grandes
-  Usar `<Image loading="lazy">` o Next/Image para optimizar fotos

---

## 🚀 Instalación y Ejecución

```bash
# Instala dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
```

## Abre http://localhost:3000 para ver la aplicación.
