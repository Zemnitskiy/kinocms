<template>
  <div class="row pt-4 pl-3 pr-3 mr-0 ml-0">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Список кинотеатров</h3>
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
                  name: 'AddCinema',
                  params: {
                    id: cinemaCard.id,
                    cinemaCard: cinemaCard,
                    cinemaCards: cinemaCards,
                  },
                }"
              >
                <button type="button" class="btn btn-block btn-default">
                  Добавить<br />
                  кинотеатр
                </button>
              </router-link>
            </div>
            <div class="col-md-10">
              <div class="row" v-if="cinemaCards.length">
                <div
                  class="card col-lg-2 col-md-2 col-sm-6 mr-2 ml-2"
                  v-for="cinemaCard in cinemaCards"
                  :key="cinemaCard.id"
                >
                  <CinemaCard
                    @remove="deleteCinemaCard(cinemaCard)"
                    :cinemaCard="cinemaCard"
                    :cinemaCards="cinemaCards"
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
import CinemaCard from "../pagecinemas/CinemaCard";
import firebase from "firebase";

const database = firebase.database();

export default {
  components: {
    CinemaCard,
  },
  name: "PageCinemas",

  data() {
    return {
      cinemaCards: [],
      cinemaCard: {
        id: String(Date.now() * Math.floor(Math.random() + 1)),
        language: "ukr",
        cinemaName: "Название кинотеатра",
        cinemaDescription: "",
        cinemaConditions: "",
        cinemaLogo: require("@/assets/img/noimage.png"),
        mainPicture: require("@/assets/img/noimage.png"),
        picturesGallery: [{}],
        seoBlock: {
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
        },
        hallCards: [],
        titles: {
          cinemaName: "Название кинотеатра",
          cinemaDescription: "Описание",
          cinemaConditions: "Условия",
          cinemaLogo: "Логотип",
          mainPicture: "Фото верхнего баннера",
          picturesGallery: "Галерея картинок",
          seoBlock: "SEO блок",
        },
      },
    };
  },
  methods: {
    deleteCinemaCard(cinemaCard) {
      this.cinemaCards = this.cinemaCards.filter(
        (banner) => banner.id !== cinemaCard.id
      );
      database.ref("cinemas/cinemacards").set(this.cinemaCards);
    },
  },
  mounted() {
    this.$nextTick(function () {
      // Код, который будет запущен только после
      // отображения всех представлений
      database.ref("cinemas/cinemacards").once("value", (snapshot) => {
        if (snapshot.val() != null) {
          this.cinemaCards = snapshot.val();
        } else {
          this.cinemaCards = [];
        }
      });
    });
  },
};
</script>
