import { defineComponent, watch, reactive } from "vue";
import * as echarts from "echarts";
// 声明类型
const PropsType = {
  tips: {
    type: Number,
    default: 50,
  },
  colorObj: {
    type: Object,
    default: () => ({
      textStyle: "#3fc0fb",
      series: {
        color: ["#00bcd44a", "transparent"],
        dataColor: {
          normal: "#03a9f4",
          shadowColor: "#97e2f5",
        },
      },
    }),
  },
} as const;

export default defineComponent({
  props: PropsType,
  setup(props) {
    const xData = [
      "不漏气",
      "通讯成功",
      "合格5",
      "合格4",
      "合格3",
      "合格2",
      "合格1",
    ];

    const textColor = "#fff";
    const lineColor = "rgba(90, 90, 137, 0.7)";
    let yData = reactive([]);
    // 定义定时器，每隔一段时间执行一次

    setInterval(() => {
      yData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 1000));
      options.series[0].data = yData;
    }, 2000);

    let colors = [
      {
        borderColor: "rgba(227,161,96,1)",
        start: "rgba(0, 110, 153, 1)",
        end: "rgba(21, 75, 150, 1)",
      },
      {
        borderColor: "rgba(0,222,255,1)",
        start: "rgba(0, 110, 153, 1)",
        end: "rgba(21, 75, 150, 1)",
      },
    ];
    const options = reactive({
      timeline: {
        show: false,
        top: 0,
        data: [],
      },
      legend: {
        top: "5%",
        right: "5%",
        itemWidth: 20,
        itemHeight: 5,
        icon: "horizontal",
        textStyle: {
          color: "#ffffff",
          fontSize: 20,
        },
        data: ["良品结果", "不良品结果"],
      },
      grid: {
        top: "15%",
        bottom: "20%",
        left: "14%",
        right: "10%",
      },
      xAxis: {
        type: "value",
        axisLine: {
          show: true,
          lineStyle: {
            color: lineColor,
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: textColor,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: lineColor,
            type: "dashed", // 设置 x 轴分割线为虚线
          },
        },
      },
      yAxis: {
        type: "category", // 设置 y 轴类型为类别型
        axisLine: {
          show: false, // 隐藏 y 轴线
        },
        axisTick: {
          show: false, // 不显示 y 轴刻度线
        },
        axisLabel: {
          show: true, // 显示 y 轴刻度标签
          color: textColor, // 设置 y 轴刻度标签的颜色
          // 设置刻度标签的样式
          textStyle: {
            fontSize: 14, // 字体大小
            fontWeight: 400, // 字体粗细
          },
        },
        // splitLine: {
        //   show: false, // 隐藏 y 轴分割线
        //   lineStyle: {
        //     color: lineColor, // 设置 y 轴分割线的颜色
        //   },
        // },
        data: xData, // 设置 y 轴的数据为 xData
      },

      series: [
        {
          name: "良品结果", // 系列名称
          type: "bar", // 系列类型为柱状图
          stack: "2", // 数据堆叠的分组名称
          barWidth: "40%", // 柱状图宽度

          label: {
            normal: {
              show: false, // 不显示标签
            },
          },
          data: [], // 根据当前索引选择对应的数据
          animationEasing: "elasticOut", // 动画效果的缓动函数
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                // 使用线性渐变设置柱状图的颜色
                {
                  offset: 0,
                  color: colors[1].start, // 渐变起始颜色
                },
                {
                  offset: 1,
                  color: colors[1].end, // 渐变结束颜色
                },
              ]),
            },
          },
        },
      ],
    });

    watch(
      () => props.tips,
      (val) => {
        options.timeline.show = false;
      },
      {
        immediate: true,
      }
    );

    return () => {
      const height = "100%";
      const width = "100%";

      return <echart options={options} height={height} width={width} />;
    };
  },
});
