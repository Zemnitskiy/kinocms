<template>
  <PromoTable v-if="loaded" :promo="promo" :promos="promos" />
</template>

<script>
import PromoTable from "./PromoTable";
import firebase from "firebase";

const database = firebase.database();

export default {
  components: {
    PromoTable,
  },
  name: "PagePromo",
  data() {
    return {
      promos: [],
      promo: {
        id: String(Date.now() * Math.floor(Math.random() + 1)),
        language: "ukr",
        newsName: "Название акции",
        newsDescription: "",
        mainPicture: require("@/assets/img/noimage.png"),
        newsGallery: [{}],
        newsVideo: "",
        seoBlock: {
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
        },
        titles: {
          newsName: "Название акции",
          newsDescription: "Описание",
          mainPicture: "Главная картинка",
          newsGallery: "Галерея картинок",
          newsVideo: "Ссылка на видео",
          seoBlock: "SEO блок",
        },
        newsDate: "2021.09.21",
        newsStatus: false,
      },
      loaded: false,
    };
  },
  methods: {},
  mounted() {
    database.ref("promos/").on("value", async (snapshot) => {
      if (snapshot.val() != null) {
        this.promos = await snapshot.val();
        this.loaded = true;
      } else {
        this.promos = [];
        this.loaded = true;
      }
    });
  },
};
</script>
