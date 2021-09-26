<template>
  <div class="card-body p-0">
    <div class="row" style="flex-direction: row-reverse">
      <div
        class="col-md-2 d-flex align-items-center"
        style="justify-content: center"
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
        <div class="font-weight-bold">{{ title }}</div>
        <div>Размер: 1000х190</div>
      </div>
    </div>
  </div>
  <!-- /.card-body -->
</template>

<script>
import Picture from "./Picture";

export default {
  props: {
    picturesGallery: {
      type: Array,
      require: true,
    },
    titleProperty: {
      type: String,
    },
  },
  components: {
    Picture,
  },
  name: "PictureGallery",
  data() {
    return {
      pictures: this.picturesGallery,
      title: this.titleProperty,
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
        this.$emit("update:picturesGallery", this.pictures);
      } else {
        alert(`Добавлено максимальное количество баннеров!`);
      }
    },
    deletePicture(picture) {
      this.pictures = this.pictures.filter(
        (banner) => banner.id !== picture.id
      );
      this.$emit("update:picturesGallery", this.pictures);
    },
  },
};
</script>
