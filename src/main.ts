import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dataV from "@jiaminghi/data-view";
// 引入全局css
import "./assets/scss/style.scss";

// 引入 全局注册组件
import PublicComponent from "@/components/componentInstall";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";



const app = createApp(App);
app.use(Antd);
app.use(PublicComponent);
app.use(dataV);
app.use(ElementPlus);
app.use(store);
app.use(router);
app.mount("#app");
