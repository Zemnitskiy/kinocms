<template>
  <NewsTable v-if="loaded" :news="news" :newses="newses" />
</template>

<script>
import NewsTable from "./NewsTable";
import firebase from "firebase";

const database = firebase.database();

export default {
  components: {
    NewsTable,
  },
  name: "PageNews",
  data() {
    return {
      newses: [],
      news: {
        id: String(Date.now() * Math.floor(Math.random() + 1)),
        language: "ukr",
        newsName: "Название новости",
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
          newsName: "Название новости",
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
    database.ref("newses/").on("value", async (snapshot) => {
      if (snapshot.val() != null) {
        this.newses = await snapshot.val();
        this.loaded = true;
      } else {
        this.newses = [];
        this.loaded = true;
      }
    });
  },
};
</script>
