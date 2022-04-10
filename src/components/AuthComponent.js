//1.判断token是否存在
//2.如果存在,则直接渲染
//3.如果不存在,则跳转到登陆页面
import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

function AuthComponent({ children }) {
  let token = getToken();
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace/>;
  }
}

export {AuthComponent};
