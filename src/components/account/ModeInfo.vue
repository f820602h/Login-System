<script setup>
import { useUserStore } from "@/stores/user";

defineEmits(["change-mode"]);

const userStore = useUserStore();
</script>

<template>
  <div>
    <div class="font-bold italic text-3xl text-center">WELCOME</div>
    <table class="my-3 mx-auto italic font-bold text-zinc-500">
      <tbody>
        <!-- <tr>
          <td width="120" height="35">ID:</td>
          <td class="font-normal">{{ userStore.user.id }}</td>
        </tr> -->
        <tr>
          <td width="100" height="35">E-Mail:</td>
          <td width="200" height="35" class="font-normal">
            {{ userStore.user.email }}
          </td>
        </tr>
        <tr>
          <td width="100" height="35">Password:</td>
          <td width="200" height="35">
            <div class="flex-between-center">
              <span class="font-normal">*****</span>
              <div class="link" @click="$emit('change-mode', 'Change')">
                變更密碼
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <img width="300" class="block mx-auto" src="@/assets/giphy.gif" />
  </div>
</template>

<style lang="scss" scoped>
.link {
  @apply border-b-[1px] border-[#242424] text-[#242424] text-xs not-italic cursor-pointer;
  @apply hover:text-[#13fc5c] hover:border-[#13fc5c] transition-colors duration-150;
}
</style>
