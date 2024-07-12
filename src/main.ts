// import { createApp } from "vue";
// import App from "./App.vue";
// import router from "./router";
// import store from "./store";
// import dataV from "@jiaminghi/data-view";
// // 引入全局css
// import "./assets/scss/style.scss";

// // 引入 全局注册组件
// import PublicComponent from "@/components/componentInstall";

// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

// const app = createApp(App);
// app.use(Antd);
// app.use(PublicComponent);
// app.use(dataV);
// app.use(ElementPlus);
// app.use(store);
// app.use(router);
// app.mount("#app");
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import dataV from "@kjgl77/datav-vue3";
// 引入全局css
import "./assets/scss/style.scss";
// 引入图表（所有图标见 icon 目录下的 demo_index.html）
import "./assets/icon/iconfont.css";
// 引入 全局注册组件
import PublicComponent from "@/components/componentInstall";

import i18n from "@/i18n/index";

const app = createApp(App);
app.use(PublicComponent);
app.use(dataV);
app.use(store);
app.use(Antd);
app.use(router);

app.use(i18n);
app.mount("#app");
