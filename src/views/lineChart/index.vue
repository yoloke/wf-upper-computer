<template>
  <echart :options="options" height="380px" width="100%" />
</template>

<script lang="ts" setup>
import i18n from "@/i18n/index";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

import * as echarts from "echarts";
import { ref, reactive, computed,watch } from "vue";
const props = defineProps(["value", "unit"]);
// 定义 ref
const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];
let data = reactive([]);
let data2 = reactive([]);
// 初始化最大值和最小值为初始数据集的第一个数据
let minValue = 0;
let maxValue = 0;
// 计算当前数据集的最大值和最小值
data.forEach((item) => {
  const value = item.value[1];
  if (value < minValue) {
    minValue = value;
  }
  if (value > maxValue) {
    maxValue = value;
  }
});
let x = 0;
// 清空表格数据
let clearData = () => {
  x = 0;
  data.length = 0;
  data2.length = 0;

  options.series[1].data = data;
  options.series[0].data = data2;
};
//暴露方法
defineExpose({
  clearData,
});

const Pressures = computed(() => {
  return t("Pressures");
});
const Temp = computed(() => {
  return t("Temp");
});
// 配置项
const options = reactive({
  legend: {
    align: "left",
    right: "4%",
    top: "0",
    textStyle: {
      color: "#7ec7ff",
      fontSize: 16,
    },
    itemGap: 25,
    itemWidth: 18,
    icon: "path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
  },
  tooltip: {
    trigger: "axis",
    backgroundColor: "#fff",
    textStyle: {
      color: "#5c6c7c",
    },
    padding: [10, 10],
    extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)",
  },
  grid: {
    top: "9%",
    bottom: "16%",
    left: "4%",
    right: "4%",
  },
  xAxis: {
    type: "category",
    axisLine: {
      lineStyle: {
        color: "#00E0FF",
        width: 2,
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
      interval: 0,
      textStyle: {
        color: "#556677",
      },
      // 默认x轴字体大小
      fontSize: 12,
      // margin:文字到x轴的距离
      margin: 15,
    },
    boundaryGap: false,
  },
  dataZoom: [
    {
      show: true,
      height: 8,
      bottom: 32,
      handleSize: "100%",
      handleStyle: {
        color: "rgba(255, 255, 255,0.5)",
      },
      textStyle: {
        color: "#fff",
        fontSize: 10,
      },
      fillerColor: "rgba(42, 131, 223,1)",
      borderColor: "rgba(66, 130, 197,1)",
      backgroundColor: "rgba(12, 67, 124,0.5)",
      showDataShadow: false,
      brushSelect: false,
    },
    {
      type: "inside",
    },
  ],
  yAxis: [
    // 温度
    {
      type: "value",
      scale: true, // y轴的起点 不从0开始  按照数值更智能化 脱离0值比例
      position: "left",
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#00E0FF",
          width: 2,
        },
      },
      // 刻度文字
      axisLabel: {
        textStyle: {
          color: "#fff",
          fontSize: 10,
        },
        formatter: "{value} ℃",
      },
      splitLine: {
        show: false,
      },
    },
    // 气压
    {
      type: "value",
      position: "right",
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: "#fff",
          fontSize: 10,
        },
        formatter: "{value} " + props.unit,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#00E0FF",
          width: 2,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed", // 设置线的类型为虚线
          color: "rgba(0, 224, 255, 0.4)", // 设置线的颜色
        },
      },
    },
  ],
  series: [
    {
      name: Pressures, // 数据系列的名称
      type: "line", // 数据系列的类型为线型
      data: data2,
      symbolSize: 1, // 数据点的大小
      symbol: "circle", // 数据点的形状为圆形
      smooth: true, // 是否平滑显示曲线
      yAxisIndex: 1, // 使用的y轴索引，默认为0
      showSymbol: true, // 是否显示数据点的标记
      lineStyle: {
        width: 3, // 曲线的宽度
        shadowColor: "rgba(158,135,255, 0.3)", // 阴影颜色
        shadowBlur: 10, // 阴影模糊度
        shadowOffsetY: 2, // 阴影垂直偏移量
      },
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: "rgba(121,72,234,0.8)" }, // 渐变色起始颜色
            { offset: 1, color: "rgba(121,72,234,1)" }, // 渐变色结束颜色
          ]),
          borderColor: colorList[0], // 数据点边框的颜色
          // label: {
          //   show: true,
          //   position: "top",
          //   textStyle: {
          //     fontSize: 12,
          //     color: "#fff",
          //   },
          //   // formatter: (params) => {
          //   //   if (options.series[1].data.length - 1 == params.dataIndex) {
          //   //     return params.value + " Pa";
          //   //   } else {
          //   //     return "";
          //   //   }
          //   // },
          // },
        },
      },
    },
    {
      name: Temp,
      type: "line",
      data: data,
      symbolSize: 1, // 数据点的大小
      symbol: "circle", // 数据点的形状为圆形
      smooth: true, // 是否平滑显示曲线
      yAxisIndex: 0, // 使用的y轴索引，默认为0
      showSymbol: true, // 是否显示数据点的标记
      lineStyle: {
        width: 3,
        shadowColor: "rgba(115,221,255, 0.3)",
        shadowBlur: 10,
        shadowOffsetY: 2,
      },
      // 设置数据点的样式
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: "rgba(77,177,219,0.8)",
            },
            {
              offset: 1,
              color: "rgba(77,177,219,1)",
            },
          ]),
          // 数据点边框的颜色
          borderColor: colorList[1],
          // 线条末端的数据展示
          // label: {
          //   show: true,
          //   position: "top",
          //   textStyle: {
          //     fontSize: 12,
          //     color: "#fff",
          //   },
          //   formatter: (params) => {
          //     if (options.series[0].data.length - 1 == params.dataIndex) {
          //       return params.value + " ℃";
          //     } else {
          //       return "";
          //     }
          //   },
          // },
        },
      },
    },
  ],
  // toolbox: {
  //   show: true, //显示工具箱
  //   feature: {
  //     dataZoom: {
  //       yAxisIndex: "none",
  //     }, //数据缩放
  //     dataView: { readOnly: false }, //数据视图只读
  //     magicType: { type: ["line", "bar"] }, //魔法类型
  //     restore: {}, //重置
  //     saveAsImage: {}, //保存图片
  //   },
  // },
});



watch(
  () => props.value,
  (val) => {
    if (data.length > 200) {
      data.shift();
      data2.shift();
    }

    data.push(val.temp);
    data2.push(val.press);

    options.series[1].data = data;
    options.series[0].data = data2;
  }
);
watch(
  () => props.unit,
  (val) => {
    options.yAxis[1].axisLabel = {
      textStyle: {
        color: "#fff",
        fontSize: 10,
      },
      formatter: "{value} " + val,
    };
  }
);
</script>

<style lang="scss" scoped></style>
