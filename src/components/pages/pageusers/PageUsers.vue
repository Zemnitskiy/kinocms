<template>
  <UsersTable v-if="loaded" :user="user" :usersList="usersList" />
</template>

<script>
import UsersTable from "./UsersTable";
import firebase from "firebase";

const database = firebase.database();

export default {
  components: {
    UsersTable,
  },
  name: "PageUsers",
  data() {
    return {
      usersList: [],
      user: {
        id: String(Date.now() * Math.floor(Math.random() + 1)),
        dateRegister: "20.09.2021",
        dateBorn: "20.09.2021",
        email: "user@user.com",
        phone: "1234567890",
        name: "John",
        sourname: "Smith",
        nickName: "Just John",
        city: "Forbidden town",
        address: "st. Elm",
        password: "123456",
        passwordConfirm: "123456",
        cardNumber: "1111 2222 3333 4444",
        language: "Украинский",
        gender: "Мужской",
      },
      loaded: false,
    };
  },
  methods: {},
  mounted() {
    database.ref("pageusers/").on("value", async (snapshot) => {
      if (snapshot.val() != null) {
        this.usersList = await snapshot.val();
        this.loaded = true;
      } else {
        this.usersList = [];
        this.loaded = true;
      }
    });
  },
};
</script>
