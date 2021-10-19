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
                <th></th>
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
              </tr>
            </thead>
            <tbody>
              <TableRow
                v-for="userData in usersData"
                :key="userData.id"
                :userData="userData"
                :usersData="usersData"
              />
            </tbody>
          </table>
          <div class="row">
            <div class="col-12 d-flex justify-content-center">
              <button class="btn btn-default mt-3" @click="sendChoosen">
                Отправить выбранные
              </button>
            </div>
          </div>
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
import TableRow from "./TableRow";

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
    TableRow,
  },
  name: "UserTable",
  data() {
    return {
      userData: this.user,
      usersData: this.usersList,
      search: null,
      listSms: [],
    };
  },
  methods: {
    searchUser: function () {
      if (this.search !== "") {
        this.usersData = this.usersList.filter((obj) =>
          Object.values(obj).some((val) =>
            typeof val === "string" ? val.includes(this.search) : false
          )
        );
      } else {
        this.usersData = this.usersList;
      }
    },
    sendChoosen: function () {
      this.usersData = this.usersData.filter((user) => user.picked === true);
      this.listSms = this.usersData;
      console.log("Choosen persons = ", this.listSms);
      this.$router.push({
        name: "PageNewsletter",
        params: {
          smsList: this.listSms,
        },
      });
    },
  },
};
</script>
