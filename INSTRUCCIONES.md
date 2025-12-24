# 🚀 Instrucciones Rápidas

## Paso 1: Instalar Dependencias

Abre una terminal en la carpeta `proyecto` y ejecuta:

```bash
npm install
```

Esto puede tardar unos minutos. Si hay errores, intenta:

```bash
npm install --legacy-peer-deps
```

## Paso 2: Iniciar el Servidor

```bash
npm run dev
```

Abre tu navegador en: **http://localhost:5173**

## Paso 3: Personalizar el Contenido

### Cambiar Mensajes Románticos

Abre `src/App.jsx` y busca el array `romanticMessages`. Edita los mensajes:

```jsx
const romanticMessages = [
  'Tu mensaje personalizado 1',
  'Tu mensaje personalizado 2',
  // ... más mensajes
];
```

### Agregar Tus Fotos

1. Coloca tus fotos en la carpeta `public/`
2. En `src/App.jsx`, busca `masonryItems` y reemplaza las URLs:

```jsx
const masonryItems = [
  { id: '1', img: '/tu-foto-1.jpg', height: 400 },
  { id: '2', img: '/tu-foto-2.jpg', height: 300 },
  // ... más fotos
];
```

### Cambiar Estadísticas de WhatsApp

En `src/App.jsx`, busca el componente `<WhatsAppStats>` y edita los números:

```jsx
<WhatsAppStats
  stats={{
    messages: '10,000+',  // Cambia estos números
    days: '365',
    photos: '500+',
    calls: '200+'
  }}
/>
```

## Paso 4: Ver Cambios en Tiempo Real

El servidor de desarrollo se recarga automáticamente cuando guardas cambios. Solo guarda el archivo y verás los cambios inmediatamente.

## Paso 5: Crear Versión para Producción

Cuando estés listo para desplegar:

```bash
npm run build
```

Los archivos optimizados estarán en la carpeta `dist/`.

## 💡 Tips

- **Fondos:** Puedes cambiar los colores de fondo en `src/App.css`
- **Velocidad de animaciones:** Ajusta los valores en cada componente
- **Responsive:** La página se adapta automáticamente a móviles

## 🐛 Problemas Comunes

**Error al instalar:**
- Asegúrate de tener Node.js 16+ instalado
- Intenta: `npm install --legacy-peer-deps`

**Las animaciones no funcionan:**
- Verifica la consola del navegador (F12)
- Asegúrate de que todas las dependencias estén instaladas

**Las fotos no se ven:**
- Verifica que las rutas sean correctas (deben empezar con `/`)
- Asegúrate de que las imágenes estén en la carpeta `public/`

## 📦 Desplegar

### Opción 1: Vercel (Más Fácil)

1. Instala Vercel CLI: `npm i -g vercel`
2. Desde la carpeta `proyecto`: `vercel`
3. Sigue las instrucciones

### Opción 2: Netlify

1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta `dist/` (después de `npm run build`)
3. ¡Listo!

### Opción 3: GitHub Pages

Ver el README.md completo para instrucciones detalladas.

---

¡Disfruta creando este regalo especial! 💕







