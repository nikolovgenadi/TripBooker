<script setup>
import { useCartStore } from '@/stores/cart';

// get cart store for item count
const cartStore = useCartStore();
</script>

<template>
  <header>
    <nav>
      <router-link to="/">home</router-link>
      <router-link to="/packages">packages</router-link>
      <router-link to="/cart">cart ({{ cartStore.totalItems }})</router-link>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped></style>
