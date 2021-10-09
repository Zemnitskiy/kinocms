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
              v-model="pageCard.pageStatus"
            />
            <label class="custom-control-label" for="customSwitch1">{{
              pageCard.pageStatus ? "ВКЛ" : "ВЫКЛ"
            }}</label>
          </div>
        </div>
      </div>
      <div class="col-4">
        <LangSwitcher :language.sync="pageCard.language" />
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <FilmName
          :filmName.sync="pageCard.pageName.placeholder"
          :titleProperty.sync="pageCard.titles.pageName"
          v-if="pageCard.pageName.isRequired"
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
      :filmDescription.sync="pageCard.pageDescription.text"
      :titleProperty.sync="pageCard.titles.pageDescription"
      v-if="pageCard.pageDescription.isRequired"
    />
    <MainPicture
      :mainPicture.sync="pageCard.mainPicture.image"
      :titleProperty.sync="pageCard.titles.mainPicture"
      v-if="pageCard.mainPicture.isRequired"
    />
    <PictureGallery
      :picturesGallery.sync="pageCard.pageGallery.gallery"
      :titleProperty.sync="pageCard.titles.pageGallery"
      v-if="pageCard.pageGallery.isRequired"
    />
    <SeoBlock :seoBlock.sync="pageCard.seoBlock" />
    <FooterButtons @saveFilm="savePageToDb" />
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
    pageData: {
      type: Object,
      required: true,
    },
    pagesData: {
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
  name: "EditPage",
  data() {
    return {
      pageCard: this.pageData,
      pageCards: this.pagesData,
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
        return this.pageData.pageDate;
      },
      set: function (newDate) {
        this.pageCard.pageDate = newDate;
      },
    },
  },
  methods: {
    savePageToDb: async function () {
      //uploading picturesGallery to firebase storage
      if (this.pageCard.pageGallery.gallery) {
        this.pageCard.pageGallery.gallery.map(async (picture) => {
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
      if (!this.pageCard.mainPicture.image.includes("noimage")) {
        let blob = await fetch(this.pageCard.mainPicture.image).then((res) => {
          return res.blob();
        });

        const storageRef = firebase
          .storage()
          .ref(`images/${Date.now()}${blob.size}.jpg`);

        this.pageCard.mainPicture.image = await storageRef
          .put(blob)
          .then(async function (snapshot) {
            return await snapshot.ref.getDownloadURL();
          });
      }

      setTimeout(() => {
        database.ref("pages/").set(this.pageCards);
        this.$router.push({ name: "Pagepages" });
      }, 5000);
    },
  },
};
</script>

<style scoped></style>
