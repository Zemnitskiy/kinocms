<template>
  <div class="row pb-5 mt-5 justify-content-center">
    <div class="col-5 d-flex flex-direction-row">
      <button class="btn btn-block btn-default mr-4" @click="saveFilm">
        Сохранить
      </button>
      <button class="btn btn-block btn-default mt-0" @clic="loadDeafaults">
        Вернуть базовую версию
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterButtons",
  data() {
    return {};
  },
  methods: {
    saveFilm: function () {
      this.$emit("saveFilm");
    },
    loadDeafaults: function () {
      this.$emit("loadDefaults");
    },
  },
};
</script>
