<template>
  <div class="row d-flex align-items-center mt-2">
    <div class="col-4">
      <label for="filmname" class="mb-0">{{ title }}</label>
    </div>
    <div class="col-6">
      <input
        type="text"
        class="form-control mb-2"
        id="filmname1"
        :placeholder="phonesData.phone1"
        v-model="phonesData.phone1"
        @input="updatePhones"
      />
      <input
        type="text"
        class="form-control"
        id="filmname2"
        :placeholder="phonesData.phone2"
        v-model="phonesData.phone2"
        @input="updatePhones"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    phones: {
      type: Object,
    },
    titleProperty: {
      type: String,
    },
  },
  name: "Phones",
  data() {
    return {
      phonesData: this.phones,
      title: this.titleProperty,
    };
  },
  methods: {
    updatePhones: function () {
      this.$emit("update:phones", this.phonesData);
    },
  },
};
</script>

<style scoped></style>
