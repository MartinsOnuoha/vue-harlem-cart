<template>
  <div class="app">
    <h3>{{ state.cartName }} ({{ cartItems.length }})</h3>
    <div class="store">
      <div class="store__product" v-for="(item, index) in availableItems" :key="index">
        <div class="store__product_image">
          <img width="200" :src="item.image" :alt="item.title">
        </div>
        <div class="store__product_content">
          <div class="store__product_description">
            {{ item.title }}
          </div>
          <div class="store__product_price">$ 109.95</div>
          <button @click="add">Add To Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

import {
    state,
    addToCart,
    cartItems,
    availableItems,
    populateStore,
} from './stores/cart';

const add = (item) => {
  addToCart(item)
}

onMounted(() => {
  fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => populateStore(json.map(({ title, price, description, image }) => ({ title, price, description, image, isAvailable: true }))))
})

// const firstName = computed({
//     get: () => state.firstName,
//     set: value => setFirstName(value)
// });

// const lastName = computed({
//     get: () => state.lastName,
//     set: value => setLastName(value)
// });

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.store {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 30px;
}
.store__product {
  width: 300px;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  position: relative;
}
.store__product_image {
  min-height: 100px;
}
.store__product_content {
  margin-top: 3rem;
  background-image: linear-gradient(to bottom, rgba(56, 56, 56, 0.5), rgb(0, 0, 0));
  color: #fff;
  bottom: 0;
  left: 0;
  position: absolute;
  width: 100%;
}
button {
  padding: 20px;
  background: #000;
  color: #fff;
  width: 100%;
  border: none;
  cursor: pointer;
}
</style>
