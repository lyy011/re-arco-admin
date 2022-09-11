import { createApp } from "vue";
import pinia from "./stores";

import App from "./App.vue";
import router from "./router";
// 额外引入图标库
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import globalComponents from "@/components";

import "@/api/interceptor";

import "./mock";

const app = createApp(App);

document.title = import.meta.env.VITE_APP_TITLE;

app.use(pinia);
app.use(router);
app.use(ArcoVueIcon);
app.use(globalComponents);

app.mount("#app");
