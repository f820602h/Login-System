import { useUserStore } from "@/stores/user";

export const loginPageMiddleware = async (to, from, next, done) => {
  const userStore = useUserStore();
  if (userStore.user) return next({ name: "Account" });
  done();
};

export const accountPageMiddleware = async (to, from, next, done) => {
  const userStore = useUserStore();
  if (!userStore.user) return next({ name: "Login" });
  done();
};
