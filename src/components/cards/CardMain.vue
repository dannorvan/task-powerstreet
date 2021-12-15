<template>
  <v-card
      class="mx-auto my-4"
      max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
          color="grey"
          height="10"
          indeterminate
      ></v-progress-linear>
    </template>

    <v-img
        height="250"
        :aspect-ratio="16/9"
        :src="img"
    ></v-img>

    <v-card-title class="pb-1">{{nameProduct}}</v-card-title>

    <v-card-text>

      <div class="my-1 text-subtitle-1">
        ${{price.toFixed(2)}}
      </div>

      <div class="header-class">{{description}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-row>
      <v-col cols="6">
        <v-card-actions >
          <v-btn
              class="ma-2"
              color="black"
              outlined
              @click="$emit('add-to-car')"
          >
            Agregar
          </v-btn>

          <v-btn
              icon
              color="pink"
              @click="$emit('add-to-favorite')"
          >
            <v-icon>{{ favorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
      <v-col cols="6">
        <div class="cont-dialog">
          <DialogProduct
              :dialog.sync="dialog"
              :img="img"
              :name-product="nameProduct"
              :price="price"
              :description="description"
              :favorite="favorite"
          >
          </DialogProduct>
        </div>
      </v-col>
    </v-row>





  </v-card>
</template>

<script>

import DialogProduct from "@/components/dialogs/DialogProduct";
export default {
  name: "CardMain",
  components: {DialogProduct},
  props: {
    img: {
      type: String,
      default: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
    },
    nameProduct: {
      type: String,
      default: 'Nombre Producto'
    },
    price: {
      type: Number,
      default: 999
    },
    description: {
      type: String,
      default: 'Descripción'
    },
    favorite: {
      type: Boolean,
      default: false
    },
    dialog:{
      type: Boolean,
      default: false
    },

  },
}
</script>

<style lang="scss" scoped>

.header-class{
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cont-dialog{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>