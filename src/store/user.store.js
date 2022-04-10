import { makeAutoObservable } from "mobx";
import { http } from "@/utils/http";
class UserStore {
  userInfo = {};
  constructor() {
    makeAutoObservable(this);
  }
  getUserInfo = async () => {
    // 获取用户信息
    const res = await http.get("/user/profile");
    this.userInfo = res.data;
  };
}
export default UserStore;
