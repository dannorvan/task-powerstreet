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

        <v-btn @click="logoutSession" icon>
          <v-icon color="grey darken-1" size="25">mdi-logout</v-icon>
        </v-btn>
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

    logoutSession(){
      this.logout();
      this.$router.push({path: '/'})
      localStorage.removeItem('user');
      this.drawer = false;
    },
  },

}
</script>

<style lang="scss" scoped>

.cont-search{
  margin-top: 60px;
}

</style>