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
            class="bg-white border px-2 py-1 rounded td-width"
            :value="inputValue"
            v-on="inputEvents"
          />
        </template>
      </DatePicker>
    </td>
    <td>
      <input class="form-control" type="time" v-model="time" />
    </td>
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
    <td>
      <div class="form-group">
        <input
          type="number"
          class="form-control td-width"
          size="15"
          v-model="price"
        />
      </div>
    </td>
    <td>
      <div class="form-group">
        <input type="number" class="form-control td-width" v-model="priceVip" />
      </div>
    </td>
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
    price: {
      get: function () {
        return this.schedule.price;
      },
      set: function (newValue) {
        this.scheduleItem.price = newValue;
      },
    },
    priceVip: {
      get: function () {
        return this.schedule.priceVip;
      },
      set: function (newValue) {
        this.scheduleItem.priceVip = newValue;
      },
    },
    time: {
      get: function () {
        return this.schedule.time;
      },
      set: function (newValue) {
        this.scheduleItem.time = newValue;
      },
    },
  },
  methods: {
    deleteScheduleRow: function () {
      this.$emit("deleteScheduleRow", this.scheduleItem);
      // this.scheduleList = this.scheduleList.filter(
      //   (sch) => sch.id !== this.scheduleItem.id
      // );
    },
  },
};
</script>

<style scoped>
.td-width {
  width: 100px;
}
</style>
