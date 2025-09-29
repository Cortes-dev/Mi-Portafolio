# 💼 Mi Portafolio Personal

Un sitio web de portafolio moderno y responsive construido con React, GSAP y Tailwind CSS. Presenta mis habilidades, proyectos y experiencia como desarrollador Full Stack.

![Portfolio Preview](/public/Img.png)

## ✨ Características

- **Diseño Moderno**: Interfaz limpia y profesional con gradientes suaves
- **Animaciones Fluidas**: Efectos de blur text letra por letra con GSAP
- **Completamente Responsive**: Optimizado para desktop, tablet y móvil
- **PWA Ready**: Configurado como Progressive Web App
- **SEO Optimizado**: Meta tags y estructura semántica
- **Modo Oscuro**: Soporte para preferencias del usuario
- **Rendimiento Optimizado**: Lazy loading y optimizaciones de Vite

## 🚀 Demo en Vivo

[Ver Portafolio](https://tu-dominio.com) <!-- Actualiza con tu URL -->

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Biblioteca de JavaScript para interfaces de usuario
- **Vite 7** - Herramienta de construcción rápida
- **Tailwind CSS 4** - Framework de CSS utilitario
- **GSAP 3** - Biblioteca de animaciones profesionales

### Librerías y Herramientas
- **EmailJS** - Servicio de email sin backend
- **React Hook Form** - Manejo de formularios performante
- **Lucide React** - Iconos modernos y consistentes
- **React Helmet Async** - Gestión del head del documento
- **Sonner** - Notificaciones toast elegantes
- **Lottie Player** - Animaciones de Lottie

### Desarrollo
- **ESLint** - Linter para JavaScript/React
- **Docker** - Containerización para deployment
- **pnpm** - Gestor de paquetes rápido y eficiente

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 20+ o 22.12+
- pnpm (recomendado) o npm

### Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/portafolio.git

# Navegar al directorio
cd portafolio

# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm dev
```

### Configuración

1. **Variables de Entorno**: Copia las variables de `src/config/Variables.js` y personalízalas:

```javascript
const SITE = {
  name: "Tu Nombre",
  title: "Desarrollador Full Stack",
  summary: "Tu descripción profesional...",
  // ... más configuraciones
};
```

2. **Configurar EmailJS**: 
   - Crea una cuenta en [EmailJS](https://www.emailjs.com/)
   - Configura tu servicio de email
   - Actualiza las credenciales en el componente de contacto
