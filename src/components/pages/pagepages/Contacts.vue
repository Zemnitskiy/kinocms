<template>
  <div class="row pt-4 pl-3 pr-3 mr-0 ml-0">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Контакты</h3>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <div class="row">
            <div class="col-12">
              <div class="row" v-if="contactCards.length">
                <div
                  class="card col-lg-12 col-md-12 col-sm-12"
                  v-for="contactCard in contactCards"
                  :key="contactCard.id"
                >
                  <ContactCard
                    :contactCard="contactCard"
                    :contactCards="contactCards"
                  />
                </div>
                <!-- /.card -->
              </div>
            </div>
            <div
              class="col-12"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <button
                type="button"
                class="btn btn-block btn-default"
                @click="addContact"
              >
                Добавить кинотеатр
              </button>
            </div>
          </div>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
    </div>
  </div>
</template>

<script>
import ContactCard from "./ContactCard";

export default {
  components: {
    ContactCard,
  },
  props: {
    contacts: {
      type: Object,
      required: true,
    },
  },
  name: "Contacts",

  data() {
    return {
      contactCards: this.contacts.contactCards,
    };
  },
  methods: {
    addContact: function () {
      let currentContact = {
        id: String(Date.now() * Math.floor(Math.random() + 1)),
        contactStatus: true,
        cinemaName: "",
        cinemaDescription: "",
        cinemaGeoposition: "",
        mainPicture: {
          isRequired: true,
          image: require("@/assets/img/noimage.png"),
        },
        titles: {
          cinemaName: "Название кинотеатра",
          cinemaDescription: "Адрес",
          cinemaGeoposition: "Координаты для карты",
          mainPicture: "Лого",
        },
        isSwitched: true,
      };
      this.contactCards.push(currentContact);
    },
  },
};
</script>
