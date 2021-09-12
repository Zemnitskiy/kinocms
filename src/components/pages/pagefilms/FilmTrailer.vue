<template>
  <div class="row d-flex align-items-center mt-4">
    <div class="col-2">
      <label for="filmtrailer" class="mb-0">Ссылка на трейлер</label>
    </div>
    <div class="col-6">
      <input
        type="text"
        class="form-control"
        id="filmtrailer"
        placeholder="Ссылка на видео в youtube"
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
  },
  name: "FilmTrailer",
  data() {
    return {
      trailer: this.filmTrailer,
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
