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
                    name="languageProfile"
                    value="Все пользователи"
                    v-model="pickedUsers"
                  />
                  <label class="form-check-label">Все пользователи</label>
                </div>
                <div class="form-check col-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="languageProfile"
                    value="Выборочно"
                    v-model="pickedUsers"
                  />
                  <label class="form-check-label">Выборочно</label>
                </div>
                <button
                  type="button"
                  class="btn btn-default"
                  @click="chooseUsers"
                  :disabled="isDisabled"
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

    <div class="col-md-12">
      <div class="card">
        <div class="card-header d-flex justify-content-center">
          <h3 class="card-title text-bold">E-mail</h3>
        </div>
        <!-- /.card-header -->
        <div class="card-body d-flex flex-column"></div>
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
      pickedUsers: "Выборочно",
      textMessage: "",
      symbolCounter: 0,
      userList: [],
      smsCounter: 0,
      smsProgress: 0,
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
      let progressStep = 100 / this.smsList.length;
      for (let i = 0; i < this.smsList.length; i++) {
        this.smsCounter++;
        this.smsProgress += progressStep;
      }
    },
  },
  computed: {
    smsList: {
      get: function () {
        if (this.pickedUsers === "Выборочно") {
          return this.$route.params.smsList;
        } else {
          return this.userList;
        }
      },
    },
    isDisabled: function () {
      return this.pickedUsers === "Все пользователи" ? true : false;
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
</style>
