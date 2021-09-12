<template>
  <div class="row d-flex align-items-center mt-4">
    <div class="col-2">
      <label for="filmname" class="mb-0">SEO блок</label>
    </div>
    <div class="col-10">
      <div class="row d-flex align-items-center">
        <div class="col-1">
          <label for="filmname" class="mb-0">URL:</label>
        </div>
        <div class="col-6">
          <input
            type="text"
            class="form-control"
            id="filmurl"
            placeholder="URL"
            v-model="seo.seoUrl"
            @input="updateSeoBlock"
          />
        </div>
      </div>

      <div class="row d-flex align-items-center mt-2">
        <div class="col-1">
          <label for="filmname" class="mb-0">Title:</label>
        </div>
        <div class="col-6">
          <input
            type="text"
            class="form-control"
            id="filmtitle"
            placeholder="Title"
            v-model="seo.seoTitle"
            @input="updateSeoBlock"
          />
        </div>
      </div>

      <div class="row d-flex align-items-center mt-2">
        <div class="col-1">
          <label for="filmname" class="mb-0">Keywords:</label>
        </div>
        <div class="col-6">
          <input
            type="text"
            class="form-control"
            id="filmkeywords"
            placeholder="Keywords"
            v-model="seo.seoKeywords"
            @input="updateSeoBlock"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seoBlock: {
      type: Object,
    },
  },
  name: "SeoBlock",
  data() {
    return {
      seo: this.seoBlock,
    };
  },
  methods: {
    updateSeoBlock: function () {
      this.$emit("update:seoBlock", this.seo);
    },
  },
};
</script>
