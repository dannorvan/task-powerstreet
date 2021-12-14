<template>
  <v-form
      @submit.prevent="$emit('register-user', newUser)"
  >

    <v-text-field
        v-model="newUser.nombre"
        label="Nombre completo"
        required
        color="cyan darken-4"
    ></v-text-field>

    <v-text-field
        v-model="newUser.usuario"
        label="Usuario"
        required
        color="cyan darken-4"
    ></v-text-field>

    <v-text-field
        v-model="newUser.email"
        label="Email"
        required
        color="cyan darken-4"
        type="email"
    ></v-text-field>

    <small>Fecha de nacimiento:</small>
    <v-date-picker
        v-model="newUser.fecha"
        class="mt-3 mb-5"
        min="1950-06-15"
        max="2003-03-20"
        color="grey darken-1"
    ></v-date-picker>

      <v-text-field
          v-model="newUser.telefono"
          :counter="10"
          maxlength="10"
          label="Phone Number"
          required
      ></v-text-field>

    <v-text-field
        v-model="newUser.contrasenia"
        label="Contraseña"
        type="password"
        required
        color="cyan darken-4"
    ></v-text-field>

    <v-text-field
        v-model="newUser.contrasenia2"
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
    >
      Registrarse
    </v-btn>

  </v-form>
</template>

<script>
export default {
  name: "registerForm",

  data() {
    return {
      newUser: {
        nombre: "Pablo Rincón",
        usuario: "prueba",
        fecha: '2000-03-20',
        contrasenia: "pwst1234",
        contrasenia2: 'pwst1234',
        telefono: '1234567890',
        email: "PWST@powerstreet.com.mx"
      }
    }
  },

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

}
</script>

<style scoped>

</style>