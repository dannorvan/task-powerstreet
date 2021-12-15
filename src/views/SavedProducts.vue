<template>
  <div class="main-saved">
    <div class="title">
      <h3>FAVORITES</h3>
    </div>

    <v-container v-if="productsFavorites.length">
      <v-row>
        <v-col
            cols="12" sm="6" md="4" lg="4"
            v-for="product in productsFavorites"
        >
          <CardMain
              :key="product.codigo_producto"
              :name-product="product.nombre_producto"
              :price="product.precio"
              :description="product.descripcion"
              :favorite="true"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-alert
        v-else
        shaped
        prominent
        type="error"
        class="ma-10 text-center"
    >
      Aún no tienes productos favoritos, vuelve cuando agregues alguno.
    </v-alert>
  </div>

</template>

<script>
import {mapState} from "vuex";
import CardMain from "@/components/cards/CardMain";

export default {
  name: "SavedProducts",
  components: {CardMain},
  computed: {
    ...mapState('products', ['productsFavorites'])
  },

}
</script>

<style lang="scss" scoped>
.main-saved {
  .title {
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 5px;
    width: 90%;
    margin: 0 auto;

    h3, p {
      margin: 0;
      letter-spacing: 4px;
      font-weight: bold;
    }
  }
}
</style>