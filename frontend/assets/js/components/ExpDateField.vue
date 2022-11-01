<script setup lang="ts">
import { computed, defineProps, ref, watch } from "vue";

const props = defineProps<{
  label: string;
  modelValue: string;
  placeholder: string;
  forcingValidate: boolean;
}>();
const emit = defineEmits(["update:modelValue", "update:valid"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const error = ref("");

const validation = () => {
  const expDateFormat = props.modelValue.replace(/(\d{2})(\d{2})/, "$1/$2");
  emit("update:modelValue", expDateFormat);

  const expDateRegex = /^0[1-9]|1[0-2]\/[0-9]{2}$/;

  if (!expDateRegex.test(expDateFormat) || expDateFormat.length < 5)
    error.value = "Please enter a valid expiredate that contain 4 digits MM/YY";
  else error.value = "";

  if (error.value === "") emit("update:valid", true);
  else emit("update:valid", false);
};

watch(
  () => props.forcingValidate,
  () => {
    validation();
  }
);
</script>
<template>
  <div class="w-full">
    <label class="block w-full py-1 px-4 bg-white rounded-[4px] shadow-lg">
      <span class="block text-[10px] leading-4 font-medium">{{ label }}</span>
      <input
        class="w-full text-sm outline-none"
        type="text"
        v-model="value"
        :placeholder="placeholder"
        @input="validation"
        maxlength="5"
      />
    </label>
    <transition name="fade">
      <p v-if="error" class="pt-2 pb-1 px-4 text-sm text-error-200">
        {{ error }}
      </p>
    </transition>
  </div>
</template>
<style></style>
