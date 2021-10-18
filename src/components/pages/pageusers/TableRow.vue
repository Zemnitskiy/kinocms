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
      {{ `${user.name} ${user.sourname}` }}
    </td>
    <td>
      {{ user.nickName }}
    </td>
    <td>
      {{ user.city }}
    </td>
    <td align="center">
      <a class="mr-3 text-dark" @click="editUser"><i class="fas fa-pen"></i></a>
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
  methods: {
    deleteUser: function () {
      this.$emit("deleteUser", this.userData);
    },
    editUser: function () {
      return this.$router.push({
        name: "EditUser",
        params: {
          id: this.user.id,
          user: this.user,
          userList: this.userList,
        },
      });
    },
  },
};
</script>

<style scoped>
.td-width {
  width: 100px;
}
</style>
