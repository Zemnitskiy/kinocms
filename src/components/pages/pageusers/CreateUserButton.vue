<template>
  <button class="btn btn-default mt-3" @click="addUser">
    {{ buttonTitle }}
  </button>
</template>

<script>
export default {
  data() {
    return {
      buttonTitle: "Добавить пользователя",
    };
  },
  methods: {
    addUser: function () {
      this.$emit("addUser");
    },
  },
};
</script>
