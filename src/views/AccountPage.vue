<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import BlurMask from "@/components/basic/BlurMask.vue";
import UserAccount from "@/components/account/UserAccount.vue";

const marqueeEl = ref(null);
const timers = ref([]);

function marquee(element, speed) {
  const clone = element.innerHTML;
  const firstElement = element.children[0];
  let i = 0;
  element.insertAdjacentHTML("beforeend", clone);
  element.insertAdjacentHTML("beforeend", clone);

  timers.value.push(
    setInterval(function () {
      firstElement.style.marginLeft = `-${i}px`;
      if (i > firstElement.clientWidth) {
        i = 0;
      }
      i = i + speed;
    }, 1000 / 60)
  );
}

onMounted(() => {
  marqueeEl.value.childNodes.forEach((element) => {
    marquee(element, 0.5 + Math.random());
  });
});

onBeforeUnmount(() => {
  timers.value.forEach((timer) => {
    clearInterval(timer);
  });
});
</script>

<template>
  <BlurMask class="justify-center items-center">
    <UserAccount />
  </BlurMask>

  <div ref="marqueeEl">
    <div class="marquee shadow-inner-md"><p>歡迎！！歡迎！！</p></div>
    <div class="marquee"><p>ようこそ！！ようこそ！！</p></div>
    <div class="marquee shadow-inner-md"><p>WELCOME！！WELCOME！！</p></div>
    <div class="marquee"><p>환영하다！！환영하다！！</p></div>
    <div class="marquee shadow-inner-md"><p>歡迎！！歡迎！！</p></div>
  </div>
</template>

<style lang="scss" scoped>
.marquee {
  @apply flex h-[20vh] italic text-[#242424] text-[16vh] font-extrabold leading-[20vh] break-keep whitespace-nowrap overflow-hidden;
}
</style>
