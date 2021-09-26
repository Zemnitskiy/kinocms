<template>
  <div class="row d-flex align-items-center mt-4">
    <div class="col-2">
      <label for="filmtrailer" class="mb-0">{{ title }}</label>
    </div>
    <div class="col-6">
      <input
        type="text"
        class="form-control"
        id="filmtrailer"
        :placeholder="title"
        v-model="trailer"
        @input="updateTrailer"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filmTrailer: {
      type: String,
    },
    titleProperty: {
      type: String,
    },
  },
  name: "FilmTrailer",
  data() {
    return {
      trailer: this.filmTrailer,
      title: this.titleProperty,
    };
  },
  methods: {
    updateTrailer: function () {
      this.$emit("update:filmTrailer", this.trailer);
    },
  },
};
</script>

<style scoped></style>
