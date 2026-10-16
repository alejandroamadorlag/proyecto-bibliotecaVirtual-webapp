# Biblioteca Alameda — Frontend (Webapp)

Aplicación web (SPA) del sistema de gestión bibliotecaria **Biblioteca Alameda**. Desarrollada con **Angular 22** usando componentes *standalone* y **Angular Material**, consume la API REST del backend (Django REST Framework + PostgreSQL) para administrar autores, géneros, libros, clientes, bibliotecarios y préstamos, con autenticación por token y manejo de roles.

## 🛠️ Tecnologías

- **Angular** 22 (componentes standalone, control de flujo `@if` / `@for`)
- **TypeScript**
- **Angular Material** + **CDK** — tablas, diálogos, formularios, autocompletado, paginador
- **ng2-charts** + **Chart.js** + **chartjs-plugin-datalabels** — gráficas de la pantalla de actividad
- **Bootstrap 5** + **Bootstrap Icons** — rejilla utilitaria e iconografía
- **ngx-cookie-service** — manejo de sesión (token y datos del usuario en cookies)
- **ngx-mask** — máscaras de entrada (teléfono, etc.)
- **RxJS** — manejo de peticiones HTTP asíncronas

## ✨ Funcionalidades

- Inicio de sesión por token y manejo de roles (**bibliotecario** / **cliente**).
- **Panel de inicio** con saludo dinámico y contadores (libros, préstamos en proceso, clientes, bibliotecarios, géneros y autores). El cliente solo ve el total de libros.
- CRUD completo de **autores**, **géneros**, **libros**, **clientes** y **bibliotecarios**, con modales de registro/edición y **baja lógica** (`is_active = 0`) para poder recuperar registros.
- **Préstamos** en una sola tabla (en proceso + historial) con registro y registro de devolución.
- **Buscador** y **paginación** en todas las tablas.
- **Actividad**: gráfica de barras de clientes más activos y gráfica de pastel de los 5 libros más prestados.
- Vistas adaptadas por rol (el cliente tiene acceso limitado).

## 📋 Requisitos previos

- **Node.js** 20 o superior y **npm**
- **Angular CLI** 22 (`npm install -g @angular/cli`)
- El **backend** de Biblioteca Alameda corriendo (por defecto en `http://127.0.0.1:8000/`)

## 🚀 Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/alejandroamadorlag/proyecto-bibliotecaVirtual-webapp.git
cd proyecto-bibliotecaVirtual-webapp
```

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Configurar la URL de la API

La aplicación apunta al backend mediante el archivo de entorno `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  url_api: "http://127.0.0.1:8000"
};
```

Ajusta `url_api` si tu backend corre en otra dirección o puerto.

### 4. Levantar el servidor de desarrollo

```bash
ng serve
```

La aplicación queda disponible en `http://localhost:4200/`. Recarga automáticamente al guardar cambios.

### 5. Compilar para producción

```bash
ng build
```

Los artefactos se generan en la carpeta `dist/`.

## 🗂️ Estructura del proyecto

```
proyecto-bibliotecaVirtual-webapp/
├── angular.json
├── package.json
└── src/
    ├── environments/            # Configuración de entornos (url_api)
    ├── styles.scss              # Estilos globales (overlays de Material, etc.)
    └── app/
        ├── app.config.ts        # Providers (router, http, Material, charts)
        ├── app.routes.ts        # Rutas de la aplicación
        ├── screens/             # Pantallas
        │   ├── login-screen/
        │   ├── home-screen/     # Layout: sidebar + topbar + <router-outlet>
        │   ├── inicio-screen/   # Panel con contadores
        │   ├── autores-screen/
        │   ├── generos-screen/
        │   ├── libros-screen/
        │   ├── clientes-screen/
        │   ├── usuarios-screen/
        │   ├── prestamos-screen/
        │   ├── actividad-screen/ # Gráficas (ng2-charts)
        │   └── registro-screen/  # Alta/edición de clientes y bibliotecarios
        ├── partials/            # Componentes reutilizables
        │   ├── sidebar/
        │   ├── registro-cliente/
        │   └── registro-biblio/
        ├── modals/              # Diálogos de registro y eliminación
        │   ├── registro-autor/  registro-genero/  registro-libro/  registrar-prestamo/
        │   └── eliminar-autor/  eliminar-genero/  eliminar-libro/  eliminar-cliente/
        │                         eliminar-usuario/ eliminar-prestamo/
        └── services/
            ├── facade.ts        # Sesión, cookies, login/logout, validación de login
            ├── api/             # Servicios HTTP por entidad
            │   ├── autores.ts  generos.ts  libros.ts  clientes.ts
            │   ├── bibliotecarios.ts  prestamos.ts  dashboard.ts
            └── tools/           # validator.ts, errors.ts
```

## 🧭 Rutas principales

| Ruta | Pantalla | Acceso |
|---|---|---|
| `/` | Inicio de sesión | Público |
| `/home/inicio` | Panel de inicio (contadores) | Autenticado |
| `/home/autores` · `/home/generos` · `/home/libros` | Catálogos | Bibliotecario |
| `/home/clientes` · `/home/usuarios` | Comunidad y bibliotecarios | Bibliotecario |
| `/home/prestamos` | Gestión de préstamos | Bibliotecario |
| `/home/actividad` | Gráficas de actividad | Bibliotecario |
| `/home/registro` | Alta/edición de clientes y bibliotecarios | Bibliotecario |

> La sesión (token y datos del usuario) se guarda en cookies vía `FacadeService`. Las pantallas validan el token y, según el rol, muestran u ocultan acciones.

## 🔗 Backend

Esta aplicación consume la API REST del proyecto, desarrollada con **Django REST Framework + PostgreSQL**:
https://github.com/alejandroamadorlag/proyecto-bibliotecaVirtual-api.git
