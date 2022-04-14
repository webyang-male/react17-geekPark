// echarts组件图
import Bar from "@/components/Bar/index.js";
// import RaceChart from "@/components/RaceChart.js";
import VisitorCount from "@/components/VisitorCount/index.js";

import { Skeleton } from "antd";

import { Statistic, Card, Col, Row } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

import TodoList from "@/components/TodoList/TodoList";
import Pai from "@/components/Pai/Pai";

function Home() {
  return (
    //   准备一个dom元素
    <>
      <div style={{ marginBottom: "1rem" }}>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="核心看板" bordered={false}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Statistic title="Active Users" value={112893} />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Account Balance (CNY)"
                      value={112893}
                      precision={2}
                    />
                  </Col>
                </Row>
                <div className="site-statistic-demo-card">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Card>
                        <Statistic
                          title="Active"
                          value={11.28}
                          precision={2}
                          valueStyle={{ color: "#3f8600" }}
                          prefix={<ArrowUpOutlined />}
                          suffix="%"
                        />
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card>
                        <Statistic
                          title="Balance"
                          value={9.3}
                          precision={2}
                          valueStyle={{ color: "#cf1322" }}
                          prefix={<ArrowDownOutlined />}
                          suffix="%"
                        />
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="访问量" bordered={false}>
                <VisitorCount
                  style={{
                    width: "495px",
                    height: "177px",
                    maxWidth: "495px",
                    maxHeight: "177px",
                  }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="待办事项" bordered={false}>
                <TodoList />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "10rem",
        }}
      >
        <Bar
          title="主流框架使用人数"
          xData={["Vue", "React", "Angular"]}
          yData={[65, 39, 27]}
          style={{ width: "500px", height: "350px" }}
          color={"#91cc75"}
        />
        <Pai style={{ width: "550px", height: "350px" }} />
        <div id="chartsThree">
          <Skeleton
            active
            paragraph={{ rows: 8 }}
            style={{ width: "450px" }}
            id="skeleton"
          />
        </div>
      </div>
    </>
  );
}
export default Home;
