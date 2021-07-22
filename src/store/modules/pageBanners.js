export default {
  actions: {
    addTopBannerImg({ commit }, currentTopBannerImg) {
      commit("add_TopBannerImg", currentTopBannerImg);
    },
    deleteTopBannerImg({ commit }, topBannerImg) {
      commit("delete_TopBannerImg", topBannerImg);
    },
  },
  mutations: {
    add_TopBannerImg(state, currentTopBannerImg) {
      if (state.topBannerImgs.length < 5) {
        state.topBannerImgs.push(currentTopBannerImg);
      } else {
        alert(`Добавлено максимальное количество баннеров!`);
      }
    },
    delete_TopBannerImg(state, topBannerImg) {
      state.topBannerImgs = state.topBannerImgs.filter(
        (banner) => banner.id !== topBannerImg.id
      );
    },
  },
  // state: {
  //   topBannerImgs: [],
  // },
  getters: {
    allTopBannersImg(state) {
      return state.topBannerImgs;
    },
  },
};
