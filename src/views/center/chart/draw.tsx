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
    let scaleData = [
      {
        name: "合格等级1",
        value: 600,
      },
      {
        name: "合格等级2",
        value: 400,
      },
      {
        name: "合格等级3",
        value: 200,
      },
      {
        name: "合格等级4",
        value: 200,
      },
    ];
    var legend = ["合格等级1", "合格等级2", "合格等级3", "合格等级4"];
    var data = [];
    var placeHolderStyle = {
      normal: {
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        color: "rgba(0, 0, 0, 0)",
        borderColor: "rgba(0, 0, 0, 0)",
        borderWidth: 0,
      },
    };

    for (var i = 0; i < scaleData.length; i++) {
      data.push(
        {
          value: scaleData[i].value,
          name: scaleData[i].name,
          itemStyle: {
            normal: {
              borderWidth: 2,
              shadowBlur: 6,
              borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                {
                  offset: 0,
                  color: "#7777eb",
                },
                {
                  offset: 1,
                  color: "#70ffac",
                },
              ]),
              shadowColor: "rgba(142, 152, 241, 0.6)",
            },
          },
        },
        {
          value: 1,
          name: "",
          itemStyle: placeHolderStyle,
        }
      );
    }
    // 配置项
    let options = shallowReactive({
      tooltip: null,
      series: null,
    });
    let unit = "kpa";
    let colors = ["#B58EF9", "#0DA8F6", "#5DD5D7", "pink"];
    watch(
      () => props.tips,
      (val: any) => {
        options = {
          tooltip: { 
            formatter: "{a} : {c} " + unit,
          },
          series: [
            {
              name: "气压",
              type: "gauge",
              //     startAngle: 180,
              // endAngle: 0,
              min: 0,
              max: 100,
              splitNumber: 12,
              // 仪表盘详情，用于显示数据。
              detail: {
                formatter: "{r1|{value}}",
                rich: {
                  r1: {
                    fontSize: 30,
                    verticalAlign: "bottom",
                    padding: [0, 5, -2, 0],
                    color: "#19fcde",
                  },
                },
              },
              // 仪表盘指针的锚点配置
              anchor: {
                show: true,
                showAbove: true,
                size: 6,
                itemStyle: {
                  borderWidth: 2,
                  borderColor: "#2262E4",
                },
              },
              // 仪表盘指针的样式配置
              pointer: {
                icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
                length: "75%",
                width: 10,
                offsetCenter: [0, "5%"],
              },
              // 仪表盘的进度配置
              progress: {
                roundCap: true,
                show: true,
                width: 12,
              },
              // 仪表盘的样式配置
              itemStyle: {
                color: "#0082FF",
              },
              // 仪表盘的数据
              data: [
                {
                  value: 23.33,
                 
                },
              ],
              // 仪表盘的刻度线配置
              axisLine: {
                roundCap: true,
                lineStyle: {
                  width: 12,
                  color: [
                    [1, "rgba(92, 104, 158, 0.4)"], // 从0.6到1的范围内刻度线颜色为RGBA(244, 86, 86, 0.8)
                  ],
                },
              },
              // 仪表盘的分隔线配置
              splitLine: {
                show: false,
              },
              // 仪表盘的刻度配置
              axisTick: {
                show: false,
              },
              // 仪表盘的刻度标签配置
              axisLabel: {
                show: false,
              },
              // 图形元素的层级
              zlevel: 10,
            },
            {
              name: "kpa",
              type: "gauge",
              splitNumber: 10, //刻度数量
              min: 0,
              max: 100,
              radius: "70%", //图表尺寸
              center: ["50%", "50%"],
              zlevel: 1,
              axisLine: {
                show: true,
                lineStyle: {
                  width: 0,
                  shadowBlur: 0,
                  color: [
                    [0.2, "#23AFAF"],
                    [0.4, "#2270DA"],
                    [0.6, "#E99D02"],
                    [1, "#F45656"],
                  ],
                },
              },
              axisTick: {
                show: true,
                lineStyle: {
                  color: "auto",
                  width: 2,
                },
                length: 10,
                splitNumber: 5,
              },
              splitLine: {
                show: true,
                length: 12,
                lineStyle: {
                  color: "auto",
                  width: 2,
                },
              },
              axisLabel: {
                distance: 5,
                color: "#9BA5BC",
                fontSize: 12,
              },
              pointer: {
                //仪表盘指针
                show: 0,
                length: "0%",
                width: 1,
              },
              anchor: {
                show: true,
                showAbove: true,
                size: 20,
                itemStyle: {
                  color: "#EAEBF1",
                },
              },
              detail: {
                show: false,
              },
              data: [],
            },
          ],
        };
      },
      {
        immediate: true,
        deep: true,
      }
    );

    return () => {
      const height = "100%";
      const width = "100%";

      return <echart options={options} height={height} width={width} />;
    };
  },
});
