<template>
  <div>
    <div class="card-header" style="border-bottom: none">
      <div class="card-tools">
        <!-- Remove Button -->
        <button type="button" class="btn btn-tool" @click="removePicture">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <!-- /.card-tools -->
    </div>
    <!-- /.card-header -->
    <div class="card-body" style="padding: 0">
      <img
        :src="pictureUrl"
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
              @input="uploadPicture"
            />
            <label class="custom-file-label text-center" for="customFile"
              >Добавить</label
            >
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
    image: {
      type: String,
    },
  },
  data() {
    return {
      pictureUrl: this.image,
    };
  },
  name: "Picture",
  methods: {
    removePicture: function () {
      if (
        !this.pictureUrl.includes("blob") &&
        !this.pictureUrl.includes("noimage")
      ) {
        const storageRef = firebase.storage();

        let desertRef = storageRef.refFromURL(this.pictureUrl);
        desertRef.delete();
      }

      this.$emit("remove", this.picture);
    },
    uploadPicture: async function (event) {
      const file = event.target.files[0];

      this.pictureUrl = URL.createObjectURL(file);

      this.$emit("update:image", this.pictureUrl);
    },
  },
};
</script>

<style scoped>
.custom-file-label::after {
  content: "";
  background-color: transparent;
  border-left: none;
}
</style>
