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
            <div class="cont">
              <h5>Precio ({{numArticles}} ITEMS)</h5>
              <h4>${{ subtotal.toFixed(2) }}</h4>
            </div>
            <hr>
            <div class="cont">
              <h5>Gasto de envío</h5>
              <h4>$200.00</h4>
            </div>
            <div class="cont">
              <h5>Total</h5>
              <h4><b>${{ (subtotal+200).toFixed(2)}}</b></h4>
            </div>
            <div class="cont mt-5">
              <v-btn
                  class="ma-1"
                  color="gray"
                  outlined
                  link
                  x-small
                  :to="{name: 'MainPage'}"
              >
                <h4>SEGUIR COMPRANDO</h4>
              </v-btn>
              <v-btn
                  x-small
                  class="ma-1 white--text"
                  color="black"
                  @click="finishingShopping"
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
    <snackbar @close-snack="snackbar = false" :snackbar="snackbar" :text-snack="textSnack"/>
  </div>

</template>

<script>
import CardResume from "@/components/cards/CardResume";
import {mapGetters, mapMutations, mapState} from "vuex";
import {loaderLoading} from "@/helpers";
import Snackbar from "@/components/ui/snackbar";


export default {
  name: "Orders",
  data() {
    return {
      snackbar: false,
      textSnack: ''
    }
  },

  components: {Snackbar, CardResume},

  computed: {
    ...mapState('products', ['productsInCar']),
    ...mapGetters('products', ['numArticles', 'subtotal']),
  },

  methods: {

     finishingShopping(){

      try {
        loaderLoading.show();
        this.snackbar = true;
        this.textSnack = 'Gracias por comprar con nosotros!'

        setTimeout(() => {
          this.$router.push({name: 'MainPage'});
        },2000)
      } catch (e) {
        console.error()
      } finally {
        loaderLoading.hide();
      }

    }
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

  .cont{
    display: flex;
    justify-content: space-between;
  }
}

</style>