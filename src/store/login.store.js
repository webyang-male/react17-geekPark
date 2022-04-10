import { makeAutoObservable } from "mobx";
import { http, setToken, getToken, removeToken } from "@/utils";

class LoginStore {
  token = getToken() || " ";

  constructor() {
    // 响应式
    makeAutoObservable(this);
  }
  getToken = async ({ mobile, code }) => {
    //调用登陆接口
    //获取token
    const res = await http.post("http://geek.itheima.net/v1_0/authorizations", {
      mobile,
      code,
    });
    this.token = res.data.token;
    // console.log(this.token);
    //存储token
    setToken(res.data.token);
  };
  LoginOut = () => {
    this.token = " ";
    removeToken();
    // console.log("清除Token");
  };
}
export default LoginStore;
