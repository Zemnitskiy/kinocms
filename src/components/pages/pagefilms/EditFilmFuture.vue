<template>
  <div class="container">
    <LangSwitcher :language.sync="filmCard.language" />
    <FilmName
      :filmName.sync="filmCard.filmName"
      :titleProperty.sync="filmCard.titles.filmName"
    />
    <FilmDescription
      :filmDescription.sync="filmCard.filmDescription"
      :titleProperty.sync="filmCard.titles.filmDescription"
    />
    <MainPicture
      :mainPicture.sync="filmCard.mainPicture"
      :titleProperty.sync="filmCard.titles.mainPicture"
    />
    <PictureGallery
      :picturesGallery.sync="filmCard.picturesGallery"
      :titleProperty.sync="filmCard.titles.picturesGallery"
    />
    <FilmTrailer
      :filmTrailer.sync="filmCard.filmTrailer"
      :titleProperty.sync="filmCard.titles.filmTrailer"
    />
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
  name: "EditFilmFuture",
  data() {
    return {
      filmCard: this.filmData,
      filmCards: this.filmsData,
    };
  },
  methods: {
    saveFilmToDb: async function () {
      //uploading picturesGallery to firebase storage
      if (this.filmCard.picturesGallery) {
        this.filmCard.picturesGallery.map(async (picture) => {
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
      if (!this.filmCard.mainPicture.includes("noimage")) {
        let blob = await fetch(this.filmCard.mainPicture).then((res) => {
          return res.blob();
        });

        const storageRef = firebase
          .storage()
          .ref(`images/${Date.now()}${blob.size}.jpg`);

        this.filmCard.mainPicture = await storageRef
          .put(blob)
          .then(async function (snapshot) {
            return await snapshot.ref.getDownloadURL();
          });
      }

      setTimeout(() => {
        database.ref("films/filmcardsfuture/").set(this.filmCards);
        this.$router.push({ name: "Pagefilms" });
      }, 5000);
    },
    loadDefaults: function () {
      return this.defaultFilm;
    },
  },
};
</script>

<style scoped></style>
