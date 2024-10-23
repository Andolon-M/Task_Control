### 1. Clonar el repositorio

Si no lo has hecho aún, clona el repositorio del proyecto en tu máquina local:


### 3. Configurar variables de entorno

El proyecto utiliza un archivo `.env` para gestionar variables de entorno. Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes configuraciones basadas en las credenciales proporcionadas:


### 4. Instalar dependencias

Dirígete a la carpeta del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
cd healthy_food 
npm install
```

### 5. Ejecutar el proyecto en modo desarrollo

Para ejecutar tanto el backend como el fronend puede usar el sigueinte comando:

```bash
npm run serve
```

Esto inicia el servidor de desarrollo y puedes acceder a la aplicación en tu navegador en:

```
http://localhost:3000
```

Si `VITE_USE_TUNNEL` está en `"true"`, usa la URL del túnel definida en `VITE_TUNNEL_URL_FRONTEND`.



### 10. Configuración del proxy

El archivo de configuración `vite.config.js` redirige todas las solicitudes que comiencen con `/api` al servidor backend (ya sea local o remoto). Esto facilita el desarrollo sin problemas de CORS, ya que todas las peticiones al backend pasan por el servidor de Vite.

### Comandos de npm importantes

- `npm run dev`: Inicia el servidor de desarrollo de Vite.
- `npm run server`: Inicia el servidor frontend y backend simultáneamente.
- `npm run build`: Genera la aplicación optimizada para producción.
- `npm run preview`: Previsualiza la aplicación construida.
- `npm run start`: Ejecuta solo el servidor backend.

### Consideraciones sobre túneles

Si necesitas exponer tu aplicación a través de un túnel, puedes activar la variable `VITE_USE_TUNNEL` en tu archivo `.env` y configurar las URLs del túnel correspondientes para el frontend y backend.



### Apis:

para obtener los productos por el metodo get:

```
http://localhost:3001/products/
```

para crear un usuario por el metodo post

```
http://localhost:3001/users/
```

para logearse con usuario y contraseña por el metodo post

```
http://localhost:3001/users/login
```



### Archivo `vite.config.js`:

```js
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  // Cargar las variables de entorno según el modo (development, production, etc.)
  const env = loadEnv(mode, process.cwd());

  // Definir la URL de la API (usar túnel si está activado)
  const apiUrl = env.VITE_USE_TUNNEL === 'true'
    ? env.VITE_TUNNEL_URL_BACKEND // Usar la URL del túnel para el backend
    : `http://${env.VITE_HOST || 'localhost'}:${env.VITE_PORT_BACKEND || '3001'}`; // URL local del backend

  console.log('API URL:', apiUrl);

  return {
    plugins: [vue()],
    server: {
      host: env.VITE_HOST || 'localhost',
      port: env.VITE_PORT_FRONTEND || 3000,
      proxy: {
        '/api': {
          target: apiUrl,  // Redirigir las solicitudes a la API al backend
          changeOrigin: true,  // Cambiar el origen de la solicitud al backend
          rewrite: (path) => path.replace(/^\/api/, ''),  // Reemplazar el prefijo '/api' en las rutas
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('Proxying request to:', proxyReq.getHeader('host') + proxyReq.path);
            });
          },
        },
      },
    },
    define: {
      // Definir variables de entorno en el cliente
      'process.env': {
        VITE_EXPRESS_EXPIRE: env.VITE_EXPRESS_EXPIRE,
        VITE_HTTP_BACKEND: env.VITE_HTTP_BACKEND,
        VITE_HTTP_FRONTEND: env.VITE_HTTP_FRONTEND,
        VITE_MONGO_USER: env.VITE_MONGO_USER,
        VITE_MONGO_PWD: env.VITE_MONGO_PWD,
        VITE_MONGO_HOST: env.VITE_MONGO_HOST,
        VITE_MONGO_PORT: env.VITE_MONGO_PORT,
        VITE_MONGO_DB_NAME: env.VITE_MONGO_DB_NAME,
        GITHUB_CLIENT_ID: env.GITHUB_CLIENT_ID,
        GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID,
        DISCORD_CLIENT_ID: env.DISCORD_CLIENT_ID
      }
    }
  };
});
```

### Explicación:
1. **Uso de túnel o conexión local**: La variable `VITE_USE_TUNNEL` decide si se usa la URL del túnel o el servidor local (`localhost`) para la API del backend. Si `VITE_USE_TUNNEL` está en `"true"`, se usará la URL del túnel (`VITE_TUNNEL_URL_BACKEND`), de lo contrario, se conectará a `http://localhost:3001` o la URL que indiques en las variables de entorno.

2. **Proxy del backend**: Se configura el proxy para redirigir todas las solicitudes que comiencen con `/api` al servidor backend (ya sea local o con túnel).

3. **Variables de entorno en el cliente**: Se definen varias variables de entorno como `VITE_MONGO_USER`, `VITE_HTTP_BACKEND`, etc., para que estén disponibles en el cliente.

4. **Reescritura de rutas**: En el proxy, se elimina el prefijo `/api` de las rutas antes de reenviarlas al backend, lo que facilita que el servidor backend no tenga que manejar ese prefijo.

### Consideraciones adicionales:
- **Puerto del frontend**: El servidor de Vite se ejecuta en el puerto `3000` (o el definido por la variable `VITE_PORT_FRONTEND`).
- **Puerto del backend**: El proxy redirige las solicitudes al backend en el puerto `3001` (o el definido por `VITE_PORT_BACKEND`).
- **Uso del túnel**: Si deseas habilitar el túnel para desarrollo remoto, simplemente cambia `VITE_USE_TUNNEL` a `"true"` en tu archivo `.env`.
