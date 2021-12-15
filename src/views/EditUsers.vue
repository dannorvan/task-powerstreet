<template>
  <div class="main-crud">
    <div class="title">
      <h3>CRUD USUARIOS</h3>
    </div>

    <v-card
        class="mx-auto ma-3"
        width="90%"
        max-width="400px"
    >
      <v-toolbar
          color="teal darken-4"
          dark
      >

        <v-toolbar-title>Usuarios</v-toolbar-title>

        <v-spacer></v-spacer>

        <div class="cont-dialog">
          <DialogUsers :dialog.sync="dialog" />
        </div>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

      </v-toolbar>

      <v-list subheader>
        <v-subheader>Usuarios</v-subheader>

        <v-list-item
            v-for="(user, index) in users"
            :key="user.usuario"
        >
          <v-list-item-content>
            <v-list-item-title v-text="">{{index+1}}.-{{ user.usuario }}</v-list-item-title>
          </v-list-item-content>
          <v-btn
              @click="updateCurrentUser(user)"
              icon>
            <v-icon>mdi-grease-pencil</v-icon>
          </v-btn>
          <v-btn
              @click="deleteUser({usuario:user.nombre, id:user.usuario})"
              icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-card>


  </div>
</template>

<script>

import DialogUsers from "@/components/dialogs/DialogUsers";
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "EditUser",
  components: {DialogUsers},
  data() {
    return {
      currentUsers: [],
    }
  },

  computed: {
    ...mapState('crudUsers', ['users', 'dialog'])
  },

  async mounted() {
    await this.getUsers();
    this.currentUsers = this.users;
  },

  methods: {
    ...mapActions('crudUsers', ['getUsers', 'deleteUser']),
    ...mapMutations('crudUsers', ['editUser']),

    updateCurrentUser(user){
      this.editUser(user)
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../styles/styles";

.main-crud{
  .title {
    background-color: $dark-gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 5px;
    width: 90%;
    margin: 0 auto;

    h3 {
      margin: 0;
      letter-spacing: 4px;
      font-weight: bold;
    }
  }
}

</style>