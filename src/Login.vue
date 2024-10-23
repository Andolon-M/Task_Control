<template>
    <Suspense>
        <template #default>
            <div>

                <div>
                    <header>
                        <div class="header__logo">
                            <img src="./assets/img/Star.svg">
                        </div>
                    </header>
                    <main>
                        <section class="section__form">
                            <h1>Log in</h1>
                            <div class="login">
                                <label for="username">Email address</label>
                                <input v-model="nick" type="text" id="username" placeholder="example@correo.com"
                                    required>
                                <label for="password">Password</label>
                                <input v-model="password" type="password" id="password" placeholder="Your Password">
                                <span>Forgot password?</span>
                                <button @click="handleSubmit" type="button">Iniciar sesión</button>
                            </div>
                        </section>
                        <section>
                            <div class="section__line">
                                <span>Or Login with</span>
                            </div>
                            <div class="section__social">
                                <button><img src="./assets/img/Facebook.svg"></button>
                                <button @click="redirectToGoogle">
                                    <img src="./assets/img/Google.svg" alt="Login with Google">
                                </button>
                                <button><img src="./assets/img/Apple.svg"></button>
                            </div>
                        </section>
                    </main>
                    <footer>
                        <router-link to="Register" class=".footer-link"
                            :class="{ active: $route.path === '/register' }">
                            <span :class="{ active: $route.path === '/register' }">Don’t have an account? <b>Sign
                                    up</b></span>
                        </router-link>
                    </footer>
                </div>

            </div>
        </template>
        <template #loading>
            <div>Loading...</div>
        </template>
    </Suspense>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const nick = ref("");
const password = ref("");

const handleSubmit = async () => {
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                
            },
            credentials: 'include',
            body: JSON.stringify({
                userName: nick.value,
                password: password.value
            })
        });

        if (!response.ok) {
            const data = await response.json();
            alert(data?.message);
            throw new Error(data?.message);
        }
        console.log(response);

        const data = await response.json();
        alert('Login successful')

        router.push('/products');  // Redireccionar a /productsr

    } catch (error) {
        console.error('User name or Password incorrect:', error);

    }
};

const redirectToGoogle = () => {
      const popup = window.open(
			'/api/users/auth-google', // * Ruta para autenticación con Gmail
			'targetWindow',
			'width=950,height=900,menubar=no,location=no,resizable=no,scrollbars=no,status=no', // ? Configuración del popup
		);

		const messageListener = event => {
			const allowedOrigin = import.meta.env.VITE_USE_TUNNEL === "true"
				? import.meta.env.VITE_TUNNEL_URL_BACKEND
				: import.meta.env.VITE_HTTP_BACKEND;

			if (event.origin === allowedOrigin) {
				try {
					const data = JSON.parse(event.data);
					const parsedData = JSON.parse(data); // * Analiza los datos recibidos

					if (parsedData.token && parsedData.userData) {
						// ? Verifica si el token y los datos del usuario existen
						if (popup && !popup.closed) popup.close(); // * Cierra el popup si el login es exitoso
					} else {
						console.error(
							'Error en el login:',
							parsedData.message || 'Respuesta inesperada',
						);
					}
				} catch (err) {
					console.error('Error al procesar los datos:', err); // ! Muestra error si hay un problema al procesar los datos
				}
			}
		};

		window.addEventListener('message', messageListener); // * Escucha los mensajes del popup
		setTimeout(() => handlePopupTimeout(popup, messageListener), 30000); // ! Timeout de 30 segundos si no se recibe respuesta
    }

</script>

<style scoped>
@import url(./variables.css);

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inter_18pt-Regular";
    color: #000;
}

header,
main,
footer {
    margin: 0 20px;
}

header {
    margin-top: 47px;
    /* background: red; */
}

.header__logo {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

main {
    margin-bottom: 50px;
}

.section__form {
    /* background: red; */
    display: flex;
    flex-direction: column;
}

.section__form h1 {
    padding-bottom: 38px;
    font-family: "Inter_18pt-Bold";
    font-size: 30px;
}

.login {
    display: flex;
    flex-direction: column;
}

.login label {
    font-size: 14px;
    padding-bottom: 6px;
}

.login input,
.login button,
.section__social button {
    margin-bottom: 22px;
    border: none;
    outline: none;
    /* background: red; */
    border-radius: 10px;
    width: 100%;
    height: 56px;
    font-family: "Inter_18pt-SemiBold";
    font-size: 16px;
}

.login input[type="email"],
.login input[type="password"] {
    border: 1px solid #747474;
    font-family: "Inter_18pt-Regular";
    font-size: 16px;
    padding: 16px 46px 16px 18px;
}

.login span {
    font-size: 14px;
    text-align: right;
    margin-bottom: 38px;
}

.login button[type="button"] {
    background: #000;
    color: #fff;
}

.section__line {
    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 22px;
}

.section__line::before,
.section__line::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #D8DADC;
}

.section__line::before {
    margin-right: 10px;
}

.section__line::after {
    margin-left: 10px;
}

.section__social {
    display: flex;
    gap: 15px;
}

.section__social button {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 1px solid #D8DADC;
    height: 56px;
    background: #fff;
}

footer {
    /* background: red;  */
    text-align: center;
}

.footer-link {
    font-family: "Inter_18pt-SemiBold";
    font-size: 14px;
}
</style>
