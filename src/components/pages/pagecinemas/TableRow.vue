<template>
  <tr>
    <td>{{ hallData.hallNumber }}</td>
    <td>{{ hallData.hallDate }}</td>
    <td class="d-flex">
      <a class="mr-3 text-dark" @click="editHall"><i class="fas fa-pen"></i></a>
      <a class="text-dark" @click="deleteHallCard"
        ><i class="fas fa-trash"></i
      ></a>
    </td>
  </tr>
</template>

<script>
// import firebase from "firebase";
// const database = firebase.database();

export default {
  name: "TableRow",
  props: {
    hallCard: {
      type: Object,
      required: true,
    },
    hallCards: {
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
  data() {
    return {
      hallData: this.hallCard,
      hallsData: this.hallCards,
      cinemaCards: this.cinemasData,
      cinemaCard: this.cinemaData,
    };
  },
  methods: {
    editHall: function () {
      return this.$router.push({
        name: "EditHall",
        params: {
          id: this.hallData.id,
          hallData: this.hallData,
          hallsData: this.hallsData,
          cinemaData: this.cinemaData,
          cinemasData: this.cinemasData,
        },
      });
    },
    deleteHallCard: function () {
      // let halls = this.hallsData;

      // halls = halls.filter((hall) => hall.id !== this.hallData.id);
      // console.log("halls = ", halls);
      // this.hallsData = halls;
      // console.log("this.hallsData = ", this.hallsData);
      // let path = `/cinemas/cinemacards/${this.cinemaCards.indexOf(
      //   this.cinemaCard
      // )}/hallCards/`;

      // database.ref(path).set(this.hallsData);
      this.$emit("deleteHallCard", this.hallData);
    },
  },
};
</script>
