<script setup lang="ts">
import { reactive } from "vue";
const data = reactive({
  cart: {
    items: [
      { name: "Apple Watch Sport", price: 580 },
      { name: "Modern Buckle", price: 380 },
    ],
    totals: {
      subTotal: 960,
      tax: 0,
      grandTotal: 960,
    },
  },
});
</script>
<template>
  <div class="block w-full pt-4 pb-8 px-4 bg-white rounded-[4px] shadow-custom">
    <span class="block text-xs font-black uppercase">Your Order</span>
    <div class="py-4 border-b border-solid border-gray-200">
      <div
        v-for="(item, key) in data.cart.items"
        :key="key"
        class="mb-2 last:mb-0 flex flex-wrap justify-between text-[10px] font-medium leading-4"
      >
        <span>{{ item.name }}</span>
        <span>$ {{ item.price }}</span>
      </div>
    </div>
    <div class="py-4 border-b border-solid border-gray-200">
      <div
        class="mb-2 last:mb-0 flex flex-wrap justify-between text-[10px] font-medium leading-4"
      >
        <span>Total purchases</span>
        <span>$ {{ data.cart.totals.subTotal }}</span>
      </div>
      <div
        class="mb-2 last:mb-0 flex flex-wrap justify-between text-[10px] font-medium leading-4"
      >
        <span>Estimated tax</span>
        <span>$ {{ data.cart.totals.tax }}</span>
      </div>
    </div>
    <div class="pt-4 flex flex-wrap items-center justify-between">
      <span class="text-[10px] font-medium leading-4">Total</span>
      <span class="text-2xl font-bold leading-4"
        >$ {{ data.cart.totals.grandTotal }}</span
      >
    </div>
  </div>
</template>

<style lang="css"></style>
