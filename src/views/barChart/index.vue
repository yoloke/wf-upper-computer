<template>
  <chart :tips="rate[0].tips" :colorObj="rate[0].colorData" />
</template>

<script>
import { defineComponent, reactive, onMounted } from "vue";
import Chart from "../barChart/chart/draw";

export default defineComponent({
  components: {
    Chart,
  },
  setup() {
    const ranking = reactive({
      data: [
        {
          name: "周口",
          value: 55,
        },
        {
          name: "南阳",
          value: 120,
        },
        {
          name: "西峡",
          value: 78,
        },
        {
          name: "驻马店",
          value: 66,
        },
        {
          name: "新乡",
          value: 80,
        },
        {
          name: "新乡2",
          value: 80,
        },
        {
          name: "新乡3",
          value: 80,
        },
        {
          name: "新乡4",
          value: 80,
        },
        {
          name: "新乡5",
          value: 80,
        },
        {
          name: "新乡6",
          value: 80,
        },
      ],
      carousel: "single",
      unit: "人",
    });

    const rate = reactive([
      {
        id: "centerRate1",
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
        id: "centerRate2",
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
      ranking,

      rate,
    };
  },
});
</script>

<style lang="scss" scoped></style>
