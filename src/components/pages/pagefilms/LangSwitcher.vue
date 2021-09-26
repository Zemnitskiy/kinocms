<template>
  <div class="row">
    <div class="col d-flex justify-content-end">
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label
          class="btn btn-secondary bg-olive"
          :class="{
            active: pickedLanguage === 'ukr',
            focus: pickedLanguage === 'ukr',
          }"
        >
          <input
            type="radio"
            name="options"
            id="option_a2"
            autocomplete="off"
            value="ukr"
            v-model="pickedLanguage"
            @change="updateLanguage"
          />
          Украинский
        </label>
        <label
          class="btn btn-secondary bg-olive"
          :class="{
            active: pickedLanguage === 'rus',
            focus: pickedLanguage === 'rus',
          }"
        >
          <input
            type="radio"
            name="options"
            id="option_a3"
            autocomplete="off"
            value="rus"
            v-model="pickedLanguage"
            @change="updateLanguage"
          />
          Русский
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    language: {
      type: String,
    },
  },
  name: "LangSwitcher",
  data() {
    return {
      pickedLanguage: this.language,
    };
  },
  methods: {
    updateLanguage: function () {
      this.$emit("update:language", this.pickedLanguage);
    },
  },
};
</script>
