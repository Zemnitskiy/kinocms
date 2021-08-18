<template>
  <div class="row mt-2">
    <div class="col-md-2 d-flex align-items-center">
      <span style="font-weight: 700">Главная картинка</span>
    </div>
    <div class="col-md-9 d-flex align-items-center">
      <img
        :src="mainPicture"
        style="width: 30%; height: 100%"
        class="mb-2 mr-4"
        alt=""
      />
      <input
        type="file"
        id="mainpicture"
        accept="image/*"
        @input="uploadMainPicture"
        style="display: none"
      />
      <label
        style="height: 50px"
        for="mainpicture"
        class="
          btn btn-small btn-success
          mr-4
          mb-0
          d-flex
          align-items-center
          justify-content-center
          font-weight-normal
        "
      >
        Добавить
      </label>
      <button
        style="height: 50px"
        type="button"
        class="btn btn-small btn-danger mr-4 mt-0"
        @click="deleteMainPicture"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
const database = firebase.database();

export default {
  name: "MainPicture",
  data() {
    return {
      mainPicture: require("@/assets/img/noimage.png"),
    };
  },
  methods: {
    uploadMainPicture: async function (event) {
      const file = event.target.files[0];

      this.mainPicture = URL.createObjectURL(file);

      const storageRef = firebase
        .storage()
        .ref(`images/${Date.now()}${file.name}`);
      this.mainPicture = await storageRef
        .put(file)
        .then(async function (snapshot) {
          return await snapshot.ref.getDownloadURL();
        });

      database.ref("addfilm/mainpicture").set(this.mainPicture);
    },
    deleteMainPicture: function () {
      const storageRef = firebase.storage();
      let desertRef = storageRef.refFromURL(this.mainPicture);
      desertRef.delete();

      this.mainPicture = require("@/assets/img/noimage.png");

      database.ref("addfilm/mainpicture").set(this.mainPicture);
    },
  },
};
</script>
