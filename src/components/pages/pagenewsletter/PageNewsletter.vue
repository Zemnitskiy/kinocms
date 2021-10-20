<template>
  <div class="row pt-4 pl-3 pr-3 mr-0 ml-0">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header d-flex justify-content-center">
          <h3 class="card-title text-bold">SMS</h3>
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
                    name="userListSwitcherSms"
                    value="Все пользователи"
                    v-model="pickedUsersSms"
                  />
                  <label class="form-check-label">Все пользователи</label>
                </div>
                <div class="form-check col-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="userListSwitcherSms"
                    value="Выборочно"
                    v-model="pickedUsersSms"
                  />
                  <label class="form-check-label">Выборочно</label>
                </div>
                <button
                  type="button"
                  class="btn btn-default"
                  @click="chooseUsers"
                  :disabled="isDisabledSms"
                >
                  Выбрать пользователей
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <div class="row d-flex justify-content-between pr-2 pl-2">
                  <label>Текст SMS</label>
                  <div>
                    <span class="text-bold mr-2">Символов:</span
                    >{{ symbolCounter }}
                  </div>
                </div>
                <textarea
                  class="form-control"
                  rows="3"
                  placeholder="Введите текст"
                  v-model="textMessage"
                  @input="getSymbolCount"
                ></textarea>
              </div>
            </div>
            <div class="col-6">
              <div class="mt-4">
                <span class="mr-2">Кол-во SMS:</span>{{ smsCounter }}
              </div>
              <div>
                <span class="mr-2">Рассылка выполнена на:</span
                >{{ smsProgress }}%
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-default mt-3 mb-3"
                @click="sendSms"
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

    <!-- Email newsletter -->
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
                    v-model="pickedUsersEmail"
                  />
                  <label class="form-check-label">Все пользователи</label>
                </div>
                <div class="form-check col-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="userListSwitcherEmail"
                    value="Выборочно"
                    v-model="pickedUsersEmail"
                  />
                  <label class="form-check-label">Выборочно</label>
                </div>
                <button
                  type="button"
                  class="btn btn-default"
                  @click="chooseUsers"
                  :disabled="isDisabledEmail"
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
                    />
                    <label class="custom-file-label" for="exampleInputFile"
                      >Загрузить HTML-письмо</label
                    >
                  </div>
                </div>
              </div>
              <p><span>Загружен файл: </span>{{ newsletterTemplateName }}</p>
              <p><span>Шаблон используемый в текущей рассылке:</span>{{}}</p>
              <div class="row">
                <div class="col-5">Кол-во писем: {{ emailCounter }}</div>
                <div class="col-7">
                  Рассылка выполнена на: {{ emailProgress }}%
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
                  <div class="form-check row d-flex flex-direction-row">
                    <div class="col-1">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="radio1"
                        checked
                      />
                    </div>
                    <div class="col-10">
                      <label class="form-check-label">{{
                        newsletterTemplateName
                      }}</label>
                    </div>
                    <div class="col-1">
                      <a class="text-dark"><i class="fas fa-trash"></i></a>
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
                @click="sendSms"
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
  </div>
</template>

<script>
import firebase from "firebase";

const database = firebase.database();

export default {
  name: "PageNewsletter",
  data() {
    return {
      pickedUsersSms: "Выборочно",
      textMessage: "",
      symbolCounter: 0,
      userList: [],
      smsCounter: 0,
      smsProgress: 0,

      newsletterTemplateName: "",
      pickedUsersEmail: "Выборочно",
      emailCounter: 0,
      emailProgress: 0,
      template: {
        id: String(Date.now() * Math.floor(Math.random() + 1)),
        name: "",
      },
      templates: [],
    };
  },
  methods: {
    getSymbolCount: function () {
      this.symbolCounter = this.textMessage.length;
    },
    chooseUsers: function () {
      return this.$router.push({
        name: "ChooseUsers",
        params: {
          users: this.userList,
        },
      });
    },
    sendSms: function () {
      this.smsProgress = 0;

      let progressStep = 100 / this.smsList.length;

      if (this.symbolCounter !== 0) {
        for (let i = 0; i < this.smsList.length; i++) {
          setTimeout(() => {
            this.smsCounter++;
            this.smsProgress += progressStep;
          }, 2000);
        }
      } else {
        alert("Type text for newslertter!");
      }
    },
    uploadFile: function (event) {
      const file = event.target.files[0];
      this.newsletterTemplateName = file.name;
    },
  },
  computed: {
    smsList: {
      get: function () {
        if (this.pickedUsersSms === "Выборочно") {
          return this.$route.params.smsList;
        } else {
          return this.userList;
        }
      },
    },
    isDisabledSms: function () {
      return this.pickedUsersSms === "Все пользователи" ? true : false;
    },
    isDisabledEmail: function () {
      return this.pickedUsersEmail === "Все пользователи" ? true : false;
    },
  },
  mounted() {
    database.ref("pageusers/").on("value", async (snapshot) => {
      if (snapshot.val() != null) {
        this.userList = await snapshot.val();
      } else {
        this.userList = [];
      }
    });
  },
};
</script>

<style scoped>
.border-custom {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.height-custom {
  min-height: 100px;
}

.custom-file-label::after {
  content: "Загрузить";
}
</style>
