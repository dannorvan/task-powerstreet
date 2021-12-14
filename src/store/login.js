import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default{
    namespaced: true,

    state: {
        isLogged: false,
        user: undefined
    },

    mutations: {

        getUser(state){
          state.user = JSON.parse(localStorage.getItem('user')) || undefined;
          if(state.user)
              state.isLogged = true;
        },

        login(state,payload){
            state.isLogged = true;
            state.user = payload;
        },

        logout(state){
            state.isLogged = false;
        },
    },

    actions: {

    }
}
