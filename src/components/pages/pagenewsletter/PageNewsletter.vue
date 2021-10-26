<template>
  <div class="row pt-4 pl-3 pr-3 mr-0 ml-0">
    <Sms :smsNewsletter="smsNewsletter" :smsList="smsList" />

    <Email :emailNewsletter="emailNewsletter" :emailList="emailList" />
  </div>
</template>

<script>
import Sms from "./Sms";
import Email from "./Email";
import firebase from "firebase";

const database = firebase.database();

export default {
  components: {
    Sms,
    Email,
  },
  name: "PageNewsletter",
  data() {
    return {
      smsNewsletter: {
        pickedUsersSms: "Выборочно",
        textMessage: "",
        symbolCounter: 0,
        userList: [],
        smsCounter: 0,
        smsProgress: 0,
      },
      emailNewsletter: {
        newsletterTemplateName: "",
        pickedUsersEmail: "Выборочно",
        userList: [],
        emailCounter: 0,
        emailProgress: 0,
        templates: [],
        choosedTemplate: null,
      },
    };
  },
  methods: {},
  computed: {
    smsList: {
      get: function () {
        if (this.smsNewsletter.pickedUsersSms === "Выборочно") {
          return this.$route.params.smsList || [];
        } else {
          return this.smsNewsletter.userList;
        }
      },
    },
    emailList: {
      get: function () {
        if (this.emailNewsletter.pickedUsersEmail === "Выборочно") {
          return this.$route.params.smsList || [];
        } else {
          return this.emailNewsletter.userList;
        }
      },
    },
  },
  mounted() {
    database.ref("pageusers/").on("value", async (snapshot) => {
      if (snapshot.val() != null) {
        this.smsNewsletter.userList = await snapshot.val();
        this.emailNewsletter.userList = await snapshot.val();
      } else {
        this.smsNewsletter.userList = [];
        this.emailNewsletter.userList = [];
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
