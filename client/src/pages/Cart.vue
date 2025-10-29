<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

// get cart store
const cartStore = useCartStore();

// remove item function
function removeItem(index: number) {
  cartStore.removeItem(index);
}

// clear all items
function clearAll() {
  cartStore.clearCart();
}
</script>

<template>
  <div>
    <h1>shopping cart</h1>

    <div v-if="cartStore.items.length === 0">
      <p>your cart is empty</p>
      <router-link to="/">continue shopping</router-link>
    </div>

    <div v-else>
      <div v-for="(item, index) in cartStore.items" :key="index">
        <h3>{{ item.experienceTitle }}</h3>
        <p>start date: {{ item.startDate }}</p>
        <p>{{ item.adults }} adults, {{ item.children }} children</p>
        <p>{{ item.days }} days</p>
        <p>
          price:
          {{ item.pricePerPerson * (item.adults + item.children) * item.days }}
          SEK
        </p>
        <button @click="removeItem(index)">remove</button>
        <hr />
      </div>

      <div>
        <h3>total: {{ cartStore.totalPrice }} SEK</h3>
        <p>{{ cartStore.totalItems }} items in cart</p>

        <button @click="clearAll">clear cart</button>
        <button>proceed to checkout</button>
      </div>
    </div>
  </div>
</template>
