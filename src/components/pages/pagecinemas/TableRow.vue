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
import firebase from "firebase";

const database = firebase.database();

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
  },
  data() {
    return {
      hallData: this.hallCard,
      // newsesData: this.newsCards,
    };
  },
  computed: {
    hallsData: function () {
      return this.hallCards;
    },
  },
  methods: {
    editHall: function () {
      return this.$router.push({
        name: "EditHall",
        params: {
          id: this.hallData.id,
          hallData: this.hallData,
          hallsData: this.hallsData,
        },
      });
    },
    deleteHallCard: function () {
      let halls = this.hallsData;
      halls = halls.filter((hall) => hall.id !== this.hallData.id);

      database.ref("cinemas/halls/").set(halls);
    },
  },
};
</script>
