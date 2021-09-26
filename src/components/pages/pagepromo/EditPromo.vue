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
              v-model="promoCard.newsStatus"
            />
            <label class="custom-control-label" for="customSwitch1">{{
              promoCard.newsStatus ? "ВКЛ" : "ВЫКЛ"
            }}</label>
          </div>
        </div>
      </div>
      <div class="col-4">
        <LangSwitcher :language.sync="promoCard.language" />
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <FilmName
          :filmName.sync="promoCard.newsName"
          :titleProperty.sync="promoCard.titles.newsName"
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
      :filmDescription.sync="promoCard.newsDescription"
      :titleProperty.sync="promoCard.titles.newsDescription"
    />
    <MainPicture
      :mainPicture.sync="promoCard.mainPicture"
      :titleProperty.sync="promoCard.titles.mainPicture"
    />
    <PictureGallery
      :picturesGallery.sync="promoCard.newsGallery"
      :titleProperty.sync="promoCard.titles.newsGallery"
    />
    <FilmTrailer
      :filmTrailer.sync="promoCard.newsVideo"
      :titleProperty.sync="promoCard.titles.newsVideo"
    />
    <SeoBlock :seoBlock.sync="promoCard.seoBlock" />
    <FooterButtons @saveFilm="savePromoToDb" />
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
    promoData: {
      type: Object,
      required: true,
    },
    promosData: {
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
  name: "EditPromo",
  data() {
    return {
      promoCard: this.promoData,
      // newsCards: this.newsesData,
      modelConfig: {
        type: "string",
        mask: "DD.MM.YYYY",
      },
    };
  },
  computed: {
    promoCards: function () {
      return this.promosData;
    },
    date: {
      get: function () {
        return this.promoCard.newsDate;
      },
      set: function (newDate) {
        this.promoData.newsDate = newDate;
      },
    },
  },
  methods: {
    savePromoToDb: async function () {
      //uploading picturesGallery to firebase storage
      if (this.promoCard.newsGallery) {
        this.promoCard.newsGallery.map(async (picture) => {
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
        !this.promoCard.mainPicture.includes("noimage") &&
        !this.promoCard.mainPicture.includes("firebase")
      ) {
        let blob = await fetch(this.promoCard.mainPicture).then((res) => {
          return res.blob();
        });

        const storageRef = firebase
          .storage()
          .ref(`images/${Date.now()}${blob.size}.jpg`);

        this.promoCard.mainPicture = await storageRef
          .put(blob)
          .then(async function (snapshot) {
            return await snapshot.ref.getDownloadURL();
          });
      }

      database.ref("promos/").set(this.promoCards);
      this.$router.push({ name: "Pagepromo" });
    },
    loadDefaults: function () {
      return this.defaultFilm;
    },
  },
};
</script>

<style scoped></style>
