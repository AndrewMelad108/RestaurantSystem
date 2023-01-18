<template>
  <div class="container loginFrom">
    <div class="row">
      <div class="login-form col col-lg-6">
        <form @click.prevent>
          <h1 class="text-center title-form">log in</h1>
          <div class="form-floating">
            <input
              type="email"
              class="form-control btn-input"
              id="floatingEmail"
              placeholder="Enter Your Name"
              v-model.trim="state.email"
            />
            <label for="floatingEmail" class="text-muted">
              Enter Your Name
            </label>
          </div>
          <span
            class="alert alert-info Errors"
            role="alert"
            v-if="v$.email.$error"
          >
            {{ v$.email.$errors[0].$message }}
          </span>
          <div class="form-floating">
            <input
              type="password"
              class="form-control btn-input"
              id="floatingPassword"
              placeholder="Enter Your Password"
              v-model.trim="state.password"
            />
            <label for="floatingPassword" class="text-muted"
              >Enter Your Password
            </label>
          </div>
          <span
            class="alert alert-info Errors"
            role="alert"
            v-if="v$.password.$error"
          >
            {{ v$.password.$errors[0].$message }}
          </span>
          <button class="btn btn-primary" type="submit" @click="login()">
            login
          </button>
          <span class="redirect"
            >Already ,You don't have an account ?
            <a v-on:click="redirect('signUp')">sign up</a></span
          >
        </form>
      </div>
      <div class="image-login col col-lg-5">
        <img src="@/assets/logIn.jpg" alt="login-photo" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { mapActions, mapMutations, mapState } from "vuex"; // component vuex
import useValidate from "@vuelidate/core"; //import from page
import { required, email } from "@vuelidate/validators"; //option validate
import { reactive, computed } from "vue"; // sub function from vue

export default {
  name: "LogInPage",
  //compostion API
  setup() {
    //data
    const state = reactive({
      email: "",
      password: "",
    });
    //validation
    const rules = computed(() => {
      return {
        password: { required },
        email: { required, email },
      };
    });
    const v$ = useValidate(rules, state);
    return {
      v$,
      state,
    };
  },
  data: function () {
    return {};
  },
  computed: {
    ...mapState(["isUserLoggedIn", "isUserLoggedInId"]),
  },

  methods: {
    ...mapActions(["redirect"]),
    ...mapMutations(["isUserLogged"]),
    async login() {
      this.v$.$validate(); //run function validations
      if (!this.v$.$error) {
        let result = await axios.get(
          `http://localhost:3000/users?Email=${this.state.email}&Password=${this.state.password} `
        );
        if (result.status == 200 && result.data.length > 0) {
          localStorage.setItem("user-info", JSON.stringify(result.data[0]));
          Swal.fire({
            icon: "success",
            title: "success add user",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            this.redirect("Home");
          }, 2000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oop!!!!!!!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "The Fields Are Empty",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },
  },
};
</script>
<style scoped>
.loginFrom {
  height: 600px;
  display: flex;
  align-items: center;
}
.image-login img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: auto;
  background-size: cover;
  text-align: center;
}
.login-form {
  padding: 0 10px;
  text-transform: capitalize;
}
.login-form .title-form {
  font-size: 48px !important;
  color: #18aecc;
  line-height: 1.7;
  letter-spacing: -3.5px;
  text-shadow: 2px 2px #7a7070;
}
.login-form .btn-input {
  margin: 20px auto;
  width: 100%;
  padding: 5px;
  font-size: 20px;
  text-indent: 5px;
}
.login-form .Errors {
  display: inline-block;
  width: 100%;
  margin: 0;
}
.login-form .btn {
  margin: 17px auto;
  width: 100%;
  font-weight: bold;
  padding: 10px;
  display: block;
  font-size: 20px;
}
.login-form .redirect {
  display: inline-block;
  text-align: center;
  font-size: 20px;
  color: #708cd5;
  margin: auto;
}
.login-form .redirect a {
  cursor: pointer;
  transition: 0.5s all;
}
.redirect a:hover {
  font-size: 22px;
  color: #ff2d9b;
  font-weight: bold;
}
</style>
