<template>
  <tr>
    <td>{{ promoData.newsName }}</td>
    <td>{{ promoData.newsDate }}</td>
    <td>{{ promoData.newsStatus ? "ВКЛ" : "ВЫКЛ" }}</td>
    <td class="d-flex">
      <a class="mr-3 text-dark" @click="editPromo"
        ><i class="fas fa-pen"></i
      ></a>
      <a class="text-dark" @click="deletePromoCard"
        ><i class="fas fa-trash"></i
      ></a>
    </td>
  </tr>
</template>

<script>
import firebase from "firebase";

const database = firebase.database();

export default {
  name: "TableRow",
  props: {
    promoCard: {
      type: Object,
      required: true,
    },
    promoCards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      promoData: this.promoCard,
      // newsesData: this.newsCards,
    };
  },
  computed: {
    promosData: function () {
      return this.promoCards;
    },
  },
  methods: {
    editPromo: function () {
      return this.$router.push({
        name: "EditPromo",
        params: {
          id: this.promoData.id,
          promoData: this.promoData,
          promosData: this.promosData,
        },
      });
    },
    deletePromoCard: function () {
      let promos = this.promosData;
      promos = promos.filter((promo) => promo.id !== this.promoData.id);

      database.ref("newses/").set(promos);
    },
  },
};
</script>
