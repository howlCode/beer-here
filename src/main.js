import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import VueAxios from "vue-axios";
import { plainAxiosInstance } from "./backend/axios";

Vue.config.productionTip = false;

// Use Axios to make API calls. Make plain HTTP requests, without any security headers.
// In the future, a securedAxiosInstance could be written to reach out to secured API's.
Vue.use(VueAxios, {
  plain: plainAxiosInstance
});

new Vue({
  router,
  plainAxiosInstance,
  render: h => h(App)
}).$mount("#app");
