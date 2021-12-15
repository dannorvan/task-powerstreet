import Vue from 'vue'
import Vuex from 'vuex'
import {fetchApiLogin, loaderLoading, URL_BACK_API} from "@/helpers";
import Swal from "sweetalert2";

Vue.use(Vuex)

export default{
    namespaced: true,

    state: {
        users: [],
        dialog: false,
        currentUser: {
            nombre: "",
            usuario: "",
            fecha: '2000-03-20',
            contrasenia: "",
            contrasenia2: '',
            telefono: '',
            email: ""
        }
    },

    mutations: {
        updateUser(state, users){
            state.users = users;
        },

        addUser(state, user){
            state.users = [user,...state.users];
            console.log(state.users);
            state.dialog = false;
        },

        deleteUser(state, user){
            state.users = state.users.filter(us => us.usuario !== user.id);
        },

        editUser(state, user){
            console.log(user)
            console.log(state.dialog);
            state.dialog = true;
            state.currentUser = user;
        }

    },

    actions: {
        async getUsers({commit}) {

            const body = {
                limite: 50,
                pagina: 1,
            }

            try {
                loaderLoading.show();

                const resp = await fetch(`${URL_BACK_API}/buscar_usuario`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({...body}),
                })
                    .then(async (resp) => {
                        const { exito, datos ,error} = await resp.json();
                        if(exito){
                            commit('updateUser', datos);
                        }
                        else
                            console.error(error);
                    });

            } catch (e) {
                console.error(e);
            } finally {
                loaderLoading.hide()
            }
        },

        async createUserVx({commit, state}, user) {

            try {
                loaderLoading.show();
                const resp = await fetchApiLogin('guardar_usuario', user)
                    .then(async (resp) => {
                        const data = await resp.json();
                        if(data.error){
                            Swal.fire('Oops!', data.error, 'warning');
                        } else {
                            commit('addUser', user);

                            Swal.fire('Excelente!', data.res, 'success');
                        }
                    })
            } catch (e) {
                console.error(e);
            } finally {
                loaderLoading.hide();
            }
        },

        async deleteUser({commit}, user){
            console.log(user);
            try {
                loaderLoading.show();
                const resp = await fetchApiLogin('eliminar_usuario', {usuario: user.id})
                    .then(async (resp) => {
                        const data = await resp.json();
                        if(data.error){
                            Swal.fire('Oops!', data.error, 'warning');
                        } else {
                            commit('deleteUser', user);
                            Swal.fire('Excelente!', data.res, 'success');
                        }
                    })
            } catch (e) {
                console.error(e);
            } finally {
                loaderLoading.hide();
            }
        },

        async editCurrentUser({commit}, user){
            console.log(user)
        }
    }
}
