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

const validate = () => {
  const cvvRegex = /^[0-9]{3}$/;

  if (!cvvRegex.test(props.modelValue))
    return "Please enter a valid CVV that contain 3 digits";

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
    <label
      class="z-10 relative block w-full py-1 px-4 bg-white rounded-[4px] shadow-custom"
    >
      <span class="block text-[10px] leading-4 font-medium">{{ label }}</span>
      <input
        class="w-full text-sm outline-none"
        type="password"
        v-model="value"
        :placeholder="placeholder"
        @input="validation"
        maxlength="3"
      />
      <div class="group absolute top-3 right-4 cursor-pointer">
        <img
          class=""
          src="/images/question.svg"
          alt="Question icon"
          loading="lazy"
        />
        <div
          class="hint group-hover:!scale-100 group-focus:!scale-100 group-hover:!opacity-100 group-focus:!opacity-100"
        >
          Three digits on the back of your credit card
        </div>
      </div>
    </label>
    <transition name="fade">
      <p v-if="error" class="pt-2 pb-1 px-4 text-sm text-error-200">
        {{ error }}
      </p>
    </transition>
  </div>
</template>

<style lang="css">
.hint {
  @apply z-10 absolute w-32 p-2 bg-white text-xs rounded-[4px] shadow-custom border border-solid border-black -translate-x-[calc(50%_-_0.75rem)] translate-y-3 scale-0 opacity-0 transition-all duration-300 ease-in-out;
}
.hint::before {
  @apply mx-auto absolute -top-[9px] left-0 right-0 w-4 h-4 rotate-45 bg-white rounded-tl-[4px] border-t border-l border-solid border-black;
  content: "";
}
</style>
