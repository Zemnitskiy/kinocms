<template>
  <tr>
    <td>{{ user.id }}</td>
    <td>
      {{ user.dateRegister }}
    </td>
    <td>
      {{ user.dateBorn }}
    </td>
    <td>
      {{ user.email }}
    </td>
    <td>
      {{ user.phone }}
    </td>
    <td>
      {{ user.fullName }}
    </td>
    <td>
      {{ user.nickName }}
    </td>
    <td>
      {{ user.city }}
    </td>
    <td align="center">
      <a class="mr-3 text-dark"><i class="fas fa-pen"></i></a>
      <a class="mr-3 text-dark" @click="deleteUser"
        ><i class="fas fa-trash"></i
      ></a>
    </td>
  </tr>
</template>

<script>
export default {
  name: "TableRow",
  props: {
    userData: {
      type: Object,
      required: true,
    },
    usersData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      user: this.userData,
      userList: this.usersData,
      // Datepicker config
      modelConfig: {
        type: "string",
        mask: "DD.MM.YYYY",
      },
    };
  },
  computed: {
    dateRegister: {
      get: function () {
        return this.userData.dateRegister;
      },
      set: function (newDate) {
        this.user.dateRegister = newDate;
      },
    },
    dateBorn: {
      get: function () {
        return this.userData.dateBorn;
      },
      set: function (newDate) {
        this.user.dateBorn = newDate;
      },
    },
    email: {
      get: function () {
        return this.userData.email;
      },
      set: function (newValue) {
        this.user.email = newValue;
      },
    },
  },
  methods: {
    deleteUser: function () {
      this.$emit("deleteUser", this.userData);
    },
  },
};
</script>

<style scoped>
.td-width {
  width: 100px;
}
</style>
