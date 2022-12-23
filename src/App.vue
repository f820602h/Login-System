<script setup>
import { NNotificationProvider } from "naive-ui";
</script>

<template>
  <n-notification-provider>
    <router-view></router-view>
  </n-notification-provider>
</template>
