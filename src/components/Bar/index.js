//封装bar图表组件

import * as echarts from "echarts";
import { useRef, useEffect } from "react";

function Bar({ style, xData, yData, title, color }) {
  let domRef = useRef();

  let chartInit = () => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(domRef.current);
    // 绘制图表
    myChart.setOption({
      title: {
        text: title,
      },
      tooltip: {},
      xAxis: {
        data: xData,
      },
      yAxis: {},
      series: [
        {
          name: "单位:万人(W)",
          type: "bar",
          data: yData,
          itemStyle: {
            color: color,
            shadowColor: "rgb(150,164,78)",
            borderType: "dashed",
            opacity: 0.5,
          },
        },
      ],
    });

  };

  // 初始化echarts实例
  useEffect(() => {
    chartInit();
  });



  return (
    //   准备一个dom元素
    <>
      <div ref={domRef} style={style}></div>
    </>
  );
}

export default Bar;
