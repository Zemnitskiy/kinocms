<template>
  <div class="container">
    <LangSwitcher :language.sync="filmCard.language" />
    <FilmName :filmName.sync="filmCard.filmName" />
    <FilmDescription :filmDescription.sync="filmCard.filmDescription" />
    <MainPicture :mainPicture.sync="filmCard.mainPicture" />
    <PictureGallery :picturesGallery.sync="filmCard.picturesGallery" />
    <FilmTrailer :filmTrailer.sync="filmCard.filmTrailer" />
    <FilmType :filmType.sync="filmCard.filmType" />
    <SeoBlock :seoBlock.sync="filmCard.seoBlock" />
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
    filmData: {
      type: Object,
      required: true,
    },
    filmsData: {
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
  name: "EditFilm",
  data() {
    return {
      filmCard: this.filmData,
      filmCards: this.filmsData,
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

      setTimeout(
        () => database.ref("films/filmcards/").set(this.filmCards),
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
