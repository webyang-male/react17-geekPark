import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./index.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
import { useState, useEffect, useRef } from "react";
import { http } from "../../utils/http";

const { Option } = Select;

const Publish = () => {
  //编辑组件link功能bug临时解决方案
  window.addEventListener("load", function () {
    let qllink = document.getElementsByClassName("ql-link");
    let linkEditor = document.getElementsByClassName("ql-hidden")[0];
    // console.log(linkEditor);
    qllink[0].addEventListener("click", function (e) {
      // console.log(e,linkEditor);
      linkEditor.style.visibility = "visible";
    });
    qllink[0].ondblclick = function (e) {
      console.log(e, linkEditor);
      linkEditor.style.visibility = "hidden";
    };
  });

  //频道列表状态数据
  const { channelStore } = useStore();

  //使用ref暂存图片列表
  const cacheImgs = useRef([]);
  //存放上传图片的数据
  const [fileList, setFileList] = useState([]);
  // 上传成功回调
  const onUploadChange = ({ fileList }) => {
    //同时存入图片
    const formatList = fileList.map((file) => {
      //图片上传完毕执行
      if (file.response) {
        message.success("图片上传成功");
        return {
          url: file.response.data.url,
        };
      }
      //否则没上传完毕返回原来的file,不做处理
      return file;
    });
    setFileList(formatList);
    cacheImgs.current = formatList;
  };

  //提交表单
  const navigate = useNavigate();
  let onFinish = async (values) => {
    console.log(values);
    const { title, content, channel_id, type } = values;
    let params = {
      title,
      content,
      channel_id,
      type,
      cover: {
        type,
        images: fileList.map((item) => item.url),
      },
    };
    if (id) {
      await http.put(`/mp/articles/${id}?draft=false`, params);
    } else {
      //新增
      await http.post("/mp/articles?draft=false", params);
    }

    navigate("/article");
    message.success(`文章${id ? "更新" : "发布"}成功`);
  };

  //切换图片状态
  const [imgCount, setImgCount] = useState(1);

  const radioChange = (e) => {
    // console.log(e);
    const count = e.target.value;
    setImgCount(count);

    //尝试获取并判断是否有图片
    if (count === 1) {
      const img = cacheImgs.current ? cacheImgs.current[0] : [];
      setFileList([img]);
    } else if (count === 3) {
      setFileList(cacheImgs.current ? [cacheImgs] : []);
    }
  };

  //文案适配 根据路由参数id
  const [params] = useSearchParams();
  const id = params.get("id");

  //数据回显 文章已有数据保存
  const [form] = Form.useForm();
  useEffect(() => {
    let getArticle = async () => {
      const res = await http.get(`/mp/articles/${id}`);
      const { cover, ...formValue } = res.data;
      // 动态设置表单数据
      form.current.setFieldsValue({ ...formValue, type: cover.type });

      const formatImgsList = res.data.cover.images.map((url) => ({ url }));
      //调用setFileList方法回填图片
      setFileList(formatImgsList);

      //暂存图片数据
      cacheImgs.current = formatImgsList;
    };

    if (id) {
      // 拉取数据回显
      getArticle();
    }
  }, [id, form]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? `编辑` : "发布"}文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: "<p>Hello World!</p>" }}
          onFinish={onFinish}
          ref={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            {/* 自定义上传图片控件逻辑 */}
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                maxCount={imgCount}
                multiple={imgCount > 1}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>

          {/* 这里的富文本内容已经被form.item控制;它的数据内容将会在onFinished中被获取 */}
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                id="articlePub"
              >
                {id ? `更新` : `发布`}文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default observer(Publish);
