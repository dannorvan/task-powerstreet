<template>
  <v-card
      class="mx-auto my-4"
      max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
      ></v-progress-linear>
    </template>

    <v-img
        height="250"
        :aspect-ratio="16/9"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>

      <div class="my-4 text-subtitle-1">
        $ • Italian, Cafe
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

      <v-card-actions >
        <v-btn
            class="ma-2"
            color="black"
            outlined
        >
          Agregar
        </v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CardMain"
}
</script>

<style scoped>

</style>