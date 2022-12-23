<script setup>
import { computed, ref } from "vue";
import ModeLogIn from "./ModeLogIn.vue";
import ModeSignUp from "./ModeSignUp.vue";
import ModeForget from "./ModeForget.vue";
import ModeVerify from "./ModeVerify.vue";
import ButtonNormal from "@/components/basic/ButtonNormal.vue";

const currentMode = ref("LogIn");
const currentModeInstance = ref(null);

const screenConfigModesMap = {
  LogIn: {
    component: ModeLogIn,
    confirmButtonText: "登入",
    confirmButtonCallback: async () => {
      await currentModeInstance.value?.confirmHandler();
    },
  },
  SignUp: {
    component: ModeSignUp,
    confirmButtonText: "註冊",
    confirmButtonCallback: () => {
      currentModeInstance.value?.confirmHandler();
    },
    cancelButtonText: "返回",
    cancelButtonCallback: () => changeMode("LogIn"),
  },
  Forget: {
    component: ModeForget,
    confirmButtonText: "取得",
    confirmButtonCallback: () => {
      currentModeInstance.value?.confirmHandler();
    },
    cancelButtonText: "返回",
    cancelButtonCallback: () => changeMode("LogIn"),
  },
  Verify: {
    component: ModeVerify,
    confirmButtonText: "驗證",
    confirmButtonCallback: () => {
      currentModeInstance.value?.confirmHandler();
    },
    cancelButtonText: "返回",
    cancelButtonCallback: () => changeMode("SignUp"),
  },
};

const currentScreenConfig = computed(() => {
  return screenConfigModesMap[currentMode.value];
});

function changeMode(mode) {
  currentMode.value = mode;
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
