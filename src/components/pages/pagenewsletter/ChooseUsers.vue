<template>
  <UsersTable :user="user" :usersList="usersList" />
</template>

<script>
import UsersTable from "./UsersTable";

export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  components: {
    UsersTable,
  },
  name: "ChooseUsers",
  data() {
    return {
      usersList: this.users,
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
        picked: false,
      },
    };
  },
};
</script>
