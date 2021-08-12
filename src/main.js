import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

import "./assets/css/adminlte.min.css";
import "./assets/js/bootstrap.bundle.min.js";
import "./assets/js/jquery.min.js";
import "./assets/js/adminlte.min.js";
import "./assets/css/all.min.css";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyC6to1AM6VqtL4fd-BWF2fXe_OJI0I1l3c",
  authDomain: "kinocms-7da3f.firebaseapp.com",
  projectId: "kinocms-7da3f",
  storageBucket: "kinocms-7da3f.appspot.com",
  messagingSenderId: "1086440295219",
  appId: "1:1086440295219:web:45eee037e93b0a287e8c46",
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
