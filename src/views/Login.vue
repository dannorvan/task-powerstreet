<template>
  <div class="cont-main">
    <h2 class="ma-3">{{showRegister ? 'REGISTRARSE' : 'INGRESAR'}}</h2>
    <h6 class="mb-10">El mejor lugar donde puedes comprar</h6>

    <LoginForm
        v-if="!showRegister"
        :user="user"
        :is-loading="isLoading"
        :show-register="showRegister"
        @sign-in="signIn"
    />

    <RegisterForm
        v-else
        :is-loading="isLoading"
        :show-register="showRegister"
        @register-user="registerUser"
    />

    <v-btn class="mb-5" v-if="!showRegister" @click="showRegister = !showRegister" text x-small>
      ¿No tienes cuenta? registrate  <b> aquí</b>
    </v-btn>

    <v-btn v-else class="mb-5" @click="showRegister = !showRegister" text x-small>
      ¿Ya tienes cuenta? ingresa  <b> aquí</b>
    </v-btn>

    <snackbar @close-snack="snackbar = false" :snackbar="snackbar" :text-snack="textSnack"/>

  </div>
</template>

<script>
import moment from 'moment';
import {mapMutations, mapState} from 'vuex';
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";
import {loaderLoading, fetchApiLogin} from "@/helpers";
import Snackbar from "@/components/ui/snackbar";

export default {
  name: "Login",

  data() {
    return {
      user: {
        usuario: 'plerdo',
        contrasenia: 'pwst1234'
      },
      snackbar: false,
      textSnack: '',
      isLoading: false,
      showRegister: false,
    }
  },

  components: {
    Snackbar,
    LoginForm,
    RegisterForm
  },


  computed: {
    ...mapState('login', ['isLogged']),
  },

  methods: {
    ...mapMutations('login', ['login']),

    async signIn() {
      if(!this.fieldValid(this.user)) return;


      try {
        loaderLoading.show()
        this.isLoading = true;
        const resp = await fetchApiLogin('login', this.user);
        const data = await resp.json();
        if(data.error){
          this.snackbar = true;
          this.textSnack = data.error;
        } else {
          //TODO estoooooo
          localStorage.setItem('user', {...this.user});
          this.login(this.user);
          this.$router.push({name: 'MainPage'});
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
        loaderLoading.hide();
      }
    },

    async registerUser(user) {
      const fecha = moment(user.fecha).format('DD/MM/YYYY');
      const newUser = {
        ...user,
        fecha
      }

      if(!this.fieldValid(user)) return;

      try {
        loaderLoading.show();
        this.isLoading = true;
        const resp = await fetchApiLogin('guardar_usuario', newUser);
        const data = await resp.json();
        if(data.error){
          this.snackbar = true;
          this.textSnack = data.error;
        } else {
          this.snackbar = true;
          this.textSnack = `${data.res}, Ahora puedes iniciar sesión`;
          this.user = {
            usuario: newUser.usuario,
            contrasenia: newUser.contrasenia
          }
          this.showRegister = false;
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
        loaderLoading.hide();
      }

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

.cont-main {
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