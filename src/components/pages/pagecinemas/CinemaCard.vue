<template>
  <div>
    <div class="card-header" style="border-bottom: none">
      <div class="card-tools">
        <!-- Remove Button -->
        <button type="button" class="btn btn-tool" @click="removeCinemaCard">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <!-- /.card-tools -->
    </div>
    <!-- /.card-header -->
    <div class="card-body d-flex flex-column p-0" @click="editCinema()">
      <img
        :src="cinemaData.mainPicture"
        style="width: 100%; height: 100%"
        class="mb-2"
        alt=""
      />

      <span class="pb-2 text-center text-bold">{{
        cinemaData.cinemaName
      }}</span>
    </div>
    <!-- /.card-body -->
  </div>
</template>

<script>
export default {
  props: {
    cinemaCard: {
      type: Object,
      required: true,
    },
    cinemaCards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      cinemaData: this.cinemaCard,
      cinemasData: this.cinemaCards,
    };
  },
  name: "CinemaCard",
  methods: {
    removeCinemaCard: function () {
      this.$emit("remove");
    },
    editCinema() {
      return this.$router.push({
        name: "EditCinema",
        params: {
          id: this.cinemaData.id,
          cinemaCard: this.cinemaData,
          cinemaCards: this.cinemasData,
        },
      });
    },
  },
};
</script>
