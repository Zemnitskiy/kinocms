<template>
  <div class="row pt-4 pl-3 pr-3 mr-0 ml-0">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header d-flex justify-content-center">
          <h3 class="card-title text-bold">Расписание сеансов</h3>
        </div>
        <!-- /.card-header -->
        <div class="card-body d-flex flex-column">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th class="text-center">Дата сеанса</th>
                <th class="text-center">Время сеанса</th>
                <th class="text-center">Фильм</th>
                <th class="text-center">Кинотеатр</th>
                <th class="text-center">Зал</th>
                <th class="text-center">Цена</th>
                <th class="text-center">Цена VIP</th>
                <th class="text-center">Удалить</th>
              </tr>
            </thead>
            <tbody>
              <TableRow
                v-for="schedule in scheduleData"
                :key="schedule.id"
                :schedule="schedule"
                :scheduleData="scheduleData"
                :films="films"
              />
            </tbody>
          </table>
          <CreateScheduleButton @addSchedule="addSchedule" />
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
import CreateScheduleButton from "./CreateScheduleButton";
import TableRow from "./TableRow";

export default {
  props: {
    scheduleItem: {
      type: Object,
      required: true,
    },
    scheduleList: {
      type: Array,
      required: true,
    },
    filmsList: {
      type: Array,
      required: true,
    },
  },
  components: {
    CreateScheduleButton,
    TableRow,
  },
  name: "ScheduleTable",
  data() {
    return {
      schedule: this.scheduleItem,
      films: this.filmsList,
    };
  },
  computed: {
    // Проблема с обновлением свойства из props, сделал вычисляемым
    scheduleData: function () {
      return this.scheduleList;
    },
  },
  methods: {
    addSchedule: function () {
      let currentSchedule = {
        id: String(Date.now() * Math.floor(Math.random() + 1)),
        date: "20.09.2021",
        time: "20:00",
        film: this.schedule.film,
        cinema: "",
        hall: "",
        price: "",
        priceVip: "",
      };
      return this.scheduleData.push(currentSchedule);
    },
  },
};
</script>
