<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import BlurMask from "@/components/basic/BlurMask.vue";
import UserLogger from "@/components/logger/UserLogger.vue";

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
    <UserLogger />
  </BlurMask>

  <div ref="marqueeEl">
    <div class="marquee shadow-inner-md">
      <p>請登入會員！！請登入會員！！</p>
    </div>
    <div class="marquee"><p>401 Unauthorized！！</p></div>
    <div class="marquee shadow-inner-md">
      <p>請登入會員！！請登入會員！！</p>
    </div>
    <div class="marquee"><p>401 Unauthorized！！</p></div>
    <div class="marquee shadow-inner-md">
      <p>請登入會員！！請登入會員！！</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.marquee {
  @apply flex h-[20vh] italic text-[#242424] text-[16vh] font-extrabold leading-[20vh] break-keep whitespace-nowrap overflow-hidden;
}
</style>
