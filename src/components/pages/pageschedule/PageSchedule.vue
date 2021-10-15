<template>
  <ScheduleTable
    v-if="loaded"
    :scheduleItem="scheduleItem"
    :scheduleList="scheduleList"
    :filmsList="filmsList"
    :cinemasList="cinemasList"
    :cinemaCards="cinemaCards"
  />
</template>

<script>
import ScheduleTable from "./ScheduleTable";
import firebase from "firebase";

const database = firebase.database();

export default {
  components: {
    ScheduleTable,
  },
  name: "PageSchedule",
  data() {
    return {
      scheduleList: [],
      scheduleItem: {
        id: String(Date.now() * Math.floor(Math.random() + 1)),
        date: "20.09.2021",
        time: "20:00",
        film: "",
        cinema: "",
        hall: "",
        price: "",
        priceVip: "",
      },
      filmsList: [],
      cinemasList: [],
      cinemaCards: [],
      loaded: false,
    };
  },
  methods: {},
  mounted() {
    database.ref("pageschedule/").on("value", async (snapshot) => {
      if (snapshot.val() != null) {
        this.scheduleList = await snapshot.val();
        this.loaded = true;
      } else {
        this.scheduleList = [];
        this.loaded = true;
      }
    });

    // get films title
    database.ref("films/filmcards/").on("value", async (snapshot) => {
      let list = await snapshot.val();
      list.map((item) => {
        this.filmsList.push(item.filmName);
      });
    });

    // get films title
    database.ref("films/filmcardsfuture/").on("value", async (snapshot) => {
      let list = await snapshot.val();
      list.map((item) => {
        this.filmsList.push(item.filmName);
      });
    });

    // get films title
    database.ref("cinemas/cinemacards/").on("value", async (snapshot) => {
      this.cinemaCards = await snapshot.val();
      this.cinemaCards.map((item) => {
        this.cinemasList.push(item.cinemaName);
      });
    });
  },
};
</script>
