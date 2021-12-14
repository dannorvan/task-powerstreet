import Vue from 'vue'
import Vuex from 'vuex'
import {URL_BACK_API} from "@/helpers";

Vue.use(Vuex)

export default{
    namespaced: true,

    state: {
        productList: []
    },

    mutations: {
        updateListProduct(state, products){
            state.productList.push(...products);
            // Vue.set(state.productList, state.productList.length ,...products);
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




        }
    }
}
