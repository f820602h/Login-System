<script setup>
import { object } from "yup";
import { useForm } from "vee-validate";
import { userFieldValidation } from "@/system/fieldValidation";
import { useNotification } from "naive-ui";
import AccountField from "./AccountField.vue";
import { axiosUserChangePassword } from "@/api/user/index";

const emit = defineEmits(["change-mode"]);

const notification = useNotification();

const validationSchema = object({
  password: userFieldValidation.password,
});
const { handleSubmit } = useForm({ validationSchema });
const confirmHandler = handleSubmit(async (values) => {
  const { password } = values;
  await axiosUserChangePassword({ password });
  notification.success({
    content: "密碼變更成功",
    meta: "您已成功變更密碼",
    duration: 2500,
    keepAliveOnHover: true,
  });
  emit("change-mode", "Info");
});

defineExpose({ confirmHandler });
</script>

<template>
  <div>
    <div class="font-bold italic text-3xl text-center">變更密碼</div>
    <div class="min-h-5 text-sm text-center mt-2 mb-5">
      <span>請輸入新密碼</span>
    </div>
    <div class="w-[250px] mx-auto">
      <AccountField
        label="新密碼"
        name="password"
        type="password"
        placeholder="新密碼"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
