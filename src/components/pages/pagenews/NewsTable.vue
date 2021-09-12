<template>
  <div class="row pt-4 pl-3 pr-3 mr-0 ml-0">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Список новостей</h3>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th style="width: 10px">Название</th>
                <th>Дата создания</th>
                <th>Статус</th>
                <th style="width: 40px"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>Update software</td>
                <td>
                  <div class="progress progress-xs">
                    <div
                      class="progress-bar progress-bar-danger"
                      style="width: 55%"
                    ></div>
                  </div>
                </td>
                <td><span class="badge bg-danger">55%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- /.card-body -->
        <div class="card-footer"></div>
        <!-- /.card-footer -->
      </div>
      <!-- /.card -->
    </div>
  </div>
</template>

<script>
// import AddNews from "./AddNews";
export default {
  components: {
    // AddNews,
  },
  name: "PageNews",
  data() {
    return {};
  },
  methods: {},
};
</script>
