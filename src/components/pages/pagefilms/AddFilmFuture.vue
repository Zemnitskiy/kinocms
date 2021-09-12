<template>
  <div class="container">
    <LangSwitcher :language.sync="filmData.language" />
    <FilmName :filmName.sync="filmData.filmName" />
    <FilmDescription :filmDescription.sync="filmData.filmDescription" />
    <MainPicture :mainPicture.sync="filmData.mainPicture" />
    <PictureGallery :picturesGallery.sync="filmData.picturesGallery" />
    <FilmTrailer :filmTrailer.sync="filmData.filmTrailer" />
    <FilmType :filmType.sync="filmData.filmType" />
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
  props: {
    filmCardFuture: {
      type: Object,
      required: true,
    },
    filmCardsFuture: {
      type: Array,
      required: true,
    },
  },
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
  name: "AddFilmFuture",
  data() {
    return {
      filmData: this.filmCardFuture,
      filmsData: this.filmCardsFuture,
    };
  },
  methods: {
    saveFilmToDb: async function () {
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

      //uploading mainPicture to firebase storage
      if (!this.filmData.mainPicture.includes("noimage")) {
        let blob = await fetch(this.filmData.mainPicture).then((res) => {
          return res.blob();
        });

        const storageRef = firebase
          .storage()
          .ref(`images/${Date.now()}${blob.size}.jpg`);

        this.filmData.mainPicture = await storageRef
          .put(blob)
          .then(async function (snapshot) {
            return await snapshot.ref.getDownloadURL();
          });
      }

      this.filmsData.push(this.filmData);

      setTimeout(
        () => database.ref("films/filmcardsfuture/").set(this.filmsData),
        5000
      );

      this.$router.push({ name: "Pagefilms" });
    },
    loadDefaults: function () {
      return this.defaultFilm;
    },
  },
};
</script>

<style scoped></style>
