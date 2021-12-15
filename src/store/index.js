
import login from './login';
import products from './products';
import crudUsers from "./crudUsers";

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    products,
    crudUsers
  }
})
