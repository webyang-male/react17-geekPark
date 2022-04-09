import { Card, Form, Input, Button, Checkbox } from "antd";
import logo from "@/assets/logo.png";
import "./index.scss";

function Login() {
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
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
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
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
          </Form.Item>
          {/* <Form.Item
            label="验证码"
            name="code"
            rules={[
              {
                len: 6,
                type: Number,
                message: "验证码6个字符",
                validateTrigger: "onBlur",
              },
              { required: true, message: "请输入6位验证码" },
            ]}
          >
            <Input size="large" placeholder="请输入验证码" maxLength={6} />
          </Form.Item> */}
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
