<template>
  <div class="main dialog" @click="$emit('update:dialog', false)">
  <v-row justify="center">
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="900"
        width="auto"
        persistent
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="black"
            class="white--text"
            v-bind="attrs"
            v-on="on"
        >Ver detalles</v-btn>
      </template>
      <template v-slot:default="dialog">
        <v-card class="pa-5">
          <v-img
              :src="img"
              contain
              height="300px"
          ></v-img>
          <v-card-text class="pb-0">
            <div class="text-h3 pa-3  pb-0 text-center">{{ nameProduct }}</div>
          </v-card-text>
          <v-card-text>
            <h2 class="ma-2  pb-3 text-center">${{ price.toFixed(2) }}</h2>
            <p>{{ description }}</p>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
                text
                @click="dialog.value = false"
            >Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-row>
  </div>

</template>

<script>
export default {
  name: "DialogProduct",

  props: {
    dialog: {
      type: Boolean,
      default: false
    },
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

  },

}
</script>

<style lang="scss" scoped>
.cont-dialog{
  .v-img {
    margin: 0 auto!important;
  }
}

</style>