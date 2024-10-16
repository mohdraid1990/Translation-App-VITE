// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./styles/main.scss"; // ربط ملف SASS

const app = createApp(App);
app.use(createPinia());
app.mount("#app");
