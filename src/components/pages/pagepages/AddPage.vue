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
              v-model="pageData.pageStatus"
            />
            <label class="custom-control-label" for="customSwitch1">{{
              pageData.pageStatus ? "ВКЛ" : "ВЫКЛ"
            }}</label>
          </div>
        </div>
      </div>
      <div class="col-4">
        <LangSwitcher :language.sync="pageData.language" />
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <FilmName
          :filmName.sync="pageData.pageName.placeholder"
          :titleProperty.sync="pageData.titles.pageName"
          v-if="pageData.pageName.isRequired"
        />
        <Phones
          :phones.sync="pageData.phones"
          :titleProperty.sync="pageData.titles.phones"
          v-if="pageData.phones.isRequired"
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
      :filmDescription.sync="pageData.pageDescription.text"
      :titleProperty.sync="pageData.titles.pageDescription"
      v-if="pageData.pageDescription.isRequired"
    />
    <MainPicture
      :mainPicture.sync="pageData.mainPicture.image"
      :titleProperty.sync="pageData.titles.mainPicture"
      v-if="pageData.mainPicture.isRequired"
    />
    <PictureGallery
      :picturesGallery.sync="pageData.pageGallery.gallery"
      :titleProperty.sync="pageData.titles.pageGallery"
      v-if="pageData.pageGallery.isRequired"
    />
    <SeoBlock :seoBlock.sync="pageData.seoBlock" />
    <FooterButtons @saveFilm="savePageToDb" />
  </div>
</template>

<script>
import LangSwitcher from "../pagefilms/LangSwitcher";
import FilmName from "../pagefilms/FilmName";
import Phones from "./Phones";
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
    pageCard: {
      type: Object,
      required: true,
    },
    pageCards: {
      type: Array,
      required: true,
    },
  },
  components: {
    LangSwitcher,
    FilmName,
    Phones,
    FilmDescription,
    MainPicture,
    PictureGallery,
    SeoBlock,
    FooterButtons,
    DatePicker,
  },
  name: "AddPage",
  data() {
    return {
      pageData: this.pageCard,
      pagesData: this.pageCards,
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
        return this.pageCard.pageDate;
      },
      set: function (newDate) {
        this.pageData.pageDate = newDate;
      },
    },
  },
  methods: {
    savePageToDb: async function () {
      //uploading picturesGallery to firebase storage
      if (this.pageData.pageGallery.gallery) {
        this.pageData.pageGallery.gallery.map(async (picture) => {
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
      if (!this.pageData.mainPicture.image.includes("noimage")) {
        let blob = await fetch(this.pageData.mainPicture.image).then((res) => {
          return res.blob();
        });

        const storageRef = firebase
          .storage()
          .ref(`images/${Date.now()}${blob.size}.jpg`);

        this.pageData.mainPicture.image = await storageRef
          .put(blob)
          .then(async function (snapshot) {
            return await snapshot.ref.getDownloadURL();
          });
      }

      this.pagesData.push(this.pageData);

      setTimeout(() => {
        database.ref("pages/").set(this.pagesData);
        this.$router.push({ name: "Pagepages" });
      }, 5000);
    },
  },
};
</script>

<style scoped></style>
