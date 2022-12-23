<script setup>
import { object } from "yup";
import { useForm } from "vee-validate";
import { userFieldValidation } from "@/system/fieldValidation";
import LoggerField from "./LoggerField.vue";
import { axiosUserResetPassword } from "@/api/user/index";
import { ref } from "vue";

const isEmailNotExist = ref(false);
const newPassword = ref("");

const validationSchema = object({
  email: userFieldValidation.email,
});
const { handleSubmit } = useForm({ validationSchema });
const confirmHandler = handleSubmit(async (values) => {
  const { email } = values;
  await axiosUserResetPassword({ email })
    .then((res) => {
      newPassword.value = res.data.password;
    })
    .catch(() => {
      isEmailNotExist.value = true;
    });
});

defineExpose({ confirmHandler });
</script>

<template>
  <div>
    <div class="font-bold italic text-2xl text-center">忘記密碼</div>
    <div class="min-h-5 text-sm text-center mt-2 mb-5">
      <span v-if="isEmailNotExist" class="text-red-500">
        !! 電子信箱不存在 !!
      </span>
      <span v-else>請輸入電子信箱以取得新密碼</span>
    </div>
    <div class="w-[250px] mx-auto">
      <LoggerField
        label="電子信箱"
        name="email"
        type="text"
        placeholder="電子信箱"
      />
      <template v-if="newPassword">
        <div class="text-sm font-bold mb-1">新密碼</div>
        <div
          class="py-2 text-4xl text-center font-bold text-white bg-[#242424]"
        >
          {{ newPassword }}
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
