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
              @input="searchProductsCurrent"
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
              :disabled="filterProduct.trim().length < 1"
              :class="['animate__animated', 'animate__infinite' , 'animate__slow',
                !this.listProductsFilters.length && 'animate__pulse']"
          >
            buscar en catálogo
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

      <template v-if="!this.listProductsCurrent.length && !showFilter">
        <v-row v-if="!productsSearched.length">
          <v-col
              cols="12" sm="6" md="4" lg="4"
              v-for="product in listProducts"
          >
            <CardMain
                :key="product.codigo_producto"
                :name-product="product.nombre_producto"
                :price="product.precio"
                :description="product.descripcion"
                @add-to-car="addProductsCarVx(product)"
            />
          </v-col>
        </v-row>


        <v-row v-else>
          <v-col
              cols="12" sm="6" md="4" lg="4"
              v-for="product in productsSearched"
          >
            <CardMain
                :key="product.codigo_producto"
                :name-product="product.nombre_producto"
                :price="product.precio"
                :description="product.descripcion"
                @add-to-car="addProductsCar(product)"
            />
          </v-col>
        </v-row>
      </template>

      <template v-else>
        <v-row v-if="this.listProductsCurrent.length">
          <v-col
              cols="12" sm="6" md="4" lg="4"
              v-for="product in listProductsCurrent"
          >
            <CardMain
                :key="product.codigo_producto"
                :name-product="product.nombre_producto"
                :price="product.precio"
                :description="product.descripcion"
                @add-to-car="addProductsCar(product)"
            />
          </v-col>
        </v-row>

        <v-alert
            v-else
            class="ma-10 animate__animated animate__fadeIn"
            shaped
            prominent
            type="error"
            color="red darken-4"

        >
          No hay coincidencias con tu busqueda, intenta realizar una busqueda profunda.
        </v-alert>
      </template>

    </v-container>


    <div v-if="!productsSearched.length" class="text-center">
      <v-row justify="center">
        <v-col cols="3">
          <v-pagination
              v-model="page"
              :length="paginationNumber"
              color="black"
              @input="getProductsVx"
          ></v-pagination>
        </v-col>
      </v-row>
    </div>


    <v-btn
        v-if="productsInCar.length"
        fixed
        bottom
        right
        class="mx-2"
        fab
        dark
        color="teal darken-4"
    >
      <v-icon dark>
        mdi-cart-outline
      </v-icon>
      <small>{{productsInCar.length}}</small>

    </v-btn>


    <snackbar @close-snack="snackbar = false" :snackbar="snackbar" :text-snack="textSnack"/>
  </div>
</template>

<script>
import CardMain from "@/components/cards/CardMain";
import {mapMutations, mapState, mapActions} from "vuex";
import {loaderLoading, URL_BACK_API} from "@/helpers";
import snackbar from "@/components/ui/snackbar";
import 'animate.css';

export default {
  name: "MainPage",

  components: {
    CardMain,
    snackbar
  },

  data() {
    return {
      isSearching: false,
      filterProduct: '',
      showFilter: false,
      showChipProduct: false,
      listProductsFilters: [],
      listProductsCurrent: [],
      listProducts: [],
      page: 1,
      limit: 4,
      prevPage: [],
      paginationNumber: 6,
      snackbar: false,
      textSnack: ''
    }
  },
  beforeRouteLeave(to,from,next){
    this.resetValues();
    next();
  },

  computed: {
    ...mapState('products', ['productList', 'productsSearched', 'productsInCar']),
  },

  async mounted() {
    await this.getProductsVx();
    this.listProducts = this.productList;
    console.log(this.listProducts);
  },

  methods: {
    ...mapActions('products', ['getProducts', 'findProduct']),
    ...mapMutations('products', ['cleanProductSearched', 'addProductsCar', 'resetValues']),

    cleanSearching() {
      this.cleanProductSearched();
      this.isSearching = !this.isSearching;
      this.filterProduct = '';
      this.showChipProduct = false;
      this.showFilter = false;
    },

    async searchProducts() {
      this.showFilter = false;
      try {
        loaderLoading.show();
        const resp = await this.findProduct(this.filterProduct);
        this.showChipProduct = !this.showChipProduct;
        if (resp) {
          this.snackbar = true;
          this.textSnack = resp;
          this.showChipProduct = false;
          this.filterProduct = '';
        }
      } catch (e) {
        console.e(e);
      } finally {
        loaderLoading.hide();
      }

    },

    searchProductsCurrent() {
      this.showFilter = true;
      this.listProductsCurrent = this.listProducts
          .filter(prod => prod.nombre_producto.includes(this.filterProduct));
    },

    async getProductsVx() {
      if (this.prevPage.includes(this.page)) return;

      this.prevPage.push(this.page);
      try {
        loaderLoading.show();
        const resp = await this.getProducts({limit: this.limit, page: this.page});
        if (resp) {
          this.snackbar = true;
          this.textSnack = resp;
        }
      } catch (e) {
        console.error(e)
      } finally {
        loaderLoading.hide();
      }
    },

    addProductsCarVx(product) {
      this.addProductsCar(product);
      this.snackbar = true;
      this.textSnack = `Excelente, has agregado ${product.nombre_producto} al carrito`;
    }

  },
}
</script>

<style lang="scss" scoped>
.main-page {
  .title {
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 5px;
    width: 90%;
    margin: 0 auto;

    h3, p {
      margin: 0;
      letter-spacing: 4px;
      font-weight: bold;
    }

    p {
      font-weight: normal;
    }
  }
}

</style>