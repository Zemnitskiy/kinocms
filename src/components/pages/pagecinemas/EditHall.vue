<template>
  <div class="container">
    <LangSwitcher :language.sync="hallCard.language" />

    <div class="row">
      <div class="col-6">
        <FilmName
          :filmName.sync="hallCard.hallNumber"
          :titleProperty.sync="hallCard.titles.hallNumber"
        />
      </div>
      <div class="col-6">
        <DatePicker
          v-slot="{ inputValue, inputEvents }"
          v-model="date"
          :model-config="modelConfig"
          is-required
        >
          <template>
            <input
              class="bg-white border px-2 py-1 rounded"
              :value="inputValue"
              v-on="inputEvents"
            />
          </template>
        </DatePicker>
      </div>
    </div>

    <FilmDescription
      :filmDescription.sync="hallCard.hallDescription"
      :titleProperty.sync="hallCard.titles.hallDescription"
    />
    <MainPictureLogo
      :mainPicture.sync="hallCard.hallSchema"
      :titleProperty.sync="hallCard.titles.hallSchema"
      :id="`mainpicturelogo`"
      :for="`mainpicturelogo`"
    />
    <MainPicture
      :mainPicture.sync="hallCard.mainPicture"
      :titleProperty.sync="hallCard.titles.mainPicture"
    />
    <PictureGallery
      :picturesGallery.sync="hallCard.picturesGallery"
      :titleProperty.sync="hallCard.titles.picturesGallery"
    />
    <SeoBlock :seoBlock.sync="hallCard.seoBlock" />
    <FooterButtons @saveFilm="saveHallToDb" />
  </div>
</template>

<script>
import LangSwitcher from "../pagefilms/LangSwitcher";
import FilmName from "../pagefilms/FilmName";
import FilmDescription from "../pagefilms/FilmDescription";
import MainPictureLogo from "../pagefilms/MainPictureLogo";
import MainPicture from "../pagefilms/MainPicture";
import PictureGallery from "../pagefilms/PictureGallery";
import SeoBlock from "../pagefilms/SeoBlock";
import FooterButtons from "../pagefilms/FooterButtons";
// Datepicker
import DatePicker from "v-calendar/lib/components/date-picker.umd";

// Firebase
import firebase from "firebase";
// const database = firebase.database();

export default {
  props: {
    hallData: {
      type: Object,
      required: true,
    },
    hallsData: {
      type: Array,
      required: true,
    },
    cinemaData: {
      type: Object,
      required: true,
    },
    cinemasData: {
      type: Array,
      required: true,
    },
  },
  components: {
    LangSwitcher,
    FilmName,
    FilmDescription,
    MainPicture,
    MainPictureLogo,
    PictureGallery,
    SeoBlock,
    FooterButtons,
    DatePicker,
  },
  name: "EditHall",
  data() {
    return {
      hallCard: this.hallData,
      hallCards: this.hallsData,
      cinemaCard: this.cinemaData,
      // Datepicker config
      modelConfig: {
        type: "string",
        mask: "DD.MM.YYYY",
      },
    };
  },
  computed: {
    date: {
      get: function () {
        return this.hallData.hallDate;
      },
      set: function (newDate) {
        this.hallCard.hallDate = newDate;
      },
    },
  },
  methods: {
    saveHallToDb: async function () {
      //uploading picturesGallery to firebase storage
      if (this.hallCard.newsGallery) {
        this.hallCard.newsGallery.map(async (picture) => {
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
        !this.hallCard.mainPicture.includes("noimage") &&
        !this.hallCard.mainPicture.includes("firebasestorage")
      ) {
        let blob = await fetch(this.hallCard.mainPicture).then((res) => {
          return res.blob();
        });

        const storageRef = firebase
          .storage()
          .ref(`images/${Date.now()}${blob.size}.jpg`);

        this.hallCard.mainPicture = await storageRef
          .put(blob)
          .then(async function (snapshot) {
            return await snapshot.ref.getDownloadURL();
          });
      }

      //uploading hallSchema to firebase storage
      if (
        !this.hallCard.hallSchema.includes("noimage") &&
        !this.hallCard.mainPicture.includes("firebasestorage")
      ) {
        let blob = await fetch(this.hallCard.hallSchema).then((res) => {
          return res.blob();
        });

        const storageRef = firebase
          .storage()
          .ref(`images/${Date.now()}${blob.size}.jpg`);

        this.hallCard.hallSchema = await storageRef
          .put(blob)
          .then(async function (snapshot) {
            return await snapshot.ref.getDownloadURL();
          });
      }

      this.$router.go(-1);
    },
  },
  beforeRouteLeave(to, from, next) {
    to.params.cinemaCard = this.cinemaCard;
    to.params.cinemaCards = this.cinemasData;
    next();
  },
};
</script>

<style scoped></style>
