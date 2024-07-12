<template>
  <dv-scroll-board
    :config="tableConfig"
    style="width: 100%; height: 100%"
    ref="scrollBoardRef"
  />
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { ref, watch, computed } from "vue";
const props = defineProps(["value", "unit"]);
// 获取当前实例
const header = computed(() => {
  return [t("CreationTime"), t("Pressures"), t("Temp")];
});
let tableConfig = ref({
  header: header,
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
      val.press + " " + props.unit,
      val.temp + " ℃",
    ]);
    // tableConfig.value = { ...tableConfig.value ,header:header};
  }
);

// 清空表格数据
let clearData = () => {
  tableConfig.value.data = [];
  tableConfig.value = { ...tableConfig.value };
};
//暴露方法
defineExpose({
  clearData,
});
</script>
