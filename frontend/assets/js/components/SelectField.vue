<script setup lang="ts">
import { computed, defineProps, ref, watch } from "vue";
import { CountiresInterface } from "../types/form";

const props = defineProps<{
  label: string;
  modelValue: string;
  placeholder: string;
  forcingValidate: boolean;
  validation?: {
    required?: boolean;
  };
  options: CountiresInterface[];
}>();
const emit = defineEmits(["update:modelValue", "update:valid"]);

const isOpen = ref(false);

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
  if (props.validation?.required === true && props.modelValue === "")
    return "Filed is required.";
  return "";
};

const validation = () => {
  error.value = validate();
  if (error.value === "") emit("update:valid", true);
  else emit("update:valid", false);
};

const select = (value: string) => {
  emit("update:modelValue", value);
  emit("update:valid", true);
  error.value = "";
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
    <div
      class="z-20 relative block w-full py-1 px-4 bg-white rounded-[4px] cursor-pointer"
      @click="isOpen = !isOpen"
      @focus="isOpen = !isOpen"
    >
      <span class="block text-[10px] leading-4 font-medium">{{ label }}</span>
      <input
        class="w-full text-sm outline-none pointer-events-none"
        type="text"
        v-model="value"
        :placeholder="placeholder"
        :required="validation?.required"
        tabindex="-1"
      />
      <img
        class="absolute top-3 right-4"
        src="/images/arrow-down.svg"
        alt="Arrow down icon"
        loading="lazy"
      />
      <transition name="fade">
        <div
          v-if="isOpen"
          class="select-options absolute top-full left-0 w-full max-h-40 text-sm bg-white rounded-[4px] shadow-custom2 overflow-y-scroll overflow-x-hidden"
        >
          <div
            v-for="(option, key) in options"
            :key="key"
            class="py-1 px-4 border-b border-solid border-gray-100 hover:bg-black/50 focus:bg-black/50 hover:text-white focus:text-white rounded-[4px]"
            @click="select(option.name)"
          >
            {{ option.name }}
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <p v-if="error" class="pt-2 pb-1 px-4 text-sm text-error-200">
        {{ error }}
      </p>
    </transition>
  </div>
</template>

<style style="css">
.select-options::-webkit-scrollbar {
  width: 4px;
}
</style>
