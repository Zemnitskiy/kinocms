<template>
  <div class="form-check row d-flex">
    <div class="col-1">
      <input
        class="form-check-input"
        type="radio"
        name="radio1"
        v-model="markedTemplate"
        :value="currentTemplate.name"
      />
    </div>
    <div class="col-10">
      <label class="form-check-label">{{ currentTemplate.name }}</label>
    </div>
    <div class="col-1">
      <a class="text-dark" @click="deleteTemplate"
        ><i class="fas fa-trash"></i
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    templates: {
      type: Array,
      required: true,
    },
    template: {
      type: Object,
      required: true,
    },
    choosedTemplate: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newslettersTemplates: this.templates,
      markedTemplate: this.choosedTemplate,
      currentTemplate: this.template,
    };
  },
  methods: {
    deleteTemplate: function () {
      this.$emit("deleteTemplate", this.currentTemplate);
    },
  },
};
</script>
