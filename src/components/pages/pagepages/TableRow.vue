<template>
  <tr>
    <td>{{ pageData.pageName.placeholder }}</td>
    <td>{{ pageData.pageDate }}</td>
    <td>{{ pageData.pageStatus ? "ВКЛ" : "ВЫКЛ" }}</td>
    <td class="d-flex">
      <a class="mr-3 text-dark" @click="editPage"><i class="fas fa-pen"></i></a>
      <a class="text-dark" v-if="pageData.isRemovable" @click="deletePageCard"
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
    pageCard: {
      type: Object,
      required: true,
    },
    pageCards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      pageData: this.pageCard,
      pages: [],
    };
  },
  computed: {
    pagesData: {
      get: function () {
        return this.pageCards;
      },
      set: function () {
        this.pages;
      },
    },
  },
  methods: {
    editPage: function () {
      return this.$router.push({
        name: "EditPage",
        params: {
          id: this.pageData.id,
          pageData: this.pageData,
          pagesData: this.pagesData,
        },
      });
    },
    deletePageCard: function () {
      this.pages = this.pagesData;
      this.pages = this.pages.filter((page) => page.id !== this.pageData.id);

      database.ref("pages/").set(this.pages);
    },
  },
};
</script>
