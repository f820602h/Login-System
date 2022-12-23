import axios from "axios";

export class AxiosRequestor {
  constructor(config) {
    this.instance = axios.create(config);
    this.showLoading = config.showLoading;
    this.reqInterceptors = config.reqInterceptors;
    this.resInterceptors = config.resInterceptors;

    this.reqInterceptors?.forEach(
      ({ onFulfilled = (res) => res, onRejected = (err) => err }) => {
        this.instance.interceptors.request.use(onFulfilled, onRejected);
      }
    );

    this.resInterceptors?.forEach(
      ({ onFulfilled = (res) => res, onRejected = (err) => err }) => {
        this.instance.interceptors.response.use(onFulfilled, onRejected);
      }
    );
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get(config) {
    return this.request({ ...config, method: "GET" });
  }

  post(config) {
    return this.request({ ...config, method: "POST" });
  }

  delete(config) {
    return this.request({ ...config, method: "DELETE" });
  }

  patch(config) {
    return this.request({ ...config, method: "PATCH" });
  }

  put(config) {
    return this.request({ ...config, method: "PUT" });
  }
}
