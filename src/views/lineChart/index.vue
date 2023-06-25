<template>
  <chart />
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive } from "vue";
import Chart from "./chart/draw";
export default defineComponent({
  components: {
    Chart,
  },
  setup() {
    // 下层数据
    const dataArr = [
      {
        number: 150,
        text: "今日构建总量",
      },
      {
        number: 144,
        text: "总共完成数量",
      },
      {
        number: 361,
        text: "正在编译数量",
      },
      {
        number: 571,
        text: "未通过数量",
      },
    ];
    // 对应图标
    const iconFont = [
      "icon-diagnose",
      "icon-monitoring",
      "icon-cloudupload",
      "icon-clouddownload",
    ];
    const numberData = reactive([]);
    let intervalInstance = null;
    onMounted(() => {
      setData();
      changeTiming();
    });

    const setData = () => {
      dataArr.forEach((e) => {
        numberData.push({
          config: {
            number: [e.number],
            toFixed: 1,
            content: "{nt}",
            style: {
              fontSize: 24,
            },
          },
          text: e.text,
        });
      });
    };

    const changeTiming = () => {
      intervalInstance = setInterval(() => {
        changeNumber();
      }, 2000);
    };
    const changeNumber = () => {
      numberData.forEach((item, index) => {
        item.config.number[0] += ++index;
        item.config = { ...item.config };
      });
    };
    onUnmounted(() => {
      clearInterval(intervalInstance);
    });

    return { numberData, iconFont };
  },
});
</script>

<style lang="scss" scoped></style>
