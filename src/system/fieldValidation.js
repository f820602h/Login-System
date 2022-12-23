import { string } from "yup";

export const userFieldValidation = {
  email: string().email("電子信箱格式錯誤").required("請輸入電子信箱"),
  password: string()
    .max(20, "密碼長度請勿超過20")
    .min(8, "密碼長度不足")
    .required("請輸入密碼"),
  code: string().required("請輸入註冊驗證碼"),
};

export const taskCategoryFieldValidation = {
  name: string().max(12, "最多 12 個字元").required("請輸入群組名稱"),
  colorS: string().max(7),
  colorE: string().max(7),
};

export const taskCardFieldValidation = {
  title: string().max(12, "最多 12 個字元").required("請輸入任務標題"),
  additionContent: string().max(40, "最多 40 個字元"),
  additionUrl: string(),
};
