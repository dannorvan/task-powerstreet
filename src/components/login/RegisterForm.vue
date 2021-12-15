<template>
  <v-form
      @submit.prevent="$emit('register-user', currentUser)"
  >

    <v-text-field
        v-model="currentUser.nombre"
        label="Nombre completo"
        required
        color="cyan darken-4"
    ></v-text-field>

    <v-text-field
        v-model="currentUser.usuario"
        label="Usuario"
        required
        color="cyan darken-4"
    ></v-text-field>

    <v-text-field
        v-model="currentUser.email"
        label="Email"
        required
        color="cyan darken-4"
        type="email"
    ></v-text-field>

    <small>Fecha de nacimiento:</small>
    <v-date-picker
        v-model="currentUser.fecha"
        class="mt-3 mb-5"
        min="1950-06-15"
        max="2003-03-20"
        color="grey darken-1"
    ></v-date-picker>

      <v-text-field
          v-model="currentUser.telefono"
          :counter="10"
          maxlength="10"
          label="Phone Number"
          required
      ></v-text-field>

    <v-text-field
        v-model="currentUser.contrasenia"
        label="Contraseña"
        type="password"
        required
        color="cyan darken-4"
    ></v-text-field>

    <v-text-field
        v-model="currentUser.contrasenia2"
        label="Confirmar Contraseña"
        type="password"
        required
        color="cyan darken-4"
    ></v-text-field>

    <v-btn
        :disabled="isLoading"
        color="black"
        class="mr-4 mb-5 white--text"
        type="submit"
        block
        @click="$emit('create-user', currentUser)"
    >
      Crear
    </v-btn>

  </v-form>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "registerForm",

  props: {
    showRegister: {
      type: Boolean,
      default: false
    },

    isLoading: {
      type: Boolean,
      default: false
    }
  },


  computed: {
    ...mapState('crudUsers', ['currentUser'])
  },


}
</script>

<style scoped>

</style>