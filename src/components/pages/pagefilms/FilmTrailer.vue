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
        v-model="filmTrailer"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "FilmTrailer",
  data() {
    return {
      filmTrailer: "",
    };
  },
};
</script>

<style scoped></style>
