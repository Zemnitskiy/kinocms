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
        v-model="description"
        @input="updateDescription"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filmDescription: {
      type: String,
      require: true,
    },
  },
  name: "FilmDescription",
  data() {
    return {
      description: this.filmDescription,
    };
  },
  methods: {
    updateDescription: function () {
      this.$emit("update:filmDescription", this.description);
    },
  },
};
</script>

<style scoped></style>
