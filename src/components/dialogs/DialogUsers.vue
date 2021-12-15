<template>
  <div class="main dialog" @click="$emit('update:dialog', false)">
    <v-row justify="center">
      <v-dialog
          transition="dialog-bottom-transition"
          max-width="900"
          width="50%"
          persistent
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              @click="edit && $emit('editar-usuario')"
          >
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card class="pa-5">
            <RegisterForm :edit="edit"  @create-user="createUser($event)"/>
            <v-card-actions class="justify-end">
              <v-btn
                  text
                  @click="dialog.value = false"
              >Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-row>


  </div>

</template>

<script>
import RegisterForm from "@/components/login/RegisterForm";
import moment from "moment";
import {mapActions, mapState} from "vuex";

export default {
  name: "DialogProduct",

  components: {RegisterForm},

  computed: {
    ...mapState('crudUsers', ['msg'])
  },

  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: 'mdi-plus-thick'
    },
    edit: {
      type: Boolean,
      default: false
    }
  },


  methods: {
    ...mapActions('crudUsers', ['createUserVx']),
    createUser(user) {
      const fecha = moment(user.fecha).format('DD/MM/YYYY');
      const newUser = {
        ...user,
        fecha
      }

      if(!this.fieldValid(user)) return;
      this.createUserVx(newUser);
    },

    fieldValid(user) {
      const validUser = Object.values(user).every(field => field !== '');
      if (!validUser) {
        this.snackbar = true;
        this.textSnack = 'Por favor completa todos los campos';
        return false;
      }
      return true;
    }

  },
}
</script>

<style lang="scss" scoped>
.cont-dialog {
  .v-img {
    margin: 0 auto !important;
  }
}

</style>