<template>
  <div>
    <div class="card-header" style="border-bottom: none">
      <div class="card-tools">
        <!-- Remove Button -->
        <button type="button" class="btn btn-tool" @click="removeFilmCard">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <!-- /.card-tools -->
    </div>
    <!-- /.card-header -->
    <div class="card-body d-flex flex-column" style="padding: 0">
      <img
        :src="updatedImage"
        style="width: 100%; height: 100%"
        class="mb-2"
        alt=""
      />
      <span class="pb-2" style="text-align: center">{{ movieTitle }}</span>
    </div>
    <!-- /.card-body -->
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  props: {
    image: {
      type: String,
    },
  },
  data() {
    return {
      updatedImage: this.image,
      movieTitle: "Название фильма",
    };
  },
  name: "FilmCard",
  methods: {
    removeFilmCard: function () {
      const storageRef = firebase.storage();
      let desertRef = storageRef.refFromURL(this.updatedImage);
      desertRef.delete();

      this.$emit("remove");
    },
    uploadImg: async function (event) {
      const file = event.target.files[0];

      const storageRef = firebase
        .storage()
        .ref(`images/${Date.now()}${file.name}`);
      this.updatedImage = await storageRef
        .put(file)
        .then(async function (snapshot) {
          return await snapshot.ref.getDownloadURL();
        });

      this.$emit("update:image", this.updatedImage);
    },
  },
};
</script>
