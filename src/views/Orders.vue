<template>
  <div class="main-orders">
    <div class="title">
      <h3>SHOPPING BAG</h3>
    </div>

    <v-container>
      <v-row v-if="productsInCar.length">
        <v-col cols="12" md="8">
          <v-col cols="12"
                 v-for="product in productsInCar"
          >
            <CardResume
                :key="product.codigo_producto"
                :product="product"
            />
          </v-col>
        </v-col>

        <v-col cols="12" md="4" >
          <div class="cont-resumen pa-3" >
            <h2>RESUMEN</h2>
            <div>
              <h5>Precio ({{numArticles}} ITEMS)</h5>
              <h4>${{ subtotal.toFixed(2) }}</h4>
            </div>
            <hr>
            <div>
              <h5>Gasto de envío</h5>
              <h4>$200.00</h4>
            </div>
            <div>
              <h5>Total</h5>
              <h4><b>${{ (subtotal+200).toFixed(2)}}</b></h4>
            </div>
            <div>
              <v-btn
                  class="ma-1"
                  color="gray"
                  outlined
              >
                <h4>SEGUIR COMPRANDO</h4>
              </v-btn>
              <v-btn
                  class="ma-1 white--text"
                  color="black"
              >
                <h4>REALIZAR PEDIDO</h4>
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-container v-else>
        <v-alert

            shaped
            prominent
            type="error"
            class="ma-10 text-center"
        >
          Aún no tienes productos en tu carrito, agrega al menos uno para proceder con tu compra
        </v-alert>

      </v-container>
    </v-container>
  </div>

</template>

<script>
import CardResume from "@/components/cards/CardResume";
import {mapGetters, mapState} from "vuex";


export default {
  name: "Orders",
  components: {CardResume},

  computed: {
    ...mapState('products', ['productsInCar']),
    ...mapGetters('products', ['numArticles', 'subtotal']),
  },
}
</script>

<style lang="scss" scoped>
@import "../styles/styles";
.main-orders{
  .title {
    background-color: $dark-gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 5px;
    width: 90%;
    margin: 0 auto;

    h3 {
      margin: 0;
      letter-spacing: 4px;
      font-weight: bold;
    }
  }

  .cont-resumen{
    background-color: white;
  }
}

</style>