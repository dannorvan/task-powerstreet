<template>
  <div class="cont-edit-user">
    <RegisterForm
        :is-loading="isLoading"
        @register-user="editUser"
    />

    <snackbar
        @close-snack="snackbar = false"
        :snackbar="snackbar"
        :text-snack="textSnack"/>
  </div>
</template>

<script>
import RegisterForm from "@/components/login/RegisterForm";
import moment from "moment";
import {loaderLoading} from "@/helpers/loader";
import {fetchApiLogin} from "@/helpers/fetch";
import Snackbar from "@/components/ui/snackbar";


export default {
  name: "EditUser",
  data() {
    return {
      isLoading: false,
      snackbar: false,
      textSnack: '',
    }
  },
  components: {Snackbar, RegisterForm},

  methods: {
    async editUser(user) {
      const fecha = moment(user.fecha).format('DD/MM/YYYY');
      this.snackbar = true;
      this.textSnack = `Ahora puedes iniciar sesión`;

      const editUser = {
        ...user,
        fecha
      }

      //TODO. peticion editar
      //
      // if(!this.fieldValid(user)) return;
      //
      // try {
      //   loaderLoading.show();
      //   this.isLoading = true;
      //   const resp = await fetchApiLogin('editar_usuario', newUser);
      //   const data = await resp.json();
      //   if(data.error){
      //     this.snackbar = true;
      //     this.textSnack = data.error;
      //   } else {
      //     this.snackbar = true;
      //     this.textSnack = `${data.res}, Ahora puedes iniciar sesión`;
      //     this.user = {
      //       usuario: newUser.usuario,
      //       contrasenia: newUser.contrasenia
      //     }
      //     this.showRegister = false;
      //   }
      // } catch (e) {
      //   console.error(e);
      // } finally {
      //   this.isLoading = false;
      //   loaderLoading.hide();
      // }
    },

    fieldValid(user) {
      const validUser = Object.values(user).every(field => field !== '');
      if(!validUser) {
        this.snackbar = true;
        this.textSnack = 'Por favor completa todos los campos';
        return false;
      }
      return true;
    }

  },
}
</script>

<style lang="scss" scoped>
.cont-edit-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .v-form {
    width: 90%;
    margin: 0 auto;
  }
}
</style>