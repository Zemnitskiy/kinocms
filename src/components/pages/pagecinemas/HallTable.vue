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
                :hallCard="promhallCardoCard"
                :hallCards="hallCards"
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
import CreateHallButton from "./CreateHallButton";
import TableRow from "./TableRow";

export default {
  props: {
    hallData: {
      type: Object,
      required: true,
    },
    hallsData: {
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
      hallCard: this.hallData,
      // promoCards: this.newses,
    };
  },
  computed: {
    // Проблема с обновлением свойства из props, сделал вычисляемым
    hallCards: function () {
      return this.hallsData;
    },
  },
  methods: {
    addHall: function () {
      return this.$router.push({
        name: "AddHall",
        params: {
          id: this.hallCard.id,
          hallCard: this.hallCard,
          hallCards: this.hallCards,
        },
      });
    },
  },
};
</script>
