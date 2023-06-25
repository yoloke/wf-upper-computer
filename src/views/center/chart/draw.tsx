import { defineComponent, watch, shallowReactive } from "vue";
import * as echarts from "echarts";
// 声明类型
const PropsType = {
  tips: {
    type: Number,
    default: 50,
    require: true,
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

// 定义主体
export default defineComponent({
  props: PropsType,
  setup(props) {
    // 配置项
    let options = shallowReactive({
      tooltip: {
        /*
        {a}：表示系列的名称（series name）。
{b}：表示数据项的名称（data item name）。
{c}：表示数据项的值（data item value）。
*/
        formatter: "{a} <br/> : {c} {b}", // 提示框内容的格式化字符串
      },
      series: [
        {
          name: "气压", // 系列名称
          type: "gauge", // 图表类型为仪表盘
          min: 0, // 最小值
          max: 100, // 最大值
          splitNumber: 12, // 刻度线的分割段数
          detail: {
            formatter: "{r1|{value}}", // 仪表盘详情的格式化字符串
            rich: {
              r1: {
                fontSize: 30, // r1 标签的字体大小
                verticalAlign: "bottom", // 垂直对齐方式为底部
                padding: [0, 5, -2, 0], // r1 标签的内边距（上、右、下、左）
                color: "#15ccbf", // 详情文本的颜色自动匹配
              },
            },
          },
          pointer: {
            icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z", // 指针图标的路径
            length: "75%", // 指针长度
            width: 10, // 指针宽度
            offsetCenter: [0, "5%"], // 指针的中心偏移量
          },
          progress: {
            roundCap: true, // 进度条的末端形状为圆角
            show: true, // 显示进度条
            width: 12, // 进度条宽度
            itemStyle: {
              shadowColor: "rgba(255, 255, 255, 0.4)", // 阴影的颜色
              shadowBlur: 12, // 阴影的模糊程度
              shadowOffsetX: 3, // 阴影在水平方向上的偏移量
              shadowOffsetY: 3, // 阴影在垂直方向上的偏移量
            },
          },
          itemStyle: {
            color: "#0082FF", // 仪表盘指针的颜色
          },

          data: [
            {
              value: 52.33, // 仪表盘的值
            },
          ],
          // 设置仪表盘的刻度线样式
          axisLine: {
            roundCap: true, // 刻度线末端形状为圆角
            lineStyle: {
              width: 12, // 刻度线的宽度
            },
          },
          splitLine: {
            show: false, // 不显示分隔线
          },
          axisTick: {
            show: false, // 不显示刻度线
          },
          axisLabel: {
            show: false, // 不显示刻度标签
          },
          zlevel: 10, // 图层的层级
        },
        {
          name: "", // 系列名称
          type: "gauge", // 图表类型为仪表盘
          splitNumber: 10, // 刻度线的分割段数
          min: 0, // 最小值
          max: 100, // 最大值
          radius: "70%", // 仪表盘的尺寸
          center: ["50%", "50%"], // 仪表盘的中心位置
          zlevel: 1, // 图层的层级
          axisLine: {
            show: true, // 显示刻度线
            lineStyle: {
              width: 0, // 刻度线的宽度
              shadowBlur: 0, // 刻度线的阴影模糊大小
              color: [
                [0.2, "#23AFAF"], // 刻度线颜色的分段设置
                [0.4, "#2270DA"],
                [0.6, "#E99D02"],
                [1, "#F45656"],
              ],
            },
          },
          axisTick: {
            show: true, // 显示刻度线
            lineStyle: {
              color: "auto", // 刻度线颜色自动匹配
              width: 2, // 刻度线的宽度
            },
            length: 10, // 刻度线的长度
            splitNumber: 5, // 刻度线的分割段数
          },
          splitLine: {
            show: true, // 显示分隔线
            length: 12, // 分隔线的长度
            lineStyle: {
              color: "auto", // 分隔线颜色自动匹配
              width: 2, // 分隔线的宽度
            },
          },
          axisLabel: {
            distance: 5, // 刻度标签与刻度线的距离
            color: "#9BA5BC", // 刻度标签的颜色
            fontSize: 12, // 刻度标签的字体大小
          },
          pointer: {
            show: 0, // 不显示指针
            length: "0%", // 指针长度为0%
            width: 1, // 指针宽度为1
          },
          anchor: {
            show: true, // 显示指针锚点
            showAbove: true, // 指针锚点显示在指针上方
            size: 30, // 指针锚点的大小
            itemStyle: {
              color: "#EAEBF1", // 指针锚点的颜色
            },
          },
          detail: {
            show: false, // 不显示详情
          },
          data: [], // 数据项为空
        },
      ],
    });

    return () => {
      const height = "100%";
      const width = "100%";

      return <echart options={options} height={height} width={width} />;
    };
  },
});
