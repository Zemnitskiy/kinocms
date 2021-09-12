<template>
  <div class="row pt-4 pl-3 pr-3 mr-0 ml-0">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Список текущих фильмов</h3>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <div class="row" style="flex-direction: row-reverse">
            <div
              class="col-md-2"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <router-link
                :to="{
                  name: 'AddFilm',
                  params: {
                    id: filmCard.id,
                    filmCard: filmCard,
                    filmCards: filmCards,
                  },
                }"
              >
                <button type="button" class="btn btn-block btn-default">
                  Добавить<br />
                  фильм
                </button>
              </router-link>
            </div>
            <div class="col-md-10">
              <div class="row" v-if="filmCards.length">
                <div
                  class="card col-lg-2 col-md-2 col-sm-6 mr-2 ml-2"
                  v-for="filmCard in filmCards"
                  :key="filmCard.id"
                >
                  <FilmCard
                    @remove="deleteFilmCard(filmCard)"
                    :filmCard="filmCard"
                    :filmCards="filmCards"
                  />
                </div>
                <!-- /.card -->
              </div>
            </div>
          </div>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
    </div>

    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Фильмы которые скоро покажут</h3>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <div class="row" style="flex-direction: row-reverse">
            <div
              class="col-md-2"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <router-link
                :to="{
                  name: 'AddFilmFuture',
                  params: {
                    id: filmCardFuture.id,
                    filmCardFuture: filmCardFuture,
                    filmCardsFuture: filmCardsFuture,
                  },
                }"
              >
                <button type="button" class="btn btn-block btn-default">
                  Добавить<br />
                  фильм
                </button>
              </router-link>
            </div>
            <div class="col-md-10">
              <div class="row" v-if="filmCardsFuture.length">
                <div
                  class="card col-lg-2 col-md-2 col-sm-6 mr-2 ml-2"
                  v-for="filmCardFuture in filmCardsFuture"
                  :key="filmCardFuture.id"
                >
                  <FilmCardFuture
                    @remove="deleteFilmCardFuture(filmCardFuture)"
                    :filmCardFuture="filmCardFuture"
                    :filmCardsFuture="filmCardsFuture"
                  />
                </div>
                <!-- /.card -->
              </div>
            </div>
          </div>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
    </div>
  </div>
</template>

<script>
import FilmCard from "../pagefilms/FilmCard";
import FilmCardFuture from "../pagefilms/FilmCardFuture";
import firebase from "firebase";

const database = firebase.database();

export default {
  components: {
    FilmCard,
    FilmCardFuture,
  },
  name: "PageFilms",

  data() {
    return {
      filmCards: [],
      filmCardsFuture: [],
      filmCard: {
        id: String(Date.now() * Math.floor(Math.random() + 1)),
        language: "ukr",
        filmName: "Название фильма",
        filmDescription: "",
        mainPicture: require("@/assets/img/noimage.png"),
        picturesGallery: [{}],
        filmTrailer: "",
        filmType: {
          filmType3d: false,
          filmType2d: false,
          filmTypeImax: false,
        },
        seoBlock: {
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
        },
      },
      filmCardFuture: {
        id: String(Date.now() * Math.floor(Math.random() + 1)),
        language: "ukr",
        filmName: "Название фильма",
        filmDescription: "",
        mainPicture: require("@/assets/img/noimage.png"),
        picturesGallery: [{}],
        filmTrailer: "",
        filmType: {
          filmType3d: false,
          filmType2d: false,
          filmTypeImax: false,
        },
        seoBlock: {
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
        },
      },
    };
  },
  methods: {
    addFilmCardFuture() {
      const currentFilmCard = {
        id: String(Date.now() * Math.random()),
        image: require("@/assets/img/noimage.png"),
      };

      this.filmCardsFuture.push(currentFilmCard);
    },

    deleteFilmCard(filmCard) {
      this.filmCards = this.filmCards.filter(
        (banner) => banner.id !== filmCard.id
      );
      database.ref("films/filmcards").set(this.filmCards);
    },

    deleteFilmCardFuture(filmCardFuture) {
      this.filmCardsFuture = this.filmCardsFuture.filter(
        (banner) => banner.id !== filmCardFuture.id
      );
    },
  },
  mounted() {
    database.ref("films/filmcards").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.filmCards = snapshot.val();
      } else {
        this.filmCards = [];
      }
    });
    database.ref("films/filmcardsfuture").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.filmCardsFuture = snapshot.val();
      } else {
        this.filmCardsFuture = [];
      }
    });
  },
};
</script>
