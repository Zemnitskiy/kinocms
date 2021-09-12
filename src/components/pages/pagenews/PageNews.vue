<template>
  <NewsTable />
</template>

<script>
import NewsTable from "./NewsTable.vue";

export default {
  components: {
    NewsTable,
  },
  name: "PageNews",
  data() {
    return {
      newsList: [],
      news: {
        newsName: "",
        newsDate: "",
        newsStatus: true,
      },
    };
  },
  methods: {},
};
</script>
