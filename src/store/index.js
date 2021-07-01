import Vue from "vue";
import Vuex from "vuex";
import pageBanners from "./modules/pageBanners";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    pageBanners,
  },
});
