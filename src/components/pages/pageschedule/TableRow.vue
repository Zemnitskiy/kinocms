<template>
  <tr>
    <td align="center">
      <DatePicker
        v-slot="{ inputValue, inputEvents }"
        v-model="date"
        :model-config="modelConfig"
        is-required
      >
        <template>
          <input
            class="bg-white border px-2 py-1 rounded"
            :value="inputValue"
            v-on="inputEvents"
          />
        </template>
      </DatePicker>
    </td>
    <td></td>
    <td>
      <div class="form-group">
        <select class="form-control">
          <option v-for="film in filmsList" :key="film.id">
            {{ film }}
          </option>
        </select>
      </div>
    </td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td align="center">
      <a class="text-dark" @click="deleteScheduleRow"
        ><i class="fas fa-trash"></i
      ></a>
    </td>
  </tr>
</template>

<script>
// Datepicker
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import firebase from "firebase";

const database = firebase.database();

export default {
  components: {
    DatePicker,
  },
  name: "TableRow",
  props: {
    schedule: {
      type: Object,
      required: true,
    },
    scheduleData: {
      type: Array,
      required: true,
    },
    films: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      scheduleItem: this.schedule,
      scheduleList: this.scheduleData,
      filmsList: this.films,
      // Datepicker config
      modelConfig: {
        type: "string",
        mask: "DD.MM.YYYY",
      },
    };
  },
  computed: {
    date: {
      get: function () {
        return this.schedule.date;
      },
      set: function (newDate) {
        this.scheduleItem.date = newDate;
      },
    },
    getFilmsList: function () {
      let filmsList = [];
      this.scheduleItem.film.map((card) => {
        filmsList.push(card.filmName);
      });
      return filmsList;
    },
  },
  methods: {
    deleteScheduleRow: function () {
      this.scheduleList = this.scheduleList.filter(
        (sch) => sch.id !== this.scheduleItem.id
      );

      database.ref("pageschedule/").set(this.scheduleList);
    },
  },
};
</script>
