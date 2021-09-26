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
              v-model="promoData.newsStatus"
            />
            <label class="custom-control-label" for="customSwitch1">{{
              promoData.newsStatus ? "ВКЛ" : "ВЫКЛ"
            }}</label>
          </div>
        </div>
      </div>
      <div class="col-4">
        <LangSwitcher :language.sync="promoData.language" />
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <FilmName
          :filmName.sync="promoData.newsName"
          :titleProperty.sync="promoData.titles.newsName"
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
      :filmDescription.sync="promoData.newsDescription"
      :titleProperty.sync="promoData.titles.newsDescription"
    />
    <MainPicture
      :mainPicture.sync="promoData.mainPicture"
      :titleProperty.sync="promoData.titles.mainPicture"
    />
    <PictureGallery
      :picturesGallery.sync="promoData.newsGallery"
      :titleProperty.sync="promoData.titles.newsGallery"
    />
    <FilmTrailer
      :filmTrailer.sync="promoData.newsVideo"
      :titleProperty.sync="promoData.titles.newsVideo"
    />
    <SeoBlock :seoBlock.sync="promoData.seoBlock" />
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
// Firebase
import firebase from "firebase";
const database = firebase.database();

export default {
  props: {
    promoCard: {
      type: Object,
      required: true,
    },
    promoCards: {
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
  name: "AddPromo",
  data() {
    return {
      promoData: this.promoCard,
      promosData: this.promoCards,
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
      if (this.promoData.newsGallery) {
        this.promoData.newsGallery.map(async (picture) => {
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
      if (!this.promoData.mainPicture.includes("noimage")) {
        let blob = await fetch(this.promoData.mainPicture).then((res) => {
          return res.blob();
        });

        const storageRef = firebase
          .storage()
          .ref(`images/${Date.now()}${blob.size}.jpg`);

        this.promoData.mainPicture = await storageRef
          .put(blob)
          .then(async function (snapshot) {
            return await snapshot.ref.getDownloadURL();
          });
      }

      this.promosData.push(this.promoData);

      setTimeout(() => database.ref("promos/").set(this.promosData), 5000);

      this.$router.push({ name: "Pagepromo" });
    },
    loadDefaults: function () {
      return this.defaultFilm;
    },
  },
};
</script>

<style scoped></style>
