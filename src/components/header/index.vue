<template>
  <!-- 头部logo -->
  <!-- 
    <select v-model="$i18n.locale">
  <option
    v-for="locale in $i18n.availableLocales"
    :key="`locale-${locale}`"
    :value="locale"
  >
    {{ locale }}
  </option>
</select>
   -->
  <div class="header d-flex jc-center ai-center">
    <span class="title-text d-flex jc-center ai-center">
      {{ $t("WFH") }}
    </span>

    <div class="title-version d-flex jc-between ai-center">
      <span>
        <a @click="changeLanguage('en')"  :style="{ pointerEvents: !props.showStart?'none' :''}"
          >English</a
        >
        <a-divider type="vertical" style="background-color: #cfcfcf" />
        <a @click="changeLanguage('zh')" :style="{ pointerEvents: !props.showStart?'none' :''}"
          >中文</a
        >
      </span>
      <span>{{ $t("Version") }}：20230704a</span>
    </div>
  </div>
  <!-- 公司信息 -->
  <div class="company-info d-flex jc-between ai-center">
    <span>{{ $t("CompanyTel") }}</span>
    <span>{{ $t("CompanyFax") }}</span>
    <span v-html="$t('CompanyEmail')"></span>
    <a
      href="http://www.weifengheng.com"
      style="color: rgba(207, 207, 207, 1)"
      target="_blank"
    >
      <span v-html="$t('CompanyWebsite')"></span>
    </a>
    <span>{{ $t("CompanyAddress") }}</span>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const props = defineProps(["showStart"]);
const changeLanguage = (lang) => {
  locale.value = lang;
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/index.scss";
</style>
