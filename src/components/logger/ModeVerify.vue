<script setup>
import { object } from "yup";
import { useForm } from "vee-validate";
import { userFieldValidation } from "@/system/fieldValidation";
import { useUserStore } from "@/stores/user";
import { useNotification } from "naive-ui";
import LoggerField from "./LoggerField.vue";
import { axiosUserVerify } from "@/api/user/index";
import { ref } from "vue";

const emit = defineEmits(["change-mode"]);

const userStore = useUserStore();
const notification = useNotification();

const isInvalid = ref(false);

const validationSchema = object({
  code: userFieldValidation.code,
});
const { handleSubmit } = useForm({ validationSchema });
const confirmHandler = handleSubmit(async (values) => {
  isInvalid.value = false;
  const { code } = values;
  await axiosUserVerify({
    verifyCode: code,
    verifyKey: userStore.temp.verifyKey,
  })
    .then(() => {
      userStore.temp.verifyCode = "";
      userStore.temp.verifyKey = "";
      notification.success({
        content: "帳號驗證成功",
        meta: "帳號已驗證，您可以進行登入",
        duration: 2500,
        keepAliveOnHover: true,
      });
      emit("change-mode", "LogIn");
    })
    .catch(() => {
      isInvalid.value = true;
    });
});

defineExpose({ confirmHandler });
</script>

<template>
  <div>
    <div class="font-bold italic text-2xl text-center">註冊驗證</div>
    <div class="min-h-5 text-sm text-center mt-2 mb-5">
      <span v-if="isInvalid" class="text-red-500"> !! 驗證碼錯誤 !! </span>
      <span v-else>請輸入註冊驗證碼</span>
    </div>
    <div class="w-[250px] mx-auto">
      <template v-if="userStore.temp.verifyCode">
        <div class="text-sm font-bold mb-1">驗證碼</div>
        <div
          class="mb-3 py-2 text-4xl text-center font-bold text-white bg-[#242424]"
        >
          {{ userStore.temp.verifyCode }}
        </div>
      </template>

      <LoggerField
        label="輸入上方驗證碼"
        name="code"
        type="text"
        placeholder="驗證碼"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
