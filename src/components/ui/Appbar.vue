<template>
  <v-container>
    <v-app-bar
        app
        color='grey lighten-2'
        dark
    >
      <v-app-bar-nav-icon
          @click="drawer = !drawer"
          color="grey darken-1"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <template v-if="isLogged">
        <v-btn
            v-for="{route, icon} in items"
            :key="icon"
            icon
            link
            :to="{name: route}"
        >
          <v-icon color="grey darken-1" size="26">{{ icon }}</v-icon>
        </v-btn>

        <v-btn @click="logoutSession" icon>
          <v-icon color="grey darken-1" size="25">mdi-logout</v-icon>
        </v-btn>
      </template>

    </v-app-bar>

    <v-navigation-drawer
        color='grey lighten-2'
        temporary
        absolute
        v-model="drawer">
      <v-list-item
          v-if="isLogged"
          link
          :to="{name: 'EditUser'}"
      >
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ isLogged ? user.usuario : ''}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <template v-if="isLogged">
          <v-list-item
              v-for="{route,icon,title} in items"
              :key="title"
              link
              :to="{name: route}"
          >
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>

      <v-row justify="center">
        <v-btn @click="logoutSession" v-if="isLogged" text class="text--white mt-10" >
          Salir
        </v-btn>
        <v-btn @click="drawer = !drawer"  v-else color="black" class="white--text mt-10" >
          Ingresar
        </v-btn>
      </v-row>
    </v-navigation-drawer>

  </v-container>

</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
  name: "Appbar",

  data() {
    return {
      drawer: false,
      items: [
        {
          route: 'Orders',
          icon: 'mdi-cart-outline',
          title: 'Carrito'
        },
        {
          route: 'Saved',
          icon: 'mdi-cards-heart-outline',
          title: 'Guardados(favoritos)'
        },
        {
          route: 'MainPage',
          icon: 'mdi-store',
          title: 'Tienda'
        },
      ]
    }
  },

  computed: {
    ...mapState('login', ['isLogged', 'user']),
  },

  methods: {
    ...mapMutations('login', ['logout']),

    logoutSession(){
      this.logout();
      this.$router.push({path: '/'})
      this.drawer = false;
    }
  },

}
</script>

<style lang="scss" scoped>

.cont-search{
  margin-top: 60px;
}

</style>