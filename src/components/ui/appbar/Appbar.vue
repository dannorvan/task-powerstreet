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
            v-for="{route, icon} in itemsData"
            :key="icon"
            icon
            link
            :to="{name: route}"
        >
          <v-icon color="grey darken-1" size="26">{{ icon }}</v-icon>
        </v-btn>

        <div class="cont-user-logout">
          <span>{{user.usuario}}</span>
          <v-btn @click="logoutSession" icon>
            <v-icon color="grey lighten-1" size="25">mdi-logout</v-icon>
          </v-btn>
        </div>

      </template>

    </v-app-bar>

    <Drawer
        @loggout-session="logoutSession"
        :drawer.sync="drawer"
        :is-logged="isLogged"
        :user="user"
        :items-data="itemsData"
    />

  </v-container>

</template>

<script>
import {mapState, mapMutations} from "vuex";
import {itemsData} from "@/helpers";
import Drawer from "@/components/ui/appbar/Drawer";

export default {
  name: "Appbar",
  components: {Drawer},
  data() {
    return {
      drawer: false,
      itemsData
    }
  },

  computed: {
    ...mapState('login', ['isLogged', 'user']),
  },

  mounted() {
    this.getUser();
  },

  methods: {
    ...mapMutations('login', ['logout', 'getUser']),
    ...mapMutations('products', ['resetValues']),

    logoutSession(){
      this.logout();
      this.$router.push({path: '/'})
      localStorage.removeItem('user');
      localStorage.removeItem('carrito');
      localStorage.removeItem('favorite');
      this.resetValues(true);
      this.drawer = false;
    },
  },

}
</script>

<style lang="scss" scoped>

.cont-search{
  margin-top: 60px;
}

.cont-user-logout{
  background-color: black;
  border-radius: 4px;
  padding: 0 5px;
}

</style>