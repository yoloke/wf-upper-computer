<template>
  <dv-scroll-board
    :config="tableConfig"
    style="width: 100%; height: 100%"
    ref="scrollBoardRef" />
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
const props = defineProps(["value"]);
console.log(props);


let tableConfig = ref({
  header: ["创建时间", "气压", "温度"],
  data: [],
  headerBGC: "#050533",
  headerHeight: 53,
  oddRowBGC: "#122f5a",
  evenRowBGC: "#111d4c",
  rowNum: 6,
});
watch(
  () => props.value,
  (val) => {
   
    tableConfig.value.data.unshift([
      new Date().toLocaleString(),
      val.press + " kPa",
      val.temp + " ℃",
    ]);
    tableConfig.value = { ...tableConfig.value };
  }
);
</script>
