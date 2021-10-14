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
          id: "1",
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
            isRequired: true,
            placeholder: "Главная страница",
          },
          mainPicture: {
            isRequired: false,
            image: require("@/assets/img/noimage.png"),
          },
          pageGallery: {
            isRequired: false,
            gallery: [{}],
          },
          contacts: {
            isRequired: false,
          },
          seoBlock: {
            seoUrl: "",
            seoTitle: "",
            seoKeywords: "",
          },
          isRemovable: false,
          titles: {
            pageName: "Название страницы",
            phones: "Телефон",
            pageDescription: "Описание",
            mainPicture: "Главная картинка",
            pageGallery: "Галерея картинок",
            seoBlock: "SEO блок",
          },
          pageDate: "21.09.2021",
        },
        {
          id: "2",
          pageStatus: true,
          language: "ukr",
          phones: {
            isRequired: false,
            phone1: "777 85 98",
            phone2: "777 85 98",
          },
          pageDescription: {
            isRequired: true,
            placeholder: "текст",
          },
          pageName: {
            isRequired: true,
            placeholder: "О кинотеатре",
          },
          mainPicture: {
            isRequired: true,
            image: require("@/assets/img/noimage.png"),
          },
          pageGallery: {
            isRequired: true,
            gallery: [{ image: require("@/assets/img/noimage.png") }],
          },
          contacts: {
            isRequired: false,
          },
          seoBlock: {
            seoUrl: "",
            seoTitle: "",
            seoKeywords: "",
          },
          isRemovable: false,
          titles: {
            pageName: "Название страницы",
            phones: "Телефон",
            pageDescription: "Описание",
            mainPicture: "Главная картинка",
            pageGallery: "Галерея картинок",
            seoBlock: "SEO блок",
          },
          pageDate: "21.09.2021",
        },
        {
          id: "3",
          pageStatus: true,
          language: "ukr",
          phones: {
            isRequired: false,
            phone1: "777 85 98",
            phone2: "777 85 98",
          },
          pageDescription: {
            isRequired: true,
            placeholder: "текст",
          },
          pageName: {
            isRequired: true,
            placeholder: "Кафе-бар",
          },
          mainPicture: {
            isRequired: true,
            image: require("@/assets/img/noimage.png"),
          },
          pageGallery: {
            isRequired: true,
            gallery: [{ image: require("@/assets/img/noimage.png") }],
          },
          contacts: {
            isRequired: false,
          },
          seoBlock: {
            seoUrl: "",
            seoTitle: "",
            seoKeywords: "",
          },
          isRemovable: false,
          titles: {
            pageName: "Название страницы",
            phones: "Телефон",
            pageDescription: "Описание",
            mainPicture: "Главная картинка",
            pageGallery: "Галерея картинок",
            seoBlock: "SEO блок",
          },
          pageDate: "21.09.2021",
        },
        {
          id: "4",
          pageStatus: true,
          language: "ukr",
          phones: {
            isRequired: false,
            phone1: "777 85 98",
            phone2: "777 85 98",
          },
          pageDescription: {
            isRequired: true,
            placeholder: "текст",
          },
          pageName: {
            isRequired: true,
            placeholder: "Vip-зал",
          },
          mainPicture: {
            isRequired: true,
            image: require("@/assets/img/noimage.png"),
          },
          pageGallery: {
            isRequired: true,
            gallery: [{ image: require("@/assets/img/noimage.png") }],
          },
          contacts: {
            isRequired: false,
          },
          seoBlock: {
            seoUrl: "",
            seoTitle: "",
            seoKeywords: "",
          },
          isRemovable: false,
          titles: {
            pageName: "Название страницы",
            phones: "Телефон",
            pageDescription: "Описание",
            mainPicture: "Главная картинка",
            pageGallery: "Галерея картинок",
            seoBlock: "SEO блок",
          },
          pageDate: "21.09.2021",
        },
        {
          id: "5",
          pageStatus: true,
          language: "ukr",
          phones: {
            isRequired: false,
            phone1: "777 85 98",
            phone2: "777 85 98",
          },
          pageDescription: {
            isRequired: true,
            placeholder: "текст",
          },
          pageName: {
            isRequired: true,
            placeholder: "Реклама",
          },
          mainPicture: {
            isRequired: true,
            image: require("@/assets/img/noimage.png"),
          },
          pageGallery: {
            isRequired: true,
            gallery: [{ image: require("@/assets/img/noimage.png") }],
          },
          contacts: {
            isRequired: false,
          },
          seoBlock: {
            seoUrl: "",
            seoTitle: "",
            seoKeywords: "",
          },
          isRemovable: false,
          titles: {
            pageName: "Название страницы",
            phones: "Телефон",
            pageDescription: "Описание",
            mainPicture: "Главная картинка",
            pageGallery: "Галерея картинок",
            seoBlock: "SEO блок",
          },
          pageDate: "21.09.2021",
        },
        {
          id: "6",
          pageStatus: true,
          language: "ukr",
          phones: {
            isRequired: false,
            phone1: "777 85 98",
            phone2: "777 85 98",
          },
          pageDescription: {
            isRequired: true,
            placeholder: "текст",
          },
          pageName: {
            isRequired: true,
            placeholder: "Детская комната",
          },
          mainPicture: {
            isRequired: true,
            image: require("@/assets/img/noimage.png"),
          },
          pageGallery: {
            isRequired: true,
            gallery: [{ image: require("@/assets/img/noimage.png") }],
          },
          contacts: {
            isRequired: false,
          },
          seoBlock: {
            seoUrl: "",
            seoTitle: "",
            seoKeywords: "",
          },
          isRemovable: false,
          titles: {
            pageName: "Название страницы",
            phones: "Телефон",
            pageDescription: "Описание",
            mainPicture: "Главная картинка",
            pageGallery: "Галерея картинок",
            seoBlock: "SEO блок",
          },
          pageDate: "21.09.2021",
        },
        {
          id: "7",
          pageStatus: true,
          language: "ukr",
          phones: {
            isRequired: false,
            phone1: "777 85 98",
            phone2: "777 85 98",
          },
          pageDescription: {
            isRequired: false,
            placeholder: "текст",
          },
          pageName: {
            isRequired: false,
            placeholder: "Контакты",
          },
          mainPicture: {
            isRequired: false,
            image: require("@/assets/img/noimage.png"),
          },
          pageGallery: {
            isRequired: false,
            gallery: [{}],
          },
          contacts: {
            isRequired: true,
            contactCard: {
              id: String(Date.now() * Math.floor(Math.random() + 1)),
              contactStatus: false,
              cinemaName: "Название кинотеатра",
              cinemaDescription: "",
              cinemaGeoposition: "",
              mainPicture: {
                isRequired: true,
                image: require("@/assets/img/noimage.png"),
              },
              titles: {
                cinemaName: "Название кинотеатра",
                cinemaDescription: "Адрес",
                cinemaGeoposition: "Координаты для карты",
                mainPicture: "Лого",
              },
            },
            contactCards: [
              {
                id: String(Date.now() * Math.floor(Math.random() + 1)),
                contactStatus: false,
                cinemaName: "",
                cinemaDescription: "",
                cinemaGeoposition: "",
                mainPicture: {
                  isRequired: true,
                  image: require("@/assets/img/noimage.png"),
                },
                titles: {
                  cinemaName: "Название кинотеатра",
                  cinemaDescription: "Адрес",
                  cinemaGeoposition: "Координаты для карты",
                  mainPicture: "Лого",
                },
                isSwitched: false,
              },
            ],
          },
          seoBlock: {
            seoUrl: "",
            seoTitle: "",
            seoKeywords: "",
          },
          isRemovable: false,
          titles: {
            pageName: "Название страницы",
            phones: "Телефон",
            pageDescription: "Описание",
            mainPicture: "Главная картинка",
            pageGallery: "Галерея картинок",
            seoBlock: "SEO блок",
          },
          pageDate: "21.09.2021",
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
        contacts: {
          isRequired: false,
        },
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
        this.pages;
        this.loaded = true;
      }
    });
  },
};
</script>
