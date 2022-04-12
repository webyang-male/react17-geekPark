import { Card, Form, Input, Button, Checkbox, message } from "antd";
import logo from "@/assets/logo.png";
import "./login.scss";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";

function Login() {
  //提交表单且数据验证成功后回调事件
  const { loginStore } = useStore();
  const navigate = useNavigate();

  async function onFinish(values) {
    console.log("Success:", values);
    try {
      await loginStore.getToken({ 
        mobile: values.username,
        code: values.password
      });
      //登录
      message.success("登陆成功");
      //跳转到首页
      navigate("/");
    } catch (e) {
      message.error(e.response?.data?.message || "登录失败");
    }
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          onFinish={onFinish}
          validateTrigger={["onBlur", "onChange"]}
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            label="账号"
            name="username"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "手机号码内容非法！",
                validateTrigger: "onChange",
              },
              {
                required: true,
                message: "账号不能为空!",
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" autoComplete="off"/>
          </Form.Item>
          {/* <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                pattern:
                  /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*()_.]+)$)^[\w~!@#$%^&*()_.]{6,10}$/,
                validateTrigger: "onBlur",
                message: "密码应由字母/数字/特殊符号两种及以上组合！",
              },
              { required: true, message: "密码不能为空!" },
            ]}
          >
            <Input size="large" placeholder="请输入密码" />
          </Form.Item> */}
          <Form.Item
            label="验证码"
            name="password"
            rules={[
              {
                len: 6,
                required: true,
                message: "请输入6位数字验证码",
                validateTrigger: "onBlur",
              },
            ]}
          >
            <Input size="large" placeholder="请输入验证码" maxLength={6} />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>

          <Form.Item>
            {/* 渲染Button组件为submit按钮 */}
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;


// window.onload = function () {
//   // 手动添加mate标签
//   const addMeta = (httpEquiv, content) => {
//     const meta = document.createElement("meta");
//     meta.content = content;
//     meta.httpEquiv = httpEquiv;
//     meta.id = "meta";
//     document.getElementsByTagName("head")[0].appendChild(meta);
//   };

//   addMeta("Content-Security-Policy", "upgrade-insecure-requests");
//   const meta = document.querySelector("#meta");
//   console.log(meta);
//   console.log(meta.httpEquiv, meta.content);
// };
