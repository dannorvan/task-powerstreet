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

      <v-card-actions >
        <v-btn
            class="ma-2"
            color="black"
            outlined
            @click="$emit('add-to-car')"
        >
          Agregar
        </v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: "CardMain",

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

</style>