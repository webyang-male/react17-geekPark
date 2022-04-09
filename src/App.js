import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
// import Layout from "./pages/Layout";
// import Login from "./pages/Login";

//配置别名路径
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";


function App() {
  return (
    // 路由配置
    <BrowserRouter>
      <div className="App">
        {/* 创建路由path和组件对应关系 */}
        <Routes>
          <Route path="/" element={<Layout/>}/>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
