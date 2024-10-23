// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require("express");
const UserController = require("../controllers/usuariosController.cjs");
const UserValidator = require("../validator/usuariosValidator.cjs");
const path = require("path");
const fs = require("fs");

const {
  authenticateToken
} = require("../../infrastructure/middlewares/authMiddleware.cjs");
const passportGoogle = require("../../infrastructure/middlewares/googleAuth.cjs");

const router = express.Router();
const userController = new UserController();

router.get("/session-data", authenticateToken, (req, res) => {
  if (req.session?.passport?.user) {
    const userId = req.session.passport.user; // Obtén el ID del usuario
    const token = req.session.token || null;  // Obtén el token del usuario (si existe)

    res.json({ userId, token });
  } else {
    res.status(404).json({ error: "No session data found" });
  }
});



// Ruta para iniciar la autenticación con Google
router.get(
  "/auth-google",
  passportGoogle.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passportGoogle.authenticate("google", {
    failureRedirect: "http://localhost:3000/",
  }),
  async (req, res) => {
    try {
      // Carga node-fetch de manera dinámica
      const fetch = (await import("node-fetch")).default;
      // Verifica si el usuario está registrado o no
      if (!req.user.isRegistered) {
        // URL de la foto de perfil
        const photoUrl = req.user.photos[0].value;

        // Genera un nombre único para la imagen
        const fileName = Date.now() + "-profile.jpg";
        const uploadPath = path.join(__dirname, "../../fotosPerfil/", fileName);

        // Descarga la foto de perfil
        const response = await fetch(photoUrl);

        if (!response.ok) {
          throw new Error('Error descargando la foto de perfil');
        }

        // Guarda la imagen descargada en el directorio
        const fileStream = fs.createWriteStream(uploadPath);
        await new Promise((resolve, reject) => {
          response.body.pipe(fileStream);
          response.body.on("error", reject);
          fileStream.on("finish", resolve);
        });

        // Crea el nuevo usuario con la foto guardada localmente
        const newUser = {
          id: req.user.id,
          nombre: req.user.displayName,
          correo: req.user.emails[0].value || "none@gmail.com",
          password: "",
          tipo: "comprador",
          fotoPerfil: fileName, // Guarda solo el nombre de la foto en la base de datos
          favoritos: [],
          provider: req.user.provider,
        };

        // Realiza la petición con fetch para crear el usuario
        const userResponse = await userController.createUser({body: newUser}, res);

        if (userResponse.acknowledged) {
          userController.handlePassportLogin(req, res, "products");
        } else {
          const errorData = await userResponse.json();
          res.status(userResponse.status).json(errorData);
        }
      } else {
        // Si ya está registrado, redirigir a 'home'
        userController.handlePassportLogin(req, res, "products");
      }
    } catch (error) {
      console.error("Error guardando el usuario en la base de datos: ", error);
      res.status(500).send("Error en la autenticación con Google");
    }
  }
);

router.get('/vefiryToken', authenticateToken,  (req, res) => res.status(200).json({menssage: 'token valido', token: true}))


//rutas de crud usuarios
router.get("/search", authenticateToken, (req, res) => userController.searchUsers(req, res));

router.get("/:id", authenticateToken, (req, res) => userController.getUser(req, res));

router.get("/", authenticateToken, (req, res) => userController.getUsers(req, res));

router.post('/login', (req, res) => userController.login(req, res));

router.post("/upload-profile-picture", authenticateToken, async (req, res) => {
  const userId = req.session.passport.user;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "No se ha subido ningún archivo." });
  }

  const file = req.files.file;
  const newImageName = Date.now() + "-" + file.name; // Genera un nombre único para la imagen
  const uploadPath = path.join(__dirname, "../../fotosPerfil/", newImageName);

  try {
    // Mueve el archivo a la carpeta de destino
    file.mv(uploadPath, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al subir la imagen." });
      }

      // Encuentra al usuario en la base de datos
      const user = await userController.findUserById(userId);
      console.log("🚀 ~ file.mv ~ user:", user)
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }

      // Si el usuario ya tiene una imagen, elimina la antigua
      if (user.fotoPerfil) {
        const oldImagePath = path.join(
          __dirname,
          "../../fotosPerfil/",
          user.fotoPerfil
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Elimina la imagen antigua
        }
      }

      // Actualiza la imagen de perfil en la base de datos
      const updatedUser = await userController.updateUserById(userId, {
        fotoPerfil: newImageName,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      // Envía la respuesta con la nueva ruta de la imagen
      res.status(200).json({ newImagePath: newImageName });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al actualizar la imagen de perfil." });
  }
});

router.post("/logout", async (req, res) => {
  try {
    await userController.logout(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error al cerrar sesión" });
  }
});

router.post("/", (req, res) => userController.createUser(req, res));

router.put("/:id", authenticateToken, (req, res) => userController.updateUserForms(req, res));

router.delete("/:id", authenticateToken, (req, res) =>
  userController.deleteUser(req, res)
);

module.exports = router;