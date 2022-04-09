import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//引入antd样式
import 'antd/dist/antd.min.css';
// 自定义全局样式文件
import "./index.scss";


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
