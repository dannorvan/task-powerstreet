import Vue from 'vue'
import Vuex from 'vuex'
import {URL_BACK_API} from "@/helpers";

Vue.use(Vuex)

export default{
    namespaced: true,

    state: {
        productList: [],
        productsSearched: [],
        productsFavorites: JSON.parse(localStorage.getItem('favorites')) || [],
        productsInCar: JSON.parse(localStorage.getItem('carrito')) || [],
    },

    mutations: {
        updateListProduct(state, products){
            state.productList.push(...products);
            // Vue.set(state.productList, state.productList.length ,...products);
        },

        updateProductSearched(state, products){
            state.productsSearched.push(...products);
        },

        cleanProductSearched(state){
            state.productsSearched = [];
        },

        resetValues(state, logout){
            state.productsSearched = [];
            state.productList = [];
            if(logout){
                state.productsInCar = [];
                state.productsFavorites = [];
            }
        },

        addProductsCar(state,product){
            const productModify = {
                ...product,
                cantidad: 1,
            }

            if(state.productsInCar.some(prod => prod.codigo_producto === productModify.codigo_producto)){
                state.productsInCar.map(prod => prod.codigo_producto === productModify.codigo_producto
                    ? prod.cantidad++ : prod)
            } else {
                state.productsInCar.push(productModify);
                localStorage.setItem('carrito', JSON.stringify(state.productsInCar));
            }
        },

        toggleProductFavorites(state, product){
            state.productList.map(prod => prod.codigo_producto === product.codigo_producto
                ? prod.favorito = !prod.favorito : prod);

            state.productsFavorites = state.productList.filter(prod => prod.favorito);

            localStorage.setItem('favorites', JSON.stringify(state.productsFavorites));
        },

        editProductsCars(state, {product, operation}){
            state.productsInCar.map(prod => prod.codigo_producto === product.codigo_producto
                ? operation === 'suma' ? prod.cantidad++ : prod.cantidad-- : prod);
            localStorage.setItem('carrito', JSON.stringify(state.productsInCar));

        },


        removeProductsCars(state, id){
            state.productsInCar = state.productsInCar.filter(prod => prod.codigo_producto !== id);
            localStorage.setItem('carrito', JSON.stringify(state.productsInCar));
        },

    },

    actions: {
        async getProducts({commit}, {limit,page}){

            const body = {
                "limite": limit,
                "pagina": page,
            };

            return await fetch(`${URL_BACK_API}/productos`, {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...body}),
            }).then(async data => {
                const { datos , error } = await data.json();
                if(error){
                    return error;
                }
                else{
                    commit('updateListProduct', datos);
                }
            })
        },

        async findProduct({commit}, product){

            const body = {
                "busqueda": product,
                "limite": 100,
                "pagina": 1,
            };

            return await fetch(`${URL_BACK_API}/productos`, {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...body}),
            }).then(async data => {
                const { datos , error } = await data.json();
                if(error){
                    return error;
                }
                else{
                    commit('updateProductSearched', datos);
                }
            })
        }
    },

    getters: {
      numArticles: state => state.productsInCar.reduce((prev, {cantidad}) => prev + cantidad, 0),
        subtotal: state => state.productsInCar.reduce((prev, {precio,cantidad}) => prev + (precio*cantidad), 0),
    }
}
