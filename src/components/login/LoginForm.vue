<template>
  <v-form
      @submit.prevent="$emit('sign-in')"
      v-if="!showRegister"
  >

    <v-text-field
        v-model="user.usuario"
        label="Nombre de usuario"
        required
        color="cyan darken-4"
    ></v-text-field>

    <v-text-field
        v-model="user.contrasenia"
        label="Contraseña"
        type="password"
        required
        color="cyan darken-4"
    ></v-text-field>


    <v-checkbox
        disabled
        label="¿Recordarme?"
        required
    ></v-checkbox>

    <v-btn
        :disabled="isLoading"
        color="black"
        class="mr-4 mb-5 white--text"
        type="submit"
        block
    >
      Ingresar
    </v-btn>

  </v-form>
</template>

<script>
export default {
  name: "LoginForm",

  props: {
    showRegister: {
      type: Boolean,
      default: false
    },

    user: {
      type: Object,
      default: undefined
    },

    isLoading: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style scoped>

</style>