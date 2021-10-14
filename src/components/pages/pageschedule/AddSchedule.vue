<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <FilmName
          :filmName.sync="newsData.newsName"
          :titleProperty.sync="newsData.titles.newsName"
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
      :filmDescription.sync="newsData.newsDescription"
      :titleProperty.sync="newsData.titles.newsDescription"
    />
    <MainPicture
      :mainPicture.sync="newsData.mainPicture"
      :titleProperty.sync="newsData.titles.mainPicture"
    />
    <PictureGallery
      :picturesGallery.sync="newsData.newsGallery"
      :titleProperty.sync="newsData.titles.newsGallery"
    />
    <FilmTrailer
      :filmTrailer.sync="newsData.newsVideo"
      :titleProperty.sync="newsData.titles.newsVideo"
    />
    <SeoBlock :seoBlock.sync="newsData.seoBlock" />
    <FooterButtons @saveFilm="saveNewsToDb" />
  </div>
</template>

<script>
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
    schedule: {
      type: Object,
      required: true,
    },
    scheduleData: {
      type: Array,
      required: true,
    },
  },
  components: {
    FilmName,
    FilmDescription,
    MainPicture,
    PictureGallery,
    FilmTrailer,
    SeoBlock,
    FooterButtons,
    DatePicker,
  },
  name: "AddNews",
  data() {
    return {
      scheduleItem: this.schedule,
      scheduleList: this.scheduleDate,
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
        return this.schedule.scheduleDate;
      },
      set: function (newDate) {
        this.scheduleItem.scheduleDate = newDate;
      },
    },
  },
  methods: {
    saveNewsToDb: async function () {
      //uploading picturesGallery to firebase storage
      if (this.newsData.newsGallery) {
        this.newsData.newsGallery.map(async (picture) => {
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
      if (!this.newsData.mainPicture.includes("noimage")) {
        let blob = await fetch(this.newsData.mainPicture).then((res) => {
          return res.blob();
        });

        const storageRef = firebase
          .storage()
          .ref(`images/${Date.now()}${blob.size}.jpg`);

        this.newsData.mainPicture = await storageRef
          .put(blob)
          .then(async function (snapshot) {
            return await snapshot.ref.getDownloadURL();
          });
      }

      this.newsesData.push(this.newsData);

      setTimeout(() => database.ref("newses/").set(this.newsesData), 5000);

      this.$router.push({ name: "Pagenews" });
    },
    loadDefaults: function () {
      return this.defaultFilm;
    },
  },
};
</script>

<style scoped></style>
