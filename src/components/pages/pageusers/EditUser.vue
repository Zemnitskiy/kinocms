<template>
  <div class="row pt-4 pl-3 pr-3 mr-0 ml-0">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header d-flex justify-content-center">
          <h3 class="card-title text-bold">Профиль пользователя</h3>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <div class="row">
            <div class="col-5">
              <div class="form-group row">
                <label for="nameProfile" class="col-sm-3 col-form-label"
                  >Имя</label
                >
                <div class="col-sm-9">
                  <input
                    type="text"
                    class="form-control"
                    id="nameProfile"
                    placeholder="Имя"
                    v-model="name"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="sournameProfile" class="col-sm-3 col-form-label"
                  >Фамилия</label
                >
                <div class="col-sm-9">
                  <input
                    type="text"
                    class="form-control"
                    id="sournameProfile"
                    placeholder="Фамилия"
                    v-model="sourname"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="nickNameProfile" class="col-sm-3 col-form-label"
                  >Псевдоним</label
                >
                <div class="col-sm-9">
                  <input
                    type="text"
                    class="form-control"
                    id="nickNameProfile"
                    placeholder="Псевдоним"
                    v-model="nickName"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="emailProfile" class="col-sm-3 col-form-label"
                  >Email</label
                >
                <div class="col-sm-9">
                  <input
                    type="email"
                    class="form-control"
                    id="emailProfile"
                    placeholder="Email"
                    v-model="email"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="addressProfile" class="col-sm-3 col-form-label"
                  >Адрес</label
                >
                <div class="col-sm-9">
                  <input
                    type="text"
                    class="form-control"
                    id="addressProfile"
                    placeholder="Адрес"
                    v-model="address"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="passwordProfile" class="col-sm-3 col-form-label"
                  >Пароль</label
                >
                <div class="col-sm-9">
                  <input
                    type="password"
                    class="form-control"
                    id="passwordProfile"
                    placeholder="Пароль"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="cardNumberProfile" class="col-sm-3 col-form-label"
                  >Номер карты</label
                >
                <div class="col-sm-9">
                  <input
                    type="text"
                    class="form-control"
                    id="cardNumberProfile"
                    placeholder="1111 2222 3333 4444"
                    v-model="cardNumber"
                  />
                </div>
              </div>
            </div>

            <div class="col-7">
              <div class="form-group d-flex align-items-center border-custom">
                <label class="form-check-label col-3 text-bold">Язык</label>
                <div class="form-check col-2">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="languageProfile"
                    value="Русский"
                    checked
                    v-model="language"
                  />
                  <label class="form-check-label">Русский</label>
                </div>
                <div class="form-check col-2">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="languageProfile"
                    value="Украинский"
                    v-model="language"
                  />
                  <label class="form-check-label">Украинский</label>
                </div>
              </div>
              <div class="form-group d-flex align-items-center border-custom">
                <label class="form-check-label col-3 text-bold">Пол</label>
                <div class="form-check col-2">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="genderProfile"
                    value="Мужской"
                    checked
                    v-model="gender"
                  />
                  <label class="form-check-label">Мужской</label>
                </div>
                <div class="form-check col-2">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="genderProfile"
                    value="Женский"
                    v-model="gender"
                  />
                  <label class="form-check-label">Женский</label>
                </div>
              </div>
              <div class="form-group row">
                <label for="phoneProfile" class="col-sm-3 col-form-label"
                  >Телефон</label
                >
                <div class="col-sm-9">
                  <input
                    type="tel"
                    class="form-control"
                    id="phoneProfile"
                    placeholder="+380123456789"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="phoneProfile" class="col-sm-3 col-form-label"
                  >Дата рождения</label
                >
                <div class="col-sm-9">
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
                </div>
              </div>

              <div class="form-group row">
                <label for="cityProfile" class="col-sm-3 col-form-label"
                  >Город</label
                >
                <div class="col-sm-9">
                  <select class="form-control" v-model="city">
                    <option>Киев</option>
                    <option>Харьков</option>
                    <option>Львов</option>
                    <option>Одесса</option>
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="confirmPasswordProfile"
                  class="col-sm-3 col-form-label"
                  >Повторить пароль</label
                >
                <div class="col-sm-9">
                  <input
                    type="password"
                    class="form-control"
                    id="confirmPasswordProfile"
                    placeholder="Пароль"
                    v-model="passwordConfirm"
                  />
                </div>
              </div>
            </div>
          </div>
          <FooterButtons @saveFilm="saveToDB" />
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
    </div>
  </div>
</template>

<script>
import FooterButtons from "../pagefilms/FooterButtons";
// Datepicker
import DatePicker from "v-calendar/lib/components/date-picker.umd";
// Firebase
import firebase from "firebase";
const database = firebase.database();

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    userList: {
      type: Array,
      required: true,
    },
  },
  name: "EditUser",
  components: {
    DatePicker,
    FooterButtons,
  },
  data() {
    return {
      userData: this.user,
      usersData: this.userList,

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
        return this.user.dateBorn;
      },
      set: function (newDate) {
        this.userData.dateBorn = newDate;
      },
    },
    name: {
      get: function () {
        return this.user.name;
      },
      set: function (newValue) {
        this.userData.name = newValue;
      },
    },
    sourname: {
      get: function () {
        return this.user.sourname;
      },
      set: function (newValue) {
        this.userData.sourname = newValue;
      },
    },
    nickName: {
      get: function () {
        return this.user.nickName;
      },
      set: function (newValue) {
        this.userData.nickName = newValue;
      },
    },
    email: {
      get: function () {
        return this.user.email;
      },
      set: function (newValue) {
        this.userData.email = newValue;
      },
    },
    address: {
      get: function () {
        return this.user.address;
      },
      set: function (newValue) {
        this.userData.address = newValue;
      },
    },
    password: {
      get: function () {
        return this.user.password;
      },
      set: function (newValue) {
        this.userData.password = newValue;
      },
    },
    confirmPassword: {
      get: function () {
        return this.user.confirmPassword;
      },
      set: function (newValue) {
        this.userData.confirmPassword = newValue;
      },
    },
    cardNumber: {
      get: function () {
        return this.user.cardNumber;
      },
      set: function (newValue) {
        this.userData.cardNumber = newValue;
      },
    },
    language: {
      get: function () {
        return this.user.language;
      },
      set: function (newValue) {
        this.userData.language = newValue;
      },
    },
    gender: {
      get: function () {
        return this.user.gender;
      },
      set: function (newValue) {
        this.userData.gender = newValue;
      },
    },
    city: {
      get: function () {
        return this.user.city;
      },
      set: function (newValue) {
        this.userData.city = newValue;
      },
    },
  },
  methods: {
    saveToDB: function () {
      database.ref("pageusers/").set(this.usersData);
      this.$router.push({ name: "PageUsers" });
    },
  },
};
</script>

<style scoped>
.border-custom {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  height: 38px;
}
</style>
