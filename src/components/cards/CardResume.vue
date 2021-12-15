<template>
  <v-card
      class="mx-auto ma-3"
  >
    <v-row>
      <v-col cols="12" md="3">
        <v-img
            height="150"
            :aspect-ratio="1"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <v-card-text>
          <v-card-title >{{product.nombre_producto}}</v-card-title>
          <div class="my-1 text-subtitle-1">
            ${{product.precio.toFixed(2)}}
          </div>
        </v-card-text>

        <v-card-actions >
          <v-btn
              class="ma-1"
              color="gray"
              :disabled="product.cantidad <= 1"
              @click="editProductsCars({product, operation: 'resta'})"
          >
            <h2>-</h2>
          </v-btn>
          <v-btn
              class="ma-1"
              color="gray"
              outlined
          >
            <h2>{{ product.cantidad }}</h2>
          </v-btn>
          <v-btn
              class="ma-1"
              color="gray"
              @click="editProductsCars({product, operation: 'suma'})"
          >
            <h2>+</h2>
          </v-btn>
        </v-card-actions>
      </v-col>
      <v-col cols="12" md="3">
        <v-btn
            class="ma-1"
            color="gray"
            outlined
            @click="removeProductsCars(product.codigo_producto)"
        >
          <h2>QUITAR</h2>
        </v-btn>
      </v-col>
    </v-row>


  </v-card>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "CardResume",

  props: {
    product: {
      type: Object,
      default: undefined,
    }
  },

  methods: {
    ...mapMutations('products', ['editProductsCars', 'removeProductsCars']),
  },


}
</script>

<style lang="scss" scoped>


</style>