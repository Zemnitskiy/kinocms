<template>
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
                :disabled="pickedUsersSms === 'Все пользователи'"
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
                  >{{ sms.symbolCounter }}
                </div>
              </div>
              <textarea
                class="form-control"
                rows="3"
                placeholder="Введите текст"
                v-model="sms.textMessage"
                @input="getSymbolCount"
              ></textarea>
            </div>
          </div>
          <div class="col-6">
            <div class="mt-4">
              <span class="mr-2">Кол-во SMS:</span>{{ sms.smsCounter }}
            </div>
            <div>
              <span class="mr-2">Рассылка выполнена на:</span
              >{{ sms.smsProgress }}%
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
</template>

<script>
export default {
  props: {
    smsNewsletter: {
      type: Object,
      required: true,
    },
    smsList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sms: this.smsNewsletter,
      smsListToSend: this.smsList,
    };
  },
  methods: {
    chooseUsers: function () {
      return this.$router.push({
        name: "ChooseUsers",
        params: {
          users: this.sms.userList,
        },
      });
    },
    getSymbolCount: function () {
      this.sms.symbolCounter = this.sms.textMessage.length;
    },
    sendSms: function () {
      this.sms.smsProgress = 0;

      let progressStep = 100 / this.smsList.length;

      if (this.sms.symbolCounter !== 0) {
        for (let i = 0; i < this.smsList.length; i++) {
          setTimeout(() => {
            this.sms.smsCounter++;
            this.sms.smsProgress += progressStep;
          }, 2000);
        }
      } else {
        alert("Type text for newsletter!");
      }
    },
  },
  computed: {
    pickedUsersSms: {
      get: function () {
        return this.smsNewsletter.pickedUsersSms;
      },
      set: function (newValue) {
        return (this.sms.pickedUsersSms = newValue);
      },
    },
  },
};
</script>
