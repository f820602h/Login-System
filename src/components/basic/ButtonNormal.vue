<script setup>
import { computed } from "vue";

const buttonThemeMap = {
  normal: { front: "bg-zinc-300", back: "bg-zinc-600" },
  dark: { front: "bg-zinc-400", back: "bg-zinc-600" },
  darker: { front: "bg-zinc-500", back: "bg-zinc-700" },
  confirm: { front: "bg-green-600", back: "bg-green-900" },
  cancel: { front: "bg-red-600", back: "bg-red-900" },
};

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  theme: {
    type: String,
    default: "normal",
  },
  width: {
    type: Number,
    default: 80,
  },
  height: {
    type: Number,
    default: 30,
  },

  circle: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["press"]);

const btnSize = computed(() => {
  return { width: props.width + "px", height: props.height + "px" };
});
const calcTheme = computed(() => {
  return buttonThemeMap[props.theme] || buttonThemeMap.normal;
});
</script>

<template>
  <button
    class="group disabled:cursor-not-allowed pt-1"
    :disabled="disabled"
    @click="$emit('press')"
  >
    <div
      class="btn-back"
      :class="[`${calcTheme.back}`, circle ? 'rounded-full' : 'rounded-md']"
    >
      <span
        class="btn-front"
        :class="[`${calcTheme.front}`, circle ? 'rounded-full' : 'rounded-md']"
        :style="btnSize"
      >
        <slot>{{ text }}</slot>
      </span>
    </div>
  </button>
</template>

<style lang="scss" scoped>
.btn-back {
  @apply p-0 border-0 outline-none text-white shadow-sm;
  @apply group-disabled:text-gray-100 group-disabled:bg-white/40 group-active:shadow-none group-disabled:shadow-none;
}

.btn-front {
  @apply relative flex-center-center transition-transform duration-200;
  @apply group-enabled:-top-1 group-enabled:group-active:-top-0 group-enabled:group-active:shadow-inner-sm group-enabled:group-active:shadow-darker;
  @apply group-disabled:bg-white/30 group-disabled:shadow-inner-sm group-disabled:shadow-darker group-disabled:text-black/20;
}
</style>
