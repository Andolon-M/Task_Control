const express = require("express"); // Importa Express para crear el servidor
const morgan = require("morgan"); // Middleware para el registro de solicitudes HTTP
const passport = require("passport"); // Middleware para autenticación
const http = require("http"); // Importa el módulo HTTP para crear un servidor
const path = require("path"); // Utilidad para trabajar con rutas de archivos
const fileUpload = require("express-fileupload"); // Middleware para cargar archivos
const corsConfig = require("../middlewares/server/corsConfig.cjs"); // Configuración de CORS

const sessionConfig = require("../middlewares/server/sessionConfig.cjs"); // Configuración de sesiones
const usuariosRoutes = require("../../application/routes/usuariosRoutes.cjs"); // Rutas de usuarios
const activitiesRoutes = require("../../application/routes/activitiesRoutes.cjs"); 
const remindersRoutes = require("../../application/routes/remindersRoutes.cjs"); 
const goalsRoutes = require("../../application/routes/goalsRoutes.cjs"); 
const reportsRoutes = require("../../application/routes/reportsRoutes.cjs"); 

const {authenticateToken} = require("../../infrastructure/middlewares/authMiddleware.cjs");
const { jsonParseErrorHandler } = require("../middlewares/errorHandling.cjs"); // Middleware para manejar errores de JSON
const { limiTotal } = require("../middlewares/rateLimit.cjs"); // Middleware para limitar solicitudes

//* Función para crear y configurar el servidor Express
const createServer = () => {
  const app = express(); // Crea una nueva instancia de Express
  
  //* Configuración de la ruta estática para fotos de perfil
  app.use('/fotos-de-perfil', express.static(path.join(__dirname, '../../fotosPerfil'))); // Define la ruta para servir fotos de perfil
  
  // Middlewares
  app.use(corsConfig); // Middleware para configurar CORS
  app.use(express.json()); // Middleware para analizar JSON en las solicitudes
  app.use(morgan("dev")); // Middleware para registrar las solicitudes HTTP en modo desarrollo
  app.use(sessionConfig); // Middleware para la gestión de sesiones
  app.use(jsonParseErrorHandler); // Middleware para manejar errores en el análisis de JSON
  app.use(limiTotal); // Middleware para limitar el total de solicitudes
  app.use(express.urlencoded({ extended: true })); // Middleware para analizar datos URL-encoded
  app.use(passport.initialize()); // Inicializa Passport para la autenticación
  app.use(passport.session()); // Middleware para gestionar sesiones con Passport
  app.use(fileUpload()); // Middleware para manejar la carga de archivos
  
  // Rutas
  app.use("/usuarios", usuariosRoutes); // Configura las rutas para la gestión de usuarios
  app.use('/actividades', activitiesRoutes);
  app.use('/recordatorios', remindersRoutes);
  app.use('/objetivos', goalsRoutes);
  app.use('/reportes', reportsRoutes);
  
  //* Crear un servidor HTTP usando la aplicación Express
  const server = http.createServer(app); // Crea un servidor HTTP con la aplicación Express
  return server; // Retorna el servidor configurado
};

module.exports = createServer; // Exporta la función para su uso en otros módulos