### 1. Clonar el repositorio

Si no lo has hecho aún, clona el repositorio del proyecto en tu máquina local:


### 3. Configurar variables de entorno

El proyecto utiliza un archivo `.env` para gestionar variables de entorno. Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes configuraciones basadas en las credenciales proporcionadas:


### 4. Instalar dependencias

Dirígete a la carpeta del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
cd Task_Control 
npm i
```

### 5. Ejecutar el proyecto en modo desarrollo

Para ejecutar tanto el backend como el fronend puede usar el sigueinte comando:

```bash
npm run start
```

Esto inicia el servidor de desarrollo y puedes acceder a la aplicación en tu navegador en:

```
http://localhost:3001
```

### Comandos de npm importantes

- `npm run dev`: Inicia el servidor de desarrollo de Vite.
- `npm run start`: Ejecuta solo el servidor backend.



apis:

api para crear una actividad: POST localhost:3001/actividades/

datos a quemar

nota:  el id del usuario es tomado del usuario autenticado en la sesion

```
{
  "nombre": "Hacer la compra", 
  "descripcion": "Comprar alimentos y productos de limpieza.",
  "prioridad": "alta",
  "fecha_inicio": "2024-10-24T11:00:00Z",
  "fecha_fin": "2024-10-24T12:00:00Z"
}
```



api para asignar una etiqueta a la actividad: POST: ``actividades/:idActivity/etiquetas/:label``

ejemplo de datos a quemar:

nota: asegúrese de haber creado una actividad antes

```
/actividades/6719d6f303ecfd72acbed175/etiquetas/fiesta
```



api para obtener las etiquetas asignadas a una actividad: GET: ``actividades/:idActivity/etiquetas/``

ejemplo de consulta:

```
http://localhost:3001/actividades/6719d6f303ecfd72acbed175/etiquetas/
```

