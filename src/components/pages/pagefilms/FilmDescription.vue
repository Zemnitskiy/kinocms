<template>
  <div class="row d-flex align-items-center mt-2">
    <div class="col-2">
      <label class="mb-0">Описание фильма</label>
    </div>
    <div class="col-6">
      <textarea
        rows="4"
        class="form-control"
        id="filmdescription"
        placeholder="Описание фильма"
        v-model="filmDescription"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "FilmDescription",
  data() {
    return {
      filmDescription: "",
    };
  },
};
</script>

<style scoped></style>
