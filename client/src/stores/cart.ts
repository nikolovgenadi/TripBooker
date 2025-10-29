import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface CartItem {
  experienceSlug: string;
  experienceTitle: string;
  startDate: string;
  adults: number;
  children: number;
  days: number;
  pricePerPerson: number;
}

export const useCartStore = defineStore('cart', () => {
  // array that holds all the booked experiences
  const items = ref<CartItem[]>([]);

  // computed values (auto-calculated when items change)
  const totalItems = computed(() => items.value.length); // how many bookings in cart

  const totalPrice = computed(() => {
    // loop through all items and calculate total cost
    return items.value.reduce((total, item) => {
      const peopleCount = item.adults + item.children;
      return total + item.pricePerPerson * peopleCount * item.days;
    }, 0);
  });

  // actions (functions that modify the cart)
  function addItem(item: CartItem) {
    items.value.push(item); // add new booking to cart
  }

  function removeItem(index: number) {
    items.value.splice(index, 1); // remove booking by position
  }

  function clearCart() {
    items.value = []; // empty the entire cart
  }

  return {
    // state (the data)
    items,
    // computed (auto-calculated values)
    totalItems,
    totalPrice,
    // actions (functions to change cart)
    addItem,
    removeItem,
    clearCart,
  };
});
