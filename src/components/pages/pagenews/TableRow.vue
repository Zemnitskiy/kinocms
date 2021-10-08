<template>
  <tr>
    <td>{{ newsData.newsName }}</td>
    <td>{{ newsData.newsDate }}</td>
    <td>{{ newsData.newsStatus ? "ВКЛ" : "ВЫКЛ" }}</td>
    <td class="d-flex">
      <a class="mr-3 text-dark" @click="editNews"><i class="fas fa-pen"></i></a>
      <a class="text-dark" @click="deleteNewsCard"
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
    newsCard: {
      type: Object,
      required: true,
    },
    newsCards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newsData: this.newsCard,
      newsesData: this.newsCards,
    };
  },
  methods: {
    editNews: function () {
      return this.$router.push({
        name: "EditNews",
        params: {
          id: this.newsData.id,
          newsData: this.newsData,
          newsesData: this.newsesData,
        },
      });
    },
    deleteNewsCard: function () {
      let newses = this.newsesData;
      newses = newses.filter((news) => news.id !== this.newsData.id);

      database.ref("newses/").set(newses);
    },
  },
};
</script>
