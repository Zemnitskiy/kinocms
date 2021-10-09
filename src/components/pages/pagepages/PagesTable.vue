<template>
  <div class="row pt-4 pl-3 pr-3 mr-0 ml-0">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header d-flex justify-content-center">
          <h3 class="card-title text-bold">Список страниц</h3>
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
                v-for="pageCard in pageCards"
                :key="pageCard.id"
                :pageCard="pageCard"
                :pageCards="pageCards"
              />
            </tbody>
          </table>
          <CreatePageButton @addPage="addPage" />
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
import CreatePageButton from "./CreatePageButton";
import TableRow from "./TableRow";

export default {
  props: {
    page: {
      type: Object,
      required: true,
    },
    pages: {
      type: Array,
      required: true,
    },
  },
  components: {
    CreatePageButton,
    TableRow,
  },
  name: "PagesTable",
  data() {
    return {
      pageCard: this.page,
    };
  },
  computed: {
    // Проблема с обновлением свойства из props, сделал вычисляемым
    pageCards: function () {
      return this.pages;
    },
  },
  methods: {
    addPage: function () {
      return this.$router.push({
        name: "AddPage",
        params: {
          id: this.page.id,
          pageCard: this.pageCard,
          pageCards: this.pageCards,
        },
      });
    },
  },
};
</script>
