import { createRouter, createWebHistory } from "vue-router";
import { pipelineGuard } from "./middleware/index";
import {
  loginPageMiddleware,
  accountPageMiddleware,
} from "./middleware/loginState";

import LoginPage from "@/views/LoginPage.vue";
import AccountPage from "@/views/AccountPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
      meta: {
        middleware: [loginPageMiddleware],
      },
    },
    {
      path: "/account",
      name: "Account",
      component: AccountPage,
      meta: {
        middleware: [accountPageMiddleware],
      },
    },
    {
      path: "/",
      redirect: {
        name: "Account",
      },
    },
  ],
});

router.beforeEach(pipelineGuard);

export default router;
