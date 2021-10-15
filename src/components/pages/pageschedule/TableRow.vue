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
      <select class="form-control" v-model="pickedFilm">
        <option v-for="film in filmsList" :key="film.id">
          {{ film }}
        </option>
      </select>
    </td>
    <td>
      <select class="form-control" v-model="pickedCinema">
        <option v-for="cinema in cinemasList" :key="cinema.id">
          {{ cinema }}
        </option>
      </select>
    </td>
    <td>
      <select class="form-control" v-model="pickedHall">
        <option v-for="(hall, index) in hallsList" :key="index">
          {{ hall }}
        </option>
      </select>
    </td>
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
    cinemas: {
      type: Array,
      required: true,
    },
    cards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      scheduleItem: this.schedule,
      scheduleList: this.scheduleData,
      filmsList: this.films,
      cinemasList: this.cinemas,
      cardsList: this.cards,
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
    pickedCinema: {
      get: function () {
        return this.schedule.cinema;
      },
      set: function (newValue) {
        this.scheduleItem.cinema = newValue;
      },
    },
    pickedHall: {
      get: function () {
        return this.schedule.hall;
      },
      set: function (newValue) {
        this.scheduleItem.hall = newValue;
      },
    },
    hallsList: function () {
      let list = [];
      this.cardsList.map((card) => {
        if (card.cinemaName === this.pickedCinema) {
          card.hallCards.map((hall) => list.push(hall.hallNumber));
        }
      });
      return list;
    },
    pickedFilm: {
      get: function () {
        return this.schedule.film;
      },
      set: function (newValue) {
        this.scheduleItem.film = newValue;
      },
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
