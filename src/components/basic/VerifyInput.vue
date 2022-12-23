<script setup>
import { toRef, computed } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const name = toRef(props, "name");

const { value, errorMessage, meta, handleChange, handleBlur } = useField(
  name,
  undefined,
  {
    initialValue: props.value,
    validateOnValueUpdate: false,
  }
);

const validationListeners = computed(() => {
  if (!errorMessage.value) {
    return {
      blur: handleBlur,
      change: handleChange,
      input: (e) => handleChange(e, false),
    };
  }
  return {
    blur: handleBlur,
    change: handleChange,
    input: handleChange,
  };
});
</script>

<template>
  <div
    class="vee-field relative"
    :class="{ invalid: !!errorMessage, success: meta.valid }"
  >
    <input
      class="block w-full"
      :id="name"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      v-on="validationListeners"
    />
    <slot name="error" :errorMessage="errorMessage" :meta="meta"></slot>
  </div>
</template>

<style scoped></style>
