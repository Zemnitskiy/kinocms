<template>
  <div class="row pt-4 pl-3 pr-3 mr-0 ml-0">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header d-flex justify-content-center">
          <div class="d-flex flex-row">
            <h3 class="card-title text-bold" style="line-height: 38px">
              Пользователи
            </h3>
            <input
              class="form-control ml-5"
              type="search"
              placeholder="Поиск"
              v-model="search"
              @input="searchUser"
            />
          </div>
        </div>
        <!-- /.card-header -->
        <div class="card-body d-flex flex-column">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th class="text-center">ID</th>
                <th class="text-center">
                  Дата <br />
                  регистрации
                </th>
                <th class="text-center">
                  День <br />
                  рождения
                </th>
                <th class="text-center">Email</th>
                <th class="text-center">Телефон</th>
                <th class="text-center">ФИО</th>
                <th class="text-center">Псевдоним</th>
                <th class="text-center">Город</th>
                <th class="text-center"></th>
              </tr>
            </thead>
            <tbody>
              <TableRow
                v-for="userData in usersData"
                :key="userData.id"
                :userData="userData"
                :usersData="usersData"
                @editUser="editUser"
                @deleteUser="deleteUser"
              />
            </tbody>
          </table>
          <CreateUserButton @addUser="addUser" />
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
import CreateUserButton from "./CreateUserButton";
import TableRow from "./TableRow";

import firebase from "firebase";

const database = firebase.database();

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    usersList: {
      type: Array,
      required: true,
    },
  },
  components: {
    CreateUserButton,
    TableRow,
  },
  name: "UserTable",
  data() {
    return {
      userData: this.user,
      usersData: this.usersList,
      search: null,
    };
  },
  // computed: {
  //   usersData: {
  //     get: function () {
  //       return this.usersList;
  //     },
  //   },
  // },
  methods: {
    editUser: function () {
      this.$router.push({
        name: "EditUser",
        param: {
          id: this.userData.id,
          user: this.userData,
          userList: this.usersData,
        },
      });
    },
    addUser: function () {
      let currentUser = {
        id: String(Date.now() * Math.floor(Math.random() + 1)),
        dateRegister: "20.09.2021",
        dateBorn: "20.09.2021",
        email: "user@user.com",
        phone: "1234567890",
        name: "John",
        sourname: "Smith",
        nickName: "Just Jonh",
        city: "Киев",
        address: "st. Elm",
        password: "123456",
        passwordConfirm: "123456",
        cardNumber: "1111 2222 3333 4444",
        language: "Украинский",
        gender: "Мужской",
      };
      return this.usersData.push(currentUser);
    },
    deleteUser: function (payload) {
      let data = this.usersData.filter((user) => user.id !== payload.id);
      database.ref("pageusers/").set(data);
    },
    searchUser: function () {
      if (this.search !== "") {
        this.usersData = this.usersList.filter((obj) =>
          Object.values(obj).some((val) => val.includes(this.search))
        );
      } else {
        this.usersData = this.usersList;
      }
    },
  },
};
</script>
