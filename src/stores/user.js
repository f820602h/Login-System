import { defineStore } from "pinia";
import { User } from "@/class/User";
import { axiosUserGetInfo } from "@/api/user/index";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
    temp: {
      verifyCode: "",
      verifyKey: "",
    },
  }),
  actions: {
    async _actFetchUserInfo() {
      await axiosUserGetInfo()
        .then((res) => {
          this.user = new User(res.data);
        })
        .catch(() => {
          this.user = null;
        });
    },
  },
});
