<template>
  <button class="btn btn-default mt-3" @click="addHall">
    {{ buttonTitle }}
  </button>
</template>

<script>
export default {
  data() {
    return {
      buttonTitle: "Создать зал",
    };
  },
  methods: {
    addHall: function () {
      this.$emit("addHall");
    },
  },
};
</script>
