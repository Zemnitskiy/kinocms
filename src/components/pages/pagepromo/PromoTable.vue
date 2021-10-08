<template>
  <div class="row pt-4 pl-3 pr-3 mr-0 ml-0">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header d-flex justify-content-center">
          <h3 class="card-title text-bold">Список акций</h3>
        </div>
        <!-- /.card-header -->
        <div class="card-body d-flex flex-column">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Название</th>
                <th>Дата создания</th>
                <th>Статус</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <TableRow
                v-for="promoCard in promoCards"
                :key="promoCard.id"
                :promoCard="promoCard"
                :promoCards="promoCards"
              />
            </tbody>
          </table>
          <CreatePromoButton @addPromo="addPromo" />
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
import CreatePromoButton from "./CreatePromoButton";
import TableRow from "./TableRow";

export default {
  props: {
    promo: {
      type: Object,
      required: true,
    },
    promos: {
      type: Array,
      required: true,
    },
  },
  components: {
    CreatePromoButton,
    TableRow,
  },
  name: "PromoTable",
  data() {
    return {
      promoCard: this.promo,
      // promoCards: this.newses,
    };
  },
  computed: {
    // Проблема с обновлением свойства из props, сделал вычисляемым
    promoCards: function () {
      return this.promos;
    },
  },
  methods: {
    addPromo: function () {
      return this.$router.push({
        name: "AddPromo",
        params: {
          id: this.promoCard.id,
          promoCard: this.promoCard,
          promoCards: this.promoCards,
        },
      });
    },
  },
};
</script>
