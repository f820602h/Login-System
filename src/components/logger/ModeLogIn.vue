<script setup>
import { ref } from "vue";
import { object } from "yup";
import { useForm } from "vee-validate";
import { userFieldValidation } from "@/system/fieldValidation";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { axiosUserLogin } from "@/api/user/index";
import LoggerField from "./LoggerField.vue";

defineEmits(["change-mode"]);

const userStore = useUserStore();
const router = useRouter();
const isAccountWrong = ref(false);

const validationSchema = object({
  email: userFieldValidation.email,
  password: userFieldValidation.password,
});
const { handleSubmit } = useForm({ validationSchema });
const confirmHandler = handleSubmit(async (values) => {
  isAccountWrong.value = false;
  const { email, password } = values;
  await axiosUserLogin({ email, password })
    .then(async () => {
      await userStore._actFetchUserInfo();
      router.push({ name: "Account" });
    })
    .catch(() => {
      isAccountWrong.value = true;
    });
});

defineExpose({ confirmHandler });
</script>

<template>
  <div>
    <div class="font-bold italic text-2xl text-center">會員登入</div>
    <div class="min-h-5 text-sm text-center mt-2 mb-5">
      <span v-if="isAccountWrong" class="text-red-500">
        !! 錯誤的帳號或密碼 !!
      </span>
      <span v-else>請輸入帳號密碼</span>
    </div>
    <div class="w-[250px] mx-auto">
      <LoggerField
        label="電子信箱"
        name="email"
        type="text"
        value=""
        placeholder="電子信箱"
      />
      <LoggerField
        label="密碼"
        name="password"
        type="password"
        value=""
        placeholder="密碼"
      />

      <div class="flex-center-center text-sm mt-3">
        <div class="link" @click="$emit('change-mode', 'Forget')">忘記密碼</div>
        <div class="link" @click="$emit('change-mode', 'SignUp')">註冊</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.link {
  @apply mx-3 border-b-[1px] border-[#242424] cursor-pointer;
  @apply hover:text-[#13fc5c] hover:border-[#13fc5c] transition-colors duration-150;
}
</style>
