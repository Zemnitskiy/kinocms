<template>
  <button class="btn btn-default mt-3" @click="addNews">
    {{ buttonTitle }}
  </button>
</template>

<script>
export default {
  data() {
    return {
      buttonTitle: "Создать новость",
    };
  },
  methods: {
    addNews: function () {
      this.$emit("addNews");
    },
  },
};
</script>
