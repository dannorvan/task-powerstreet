<template>
  <div class="main-page">

    <div class="title">
      <h3>NEW ARRIVALS</h3>
      <p>WINTER</p>
    </div>

    <v-container>
      <v-row v-show="!showChipProduct" justify="center">
        <v-btn
            class="mt-6"
            outlined
            color="black"
            small
            @click="cleanSearching"
            v-if="!isSearching"
        >
          Buscar
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-col cols="12" v-if="isSearching" style="text-align: end">
          <v-text-field
              v-model="filterProduct"
              placeholder="Camisa, Vestido..."
              class="mr-3"
              color="grey darken-3"
          >
          </v-text-field>
          <v-icon
              @click="cleanSearching"
              color="grey darken-1"
              size="26"
              class="mr-3"
          >
            mdi-close-outline
          </v-icon>
          <v-btn
              @click="searchProducts"
              color="grey darken-2"
              outlined
              small
              :disabled="filterProduct.trim().length < 3"
          >
            buscar
          </v-btn>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-chip
            v-if="showChipProduct"
            class="ma-2"
            close
            color="black"
            text-color="white"
            label
            @click:close="cleanSearching"
            ref="chipSearch"
        >
          {{ filterProduct }}
        </v-chip>
      </v-row>
    </v-container>


    <v-container>
      <CardMain />
    </v-container>

  </div>

</template>

<script>
import CardMain from "@/components/cards/CardMain";

export default {
  name: "MainPage",

  components: {
    CardMain,
  },

  data() {
    return {
      isSearching: false,
      filterProduct: '',
      showChipProduct: false,
      listProductsFilters: []
    }
  },

  methods: {

    cleanSearching() {
      this.isSearching= !this.isSearching;
      this.filterProduct = '';
      this.showChipProduct = false;
    },

    searchProducts() {
    this.showChipProduct = !this.showChipProduct;
    }

  }
}
</script>

<style lang="scss" scoped>
.main-page{
  .title{
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 5px;
    width: 90%;
    margin: 0 auto;

    h3, p{
      margin: 0;
      letter-spacing: 4px;
      font-weight: bold;
    }
    p{
      font-weight: normal;
    }
  }
}

</style>