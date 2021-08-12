<template>
  <div>
    <div class="card-header" style="border-bottom: none">
      <div class="card-tools">
        <!-- Remove Button -->
        <button
          type="button"
          class="btn btn-tool"
          @click="removenewsAndPromoImg"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <!-- /.card-tools -->
    </div>
    <!-- /.card-header -->
    <div class="card-body" style="padding: 0">
      <img
        :src="updatedImage"
        style="width: 100%; height: 100%"
        class="mb-2"
        alt=""
      />
      <form>
        <div class="form-group mb-2">
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              id="customFile"
              accept="image/*"
              @input="uploadImg"
            />
            <label class="custom-file-label" for="customFile"
              >Выберите файл</label
            >
          </div>
        </div>
        <div class="form-group row mb-2">
          <label
            for="inputEmail3"
            class="col-sm-4 col-form-label"
            style="font-size: 13px"
            >URL</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="inputEmail3"
              placeholder="URL"
              v-model="updatedInputUrl"
              @input="updateUrl"
            />
          </div>
        </div>
      </form>
    </div>
    <!-- /.card-body -->
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  props: {
    inputUrl: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  data() {
    return {
      updatedInputUrl: this.inputUrl,
      updatedImage: this.image,
    };
  },
  name: "NewsAndPromoImg",
  methods: {
    removenewsAndPromoImg: function () {
      const storageRef = firebase.storage();
      let desertRef = storageRef.refFromURL(this.updatedImage);
      desertRef.delete();

      this.$emit("remove");
    },
    updateUrl: function () {
      this.$emit("update:inputUrl", this.updatedInputUrl);
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
