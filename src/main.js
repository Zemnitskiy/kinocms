import Vue from "vue";
import App from "./App.vue";

import "./assets/css/adminlte.min.css";
import "./assets/js/bootstrap.bundle.min.js";
import "./assets/js/jquery.min.js";
import "./assets/css/all.min.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
