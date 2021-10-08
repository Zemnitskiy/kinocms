<template>
  <div class="container">
    <LangSwitcher :language.sync="cinemaData.language" />
    <FilmName
      :filmName.sync="cinemaData.cinemaName"
      :titleProperty.sync="cinemaData.titles.cinemaName"
    />
    <FilmDescription
      :filmDescription.sync="cinemaData.cinemaDescription"
      :titleProperty.sync="cinemaData.titles.cinemaDescription"
    />
    <FilmDescription
      :filmDescription.sync="cinemaData.cinemaConditions"
      :titleProperty.sync="cinemaData.titles.cinemaConditions"
    />
    <MainPictureLogo
      :mainPicture.sync="cinemaData.cinemaLogo"
      :titleProperty.sync="cinemaData.titles.cinemaLogo"
      :id="`mainpicturelogo`"
      :for="`mainpicturelogo`"
    />
    <MainPicture
      :mainPicture.sync="cinemaData.mainPicture"
      :titleProperty.sync="cinemaData.titles.mainPicture"
    />
    <PictureGallery
      :picturesGallery.sync="cinemaData.picturesGallery"
      :titleProperty.sync="cinemaData.titles.picturesGallery"
    />
    <HallTable
      :hallsData="cinemaData.hallCards"
      :cinemaData="cinemaData"
      :cinemasData="cinemasData"
    />
    <SeoBlock :seoBlock.sync="cinemaCard.seoBlock" />

    <FooterButtons @saveFilm="saveCinemaToDb" />
  </div>
</template>

<script>
import LangSwitcher from "../pagefilms/LangSwitcher";
import FilmName from "../pagefilms/FilmName";
import FilmDescription from "../pagefilms/FilmDescription";
import MainPicture from "../pagefilms/MainPicture";
import MainPictureLogo from "../pagefilms/MainPictureLogo";
import PictureGallery from "../pagefilms/PictureGallery";
import SeoBlock from "../pagefilms/SeoBlock";
import FooterButtons from "../pagefilms/FooterButtons";
// Hall components
import HallTable from "./HallTable";

import firebase from "firebase";
const database = firebase.database();

export default {
  props: {
    cinemaCard: {
      type: Object,
      required: true,
    },
    cinemaCards: {
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
    MainPictureLogo,
    SeoBlock,
    FooterButtons,
    HallTable,
  },
  name: "EditCinema",
  data() {
    return {
      cinemaData: this.cinemaCard,
      cinemasData: this.cinemaCards,
    };
  },
  methods: {
    saveCinemaToDb: async function () {
      //uploading picturesGallery to firebase storage
      if (this.cinemaData.picturesGallery) {
        this.cinemaData.picturesGallery.map(async (picture) => {
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
      if (
        !this.cinemaData.mainPicture.includes("noimage") &&
        !this.cinemaData.mainPicture.includes("firebasestorage")
      ) {
        let blob = await fetch(this.cinemaData.mainPicture).then((res) => {
          return res.blob();
        });

        const storageRef = firebase
          .storage()
          .ref(`images/${Date.now()}${blob.size}.jpg`);

        this.cinemaData.mainPicture = await storageRef
          .put(blob)
          .then(async function (snapshot) {
            return await snapshot.ref.getDownloadURL();
          });
      }

      //uploading cinemaLogo to firebase storage
      if (
        !this.cinemaData.cinemaLogo.includes("noimage") &&
        !this.cinemaData.cinemaLogo.includes("firebasestorage")
      ) {
        let blob = await fetch(this.cinemaData.cinemaLogo).then((res) => {
          return res.blob();
        });

        const storageRef = firebase
          .storage()
          .ref(`images/${Date.now()}${blob.size}.jpg`);

        this.cinemaData.cinemaLogo = await storageRef
          .put(blob)
          .then(async function (snapshot) {
            return await snapshot.ref.getDownloadURL();
          });
      }

      setTimeout(() => {
        database.ref("cinemas/cinemacards/").set(this.cinemasData);
        this.$router.push({ name: "Pagecinemas" });
      }, 5000);
    },
  },
};
</script>

<style scoped></style>
