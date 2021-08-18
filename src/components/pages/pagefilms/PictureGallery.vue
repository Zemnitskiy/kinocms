<template>
  <div class="card-body p-0">
    <div class="row" style="flex-direction: row-reverse">
      <div
        class="col-md-2"
        style="display: flex; align-items: center; justify-content: center"
      >
        <button
          type="button"
          class="btn btn-block btn-default"
          @click="addPicture"
        >
          Добавить<br />
          в галерею
        </button>
      </div>
      <div class="col-md-8">
        <div class="row" v-if="pictures.length">
          <div
            class="card col-lg-2 col-md-2 col-sm-6 mr-2 ml-2"
            v-for="picture in pictures"
            :key="picture.id"
          >
            <Picture
              @remove="deletePicture(picture)"
              :image.sync="picture.image"
            />
          </div>
          <!-- /.card -->
        </div>
      </div>
      <div class="col-md-2 mt-auto mb-auto">
        <div class="font-weight-bold">Галерея картинок</div>
        <div>Размер: 1000х190</div>
      </div>
    </div>
  </div>
  <!-- /.card-body -->
</template>

<script>
import Picture from "./Picture";

import firebase from "firebase";
const database = firebase.database();

export default {
  components: {
    Picture,
  },
  name: "PictureGallery",
  data() {
    return {
      pictures: [],
    };
  },
  methods: {
    addPicture: function () {
      const currentPicture = {
        id: String(Date.now() * Math.random()),
        image: require("@/assets/img/noimage.png"),
      };
      if (this.pictures.length < 5) {
        this.pictures.push(currentPicture);
      } else {
        alert(`Добавлено максимальное количество баннеров!`);
      }
    },
  },
  deletePicture(picture) {
    this.pictures = this.pictures.filter((banner) => banner.id !== picture.id);
  },
  mounted() {
    database.ref("banners/pictures").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.pictures = snapshot.val();
      } else {
        this.pictures = [];
      }
    });
  },
  //  saveTopBanners: function () {
  //   //uploading images to firebase storage
  //   this.pictures.map(async (topBannerImg) => {
  //     if (
  //       !topBannerImg.image.includes("noimage") &&
  //       !topBannerImg.image.includes("firebasestorage")
  //     ) {
  //       let blob = await fetch(topBannerImg.image).then((res) => {
  //         return res.blob();
  //       });

  //       const storageRef = firebase
  //         .storage()
  //         .ref(`images/${Date.now()}${blob.size}.jpg`);

  //       topBannerImg.image = await storageRef
  //         .put(blob)
  //         .then(async function (snapshot) {
  //           return await snapshot.ref.getDownloadURL();
  //         });
  //     }
  //   });

  //   setTimeout(
  //     () => database.ref("banners/pictures").set(this.pictures),
  //     5000
  //   );

  //   database.ref("banners/topbannerspeed").set(this.topBannerSpeed);
  // },
};
</script>
