<template>
  <div class="container">
    <LangSwitcher />
    <FilmName />
    <FilmDescription />
    <MainPicture />
    <PictureGallery />
    <FilmTrailer />
    <FilmType />
    <SeoBlock />
    <FooterButtons />
  </div>
</template>

<script>
import LangSwitcher from "./LangSwitcher";
import FilmName from "./FilmName";
import FilmDescription from "./FilmDescription";
import MainPicture from "./MainPicture";
import PictureGallery from "./PictureGallery";
import FilmTrailer from "./FilmTrailer";
import FilmType from "./FilmType";
import SeoBlock from "./SeoBlock";
import FooterButtons from "./FooterButtons";

export default {
  components: {
    LangSwitcher,
    FilmName,
    FilmDescription,
    MainPicture,
    PictureGallery,
    FilmTrailer,
    FilmType,
    SeoBlock,
    FooterButtons,
  },
  name: "AddFilm",
};
</script>

<style scoped></style>
