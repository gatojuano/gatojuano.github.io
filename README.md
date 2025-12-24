# Regalo Romántico para Vicky 💕

Una página web interactiva y romántica con animaciones scroll-triggered, creada como regalo especial.

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos para instalar

1. **Navega a la carpeta del proyecto:**
```bash
cd proyecto
```

2. **Instala las dependencias:**
```bash
npm install
```

Esto instalará todas las dependencias necesarias:
- React y React DOM
- Vite (build tool)
- GSAP (animaciones)
- Motion (animaciones)
- OGL (WebGL para Galaxy)
- Three.js y React Three Fiber (para efectos 3D)

3. **Inicia el servidor de desarrollo:**
```bash
npm run dev
```

4. **Abre tu navegador en:**
```
http://localhost:5173
```

## 📁 Estructura del Proyecto

```
proyecto/
├── src/
│   ├── components/
│   │   ├── Galaxy/          # Efecto de galaxia inicial
│   │   ├── Airplane/         # Animación del avión Chile → Argentina
│   │   ├── TrueFocus/        # Mensajes ocultos con efecto de enfoque
│   │   ├── Masonry/          # Galería de fotos estilo masonry
│   │   ├── TextType/         # Efecto de escritura para la pregunta final
│   │   └── WhatsAppStats/    # Estadísticas de WhatsApp
│   ├── App.jsx               # Componente principal
│   ├── App.css               # Estilos principales
│   ├── main.jsx              # Punto de entrada
│   └── index.css             # Estilos globales
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Secciones de la Página

### 1. **Hero Section (Galaxy)**
- Efecto de galaxia animada con WebGL
- Mensaje: "Para: Vicky - Con amor, Juan"
- Se difumina al hacer scroll

### 2. **Sección del Avión**
- Animación scroll-triggered
- Avión que viaja de Chile a Argentina
- Representa la distancia entre ambos

### 3. **Mensajes Ocultos (True Focus)**
- Mensajes románticos que se revelan al pasar el mouse
- Efecto de blur/focus interactivo
- Puedes editar los mensajes en `App.jsx`

### 4. **Galería Masonry**
- Galería de fotos en estilo masonry
- Animaciones al hacer scroll
- **IMPORTANTE:** Reemplaza las URLs de ejemplo con tus propias fotos en `App.jsx`

### 5. **Estadísticas de WhatsApp**
- Muestra estadísticas de tu relación
- Puedes editar los números en `App.jsx`

### 6. **Pregunta Final (Text Type)**
- Efecto de escritura animada
- "¿Te quieres casar conmigo? (en broma 😄)"

## ✏️ Personalización

### Cambiar los mensajes románticos

Edita el array `romanticMessages` en `src/App.jsx`:

```jsx
const romanticMessages = [
  'Tu mensaje 1',
  'Tu mensaje 2',
  // ... más mensajes
];
```

### Agregar tus propias fotos

Reemplaza el array `masonryItems` en `src/App.jsx`:

```jsx
const masonryItems = [
  { id: '1', img: 'ruta/a/tu/foto1.jpg', height: 400 },
  { id: '2', img: 'ruta/a/tu/foto2.jpg', height: 300 },
  // ... más fotos
];
```

**Nota:** Puedes poner las fotos en la carpeta `public/` y referenciarlas como `/foto.jpg`

### Cambiar las estadísticas de WhatsApp

Edita el componente `WhatsAppStats` en `src/App.jsx`:

```jsx
<WhatsAppStats
  stats={{
    messages: '10,000+',
    days: '365',
    photos: '500+',
    calls: '200+'
  }}
/>
```

## 🏗️ Build para Producción

Para crear una versión optimizada para producción:

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`. Puedes desplegarlos en:
- Vercel
- Netlify
- GitHub Pages
- Cualquier servidor estático

### Desplegar en Vercel (Recomendado)

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Desde la carpeta `proyecto`:
```bash
vercel
```

3. Sigue las instrucciones en pantalla.

## 🎯 Comandos Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Crea la versión de producción
- `npm run preview` - Previsualiza la versión de producción

## 💡 Sugerencias

1. **Fondos:** Puedes agregar fondos degradados o imágenes de fondo en cada sección editando los CSS.

2. **Colores:** Los colores principales están en `App.css`. Puedes cambiarlos para que coincidan con tu estilo.

3. **Animaciones:** Todas las animaciones usan GSAP. Puedes ajustar las velocidades y efectos en cada componente.

4. **Responsive:** La página está optimizada para móviles, pero puedes ajustar los breakpoints en los CSS.

## 🐛 Solución de Problemas

### Error al instalar dependencias
- Asegúrate de tener Node.js 16+ instalado
- Intenta borrar `node_modules` y `package-lock.json`, luego ejecuta `npm install` de nuevo

### Las animaciones no funcionan
- Verifica que todas las dependencias estén instaladas
- Revisa la consola del navegador para errores

### Las fotos no se cargan
- Verifica que las rutas de las imágenes sean correctas
- Asegúrate de que las imágenes estén en la carpeta `public/` o que las URLs sean válidas

## 📝 Notas Finales

- Esta es una página de una sola página (SPA) con scroll suave
- Todas las animaciones están optimizadas para rendimiento
- El código está organizado en componentes reutilizables
- Puedes agregar más secciones fácilmente siguiendo el mismo patrón

¡Disfruta creando este regalo especial! 💕







