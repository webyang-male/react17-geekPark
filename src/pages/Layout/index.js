import { Layout, Menu, Popconfirm, message } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";

import { Outlet, useLocation, Link,useNavigate} from "react-router-dom";
import { observer } from "mobx-react-lite";

import { useStore } from "../../store/index";
import { useEffect } from "react";

const { Header, Sider } = Layout;

const GeekLayout = () => {
  const location = useLocation();
  // 获取当前浏览器上的路径地址
  const selectedLocationKey = location.pathname;

  const { userStore, loginStore } = useStore();
  userStore.getUserInfo();
  //副作用,调用接口获取用户信息
  useEffect(() => {
    userStore.getUserInfo();
  }, [userStore]);


  //用户退出登陆
  const navigate = useNavigate();
  function onConfirm(e) {
    message.success("您已成功登出 !");
    //删除token,用户登出
    loginStore.LoginOut();
    navigate("/login");
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              onConfirm={onConfirm}
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="light"
            //动态高亮绑定路由
            selectedKeys={[selectedLocationKey]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to={"/"}>数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to="/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to="/publish">发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

// export default observer(GeekLayout);
export default GeekLayout;
