import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axios from 'axios';

// 设置 axios 全局默认配置
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

const app = createApp(App);
app.use(ElementPlus);
app.use(router);

app.config.globalProperties.$axios = axios;

app.mount('#app');