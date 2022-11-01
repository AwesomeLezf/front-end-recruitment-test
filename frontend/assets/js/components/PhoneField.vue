<script setup lang="ts">
import { computed, defineProps, ref, watch } from "vue";

const props = defineProps<{
  label: string;
  modelValue: string;
  placeholder: string;
  forcingValidate: boolean;
  selectedCountryIdd?: string;
  validation?: {
    required?: boolean;
  };
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
  const phoneFormat = props.modelValue.replace(
    /(\d{3})(\d{3})(\d{3})/,
    "$1-$2-$3"
  );
  emit("update:modelValue", phoneFormat);

  const phoneRegex = /^[1-9]{1}[0-9]{2}-[0-9]{3}-[0-9]{3}$/;

  if (
    props.validation?.required === true &&
    (!phoneRegex.test(phoneFormat) || phoneFormat.length < 11)
  )
    error.value = "Please enter a valid phone number that contain 9 digits";
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
    <label class="block w-full py-1 px-4 bg-white rounded-[4px] shadow-custom">
      <span class="block text-[10px] leading-4 font-medium">{{ label }}</span>
      <div class="flex items-centrer">
        <span v-if="selectedCountryIdd">({{ selectedCountryIdd }})</span>
        <input
          class="w-full text-sm outline-none"
          type="text"
          v-model="value"
          :placeholder="placeholder"
          :required="validation?.required"
          @input="validation"
          maxlength="11"
        />
      </div>
    </label>
    <transition name="fade">
      <p v-if="error" class="pt-2 pb-1 px-4 text-sm text-error-200">
        {{ error }}
      </p>
    </transition>
  </div>
</template>
<style></style>
