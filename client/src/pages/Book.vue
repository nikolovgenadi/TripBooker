<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';

// get url parameter and router
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

// data and experience loading (similar to experience.vue)
const data = ref({ experiences: [], articles: [] });
const slug = computed(() => route.params.slug as string);
const experience = computed(() => {
  return data.value.experiences.find((exp) => exp.slug === slug.value);
});

// form state - just basic inputs for now
const startDate = ref('');
const adults = ref(1);
const children = ref(0);
const days = ref(1);

// load experience data
onMounted(async () => {
  const response = await fetch('/data.json');
  data.value = await response.json();
});

// simple price calculation
const totalPeople = computed(() => adults.value + children.value);
const pricePerPerson = ref(1200); // just hardcoded for now
const totalPrice = computed(
  () => pricePerPerson.value * totalPeople.value * days.value
);

// form submission - just basic for now
function addToCart() {
  if (!experience.value || !startDate.value) {
    alert('please fill required fields');
    return;
  }

  cartStore.addItem({
    experienceSlug: experience.value.slug,
    experienceTitle: experience.value.title,
    startDate: startDate.value,
    adults: adults.value,
    children: children.value,
    days: days.value,
    pricePerPerson: pricePerPerson.value,
  });

  // redirect to cart
  router.push('/cart');
}
</script>

<template>
  <div>
    <div v-if="experience">
      <h1>{{ experience.title }}</h1>
      <p>{{ experience.location }}</p>

      <img :src="experience.image" :alt="experience.title" />

      <form @submit.prevent="addToCart">
        <div>
          <label>start date:</label>
          <input type="date" v-model="startDate" required />
        </div>

        <div>
          <label>adults:</label>
          <input type="number" v-model.number="adults" min="1" />
        </div>

        <div>
          <label>children (0-12):</label>
          <input type="number" v-model.number="children" min="0" />
        </div>

        <div>
          <label>duration (days):</label>
          <input type="number" v-model.number="days" min="1" />
        </div>

        <div>
          <h3>booking summary</h3>
          <p>{{ totalPeople }} people for {{ days }} days</p>
          <p>total: {{ totalPrice }} SEK</p>
        </div>

        <button type="submit">add to cart</button>
      </form>
    </div>

    <div v-else>
      <p>experience not found</p>
    </div>
  </div>
</template>
