<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">加载中</dv-loading>

      <div v-else class="host-body">
        <!-- 头部logo -->
        <div class="header d-flex jc-center ai-center">
          <span class="title-text d-flex jc-center ai-center">
            深圳市伟烽恒科技有限公司
          </span>
          <span class="title-version">版本号：20230531a</span>
        </div>
        <!-- 公司信息 -->
        <div class="company-info d-flex jc-between ai-center">
          <span>公司电话：0755-23311175</span>
          <span>公司传真：0755-27211157</span>
          <span>公司邮箱：sales@weifengheng.com</span>
          <span>公司网址：http://www.weifengheng.com</span>
          <span>公司地址：深圳市宝安区西乡铁仔路华丰共乐工业园B2</span>
        </div>
        <!-- 控制台 -->
        <div class="console d-flex ai-center jc-around box-item">
          <div class="box-item-footer"></div>
          <div class="content-item d-flex ai-center">
            <img src="@/assets/img/icon.webp" alt="" />
            <div class="data-title">通讯口</div>
            <div class="data-content">COM1</div>
          </div>
          <div class="content-item d-flex ai-center">
            <img src="@/assets/img/icon.webp" alt="" />
            <div class="data-title">传感器型号</div>
            <div class="data-content">WF5803_2BAR</div>
            <a-button type="primary" ghost>详细资料</a-button>
          </div>
          <div class="content-item d-flex ai-center">
            <img src="@/assets/img/icon.webp" alt="" />
            <div class="data-title">气压单位</div>
            <div class="data-content">kPa</div>
          </div>
          <div class="content-item console-button d-flex ai-center jc-between">
            <a-button type="primary" size="large">运行</a-button>
            <!-- <a-button
              type="primary"
              size="large"
              ghost
              @click="form.someMethod">
              设置
            </a-button> -->
            <a-button type="primary" size="large" ghost>导出</a-button>
          </div>
          <!-- 警示器 -->
          <span
            class="iconfont icon-alert myIcon"
            :style="{
              color: isGreen ? '#00FF66' : '#FF0000',
              textShadow: isGreen ? '0 0 8px #00FF66' : '0 0 8px #FF0000',
            }"></span>
        </div>

        <div class="body-box">
          <div
            class="center-box box-item d-flex flex-column jc-center ai-center">
            <div class="title">
              <span class="d-flex jc-center ai-center">运行数据</span>
            </div>
            <LineChart></LineChart>
            <div class="box-item-footer"></div>
          </div>
          <div class="bottom-box">
            <div class="box-item">
              <chart :tips="rate[2].tips" :colorObj="rate[2].colorData" />
              <div class="box-item-footer"></div>
            </div>
            <div class="box-item">
              <chart :tips="rate[3].tips" :colorObj="rate[3].colorData" />
              <div class="box-item-footer"></div>
            </div>
            <div class="box-item">
              <dv-scroll-board
                :config="tableConfig"
                style="width: 100%; height: 100%"
                ref="scrollBoard" />
              <div class="box-item-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <Form ref="form"></Form> -->
</template>

<script lang="ts" setup>
// import { createFromIconfontCN } from "@ant-design/icons-vue";
// const IconFont = createFromIconfontCN({
//   scriptUrl: "//at.alicdn.com/t/c/font_4133268_q6mwepawd4o.js",
// });
// 监听 isGreen 变化并触发闪烁效果
watchEffect(() => {
  const intervalId = setInterval(() => {
    isGreen.value = !isGreen.value;
  }, 10000); // 闪烁间隔为 500ms

  // 组件卸载时清除定时器
  return () => {
    clearInterval(intervalId);
  };
});

const isGreen = ref(false);
import Form from "./Form.vue";
// 创建对子组件实例的引用
const form = ref(null);
// import { getSensorList, getPressUnits } from "@/api/index.js";
import Chart from "../center/chart/draw";
import { ref, reactive, onMounted, onUnmounted, watchEffect } from "vue";
import { formatTime } from "@/utils/index";
import { WEEK } from "@/constant/index";
import useDraw from "@/utils/useDraw";
import LineChart from "@/views/lineChart/index.vue";

const scrollBoard = ref(null);
console.log(scrollBoard);

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
    tips: 70,
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
  {
    id: "Pipeline3",
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
  {
    id: "Pipeline4",
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
  {
    id: "Pipeline5",
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
  {
    id: "Pipeline6",
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

// 表格

let tableConfig = ref({
  header: ["序号", "创建时间", "气压", "温度"],
  data: [],
  align: ["center"],
  headerBGC: "#050533",
  headerHeight: 53,
  oddRowBGC: "#122f5a",
  evenRowBGC: "#111d4c",
  isRing: true,
  rowNum: 6,
});
let serialNumber = 1;
const generateRandomData = () => {
  const randomTime = new Date().toLocaleString();
  const randomKpa = (Math.random() * 100).toFixed(5) + " Kpa";
  const randomTemp = (Math.random() * 100).toFixed(2) + " ℃";
  return [serialNumber++, randomTime, randomKpa, randomTemp];
};

const addData = () => {
  const newData = generateRandomData();
  //
  //  scrollBoard.value.updateRows(newData, 4);
  tableConfig.value.data.push(newData);
  tableConfig.value = { ...tableConfig.value };
  // console.log(tableConfig.value);
};
const numIterations = 10; // 设置循环执行的次数
let iterationCount = 0;

const interval = setInterval(() => {
  addData();
  iterationCount++;

  if (iterationCount === numIterations) {
    clearInterval(interval); // 循环执行指定次数后停止
  }
}, 1000);

// * 加载标识
const loading = ref<boolean>(true);
// * 时间内容
const timeInfo = reactive({
  setInterval: 0,
  dateDay: "",
  dateYear: "",
  dateWeek: "",
});
// * 适配处理
const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw();

let sensorModelList = reactive([]);
let pressUnitsList = reactive([]);

onMounted(() => {
  // scrollBoard.value = this.$refs.scrollBoard;
  // addData();
  cancelLoading();

  // todo 屏幕适应
  windowDraw();
  calcRate();
  getSensorList().then((res) => {
    console.log(sensorModelList);
    sensorModelList.splice(0, sensorModelList.length, ...res.data);
    console.log(sensorModelList);
  });
  getPressUnits().then((res) => {
    pressUnitsList.splice(0, pressUnitsList.length, ...res.data);
  });
});

onUnmounted(() => {
  unWindowDraw();
  clearInterval(timeInfo.setInterval);
});

// 处理 loading 展示
const cancelLoading = () => {
  setTimeout(() => {
    loading.value = false;
  }, 500);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";

.myIcon {
  font-size: 30px !important;
  animation: blinking 1s infinite;
}

@keyframes blinking {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
</style>
