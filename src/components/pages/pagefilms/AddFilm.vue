<template>
  <div class="container">
    <LangSwitcher />
    <FilmName />
    <FilmDescription />
    <MainPicture />
    <PictureGallery />
  </div>
</template>

<script>
import LangSwitcher from "./LangSwitcher";
import FilmName from "./FilmName";
import FilmDescription from "./FilmDescription";
import MainPicture from "./MainPicture";
import PictureGallery from "./PictureGallery";

export default {
  components: {
    LangSwitcher,
    FilmName,
    FilmDescription,
    MainPicture,
    PictureGallery,
  },
  name: "AddFilm",
  data() {
    return {};
  },
};
</script>

<style scoped></style>
