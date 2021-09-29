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
    <MainPicture
      :mainPicture.sync="hallData.mainPicture"
      :titleProperty.sync="hallData.titles.mainPicture"
    />
    <PictureGallery
      :picturesGallery.sync="hallData.newsGallery"
      :titleProperty.sync="hallData.titles.newsGallery"
    />
    <SeoBlock :seoBlock.sync="hallData.seoBlock" />
    <FooterButtons @saveFilm="saveHallToDb" />
  </div>
</template>

<script>
import LangSwitcher from "../pagefilms/LangSwitcher";
import FilmName from "../pagefilms/FilmName";
import FilmDescription from "../pagefilms/FilmDescription";
import MainPicture from "../pagefilms/MainPicture";
import PictureGallery from "../pagefilms/PictureGallery";
import SeoBlock from "../pagefilms/SeoBlock";
import FooterButtons from "../pagefilms/FooterButtons";
// Datepicker
import DatePicker from "v-calendar/lib/components/date-picker.umd";
// Firebase
import firebase from "firebase";
const database = firebase.database();

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
  },
  components: {
    LangSwitcher,
    FilmName,
    FilmDescription,
    MainPicture,
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
        return this.hallCard.newsDate;
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

      this.hallsData.push(this.hallData);

      setTimeout(
        () => database.ref("cinemas/halls/").set(this.hallsData),
        5000
      );

      this.$router.push({ name: "AddCinema" });
    },
    loadDefaults: function () {
      return this.defaultFilm;
    },
  },
};
</script>

<style scoped></style>
