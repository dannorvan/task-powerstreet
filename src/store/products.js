import Vue from 'vue'
import Vuex from 'vuex'
import {URL_BACK_API} from "@/helpers";

Vue.use(Vuex)

export default{
    namespaced: true,

    state: {
        productList: [],
        productsSearched: [],
        productsInCar: []
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

        resetValues(state){
            state.productsSearched = [];
            state.productList = [];
            state.productsInCar = [];
        },

        addProductsCar(state,product){
            state.productsInCar.push(product);
            console.log(state.productsInCar);
        }
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
                console.log(datos, error);
                if(error){
                    return error;
                }
                else{
                    commit('updateProductSearched', datos);
                }
            })
        }
    }
}
