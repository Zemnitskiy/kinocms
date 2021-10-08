<template>
  <div class="container">
    <LangSwitcher :language.sync="hallData.language" />

    <div class="row">
      <div class="col-6">
        <FilmName
          :filmName.sync="hallData.hallNumber"
          :titleProperty.sync="hallData.titles.hallNumber"
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
      :filmDescription.sync="hallData.hallDescription"
      :titleProperty.sync="hallData.titles.hallDescription"
    />
    <MainPictureLogo
      :mainPicture.sync="hallData.hallSchema"
      :titleProperty.sync="hallData.titles.hallSchema"
      :id="`mainpicturelogo`"
      :for="`mainpicturelogo`"
    />
    <MainPicture
      :mainPicture.sync="hallData.mainPicture"
      :titleProperty.sync="hallData.titles.mainPicture"
    />
    <PictureGallery
      :picturesGallery.sync="hallData.picturesGallery"
      :titleProperty.sync="hallData.titles.picturesGallery"
    />
    <SeoBlock :seoBlock.sync="hallData.seoBlock" />
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
    hallCard: {
      type: Object,
      required: true,
    },
    hallCards: {
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
  name: "AddHall",
  data() {
    return {
      hallData: this.hallCard,
      hallsData: this.hallCards,
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
        return this.hallCard.hallDate;
      },
      set: function (newDate) {
        this.hallData.hallDate = newDate;
      },
    },
  },
  methods: {
    saveHallToDb: async function () {
      //uploading picturesGallery to firebase storage
      if (this.hallData.newsGallery) {
        this.hallData.newsGallery.map(async (picture) => {
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
      if (!this.hallData.mainPicture.includes("noimage")) {
        let blob = await fetch(this.hallData.mainPicture).then((res) => {
          return res.blob();
        });

        const storageRef = firebase
          .storage()
          .ref(`images/${Date.now()}${blob.size}.jpg`);

        this.hallData.mainPicture = await storageRef
          .put(blob)
          .then(async function (snapshot) {
            return await snapshot.ref.getDownloadURL();
          });
      }

      //uploading hallSchema to firebase storage
      if (!this.hallData.hallSchema.includes("noimage")) {
        let blob = await fetch(this.hallData.hallSchema).then((res) => {
          return res.blob();
        });

        const storageRef = firebase
          .storage()
          .ref(`images/${Date.now()}${blob.size}.jpg`);

        this.hallData.hallSchema = await storageRef
          .put(blob)
          .then(async function (snapshot) {
            return await snapshot.ref.getDownloadURL();
          });
      }

      this.hallsData.push(this.hallData);

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
