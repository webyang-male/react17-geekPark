import * as echarts from "echarts";
import { useRef, useEffect } from "react";

function VisitorCount({ style }) {
  var visitchartDom = useRef();

  function chartInit() {
    var myChart = echarts.init(visitchartDom.current);
    const dataCount = 5e5;

    function generateData(count) {
      let baseValue = Math.random() * 1000;
      let time = +new Date(2022, 3, 1);
      let smallBaseValue;
      function next(idx) {
        smallBaseValue =
          idx % 30 === 0
            ? Math.random() * 700
            : smallBaseValue + Math.random() * 500 - 250;
        baseValue += Math.random() * 20 - 10;
        return Math.max(0, Math.round(baseValue + smallBaseValue) + 3000);
      }
      const categoryData = [];
      const valueData = [];
      for (let i = 0; i < count; i++) {
        categoryData.push(
          echarts.time.format.formatTime("yyyy-MM-dd\nhh:mm:ss", time, false)
        );
        valueData.push(next(i).toFixed(2));
        time += 1000;
      }
      return {
        categoryData: categoryData,
        valueData: valueData,
      };
    }

    const data = generateData(dataCount);

    var option = {
      title: {
        text: echarts.format.addCommas(dataCount) + " 人次",
        left: 10,
      },
    //   toolbox: {
    //     feature: {
    //       dataZoom: {
    //         yAxisIndex: false,
    //       },
    //       saveAsImage: {
    //         pixelRatio: 2,
    //       },
    //     },
    //   },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        bottom: 20,
      },
    //   dataZoom: [
    //     {
    //       type: "inside",
    //     },
    //     {
    //       type: "slider",
    //     },
    //   ],
      xAxis: {
        data: data.categoryData,
        silent: false,
        splitLine: {
          show: false,
        },
        splitArea: {
          show: false,
        },
      },
      yAxis: {
        splitArea: {
          show: false,
        },
      },
      series: [
        {
          type: "bar",
          data: data.valueData,
          color: 'rgb(46,49,124)',
          // Set `large` for large data amount
          large: true,
        },
      ],
    };

    option && myChart.setOption(option);
  }

  // 初始化echarts实例
  useEffect(() => {
    chartInit();
  });

  return (
    //   准备一个dom元素
    <>
      <div ref={visitchartDom} style={style}></div>
    </>
  );
}

export default VisitorCount;
