<template>
  <button class="btn btn-default mt-3" @click="addPage">
    {{ buttonTitle }}
  </button>
</template>

<script>
export default {
  data() {
    return {
      buttonTitle: "Создать страницу",
    };
  },
  methods: {
    addPage: function () {
      this.$emit("addPage");
    },
  },
};
</script>
