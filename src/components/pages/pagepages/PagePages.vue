<template>
  <PagesTable v-if="loaded" :page="page" :pages="pages" />
</template>

<script>
import PagesTable from "./PagesTable";
import firebase from "firebase";

const database = firebase.database();

export default {
  components: {
    PagesTable,
  },
  name: "PagePages",
  data() {
    return {
      pages: [
        {
          id: String(Date.now() * Math.floor(Math.random() + 1)),
          pageStatus: true,
          language: "ukr",
          phones: {
            isRequired: true,
            phone1: "777 85 98",
            phone2: "777 85 98",
          },
          pageDescription: {
            isRequired: true,
            placeholder: "текст",
          },
          pageName: {
            isRequired: false,
            placeholder: "Название",
          },
          mainPicture: {
            isRequired: false,
            image: require("@/assets/img/noimage.png"),
          },
          picturesGallery: {
            isRequired: false,
            gallery: [{}],
          },
          seoBlock: {
            seoUrl: "",
            seoTitle: "",
            seoKeywords: "",
          },
          isRemovable: false,
        },
      ],
      page: {
        id: String(Date.now() * Math.floor(Math.random() + 1)),
        pageStatus: true,
        language: "ukr",
        phones: {
          isRequired: false,
          phone1: "777 85 98",
          phone2: "777 85 98",
        },
        pageName: {
          isRequired: true,
          placeholder: "Название",
        },
        mainPicture: {
          isRequired: true,
          image: require("@/assets/img/noimage.png"),
        },
        pageGallery: {
          isRequired: true,
          gallery: [{}],
        },
        seoBlock: {
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
        },
        isRemovable: true,
        pageDescription: {
          isRequired: true,
          text: "",
        },
        titles: {
          pageName: "Название страницы",
          pageDescription: "Описание",
          mainPicture: "Главная картинка",
          pageGallery: "Галерея картинок",
          seoBlock: "SEO блок",
        },
        pageDate: "2021.09.21",
      },
      loaded: false,
    };
  },
  methods: {},
  mounted() {
    database.ref("pages/").on("value", async (snapshot) => {
      if (snapshot.val() != null) {
        this.pages = await snapshot.val();
        this.loaded = true;
      } else {
        this.pages = [];
        this.loaded = true;
      }
    });
  },
};
</script>
