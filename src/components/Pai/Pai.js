import * as echarts from "echarts";
import { useRef, useEffect } from "react";

function Pai({ style, xData, yData, title, color }) {
  let PaiRef = useRef();

  let chartInit = () => {
    var myChart = echarts.init(PaiRef.current);
    var option;

    option = {
      title: {
        text: "用户来源示意图",
        subtext: "Fake Data",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    option && myChart.setOption(option);
  };

  // 初始化echarts实例
  useEffect(() => {
    chartInit();
  });

  return (
    //   准备一个dom元素
    <>
      <div ref={PaiRef} style={style}></div>
    </>
  );
}
export default Pai;