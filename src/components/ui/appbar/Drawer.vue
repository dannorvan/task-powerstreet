<template>
  <div @click="$emit('update:drawer', false)">
    <v-navigation-drawer
        color='grey lighten-2'
        temporary
        absolute
        v-model="drawer">
      <v-list-item
          v-if="isLogged"
          link
          :to="{name: 'EditProfile'}"
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
              v-for="{route,icon,title} in itemsData"
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
        <v-btn @click="$emit('loggout-session')" v-if="isLogged" text class="text--white mt-10" >
          Salir
        </v-btn>
        <v-btn @click="drawer = !drawer"  v-else color="black" class="white--text mt-10" >
          Ingresar
        </v-btn>
      </v-row>
    </v-navigation-drawer>
  </div>

</template>

<script>
export default {
  name: "Drawer",

  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    isLogged: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: undefined
    },
    itemsData: {
      type: Array,
      default: []
    }
  },
}
</script>

<style scoped>

</style>