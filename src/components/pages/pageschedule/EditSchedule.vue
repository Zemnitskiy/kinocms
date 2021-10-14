<template>
  <div class="container">
    <div class="row">
      <div class="col-8 d-flex justify-content-end align-items-center">
        <div class="form-group mb-0">
          <div class="custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customSwitch1"
              v-model="newsData.newsStatus"
            />
            <label class="custom-control-label" for="customSwitch1">{{
              newsData.newsStatus ? "ВКЛ" : "ВЫКЛ"
            }}</label>
          </div>
        </div>
      </div>
      <div class="col-4">
        <LangSwitcher :language.sync="newsData.language" />
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <FilmName
          :filmName.sync="newsCard.newsName"
          :titleProperty.sync="newsCard.titles.newsName"
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
      :filmDescription.sync="newsCard.newsDescription"
      :titleProperty.sync="newsCard.titles.newsDescription"
    />
    <MainPicture
      :mainPicture.sync="newsCard.mainPicture"
      :titleProperty.sync="newsCard.titles.mainPicture"
    />
    <PictureGallery
      :picturesGallery.sync="newsCard.newsGallery"
      :titleProperty.sync="newsCard.titles.newsGallery"
    />
    <FilmTrailer
      :filmTrailer.sync="newsCard.newsVideo"
      :titleProperty.sync="newsCard.titles.newsVideo"
    />
    <SeoBlock :seoBlock.sync="newsCard.seoBlock" />
    <FooterButtons @saveFilm="saveNewsToDb" />
  </div>
</template>

<script>
import LangSwitcher from "../pagefilms/LangSwitcher";
import FilmName from "../pagefilms/FilmName";
import FilmDescription from "../pagefilms/FilmDescription";
import MainPicture from "../pagefilms/MainPicture";
import PictureGallery from "../pagefilms/PictureGallery";
import FilmTrailer from "../pagefilms/FilmTrailer";
import SeoBlock from "../pagefilms/SeoBlock";
import FooterButtons from "../pagefilms/FooterButtons";
// Datepicker
import DatePicker from "v-calendar/lib/components/date-picker.umd";

import firebase from "firebase";
const database = firebase.database();

export default {
  props: {
    newsData: {
      type: Object,
      required: true,
    },
    newsesData: {
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
    SeoBlock,
    FooterButtons,
    DatePicker,
  },
  name: "EditNews",
  data() {
    return {
      newsCard: this.newsData,
      // newsCards: this.newsesData,
      modelConfig: {
        type: "string",
        mask: "DD.MM.YYYY",
      },
    };
  },
  computed: {
    newsCards: function () {
      return this.newsesData;
    },
    date: {
      get: function () {
        return this.newsCard.newsDate;
      },
      set: function (newDate) {
        this.newsData.newsDate = newDate;
      },
    },
  },
  methods: {
    saveNewsToDb: async function () {
      //uploading picturesGallery to firebase storage
      if (this.newsCard.newsGallery) {
        this.newsCard.newsGallery.map(async (picture) => {
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
        !this.newsCard.mainPicture.includes("noimage") &&
        !this.newsCard.mainPicture.includes("firebase")
      ) {
        let blob = await fetch(this.newsCard.mainPicture).then((res) => {
          return res.blob();
        });

        const storageRef = firebase
          .storage()
          .ref(`images/${Date.now()}${blob.size}.jpg`);

        this.newsCard.mainPicture = await storageRef
          .put(blob)
          .then(async function (snapshot) {
            return await snapshot.ref.getDownloadURL();
          });
      }

      database.ref("newses/").set(this.newsCards);
      this.$router.push({ name: "Pagenews" });
    },
    loadDefaults: function () {
      return this.defaultFilm;
    },
  },
};
</script>

<style scoped></style>
