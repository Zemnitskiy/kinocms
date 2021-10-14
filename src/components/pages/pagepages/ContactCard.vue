<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <CinemaName
          :filmName.sync="contactData.cinemaName"
          :titleProperty.sync="contactData.titles.cinemaName"
        />
      </div>
      <div
        v-if="contactData.isSwitched"
        class="col-6 d-flex justify-content-end align-items-center"
      >
        <div class="form-group mb-0">
          <div class="custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              :id="contactData.id"
              v-model="contactData.contactStatus"
            />
            <label class="custom-control-label" :for="contactData.id">{{
              contactData.contactStatus ? "ВКЛ" : "ВЫКЛ"
            }}</label>
          </div>
        </div>
      </div>
    </div>

    <FilmDescription
      :filmDescription.sync="contactData.cinemaDescription"
      :titleProperty.sync="contactData.titles.cinemaDescription"
    />
    <FilmTrailer
      :filmTrailer.sync="contactData.cinemaGeoposition"
      :titleProperty.sync="contactData.titles.cinemaGeoposition"
    />
    <MainPictureLogo
      :mainPicture.sync="contactData.mainPicture.image"
      :titleProperty.sync="contactData.titles.mainPicture"
      :id="`logo${contactData.id}`"
      :for="`logo${contactData.id}`"
    />
  </div>
</template>

<script>
import CinemaName from "./CinemaName";
import FilmDescription from "../pagefilms/FilmDescription";
import FilmTrailer from "../pagefilms/FilmTrailer";
import MainPictureLogo from "../pagefilms/MainPictureLogo";
// Firebase
// import firebase from "firebase";
// const database = firebase.database();

export default {
  props: {
    contactCard: {
      type: Object,
      required: true,
    },
    contactCards: {
      type: Array,
      required: true,
    },
  },
  components: {
    CinemaName,
    FilmDescription,
    FilmTrailer,
    MainPictureLogo,
  },
  name: "AddContact",
  data() {
    return {
      contactData: this.contactCard,
      contacstData: this.contactCards,
    };
  },
  // methods: {
  //   savePageToDb: async function () {
  //     //uploading mainPicture to firebase storage
  //     if (!this.pageData.mainPicture.image.includes("noimage")) {
  //       let blob = await fetch(this.pageData.mainPicture.image).then((res) => {
  //         return res.blob();
  //       });

  //       const storageRef = firebase
  //         .storage()
  //         .ref(`images/${Date.now()}${blob.size}.jpg`);

  //       this.pageData.mainPicture.image = await storageRef
  //         .put(blob)
  //         .then(async function (snapshot) {
  //           return await snapshot.ref.getDownloadURL();
  //         });
  //     }

  //     this.pagesData.push(this.pageData);

  //     setTimeout(() => {
  //       database.ref("pages/").set(this.pagesData);
  //       this.$router.push({ name: "Pagepages" });
  //     }, 5000);
  //   },
  // },
};
</script>

<style scoped></style>
