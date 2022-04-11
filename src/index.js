import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//引入antd样式
import "antd/dist/antd.min.css";
// 自定义全局样式文件
import "./index.scss";

ReactDOM.render(<App />, document.getElementById("root"));

window.onload = function () {
  // 手动添加mate标签
  const addMeta = (httpEquiv, content) => {
    const meta = document.createElement("meta");
    meta.content = content;
    meta.httpEquiv = httpEquiv;
    meta.id = "meta";
    document.getElementsByTagName("head")[0].appendChild(meta);
  };

  addMeta("Content-Security-Policy", "upgrade-insecure-requests");
  const meta = document.querySelector("#meta");
  console.log(meta);
  console.log(meta.httpEquiv, meta.content);
};
