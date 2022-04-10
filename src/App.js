import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
// import Layout from "./pages/Layout";
// import Login from "./pages/Login";

//配置别名路径
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";

import { AuthComponent } from "@/components/AuthComponent";

import Publish from "./pages/Publish";
import Article from "./pages/Article";
import Home from "./pages/Home";

function App() {
  return (
    // 路由配置
    <BrowserRouter>
      <div className="App">
        {/* 创建路由path和组件对应关系 */}
        <Routes>
          {/* 需要鉴权的路由 */}
          <Route path="/" element={
            <AuthComponent>
              <Layout />
            </AuthComponent>
          }>
            {/* 二级路由默认页面 */}
            <Route index path="/" element={<Home />} />
            <Route path="article" element={<Article />} />
            <Route path="publish" element={<Publish />} />
          </Route>
          {/* 不需要鉴权的路由 */}
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
