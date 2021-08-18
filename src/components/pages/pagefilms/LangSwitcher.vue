<template>
  <div class="row">
    <div class="col-2 offset-10">
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary bg-olive">
          <input
            type="radio"
            name="options"
            id="option_a2"
            autocomplete="off"
            value="rus"
            v-model="picked"
          />
          Русский
        </label>
        <label class="btn btn-secondary bg-olive">
          <input
            type="radio"
            name="options"
            id="option_a3"
            autocomplete="off"
            value="ukr"
            v-model="picked"
          />
          Украинский
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LangSwitcher",
  data() {
    return {
      picked: "rus",
    };
  },
};
</script>
