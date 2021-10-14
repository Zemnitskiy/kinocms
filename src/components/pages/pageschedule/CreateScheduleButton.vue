<template>
  <button class="btn btn-default mt-3" @click="addSchedule">
    {{ buttonTitle }}
  </button>
</template>

<script>
export default {
  data() {
    return {
      buttonTitle: "Создать сеанс",
    };
  },
  methods: {
    addSchedule: function () {
      this.$emit("addSchedule");
    },
  },
};
</script>
