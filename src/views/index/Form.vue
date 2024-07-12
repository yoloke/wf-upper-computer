<template>
  <div class="myModal" ref="myModal">
    <a-modal
      :getContainer="() => $refs.myModal"
      v-model:visible="visible"
      :title="$t('form.Setting')"
      :ok-text="$t('okText')"
      :cancel-text="$t('cancelText')"
      @ok="handleOk"
      style="top: 16%"
      width="800px"
    >
      <a-form
        ref="form"
        :model="formState"
        :label-col="{ span: 9 }"
        :wrapper-col="{ span: 15 }"
        autocomplete="off"
        @finishFailed="onFinishFailed"
        :colon="false"
      >
        <a-timeline>
          <a-timeline-item color="#26afaf">
            <div class="a-timeline-item-title">
              {{ $t("form.BasicSettings") }}
            </div>
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item :label="$t('form.SensorModel')" name="sensorModel">
                  <a-select
                    v-model:value="formState.sensorModel"
                    @change="handleChange"
                  >
                    <a-select-option
                      v-for="(item, index) in sensorModelList"
                      :key="index"
                      :value="index"
                    >
                      {{ item }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item :label="$t('form.CommsPort')" name="comPort">
                  <a-select v-model:value="formState.ComPort">
                    <a-select-option
                      v-for="(item, index) in comPortList"
                      :key="index"
                      :value="index.toString()"
                    >
                      {{ item }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item :label="$t('form.PressureUnit')" name="sensorUnit">
                  <a-select v-model:value="formState.sensorUnit">
                    <a-select-option
                      v-for="(item, index) in pressUnitsList"
                      :key="index"
                      :value="index"
                    >
                      {{ item }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  :label="$t('form.ProductNewsletters')"
                  name="comMode"
                >
                  <a-select disabled v-model:value="formState.ComMode">
                    <a-select-option :value="0">USB</a-select-option>
                    <a-select-option :value="1">Serial</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item :label="$t('form.DataRefresh')" name="RefreshTime">
                  <a-input
                    :placeholder="$t('form.DataRefreshSpeed')"
                    addon-after="ms"
                    v-model:value="formState.RefreshTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  name="remember"
                  style="margin-bottom: 20px; margin-left: 20px"
                >
                  <a-checkbox v-model:checked="formState.remember">
                    {{ $t("form.HiddenUnits") }}
                  </a-checkbox>
                </a-form-item>
              </a-col>
            </a-row>
          </a-timeline-item>
          <a-timeline-item color="#26afaf">
            <div class="a-timeline-item-title">
              {{ $t("form.LaboratorySetup") }}
            </div>
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item :label="$t('form.PressOffset')" name="PressOffset">
                  <a-input-number
                    v-model:value="formState.PressOffset"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item :label="$t('form.TempOffset')" name="TempOffset">
                  <a-input-number
                    v-model:value="formState.TempOffset"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item
                  :label="$t('form.WF183DDataTypes')"
                  style="margin-bottom: 0"
                  :label-col="{ span: 24 }"
                  :wrapper-col="{ span: 24 }"
                >
                  <a-radio-group
                    v-model:value="formState.DataTypeFor183D"
                    name="radioGroup"
                  >
                    <a-radio :value="0" selected>{{
                      $t("form.default")
                    }}</a-radio>
                    <a-radio :value="1">{{ $t("form.originalTemp") }}</a-radio>
                    <a-radio :value="2">{{
                      $t("form.originalPressure")
                    }}</a-radio>
                    <a-radio :value="3">{{
                      $t("form.calibrationTemp")
                    }}</a-radio>
                    <a-radio :value="4">{{
                      $t("form.standardPressure")
                    }}</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
            </a-row>
          </a-timeline-item>
        </a-timeline>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import {
  getSensorList,
  getPressUnits,
  getComPort,
  getSetting,
  updateSetting,
} from "@/api/index.js";
import { ref, reactive, onMounted, defineProps, toRefs } from "vue";
import useDraw from "@/utils/useDraw";
const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw();
const emit = defineEmits(["childClick"]); // 声明触发事件 childClick
const props = defineProps(["formState"]);
const formState = ref(props.formState);
import { message } from "ant-design-vue";

const handleChange = (value: string) => {
  if (sensorModelList[value] == "WF183D_11BAR") {
    formState.value.ComMode = 1;
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
let visible = ref<boolean>(false);
const handleOk = (e: MouseEvent) => {
  visible.value = false;
  updateSetting(formState.value).then((res) => {
    if (res.data.success) {
      emit("childClick");
    }
  });
};
let sensorModelList = reactive([]);
let pressUnitsList = reactive([]);
let comPortList = reactive([]);
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
  getComPort().then((res) => {
    comPortList.splice(0, comPortList.length, ...res.data);
  });
  getSetting().then((res) => {
    formState.value = res.data;
  });
});
defineExpose({
  someMethod() {
    visible.value = true;
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";
</style>
