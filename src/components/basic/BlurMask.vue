<script setup lang="ts"></script>

<template>
  <div class="fixed-layer bg-black/40 flex">
    <slot></slot>
  </div>
</template>

<style scoped>
.fixed-layer {
  @apply fixed left-0 w-full z-global-1;
  top: 0;
  height: 100vh;
}
</style>
