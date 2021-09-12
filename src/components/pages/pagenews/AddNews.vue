<template>
  <div class="container">
    <LangSwitcher :language="filmData.language" />
    <FilmName :filmName.sync="filmData.filmName" />
    <FilmDescription :filmDescription.sync="filmData.filmDescription" />
    <MainPicture :mainPicture.sync="filmData.mainPicture" />
    <PictureGallery :picturesGallery.sync="filmData.picturesGallery" />
    <FilmTrailer :filmTrailer.sync="filmData.filmTrailer" />
    <FilmType
      :filmType3d.sync="filmData.filmType3d"
      :filmType2d.sync="filmData.filmType2d"
      :filmTypeImax.sync="filmData.filmTypeImax"
    />
    <SeoBlock :seoBlock.sync="filmData.seoBlock" />
    <FooterButtons @saveFilm="saveFilmToDb" />
  </div>
</template>

<script>
import LangSwitcher from "./LangSwitcher";
import FilmName from "./FilmName";
import FilmDescription from "./FilmDescription";
import MainPicture from "./MainPicture";
import PictureGallery from "./PictureGallery";
import FilmTrailer from "./FilmTrailer";
import FilmType from "./FilmType";
import SeoBlock from "./SeoBlock";
import FooterButtons from "./FooterButtons";

import firebase from "firebase";
const database = firebase.database();

export default {
  components: {
    LangSwitcher,
    FilmName,
    FilmDescription,
    MainPicture,
    PictureGallery,
    FilmTrailer,
    FilmType,
    SeoBlock,
    FooterButtons,
  },
  name: "AddFilm",
  data() {
    return {
      filmData: {
        language: "ukr",
        filmName: "",
        filmDescription: "",
        mainPicture: require("@/assets/img/noimage.png"),
        picturesGallery: [],
        filmTrailer: "",

        filmType3d: false,
        filmType2d: false,
        filmTypeImax: false,

        seoBlock: {
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
        },
      },
    };
  },
  methods: {
    saveFilmToDb: function () {
      //uploading picturesGallery to firebase storage
      if (this.filmData.picturesGallery) {
        this.filmData.picturesGallery.map(async (picture) => {
          if (
            !picture.image.includes("noimage") &&
            !picture.image.includes("firebasestorage")
          ) {
            let blob = await fetch(picture.image).then((res) => {
              return res.blob();
            });

            const storageRef = firebase
              .storage()
              .ref(`images/${Date.now()}${blob.size}.jpg`);

            picture.image = await storageRef
              .put(blob)
              .then(async function (snapshot) {
                return await snapshot.ref.getDownloadURL();
              });
          }
        });
      }

      setTimeout(() => database.ref("films/filmdata").set(this.filmData), 5000);
    },
    loadDefaults: function () {
      return this.defaultFilm;
    },
  },
  mounted() {
    database.ref("films/filmdata").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.filmData = snapshot.val();
      } else {
        this.filmData = {
          language: "rus",
          filmName: "",
          filmDescription: "",
          mainPicture: require("@/assets/img/noimage.png"),
          picturesGallery: [],
          filmTrailer: "",

          filmType3d: false,
          filmType2d: false,
          filmTypeImax: false,

          seoBlock: {
            seoUrl: "",
            seoTitle: "",
            seoKeywords: "",
          },
        };
      }
    });
  },
};
</script>

<style scoped></style>
