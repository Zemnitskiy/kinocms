<template>
  <div>
    <div class="card-header" style="border-bottom: none">
      <div class="card-tools">
        <!-- Remove Button -->
        <button type="button" class="btn btn-tool" @click="removeFilmCard">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <!-- /.card-tools -->
    </div>
    <!-- /.card-header -->
    <div class="card-body d-flex flex-column p-0" @click="editFilm()">
      <img
        :src="filmData.mainPicture"
        style="width: 100%; height: 100%"
        class="mb-2"
        alt=""
      />

      <span class="pb-2 text-center text-bold">{{ filmData.filmName }}</span>
    </div>
    <!-- /.card-body -->
  </div>
</template>

<script>
export default {
  props: {
    filmCard: {
      type: Object,
      required: true,
    },
    filmCards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filmData: this.filmCard,
      filmsData: this.filmCards,
    };
  },
  name: "FilmCard",
  methods: {
    removeFilmCard: function () {
      this.$emit("remove");
    },
    editFilm() {
      return this.$router.push({
        name: "EditFilm",
        params: {
          id: this.filmData.id,
          filmData: this.filmData,
          filmsData: this.filmsData,
        },
      });
    },
  },
};
</script>
