<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header d-flex justify-content-center">
        <h3 class="card-title text-bold">E-mail</h3>
      </div>
      <!-- /.card-header -->
      <div class="card-body d-flex flex-column">
        <div class="row">
          <div class="col-12">
            <div
              class="
                form-group
                d-flex
                align-items-center
                border-custom
                height-custom
              "
            >
              <label class="form-check-label col-3 text-bold"
                >Отправить пользователям:</label
              >
              <div class="form-check col-3">
                <input
                  class="form-check-input"
                  type="radio"
                  name="userListSwitcherEmail"
                  value="Все пользователи"
                  v-model="email.pickedUsersEmail"
                />
                <label class="form-check-label">Все пользователи</label>
              </div>
              <div class="form-check col-3">
                <input
                  class="form-check-input"
                  type="radio"
                  name="userListSwitcherEmail"
                  value="Выборочно"
                  v-model="email.pickedUsersEmail"
                />
                <label class="form-check-label">Выборочно</label>
              </div>
              <button
                type="button"
                class="btn btn-default"
                @click="chooseUsers"
                :disabled="email.pickedUsersEmail === 'Все пользователи'"
              >
                Выбрать пользователей
              </button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <div class="input-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="exampleInputFile"
                    @input="uploadFile"
                    placeholder=""
                  />
                  <label class="custom-file-label" for="exampleInputFile"
                    >Загрузить HTML-письмо</label
                  >
                </div>
              </div>
            </div>
            <p>
              <span>Загружен файл: </span
              ><span class="text-bold">{{ email.newsletterTemplateName }}</span>
            </p>
            <p>
              <span>Шаблон используемый в текущей рассылке: </span><br /><span
                class="text-bold"
                >{{ email.choosedTemplate }}</span
              >
            </p>
            <div class="row">
              <div class="col-5">Кол-во писем: {{ email.emailCounter }}</div>
              <div class="col-7">
                Рассылка выполнена на: {{ email.emailProgress }}%
              </div>
            </div>
          </div>

          <div class="col-6">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title float-none text-center">
                  Список последних загруженных шаблонов
                </h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <div
                  class="form-check row d-flex mt-2 mb-2"
                  v-for="template in email.templates"
                  :key="template.id"
                >
                  <div class="col-1">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="radio1"
                      v-model="email.choosedTemplate"
                      :value="template.name"
                    />
                  </div>
                  <div class="col-10">
                    <label class="form-check-label">{{ template.name }}</label>
                  </div>
                  <div class="col-1">
                    <a class="text-dark" @click="deleteTemplate(template)"
                      ><i class="fas fa-trash"></i
                    ></a>
                  </div>
                </div>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
        <div class="row">
          <div class="col-12 d-flex justify-content-center">
            <button
              type="button"
              class="btn btn-default mt-3 mb-3"
              @click="sendEmail"
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
      <!-- /.card-body -->
      <div class="card-footer"></div>
      <!-- /.card-footer -->
    </div>
    <!-- /.card -->
  </div>
</template>

<script>
export default {
  props: {
    emailNewsletter: {
      type: Object,
      required: true,
    },
    emailList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      email: this.emailNewsletter,
      emailListToSend: this.emailList,
    };
  },
  methods: {
    chooseUsers: function () {
      return this.$router.push({
        name: "ChooseUsers",
        params: {
          users: this.email.userList,
        },
      });
    },
    uploadFile: function (event) {
      const file = event.target.files[0];
      this.email.newsletterTemplateName = file.name;

      let currentTemplate = {
        id: String(Date.now() * Math.floor(Math.random() + 1)),
        name: file.name,
      };

      this.email.templates.push(currentTemplate);
    },
    deleteTemplate: function (template) {
      this.email.templates = this.email.templates.filter(
        (templ) => templ.id !== template.id
      );
    },
    sendEmail: function () {
      this.email.emailProgress = 0;

      let progressStep = 100 / this.emailList.length;

      for (let i = 0; i < this.emailList.length; i++) {
        setTimeout(() => {
          this.email.emailCounter++;
          this.email.emailProgress += progressStep;
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
.custom-file-label::after {
  content: "Загрузить";
}
</style>
