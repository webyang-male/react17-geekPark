import * as echarts from "echarts";
import { useRef, useEffect } from "react";

function RaceChart({ style, yData, title }) {
  let RacechartdomRef = useRef();

  let chartInit = () => {
    const myChart = echarts.init(RacechartdomRef.current);
    var data = [];
    for (let i = 0; i < 5; ++i) {
      data.push(Math.round(Math.random() * 200));
    }

    var option = {
      xAxis: {
        max: "dataMax",
      },
      title: {
        text: title,
      },
      yAxis: {
        type: "category",
        data: yData,
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 2, // only the largest 3 bars will be displayed
      },
      series: [
        {
          realtimeSort: true,
          name: "社区实时日活",
          type: "bar",
          data: data,
          color: "rgb(252,161,6)",
          label: {
            show: true,
            position: "right",
            valueAnimation: true,
          },
        },
      ],
      legend: {
        show: true,
      },
      animationDuration: 3000,
      animationDurationUpdate: 3000,
      animationEasing: "linear",
      animationEasingUpdate: "linear",
    };
    function update() {
      var data = option.series[0].data;
      for (var i = 0; i < data.length; ++i) {
        if (Math.random() > 0.9) {
          data[i] += Math.round(Math.random() * 2000);
        } else {
          data[i] += Math.round(Math.random() * 200);
        }
      }
      myChart.setOption(option);
    }
    setInterval(function () {
      update();
    }, 3000);
  };

  // 初始化echarts实例
  useEffect(() => {
    chartInit();
  });

  return (
    //   准备一个dom元素
    <>
      <div ref={RacechartdomRef} style={style}></div>
    </>
  );
}

export default RaceChart;
