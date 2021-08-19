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
            id="filmname"
            placeholder="URL"
            v-model="url"
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
            id="filmname"
            placeholder="Title"
            v-model="title"
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
            id="filmname"
            placeholder="Keywords"
            v-model="keywords"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SeoBlock",
  data() {
    return {
      url: "",
      title: "",
      keywords: "",
    };
  },
};
</script>
