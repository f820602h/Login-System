import { BaseAxiosRequestor } from "../axios/index";

//檢查登入狀態、更新 cookie
export function axiosUserGetStatus() {
  return BaseAxiosRequestor.put({
    url: "/user/auth-valid",
  });
}

//取得個人資料
export function axiosUserGetInfo() {
  return BaseAxiosRequestor.get({
    url: "/user",
  });
}

//註冊
export function axiosUserSignUp(payload) {
  return BaseAxiosRequestor.post({
    url: "/user/signup",
    data: payload,
  });
}

//登入
export function axiosUserLogin(payload) {
  return BaseAxiosRequestor.post({
    url: "/user/login",
    data: payload,
  });
}

//登出
export function axiosUserLogout() {
  return BaseAxiosRequestor.delete({
    url: "/user/logout",
  });
}

//輸入驗證碼
export function axiosUserVerify(payload) {
  return BaseAxiosRequestor.patch({
    url: "/user/verify",
    data: payload,
  });
}

//重設密碼
export function axiosUserResetPassword(payload) {
  return BaseAxiosRequestor.patch({
    url: "/user/reset-password",
    data: payload,
  });
}

//更改密碼
export function axiosUserChangePassword(payload) {
  return BaseAxiosRequestor.patch({
    url: "/user/change-password",
    data: payload,
  });
}
