<template>
  <v-app class="main-app">
    <Appbar />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import Appbar from "@/components/ui/appbar/Appbar";

export default {
  name: 'App',

  components: {
    Appbar,
  },
};
</script>

<style lang="scss" scoped>
@import "styles/styles";
.main-app{
  background-color: $primary!important;
}
</style>