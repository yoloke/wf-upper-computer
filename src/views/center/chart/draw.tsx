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
        value:400,
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
      legend: null,
      title: null,
      // tooltip: null,
      series: null,
    });

    let colors = ["#B58EF9", "#0DA8F6", "#5DD5D7", "pink"];
    watch(
      () => props.tips,
      (val: any) => {
        options = {
          title: {
            text: "99999",
            x: "center",
            top: 110,
            textStyle: {
              fontSize: "26",
              color: "#fff",
            },
          },
          legend: [
            // 第一个图例组件的配置
            {
              orient: "gfdg",
              bottom: 80,
              icon: "circle",
              right: 160,
              textStyle: {
                color: "#ffffff",
                fontSize: 16,
              },
              data: legend.slice(0, 2), // 从 legend 数组中选择索引为 0 和 1 的元素作为数据
            },
            // 第二个图例组件的配置
            {
              orient: "合格等级2",
              bottom: 80,
              icon: "circle",
              right: 40,
              textStyle: {
                color: "#ffffff",
                fontSize: 16,
              },
              data: legend.slice(2, 4), // 从 legend 数组中选择索引为 2 和 3 的元素作为数据
            },
          ],

          series: [
            {
              type: "pie",
              radius: ["55%", "65%"],
              center: ["50%", "30%"],
              labelLine: {
                show: false,
              },
              label: {
                show: false,
                position: "center",
              },
              data: data,
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
