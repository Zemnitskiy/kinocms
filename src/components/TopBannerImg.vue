<template>
  <div>
    <div class="card-header" style="border-bottom: none">
      <div class="card-tools">
        <!-- Remove Button -->
        <button type="button" class="btn btn-tool" @click="deleteTopBannerImg">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <!-- /.card-tools -->
    </div>
    <!-- /.card-header -->
    <div class="card-body" style="padding: 0">
      <div
        style="border: 1px solid #ced4da; width: 100%; height: 150px"
        class="ml-auto mr-auto mb-3"
      ></div>
      <form>
        <div class="form-group mb-2">
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="customFile" />
            <label class="custom-file-label" for="customFile"
              >Выберите файл</label
            >
          </div>
        </div>
        <div class="form-group row mb-2">
          <label
            for="inputEmail3"
            class="col-sm-4 col-form-label"
            style="font-size: 13px"
            >URL</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="inputEmail3"
              placeholder="URL"
              v-model="topBannerImgUrl"
            />
          </div>
        </div>
        <div class="form-group row mb-2">
          <label
            for="inputPassword3"
            class="col-sm-4 col-form-label"
            style="font-size: 13px"
            >Текст</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="inputPassword3"
              placeholder="Текст"
              v-model="topBannerImgText"
            />
          </div>
        </div>
      </form>
    </div>
    <!-- /.card-body -->
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      topBannerImgUrl: "",
      topBannerImgText: "",
      id: Math.random().toString(),
    };
  },
  name: "TopBannerImg",
  methods: {
    ...mapActions(["deleteTopBannerImg"]),
  },
};
</script>
