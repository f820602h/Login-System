<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import ModeInfo from "./ModeInfo.vue";
import ModeChange from "./ModeChange.vue";
import ButtonNormal from "@/components/basic/ButtonNormal.vue";
import { axiosUserLogout } from "@/api/user";

const currentMode = ref("Info");
const currentModeInstance = ref(null);

const router = useRouter();

const screenConfigModesMap = {
  Info: {
    component: ModeInfo,
    cancelButtonText: "登出",
    cancelButtonCallback: () => logout(),
  },
  Change: {
    component: ModeChange,
    confirmButtonText: "變更",
    confirmButtonCallback: () => {
      currentModeInstance.value?.confirmHandler();
    },
    cancelButtonText: "返回",
    cancelButtonCallback: () => changeMode("Info"),
  },
};

const currentScreenConfig = computed(() => {
  return screenConfigModesMap[currentMode.value];
});

function changeMode(mode) {
  currentMode.value = mode;
}

async function logout() {
  await axiosUserLogout();
  router.push({ name: "Login" });
}
</script>

<template>
  <div class="p-5 rounded-xl bg-white shadow-md">
    <div>
      <component
        ref="currentModeInstance"
        :is="currentScreenConfig.component"
        @change-mode="changeMode"
      />
      <div class="flex-center-center px-5 pt-8">
        <ButtonNormal
          v-if="currentScreenConfig.cancelButtonText"
          theme="cancel"
          :text="currentScreenConfig.cancelButtonText"
          :width="100"
          :height="35"
          class="font-bold mr-3"
          @press="currentScreenConfig.cancelButtonCallback"
        />
        <ButtonNormal
          v-if="currentScreenConfig.confirmButtonText"
          theme="confirm"
          :text="currentScreenConfig.confirmButtonText"
          :width="100"
          :height="35"
          class="font-bold"
          @press="currentScreenConfig.confirmButtonCallback"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
