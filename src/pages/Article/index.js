import { Link,useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  message,
  Popconfirm,
} from "antd";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";

import { Table, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import img404 from "@/assets/error.png";

import "./index.scss";

import { http } from "@/utils";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
 
  const {channelStore} = useStore();

  //筛选事件
  const onFinish = (values) => {
    console.log("values#####", values);
    const { channel_id, date, status } = values;
    // 初始化表单数据
    const _params = {};
    if (status !== -1) {
      _params.status = status;
    }
    if (channel_id) {
      _params.channel_id = channel_id;
    }
    if (date) {
      _params.begin_pubdate = date[0].format("YYYY-MM-DD");
      _params.end_pubdate = date[1].format("YYYY-MM-DD");
    }
    // 修改params参数 触发接口再次发起  对象合并是整体覆盖
    setParams({ ...params, ..._params });
    message.success("查询成功");
  };

  //分页组件事件
  const pageChange = (page) => {
    setParams({ ...params, page });
  };

  //文章删除

  const delArticle = async (data) => {
    await http.delete(`/mp/articles/${data.id}`);
    // //更新列表
    setParams({
      page: 1,
      per_page: 10,
    });
    message.success("文章删除成功!");
  };

 const navigate = useNavigate();
  //编辑文章跳转
  const goPublish = (data) => {
   navigate(`/publish?id=${data.id}`)
  }

  //列表项
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        //   console.log(cover);
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (data) => <Tag color="green">审核通过</Tag>,
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>{goPublish(data)}}/>
            <Popconfirm title="确定删除文章?" okText="Yes" cancelText="No" onConfirm={() => {
                  delArticle(data);
                }}>
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                // onClick={}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  //文章列表管理,统一管理数据
  const [articleData, setArticleData] = useState({
    list: [], //文章列表
    count: 0, //文章数量
  });

  //文章参数管理
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
  });

  // 统一不抽离函数到外面只要涉及到异步请求的函数都放到useEffect内部
  // 本质区别:写到外面每次组件更新都会重新进行函数初始化这本身就是一次性能消耗
  // 而写到useEffect中只会在依赖项发生变化的时候函数才会进行重新初始化
  // 避免性能损失
  useEffect(() => {
    const loadList = async () => {
      const res = await http.get("/mp/articles", { params });
      console.log(res);
      const { results, total_count } = res.data;
      setArticleData({
        list: results,
        count: total_count,
      });
    };
    loadList();
  }, [params]);

  return (
    <div id="articleContainer">
      {/* 筛选区卡片 */}
      <Card
      id="articleFilter"
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form onFinish={onFinish} initialValues={{ status: -1 }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select id="channelList" placeholder="请选择文章频道" style={{ width: 150}}>
              {channelStore.channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "1.5rem" }}
            >
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区卡片 */}
      <Card title={`根据筛选条件共查询到${articleData.count}条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={articleData.list  }
          pagination={{
            pageSize: params.per_page,
            total: articleData.count,
            onChange: pageChange,
          }}
        />
      </Card>
    </div>
  );
};

export default observer(Article);
