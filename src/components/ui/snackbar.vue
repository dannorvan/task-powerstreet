<template>
  <v-snackbar
      v-model="snackbar"
  >
    {{textSnack}}
    <template v-slot:action="{ attrs }">
      <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="$emit('close-snack')"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "snackbar",

  props: {
    textSnack: {
      type: String,
      default: 0
    },

    snackbar: {
      type: Boolean,
      default: false
    },
  },


}
</script>

<style scoped>

</style>