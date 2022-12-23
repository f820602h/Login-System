<script setup>
import VerifyInput from "@/components/basic/VerifyInput.vue";

defineProps({
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="text-sm font-bold mb-1">{{ label }}</div>
  <VerifyInput v-bind="$attrs">
    <template #error="{ errorMessage, meta }">
      <div class="text-xs text-right min-h-4 mt-1 text-red-500">
        <template v-if="errorMessage && meta.touched">
          {{ errorMessage }}
        </template>
      </div>
    </template>
  </VerifyInput>
</template>

<style scoped lang="scss">
:deep(input) {
  @apply w-full text-sm px-2 py-1 border-[1px] border-[#242424] bg-transparent focus-visible:outline-none transition-colors duration-200;
  @apply focus:border-[#13fc5c];
}

.invalid {
  :deep(input) {
    @apply border-red-500;
  }
}
</style>
