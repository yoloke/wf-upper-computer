<template>
  <div class="percent">
    <chart :tips="rate[0].tips" :colorObj="rate[0].colorData" />

    <chart :tips="rate[1].tips" :colorObj="rate[1].colorData" />
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from "vue";
import Chart from "../center/chart/draw";

export default defineComponent({
  components: {
    Chart,
  },
  setup() {
    // 下层数据

    const rate = reactive([
      {
        id: "Pipeline1",
        tips: 60,
        colorData: {
          textStyle: "#3fc0fb",
          series: {
            color: ["#00bcd44a", "transparent"],
            dataColor: {
              normal: "#03a9f4",
              shadowColor: "#97e2f5",
            },
          },
        },
      },
      {
        id: "Pipeline2",
        tips: 40,
        colorData: {
          textStyle: "#67e0e3",
          series: {
            color: ["#faf3a378", "transparent"],
            dataColor: {
              normal: "#ff9800",
              shadowColor: "#fcebad",
            },
          },
        },
      },
    ]);

    return {
      rate,
    };
  },
});
</script>

<style lang="scss" scoped></style>
