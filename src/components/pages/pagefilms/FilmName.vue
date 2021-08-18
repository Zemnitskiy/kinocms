<template>
  <div class="row d-flex align-items-center mt-2">
    <div class="col-2">
      <label for="filmname" class="mb-0">Название фильма</label>
    </div>
    <div class="col-6">
      <input
        type="text"
        class="form-control"
        id="filmname"
        placeholder="Название фильма"
        v-model="filmName"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "FilmName",
  data() {
    return {
      filmName: "",
    };
  },
};
</script>

<style scoped></style>
