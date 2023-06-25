<template>
  <div class="myModal" ref="myModal">myModal
    <a-modal
      :getContainer="() => $refs.myModal"
      v-model:visible="visible"
      title="设置"
      ok-text="提交"
      cancel-text="取消"
      @ok="handleOk"
      style="top: 20%"
      width="700px">
      <a-form
        ref="form"
        :model="formState"
        :label-col="{ span: 9 }"
        :wrapper-col="{ span: 15 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        :colon="false">
        <a-timeline>
          <a-timeline-item color="#26afaf">
            <div class="a-timeline-item-title">基本设置</div>
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="传感器型号" name="sensorModel">
                  <a-select
                    v-model:value="formState.sensorModel"
                    @change="handleChange">
                    <a-select-option
                      v-for="(item, index) in sensorModelList"
                      :value="index"
                      :key="index">
                      {{ item }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="USB通讯" name="comPort">
                  <a-select v-model:value="formState.ComPort">
                    <a-select-option
                      v-for="(item, index) in comPortList"
                      :value="index.toString()"
                      :key="index">
                      {{ item }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="气压单位" name="sensorUnit">
                  <a-select v-model:value="formState.sensorUnit">
                    <a-select-option
                      v-for="(item, index) in pressUnitsList"
                      :value="index"
                      :key="index">
                      {{ item }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="产品通讯" name="comMode">
                  <a-select disabled v-model:value="formState.ComMode">
                    <a-select-option :value="0">USB</a-select-option>
                    <a-select-option :value="1">Serial</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="数据刷新" name="RefreshTime">
                  <a-input placeholder="数据刷新速度" addon-after="ms" v-model:value="formState.RefreshTime"/>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  name="remember"
                  style="margin-bottom: 20px; margin-left: 20px">
                  <a-checkbox v-model:checked="formState.remember">
                    隐藏单位
                  </a-checkbox>
                </a-form-item>
              </a-col>
            </a-row>
          </a-timeline-item>
          <a-timeline-item color="#26afaf">
            <div class="a-timeline-item-title">实验室设置</div>
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="气压偏移量" name="PressOffset">
                  <a-input v-model:value="formState.PressOffset"/>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="温度偏移量" name="PressOffset">
                  <a-input v-model:value="formState.TempOffset"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <div class="ff">WF183D数据类型</div>
                <a-form-item
                  style="margin-bottom: 0"
                  :wrapper-col="{ span: 24 }">
                  <a-radio-group
                    v-model:value="formState.DataTypeFor183D"
                    name="radioGroup">
                    <a-radio :value="0" selected>默认</a-radio>
                    <a-radio :value="1">原始温度</a-radio>
                    <a-radio :value="2">原始气压</a-radio>
                    <a-radio :value="3">校准温度</a-radio>
                    <a-radio :value="4">标准气压</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
            </a-row>
          </a-timeline-item>
        </a-timeline>
        <!-- <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item> -->
      </a-form>

      <!-- <div class="model-body-border-bottom"></div> -->
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import {
  getSensorList,
  getPressUnits,
  getcomPort,
  updatedSetting,
} from "@/api/index.js";
import { ref, reactive, onMounted, onUnmounted } from "vue";
import useDraw from "@/utils/useDraw";

const handleChange = (value: string) => {
  if (value == "WF183D_11BAR") {
    formState.value.ComMode = 1;
  }
};
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const visible = ref<boolean>(true);

// * 适配处理
const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw();
// 生命周期
let sensorModelList = reactive([]);
let pressUnitsList = reactive([]);
let comPortList = reactive([]);
let formState = ref({
  sensorModel: null,
  sensorUnit: null,
  ComPort: null,
  ComMode: null,
  PressOffset: null,
  TempOffset: null,
  DataTypeFor183D: null,
  RefreshTime:null,
});
const handleOk = (e: MouseEvent) => {
  visible.value = false;
};
onMounted(() => {
  // // todo 屏幕适应
  // windowDraw();
  // calcRate();
  getSensorList().then((res) => {
    sensorModelList.splice(0, sensorModelList.length, ...res.data);
  });
  getPressUnits().then((res) => {
    pressUnitsList.splice(0, pressUnitsList.length, ...res.data);
  });
  getcomPort().then((res) => {
    comPortList.splice(0, comPortList.length, ...res.data);
  });
  updatedSetting().then((res) => {
    formState.value = res.data;
    console.log(formState.value);
  });
});
const showModal = () => {
  visible.value = true;
};
// onUnmounted(() => {
//   unWindowDraw();
// });
</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";
</style>
