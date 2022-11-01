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
  const creditCardFormat = props.modelValue.replace(
    /(\d{4})(\d{4})(\d{4})(\d{4})/,
    "$1-$2-$3-$4"
  );
  emit("update:modelValue", creditCardFormat);
  //regex correct to the backebnd format ofcourse is not correct credit card rexeg witch is diffrent based on type of card
  const creditCardRegex = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;

  if (!creditCardRegex.test(creditCardFormat) || creditCardFormat.length < 19)
    error.value = "Please enter a valid phone number that contain 16 digits";
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
    <label
      class="z-10 relative block w-full py-1 px-4 bg-white rounded-[4px] shadow-custom"
    >
      <span class="block text-[10px] leading-4 font-medium">{{ label }}</span>
      <input
        class="w-full text-sm outline-none"
        type="text"
        v-model="value"
        :placeholder="placeholder"
        @input="validation"
        maxlength="19"
      />
      <img
        class="absolute top-3 right-4"
        src="/images/visa.svg"
        alt="Visa icon"
        loading="lazy"
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
