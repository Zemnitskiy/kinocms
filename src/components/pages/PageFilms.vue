<template>
  <div class="row pt-4 pl-3 pr-3 mr-0 ml-0">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Список текущих фильмов</h3>
          <div class="card-tools">
            <!-- Buttons, labels, and many other things can be placed here! -->
            <div class="form-group mb-0">
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customSwitch1"
                />
                <label class="custom-control-label" for="customSwitch1"></label>
              </div>
            </div>
          </div>
          <!-- /.card-tools -->
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
              <button
                type="button"
                class="btn btn-block btn-default"
                v-on:click="addFilmCard"
              >
                Добавить<br />
                фильм
              </button>
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
                    :image.sync="filmCard.image"
                  />
                </div>
                <!-- /.card -->
              </div>
            </div>
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          <div class="row">
            <div
              class="col-md-6"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            ></div>
            <div
              class="col-md-12"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <button type="button" class="btn btn-default" @click="saveFilms">
                Сохранить
              </button>
            </div>
          </div>
        </div>
        <!-- /.card-footer -->
      </div>
      <!-- /.card -->
    </div>

    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Фильмы которые скоро покажут</h3>
          <div class="card-tools">
            <!-- Buttons, labels, and many other things can be placed here! -->
            <div class="form-group mb-0">
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customSwitch1"
                />
                <label class="custom-control-label" for="customSwitch1"></label>
              </div>
            </div>
          </div>
          <!-- /.card-tools -->
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
              <button
                type="button"
                class="btn btn-block btn-default"
                v-on:click="addFilmCardFuture"
              >
                Добавить<br />
                фильм
              </button>
            </div>
            <div class="col-md-10">
              <div class="row" v-if="filmCardsFuture.length">
                <div
                  class="card col-lg-2 col-md-2 col-sm-6 mr-2 ml-2"
                  v-for="filmCardFuture in filmCardsFuture"
                  :key="filmCardFuture.id"
                >
                  <FilmCardFuture
                    @remove="deleteFilmCard(filmCardFuture)"
                    :image.sync="filmCardFuture.image"
                  />
                </div>
                <!-- /.card -->
              </div>
            </div>
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          <div class="row">
            <div
              class="col-md-6"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            ></div>
            <div
              class="col-md-12"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <button type="button" class="btn btn-default" @click="saveFilms">
                Сохранить
              </button>
            </div>
          </div>
        </div>
        <!-- /.card-footer -->
      </div>
      <!-- /.card -->
    </div>
  </div>
</template>

<script>
import FilmCard from "../FilmCard";
import FilmCardFuture from "../FilmCardFuture";
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
    };
  },
  methods: {
    addFilmCard() {
      const currentFilmCard = {
        id: String(Date.now() * Math.random()),
        image: require("@/assets/img/noimage.png"),
      };

      this.filmCards.push(currentFilmCard);
    },
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
    },

    deleteFilmCardFuture(filmCardFuture) {
      this.filmCardsFuture = this.filmCardsFuture.filter(
        (banner) => banner.id !== filmCardFuture.id
      );
    },
    saveFilms: function () {
      database.ref("films/filmcards").set(this.filmCards);
    },
  },
  mounted() {
    database.ref("banners/filmcards").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.filmCards = snapshot.val();
      } else {
        this.filmCards = [];
      }
    });
  },
};
</script>
