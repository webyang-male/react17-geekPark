// 所有模块做统一处理
// 导出一个统一的方法
import LoginStore from "./login.store";
import React from "react";
import UserStore from "./user.store";
class RootStore {
  constructor() {
    this.loginStore = new LoginStore();
    this.userStore = new UserStore();
  }
}

//实例化根
//导出 useStore Context
const rootStore = new RootStore();
const context = React.createContext(rootStore);

const useStore = () => {
  return React.useContext(context);
}
export { useStore };