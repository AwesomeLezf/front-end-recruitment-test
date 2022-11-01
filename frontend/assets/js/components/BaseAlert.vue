<script setup lang="ts">
import { watch } from "vue";

const props = withDefaults(
  defineProps<{
    autoClose?: boolean;
    data: { classes: string; display: boolean; message: string };
  }>(),
  {
    autoClose: true,
  }
);
const emit = defineEmits(["displayUpdate"]);

watch(
  () => props.data.display,
  () => {
    closeAlert();
  }
);
function closeAlert() {
  if (props.autoClose && props.data.display) {
    setTimeout(() => {
      emit("displayUpdate", false);
    }, 5000);
  }
}
</script>

<template>
  <transition name="fade-to-left">
    <div :class="`alert ${data.classes}`" v-if="data.display">
      <div v-html="data.message"></div>
    </div>
  </transition>
</template>
<style lang="css" scoped>
.fade-to-left-enter-active,
.fade-to-left-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-to-left-enter-from,
.fade-to-left-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.alert {
  @apply z-50 fixed flex top-[5%] right-0 w-72 p-5 pr-8 mt-12 border-l-4 border-solid;
}

.alert__error {
  @apply bg-error-100 border-error-200 text-error-200;
}
.alert__info {
  @apply bg-info-100 border-info-200 text-info-200;
}

.alert__success {
  @apply bg-success-100 border-success-200 text-success-200;
}
</style>
