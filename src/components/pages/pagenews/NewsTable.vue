<template>
  <div class="row pt-4 pl-3 pr-3 mr-0 ml-0">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header d-flex justify-content-center">
          <h3 class="card-title text-bold">Список новостей</h3>
        </div>
        <!-- /.card-header -->
        <div class="card-body d-flex flex-column">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Название</th>
                <th>Дата создания</th>
                <th>Статус</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <TableRow
                v-for="newsCard in newsCards"
                :key="newsCard.id"
                :newsCard="newsCard"
                :newsCards="newsCards"
              />
            </tbody>
          </table>
          <CreateNewsButton @addNews="addNews" />
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
import CreateNewsButton from "./CreateNewsButton";
import TableRow from "./TableRow";

export default {
  props: {
    news: {
      type: Object,
      required: true,
    },
    newses: {
      type: Array,
      required: true,
    },
  },
  components: {
    CreateNewsButton,
    TableRow,
  },
  name: "NewsTable",
  data() {
    return {
      newsCard: this.news,
      // newsCards: this.newses,
    };
  },
  computed: {
    // Проблема с обновлением свойства из props, сделал вычисляемым
    newsCards: function () {
      return this.newses;
    },
  },
  methods: {
    addNews: function () {
      return this.$router.push({
        name: "AddNews",
        params: {
          id: this.newsCard.id,
          newsCard: this.newsCard,
          newsCards: this.newsCards,
        },
      });
    },
  },
};
</script>
