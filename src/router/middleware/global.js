import { useUserStore } from "@/stores/user";

export const checkUserStatusMiddleware = async (to, from, next, done) => {
  const userStore = useUserStore();
  await userStore._actFetchUserInfo();
  done();
};
