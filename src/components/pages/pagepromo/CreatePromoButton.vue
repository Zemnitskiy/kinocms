<template>
  <button class="btn btn-default mt-3" @click="addPromo">
    {{ buttonTitle }}
  </button>
</template>

<script>
export default {
  data() {
    return {
      buttonTitle: "Создать акцию",
    };
  },
  methods: {
    addPromo: function () {
      this.$emit("addPromo");
    },
  },
};
</script>
