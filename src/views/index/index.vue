<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">加载中</dv-loading>
      <!-- 主体 -->
      <div v-else class="host-body">
        <!-- 头部logo 公司信息 -->
        <my-header></my-header>

        <!-- 控制台 -->
        <div class="console d-flex ai-center jc-around box-item">
          <div class="box-item-footer"></div>
          <div class="content-item d-flex ai-center">
            <img src="@/assets/img/icon.webp" alt="" />
            <div class="data-title">通讯口</div>
            <div class="data-content">{{ comPortList[formState.ComPort] }}</div>
          </div>
          <div class="content-item d-flex ai-center">
            <img src="@/assets/img/icon.webp" alt="" />
            <div class="data-title">传感器型号</div>
            <div class="data-content">
              {{ sensorModelList[formState.sensorModel] }}
            </div>
            <a
              :href="
                'https://www.weifengheng.com/index.php?c=content&a=search&kw=' +
                (sensorModelList[formState.sensorModel]
                  ? sensorModelList[formState.sensorModel].split('_')[0]
                  : '')
              "
              target="_blank"
            >
              <a-button type="primary" ghost>详细资料</a-button>
            </a>
          </div>
          <div class="content-item d-flex ai-center">
            <img src="@/assets/img/icon.webp" alt="" />
            <div class="data-title">气压单位</div>
            <div class="data-content">
              {{ sensorUnit }}
            </div>
          </div>
          <div class="content-item console-button d-flex ai-center jc-between">
            <a-button
              type="primary"
              size="large"
              @click="start"
              v-if="showStart"
            >
              运行
            </a-button>
            <a-button type="danger" size="large" @click="stop" v-else>
              停止
            </a-button>
            <a-button
              type="primary"
              size="large"
              ghost
              @click="form.someMethod"
              :disabled="!showStart"
            >
              设置
            </a-button>
            <a-button type="primary" size="large" ghost @click="exportDatas">
              导出
            </a-button>
          </div>
          <!-- 警示器 -->
          <span
            class="iconfont icon-early-warning myIcon"
            :style="{
              color: isGreen ? '#00FF66' : '#FF0000',
              textShadow: isGreen ? '0 0 8px #00FF66' : '0 0 8px #FF0000',
            }"
          ></span>
        </div>
        <!-- echarts图表 -->
        <div class="body-box">
          <div
            class="center-box box-item d-flex flex-column jc-center ai-center"
          >
            <div class="title">
              <span class="d-flex jc-center ai-center">运行数据</span>
            </div>
            <LineChart
              ref="lineChartRef"
              :value="data"
              :unit="sensorUnit"
            ></LineChart>
            <div class="box-item-footer"></div>
          </div>
          <div class="bottom-box">
            <div class="box-item">
              <chart
                title="气压"
                :unit="sensorUnit"
                :value="data.press"
                min="-20"
                max="120"
              />
              <div class="box-item-footer"></div>
            </div>
            <div class="box-item">
              <chart
                title="温度"
                unit="℃"
                :value="data.temp"
                min="-20"
                max="120"
              />
              <div class="box-item-footer"></div>
            </div>
            <div class="box-item">
              <carousel-table
                ref="tableRef"
                :value="data"
                :unit="sensorUnit"
              ></carousel-table>
              <div class="box-item-footer"></div>
            </div>
          </div>
        </div>
        <!-- 输出日志 -->
        <div class="box-item">
          <div class="log">
            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
          </div>
          <div class="box-item-footer"></div>
        </div>
      </div>
    </div>
  </div>
  <Form
    ref="form"
    :sensorModelList="sensorModelList"
    :pressUnitsList="pressUnitsList"
    :formState="formState"
    @childClick="childClick"
  ></Form>
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
let tableRef = ref(null);
let lineChartRef = ref(null);
let u = ref(1);
const isGreen = ref(false);
import Form from "./Form.vue";
import CarouselTable from "@/views/carouselTable/index.vue";

import {
  getSensorList,
  getPressUnits,
  getComPort,
  getSetting,
  addData,
  exportData,
  startData,
  stopData,
} from "@/api/index.js";
import Chart from "@/views/dashboard/index.vue";
import { message } from "ant-design-vue";
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
const generateRandomObject = () => {
  //   const min = -20; // 最小值
  //   const max = 120; // 最大值

  //  // 生成随机 press 和 temp 值
  // const press = parseFloat((Math.random() * (max - min) + min).toFixed(3));
  // const temp = parseFloat((Math.random() * (max - min) + min).toFixed(2));

  //   data.value = { press, temp };
  //   // 更新 randomObject 的值
  addData().then((res) => {
    // console.log(res);
    const press = parseFloat(res.data.Press.toFixed(4));
    const temp = parseFloat(res.data.Temp.toFixed(4));

    data.value = { press, temp };
  });
};

// * 加载标识
const loading = ref<boolean>(true);

let sensorModelList = reactive([]);
let pressUnitsList = reactive([]);
let comPortList = reactive([]);
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
  getComPort().then((res) => {
    comPortList.splice(0, comPortList.length, ...res.data);
  });
  childClick();
});
let sensorUnit = ref("kPa");
let submitKey = "submitKey";
let childClick = () => {
  message.loading({
    content: "数据更新中...",
    key: submitKey,
    style: {
      marginTop: "40vh",
    },
  });
  getSetting().then((res) => {
    formState.value = res.data;
    u.value = Number(res.data.sensorUnit);
    sensorUnit.value = pressUnitsList[formState.value.sensorUnit];
    tableRef.value.clearData();
    lineChartRef.value.clearData();
    message.success({
      content: "更新成功 !",
      key: submitKey,
      duration: 2,
      style: {
        marginTop: "40vh",
      },
    });
  });
};
let timer = null; // 定时器引用

function startTimer() {
  generateRandomObject();
  stopTimer(); // 清除之前的定时器
  timer = setInterval(generateRandomObject, 500);
}
function stopTimer() {
  clearInterval(timer); // 清除定时器
  timer = null; // 重置定时器引用
}
let showStart = ref(true);
function stop() {
  showStart.value = true;
  stopTimer();
}
function start() {
  startData().then((res) => {
    if (res.data.success) {
      startTimer(); // 启动定时器
      showStart.value = false;
    }
  });
}

// 处理 loading 展示
const cancelLoading = () => {
  setTimeout(() => {
    loading.value = false;
  }, 500);
};
// 导出数据
const key = "updatable";
function exportDatas() {
  message.loading({
    content: "导出中...",
    key,
    style: {
      marginTop: "40vh",
    },
  });
  exportData().then((res) => {
    if (res.data.success) {
      message.success({
        content: "导出成功 !",
        key,
        duration: 2,
        style: {
          marginTop: "40vh",
        },
      });
    } else {
    }
  });
}
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
