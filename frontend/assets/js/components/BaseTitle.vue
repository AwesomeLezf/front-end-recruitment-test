<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  counter: number;
  title: string;
  icon?: string;
}>();
</script>

<template>
  <div class="flex items-center">
    <div
      class="mr-2 w-[24px] h-[24px] bg-black rounded-full font-black text-center text-white line-[24px]"
    >
      {{ counter }}
    </div>
    <span class="text-sm lg:text-base font-black uppercase">{{ title }}</span>
    <img
      v-if="icon"
      class="ml-2"
      :src="`/images/${icon}`"
      alt="Lock icon"
      loading="lazy"
    />
  </div>
</template>

<style></style>
