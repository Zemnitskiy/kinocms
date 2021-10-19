<template>
  <tr>
    <td>
      <div class="form-check p-0">
        <input type="checkbox" v-model="picked" />
      </div>
    </td>
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
      // picked: this.userData.picked,
    };
  },
  computed: {
    picked: {
      get: function () {
        return this.userData.picked;
      },
      set: function (newValue) {
        return (this.user.picked = newValue);
      },
    },
  },
};
</script>

<style scoped>
.td-width {
  width: 100px;
}
</style>
