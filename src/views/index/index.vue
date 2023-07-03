<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">加载中</dv-loading>

      <div v-else class="host-body">
        <!-- 头部logo 公司信息 -->
        <my-header></my-header>

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
            <div class="data-content">
              {{ sensorModelList[formState.sensorModel] }}
            </div>
            <a-button type="primary" ghost>详细资料</a-button>
          </div>
          <div class="content-item d-flex ai-center">
            <img src="@/assets/img/icon.webp" alt="" />
            <div class="data-title">气压单位</div>
            <div class="data-content">
              {{ pressUnitsList[formState.sensorUnit] }}
            </div>
          </div>
          <div class="content-item console-button d-flex ai-center jc-between">
            <a-button type="primary" size="large" @click="start" v-if="showStart">
              运行
            </a-button>
            <a-button type="danger" size="large" @click="stop" v-else>
              停止
            </a-button>
            <a-button type="primary" size="large" ghost @click="form.someMethod">
              设置
            </a-button>
            <a-button type="primary" size="large" ghost>测试函数</a-button>
          </div>
          <!-- 警示器 -->
          <span class="iconfont icon-early-warning myIcon" :style="{
            color: isGreen ? '#00FF66' : '#FF0000',
            textShadow: isGreen ? '0 0 8px #00FF66' : '0 0 8px #FF0000',
          }"></span>
        </div>

        <div class="body-box">
          <div class="center-box box-item d-flex flex-column jc-center ai-center">
            <div class="title">
              <span class="d-flex jc-center ai-center">运行数据</span>
            </div>
            <LineChart :value="data"></LineChart>
            <div class="box-item-footer"></div>
          </div>
          <div class="bottom-box">
            <div class="box-item">
              <chart title="气压" unit="kPa" :value="data.press" min="-20" max="120" />
              <div class="box-item-footer"></div>
            </div>
            <div class="box-item">
              <chart title="温度" unit="℃" :value="data.temp" min="-20" max="120" />
              <div class="box-item-footer"></div>
            </div>
            <div class="box-item">
              <carousel-table :value="data"></carousel-table>
              <div class="box-item-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Form ref="form" :sensorModelList="sensorModelList" :pressUnitsList="pressUnitsList" :formState="formState"></Form>
</template>

<script lang="ts" setup>
import MyHeader from "@/components/header/index.vue";
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
let u = ref(1);
const isGreen = ref(false);
import Form from "./Form.vue";
import CarouselTable from "@/views/carouselTable/index.vue";

import {
  getSensorList,
  getPressUnits,
  getSetting,
  addData,
} from "@/api/index.js";
import Chart from "@/views/dashboard/index.vue";
import { ref, reactive, onMounted, watchEffect } from "vue";
import useDraw from "@/utils/useDraw";
import LineChart from "@/views/lineChart/index.vue";
// * 适配处理
const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw();
// 创建对子组件实例的引用
const form = ref(null);
let data = ref({
  press: 0,
  temp: 0,
});
function generateRandomObject() {
  const min = -20; // 最小值
  const max = 120; // 最大值

  // 生成随机 press 和 temp 值
  const press = parseFloat((Math.random() * (max - min) + min).toFixed(3));
  const temp = parseFloat((Math.random() * (max - min) + min).toFixed(2));

  // 更新 randomObject 的值
  data.value = { press, temp };
}

// * 加载标识
const loading = ref<boolean>(true);

let sensorModelList = reactive([]);
let pressUnitsList = reactive([]);
let formState = ref({
  sensorModel: 0,
  ComPort: null,
  sensorUnit: 0,
  ComMode: 0,
  PressOffset: 0.0,
  TempOffset: 0.0,
  DataTypeFor183D: 0,
  RefreshTime: 300,
});
onMounted(() => {
  cancelLoading();
  windowDraw();
  calcRate();
  getSensorList().then((res) => {
    sensorModelList.splice(0, sensorModelList.length, ...res.data);
  });
  getPressUnits().then((res) => {
    pressUnitsList.splice(0, pressUnitsList.length, ...res.data);
  });
  getSetting().then((res) => {
    formState.value = res.data;
    u.value = Number(res.data.sensorUnit);
  });
});
let timer = null; // 定时器引用

function startTimer() {
  stop(); // 清除之前的定时器
  timer = setInterval(generateRandomObject, 1000); // 每隔1秒执行 generateRandomObject 函数
}
let showStart = ref(true);
function stop() {
  showStart.value = true;
  clearInterval(timer); // 清除定时器
  timer = null; // 重置定时器引用
}
function start() {
  generateRandomObject(); // 执行一次 generateRandomObject 函数
  startTimer(); // 启动定时器
  showStart.value = false;
  console.log(showStart.value);
}

// 处理 loading 展示
const cancelLoading = () => {
  setTimeout(() => {
    loading.value = false;
  }, 500);
};

const modelInfo = {
  WF5803_1BAR: {
    min: 30 * u.value,
    max: 150 * u.value,
    url: "https://www.weifengheng.com/show-80.html",
  },
  WF5803_2BAR: {
    min: 30 * u.value,
    max: 250 * u.value,
    url: "https://www.weifengheng.com/show-442.html",
  },
  WF5803_7BAR: {
    min: 30 * u.value,
    max: 800 * u.value,
    url: "https://www.weifengheng.com/show-47.html",
  },
  WF5803_10BAR: {
    min: 30 * u.value,
    max: 1100 * u.value,
    url: "https://www.weifengheng.com/show-443.html",
  },
  WF5803_20BAR: {
    min: 30 * u.value,
    max: 2100 * u.value,
    url: "https://www.weifengheng.com/show-444.html",
  },
  WF5805_2BAR: {
    min: 30 * u.value,
    max: 250 * u.value,
    url: "https://www.weifengheng.com/show-98.html",
  },
  WF100D_5KPA: {
    min: -6 * u.value,
    max: 6 * u.value,
    url: "https://www.weifengheng.com/show-160.html",
  },
  WF100D_10KPA: {
    min: -12 * u.value,
    max: 12 * u.value,
  },
  WF100D_40KPA: {
    min: -50 * u.value,
    max: 50 * u.value,
  },
  WF100D_100KPA: {
    min: -120 * u.value,
    max: 120 * u.value,
  },
  WF100D_200KPA: {
    min: -100 * u.value,
    max: 240 * u.value,
  },
  WF100D_300KPA: {
    min: -100 * u.value,
    max: 360 * u.value,
    url: "https://www.weifengheng.com/show-160.html",
  },
  WF200D_5KPA: {
    min: -6 * u.value,
    max: 6 * u.value,
    url: "https://www.weifengheng.com/show-397.html",
  },
  WF200D_10KPA: {
    min: -12 * u.value,
    max: 12 * u.value,
    url: "https://www.weifengheng.com/show-397.html",
  },
  WF183D_11BAR: {
    min: 30 * u.value,
    max: 1200 * u.value,
    url: "https://www.weifengheng.com/show-195.html",
  },
};

const wf183d11bar = modelInfo.WF183D_11BAR;
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
