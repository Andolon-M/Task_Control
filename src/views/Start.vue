<template>
    <Suspense>
        <template #default>
            <div class="bg-bg-primary w-full h-full flex flex-col justify-between">
                <img src="./../../public/decoration_start.svg" alt="" class="w-full object-cover">
                <div class="text-[4.5em] capitalize text-btn-primary pl-12">
                    <h1><span class="text-btn-secondary">eat </span>well,</h1>
                    <h1><span class="text-btn-secondary">feel </span>well,</h1>
                    <h1><span class="text-btn-secondary">live </span>well,</h1>
                </div>
                <div class="bg-neutral-600 w-full h-[12vh] flex flex-row justify-between items-center pl-20 pr-8">
                    <div class="">
                        <button class="bg-secondary w-[1em] h-[1em] mx-2 rounded-full"> </button>
                        <button class="bg-secondary w-[1em] h-[1em] mx-2 rounded-full"> </button>
                        <button class="bg-btn-primary w-[2.8em] h-[1em] mx-2 rounded-full"> </button>
                    </div>
                    <div>
                        <button
                            class="bg-secondary w-[5em] h-[5em] border-solid border-2 border-white mx-2 rounded-full flex justify-center items-center">
                            <img src="./../../public/arrow.svg" alt="">
                        </button>
                    </div>
                </div>
            </div>
        </template>
        <template #loading>
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </template>
    </Suspense>
</template>

<script>
export default {
    data() {
        return {
            countdown: 2,
        };
    },
    created() {
        // Iniciar el temporizador
        this.startCountdown();
    },
    methods: {
        startCountdown() {
            const interval = setInterval(() => {
                this.countdown--;
                if (this.countdown <= 0) {
                    clearInterval(interval);
                    // Redirigir a otra página
                    this.$router.push({ path: '/login' }); // Cambia '/nueva-pagina' a la ruta deseada
                }
            }, 1000); // Actualiza cada segundo
        },
    },
};
</script>


<style >

</style>
                                                     