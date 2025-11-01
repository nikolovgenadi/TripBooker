<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

// get cart store
const cartStore = useCartStore();

// remove item functions
function removeExperience(index: number) {
  cartStore.removeExperience(index);
}

function removePackage(index: number) {
  cartStore.removePackage(index);
}

// clear all items
function clearAll() {
  cartStore.clearCart();
}
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Shopping Cart</h1>

    <div v-if="cartStore.totalItems === 0" class="text-center py-12">
      <p class="text-gray-600 mb-4">Your cart is empty</p>
      <router-link
        to="/"
        class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Continue Shopping
      </router-link>
    </div>

    <div v-else>
      <!-- Experience Items -->
      <div v-if="cartStore.experienceItems.length > 0" class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Experience Bookings</h2>
        <div
          v-for="(item, index) in cartStore.experienceItems"
          :key="index"
          class="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h3 class="font-bold text-lg">{{ item.experienceTitle }}</h3>
              <p class="text-gray-600">Start date: {{ item.startDate }}</p>
              <p class="text-gray-600">
                {{ item.adults }} adults, {{ item.children }} children
              </p>
              <p class="text-gray-600">Duration: {{ item.days }} days</p>
              <p class="text-blue-600 font-semibold">
                Price:
                {{
                  item.pricePerPerson *
                  (item.adults + item.children) *
                  item.days
                }}
                SEK
              </p>
            </div>
            <button
              @click="removeExperience(index)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <!-- Package Items -->
      <div v-if="cartStore.packageItems.length > 0" class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Package Deals</h2>
        <div
          v-for="(item, index) in cartStore.packageItems"
          :key="index"
          class="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h3 class="font-bold text-lg">{{ item.packageTitle }}</h3>
              <p class="text-gray-600">Type: {{ item.type }}</p>
              <p class="text-gray-600">Duration: {{ item.duration }}</p>
              <div class="mb-2">
                <h4 class="font-semibold text-sm">Includes:</h4>
                <ul class="text-sm text-gray-600">
                  <li v-for="include in item.includes" :key="include">
                    • {{ include }}
                  </li>
                </ul>
              </div>
              <p class="text-blue-600 font-semibold">
                Price: {{ item.price }} SEK
              </p>
            </div>
            <button
              @click="removePackage(index)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="border-t pt-6">
        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="text-2xl font-bold mb-2">Cart Summary</h3>
          <p class="text-gray-700 mb-2">
            Total items: {{ cartStore.totalItems }}
          </p>
          <p class="text-3xl font-bold text-blue-600 mb-4">
            Total: {{ cartStore.totalPrice }} SEK
          </p>

          <div class="flex space-x-4">
            <button
              @click="clearAll"
              class="text-white px-6 py-2 rounded bg-red-500 hover:bg-red-600"
            >
              Clear Cart
            </button>
            <button
              class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
