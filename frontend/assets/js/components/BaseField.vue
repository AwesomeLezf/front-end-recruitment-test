<script setup lang="ts">
import { computed, defineProps, ref, watch } from "vue";

const props = defineProps<{
  label: string;
  modelValue: string;
  placeholder: string;
  forcingValidate: boolean;
  validation?: {
    required?: boolean;
    type?: string;
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

const type = computed(() => {
  if (props.validation?.type === "email") return "email";
  return "text";
});

const error = ref("");

const validate = () => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const postalCodeRegex = /^[0-9]{5}$/;

  if (props.validation?.required === true && props.modelValue === "")
    return "Filed is required.";

  if (props.validation?.type === "email" && !emailRegex.test(props.modelValue))
    return "Please enter a valid email address";

  if (
    props.validation?.type === "postalCode" &&
    !postalCodeRegex.test(props.modelValue)
  )
    return "Please enter a valid post code that contain 5 digits";

  return "";
};

const validation = () => {
  error.value = validate();
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
      <input
        class="w-full text-sm outline-none"
        :type="type"
        v-model="value"
        :placeholder="placeholder"
        :required="validation?.required"
        @input="validation"
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
