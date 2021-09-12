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
        v-model="name"
        @input="updateName"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filmName: {
      type: String,
    },
  },
  name: "FilmName",
  data() {
    return {
      name: this.filmName,
    };
  },
  methods: {
    updateName: function () {
      this.$emit("update:filmName", this.name);
    },
  },
};
</script>

<style scoped></style>
