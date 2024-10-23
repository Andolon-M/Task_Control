<template>
    <Suspense>
        <template #default>
            <div class="text-primary px-4 py-4">
                <header class="flex flex-row justify-start items-center gap-3 px-8 my-4">
                    <h1>Hello {{ nombre }}</h1>
                    <div class="w-10 h-10 rounded-full overflow-hidden">
                        <img :src="'../../api/fotosPerfil/' + fotoUser" alt="" class="w-full h-full object-cover">
                    </div>
                    <img src="../../public/manito.png" alt="">

                </header>

                <div id="search" class="mb-4">
                    <input type="text" v-model="searchQuery" placeholder="Buscar productos..."
                        class="border border-gray-300 rounded-lg p-2 w-full" />
                </div>

                <div id="categoria" class="mb-4 flex flex-wrap gap-2">
                    <button v-for="category in categories" :key="category" @click="selectCategory(category)" :class="{
                        'bg-blue-500 text-white': selectedCategory === category,
                        'bg-white text-blue-500': selectedCategory !== category,
                        'border border-blue-500': true,
                    }" class="rounded-lg px-4 py-2 transition">
                        {{ category }}
                    </button>
                    <button @click="clearCategory"
                        class="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700">
                        Todas las categorías
                    </button>
                </div>

                <div id="productos" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    <div v-for="product in filteredProducts" :key="product.comidaID"
                        class="bg-white shadow-md rounded-lg p-4">
                        <h2 class="text-lg font-semibold">{{ product.nombre }}</h2>
                        <p>Categoría: {{ product.categoría }}</p>
                        <p>Calorías: {{ product.calorías }}</p>
                        <p>Ingredientes: {{ product.ingredientes.join(', ') }}</p>
                        <p>Valoraciones: {{ product.valoraciones.join(', ') }}</p>
                        <p>Promedio de Valoración: {{ product.promedioValoración }}</p>
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
  
<script setup>
import { ref, onMounted, computed } from 'vue';
const resUser = await fetch(`/api/users/session-data`, {
    method: 'GET',
    credentials: 'include',
});
const user = await resUser.json();
console.log(user);

const resDataUser = await fetch(`/api/users/${user.userId}`, {
    method: 'GET',
    credentials: 'include',
})
const dataUser = await resDataUser.json();
const nombre = dataUser.nombre.split(' ')[0]
const fotoUser = dataUser.fotoPerfil

const products = ref([]);
const searchQuery = ref('');
const selectedCategory = ref('');
const categories = ref([]);

const fetchProducts = async () => {
    try {
        const response = await fetch('/api/products/');
        const data = await response.json();
        products.value = data;
        extractCategories(data);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const extractCategories = (data) => {
    const uniqueCategories = new Set(data.map(product => product.categoría));
    categories.value = Array.from(uniqueCategories);
};

const selectCategory = (category) => {
    selectedCategory.value = category;
};

const clearCategory = () => {
    selectedCategory.value = '';
};

const filteredProducts = computed(() => {
    return products.value.filter(product => {
        const matchesSearch = product.nombre.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesCategory = selectedCategory.value ? product.categoría === selectedCategory.value : true;
        return matchesSearch && matchesCategory;
    });
});

onMounted(() => {
    fetchProducts();
});
</script>
  
<style>
:root {
    --green: #27ae60;
    --black: #333;
    --white: #fff;
    --bg-color: #eee;
    --box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .1);
    --border: .1rem solid var(--black);
}

/* Estilos personalizados aquí (si los necesitas) */
</style>
  