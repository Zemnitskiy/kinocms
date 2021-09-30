<template>
  <div class="row mt-2">
    <div class="col-md-2 d-flex align-items-center">
      <span style="font-weight: 700">{{ title }}</span>
    </div>
    <div class="col-md-9 d-flex align-items-center">
      <img
        :src="picture"
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

export default {
  props: {
    mainPicture: {
      type: String,
    },
    titleProperty: {
      typr: String,
    },
  },
  name: "MainPicture",
  data() {
    return {
      picture: this.mainPicture,
      title: this.titleProperty,
    };
  },
  methods: {
    uploadMainPicture: function (event) {
      const file = event.target.files[0];

      this.picture = URL.createObjectURL(file);

      this.$emit("update:mainPicture", this.picture);
    },
    deleteMainPicture: async function () {
      const storageRef = firebase.storage();
      let desertRef = storageRef.refFromURL(this.picture);
      await desertRef.delete();

      this.picture = require("@/assets/img/noimage.png");

      this.$emit("update:mainPicture", this.picture);
    },
  },
};
</script>
