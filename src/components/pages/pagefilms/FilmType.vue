<template>
  <div class="row d-flex align-items-center mt-4">
    <div class="col-2">
      <label for="filmname" class="mb-0">Тип фильма</label>
    </div>
    <div class="col-6">
      <div class="row">
        <div class="form-check mr-3 ml-2 d-flex align-items-center">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="type.filmType3d"
            @change="updateType"
          />
          <label class="form-check-label">3D</label>
        </div>
        <div class="form-check mr-3 d-flex align-items-center">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="type.filmType2d"
            @change="updateType"
          />
          <label class="form-check-label">2D</label>
        </div>
        <div class="form-check d-flex align-items-center">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="type.filmTypeImax"
            @change="updateType"
          />
          <label class="form-check-label">IMAX</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filmType: {
      type: Object,
    },
  },
  name: "FilmType",
  data() {
    return {
      type: this.filmType,
    };
  },
  methods: {
    updateType: function () {
      this.$emit("update:filmType", this.type);
    },
  },
};
</script>
