<script setup>
import { object } from "yup";
import { useForm } from "vee-validate";
import { userFieldValidation } from "@/system/fieldValidation";
import { useUserStore } from "@/stores/user";
import LoggerField from "./LoggerField.vue";
import { axiosUserSignUp } from "@/api/user/index";
import { ref } from "vue";

const emit = defineEmits(["change-mode"]);

const isEmailUsed = ref(false);

const userStore = useUserStore();

const validationSchema = object({
  email: userFieldValidation.email,
  password: userFieldValidation.password,
});
const { handleSubmit } = useForm({ validationSchema });
const confirmHandler = handleSubmit(async (values) => {
  isEmailUsed.value = false;
  if (isEmailUsed.value) return;
  const { email, password } = values;
  await axiosUserSignUp({ email, password })
    .then((res) => {
      userStore.temp.verifyCode = res.data.verifyCode;
      userStore.temp.verifyKey = res.data.verifyKey;
      emit("change-mode", "Verify");
    })
    .catch(() => {
      isEmailUsed.value = true;
    });
});

defineExpose({ confirmHandler });
</script>

<template>
  <div>
    <div class="font-bold italic text-2xl text-center">註冊帳號</div>
    <div class="min-h-5 text-sm text-center mt-2 mb-5">
      <span v-if="isEmailUsed" class="text-red-500">
        !! 電子信箱已被註冊 !!
      </span>
      <span v-else>填入資料完成註冊</span>
    </div>
    <div class="w-[250px] mx-auto">
      <LoggerField
        label="電子信箱"
        name="email"
        type="text"
        placeholder="電子信箱"
      />
      <LoggerField
        label="密碼"
        name="password"
        type="password"
        placeholder="密碼"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
