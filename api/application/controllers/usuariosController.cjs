// Importa los módulos necesarios para la gestión de usuarios.
const { validationResult } = require("express-validator");
const UserService = require("../services/usuariosService.cjs");
const bcrypt = require("bcryptjs");
const jwtUtils = require("../../utils/jwtUtils.cjs");

/**
 * Clase UserController que gestiona las peticiones HTTP relacionadas con usuarios.
 */
class UserController {
  constructor() {
    this.userService = new UserService(); // Inicializa el servicio de usuarios.
  }

  /**
   * Obtiene todos los usuarios.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async getUsers(req, res) {
    try {
      const users = await this.userService.getUsers();
      if (!users) {
        return res.status(404).json({ message: "Users not found" });
      }

      res.status(200).json(users);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  /**
   * Obtiene un usuario específico por su ID.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async getUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const user = await this.userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  /**
   * Busca un usuario por su ID.
   * @param {string} userId - El ID del usuario a buscar.
   * @returns {Promise<Object|null>} - Devuelve el usuario encontrado o null si no existe.
   */
  async findUserById(userId) {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return null; // No se encontró el usuario
      }
      return user; // Retorna el usuario encontrado
    } catch (error) {
      throw new Error("Error al obtener el usuario"); // Manejo de errores
    }
  }

  /**
   * Crea un nuevo usuario.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async createUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      // Encripta la contraseña antes de guardarla

      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;

      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  /**
   * Actualiza un usuario específico por su ID.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async updateUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const user = await this.userService.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  /**
   * Actualiza un usuario específico por su ID.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async updateUserForms(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const user = await this.userService.updateUserForm(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  /**
   * Actualiza un usuario por su ID y datos proporcionados.
   * @param {string} userId - El ID del usuario a actualizar.
   * @param {Object} updatedData - Los nuevos datos del usuario.
   * @returns {Promise<Object|null>} - Devuelve el usuario actualizado o null si no se encontró.
   */
  async updateUserById(userId, updatedData) {
    try {
      const user = await this.userService.updateUserForm(userId, updatedData);
      if (!user) {
        return null; // Retorna null si no encuentra el usuario
      }
      return user; // Retorna el usuario actualizado
    } catch (error) {
      throw new Error("Error al actualizar el usuario"); // Lanza un error para que lo maneje el llamador
    }
  }

  /**
   * Elimina un usuario específico por su ID.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async deleteUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const user = await this.userService.deleteUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }


  async passportLogin(req, res) {
    try {
      const userData = req.user;
      const token = jwtUtils.generateToken(userData);

      req.session.token = token;
      return { token, userData };
    } catch (error) {
      console.error(error);
      return { error: "Error al autenticarse" };
    }
  }

  /**
   * Maneja la respuesta de inicio de sesión y redirige al usuario.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @param {string} redireccion - La URL a la que redirigir.
   * @returns {Promise<void>}
   */
  async handlePassportLogin(req, res, redireccion) {
    const result = await this.passportLogin(req, res);

    if (res.headersSent) return;

    if (result.error) {
      return res.status(500).json({ message: result.error });
    }

    req.session.token = result.token;

    const redirectUrl = process.env.VITE_USE_TUNNEL === "true"
      ? process.env.VITE_TUNNEL_URL_FRONEND
      : process.env.VITE_HTTP_FRONTEND; // Utiliza la URL de backend según la variable de entorno

    res.status(200).send(`<!DOCTYPE html>
        <html lang="en">
        <body></body>
        <script>
            if (window.opener) {
                window.opener.location.href = '${redirectUrl}/${redireccion}';
                window.close();
            } else {
                console.error('No opener window found.');
            }
        </script>
        </html>`);
  }


  /**
   * Inicia sesión un usuario.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async login(req, res) {
    try {
      const { userName, password } = req.body;
      if (!userName) return res.status(401).json({ message: 'user not found' });
      const userExiste = await this.userService.getUserbyUserName(userName)
      if (userExiste?.status === 404) return res.status(404).json({ message: "Usuario no encontrado" })

      const isMatch = await bcrypt.compare(password, userExiste?.contrasena_hash);
      console.log(isMatch);
      if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" }) 

      const token = jwtUtils.generateToken(userExiste);
      const user = userExiste.id;
      req.session.passport = { user: user };
      req.session.token = token;

      res.status(200).json({ token, userExiste, message: "Login Exitoso" });

    } catch (error) {

    }
  }



  async logout(req, res) {
    try {
      // Limpiar la cookie del token
      res.clearCookie("connect.sid", {
        httpOnly: false,
        secure: "false",
        domain: "localhost",
        sameSite: "strict",
      });
      // Destruir la sesión y enviar la respuesta solo cuando se complete
      req.session.destroy((err) => {
        if (err) {
          console.error("Error al destruir la sesión:", err);
          return res.status(500).json({ message: "Error al cerrar la sesión" });
        }

        res.status(200).send(
        `<!DOCTYPE html>
        <html lang="en">
        <body></body>
        <script>
            if (window.opener) {
                window.opener.location.href = 'http://localhost:3000/';
                window.close();
            } else {
                console.error('No opener window found.');
            }
        </script>
        </html>`);

      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }


}

// Exporta la clase UserController para su uso en otras partes de la aplicación.
module.exports = UserController;