<template>
  <div class="row pt-4 pl-3 pr-3 mr-0 ml-0">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header d-flex justify-content-center">
          <h3 class="card-title text-bold">Список залов</h3>
        </div>
        <!-- /.card-header -->
        <div class="card-body d-flex flex-column">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Название</th>
                <th>Дата создания</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <TableRow
                v-for="hallCard in hallCards"
                :key="hallCard.id"
                :hallCard="hallCard"
                :hallCards="hallCards"
                :cinemaData="cinemaCard"
                :cinemasData="cinemaCards"
                @deleteHallCard="deleteHallCard"
              />
            </tbody>
          </table>
          <CreateHallButton @addHall="addHall" />
        </div>
        <!-- /.card-body -->
        <div class="card-footer"></div>
        <!-- /.card-footer -->
      </div>
      <!-- /.card -->
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
const database = firebase.database();

import CreateHallButton from "./CreateHallButton";
import TableRow from "./TableRow";

export default {
  props: {
    hallsData: {
      type: Array,
      required: true,
    },
    cinemaData: {
      type: Object,
      required: true,
    },
    cinemasData: {
      type: Array,
      required: true,
    },
  },
  components: {
    CreateHallButton,
    TableRow,
  },
  name: "HallTable",
  data() {
    return {
      hallCard: {
        id: String(Date.now() * Math.floor(Math.random() + 1)),
        language: "ukr",
        hallNumber: "",
        hallDescription: "",
        hallSchema: require("@/assets/img/noimage.png"),
        mainPicture: require("@/assets/img/noimage.png"),
        picturesGallery: [{}],
        seoBlock: {
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
        },
        hallDate: "12.12.12",
        titles: {
          hallNumber: "Номер зала",
          hallDescription: "Описание зала",
          hallSchema: "Схема зала",
          mainPicture: "Верхний баннер",
          picturesGallery: "Галерея картинок",
          seoBlock: "SEO блок",
        },
      },
      hallCards: this.hallsData,
      cinemaCard: this.cinemaData,
      cinemaCards: this.cinemasData,
    };
  },
  // computed: {
  //   hallCards: function () {
  //     return this.hallsData;
  //   },
  // },
  methods: {
    addHall: function () {
      return this.$router.push({
        name: "AddHall",
        params: {
          id: this.hallCard.id,
          hallCard: this.hallCard,
          hallCards: this.hallCards,
          cinemaData: this.cinemaCard,
          cinemasData: this.cinemaCards,
        },
      });
    },
    deleteHallCard: function (payload) {
      let halls = this.hallsData;

      halls = halls.filter((hall) => hall.id !== payload.id);
      console.log("halls = ", halls);
      this.hallCards = halls;
      this.cinemaCards[this.cinemaCards.indexOf(this.cinemaCard)].hallCards =
        halls;
      // let path = `/cinemas/cinemacards/${this.cinemasData.indexOf(
      //   this.cinemaData
      // )}/hallCards/`;

      database.ref("/cinemas/cinemacards/").set(this.cinemaCards);
    },
  },
};
</script>
