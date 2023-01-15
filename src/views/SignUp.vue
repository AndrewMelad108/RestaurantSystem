<template>
  <div class="signUpFrom">
    <div class="container">
      <div class="row">
        <div class="image-sign col-lg-6">
          <img src="@/assets/signUp.jpg" alt="SignUp-photo" />
        </div>
        <div class="sign-form col-lg-6">
          <form @click.prevent>
            <h1 class="text-center title-form">sign up</h1>

            <div class="form-floating">
              <input
                type="text"
                class="form-control btn-input"
                id="floatingName"
                placeholder="Enter Your Name"
                v-model.trim="name"
              />
              <label for="floatingName" class="text-muted">
                Enter Your Name
              </label>
            </div>
            <span
              class="alert alert-info Errors"
              role="alert"
              v-if="v$.name.$error"
            >
              {{ v$.name.$errors[0].$message }}
            </span>
            <div class="form-floating">
              <input
                type="email"
                class="form-control btn-input"
                id="floatingEmail"
                placeholder="Enter Your Email"
                v-model.trim="email"
              />
              <label for="floatingEmail" class="text-muted"
                >Enter Your Email
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
                v-model.trim="password"
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
            <button class="btn btn-primary" type="submit" @click="signup()">
              signUp
            </button>
            <span class="redirect"
              >Already , have an account ?
              <a v-on:click="redirect(`Login`)">Login</a></span
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
import useValidate from "@vuelidate/core"; //import from page
import { required, email, minLength } from "@vuelidate/validators"; //option validate
export default {
  name: "SignUpForm",
  data: function () {
    return {
      v$: useValidate(),
      name: "",
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "isUserLoggedInId"]),
  },
  validations() {
    return {
      name: { required, minLength: minLength(5) },
      email: { required, email },
      password: { required, minLength: minLength(8) },
    };
  },
  mounted() {
    this.isUserLogged();
  },
  methods: {
    ...mapActions(["redirect"]),
    ...mapMutations(["isUserLogged"]),
    async signup() {
      this.v$.$validate(); //run function validations
      if (!this.v$.$error) {
        //dirty or invalid or error
        let result = await axios.post("http://localhost:3000/users", {
          Name: this.name,
          Password: this.password,
          Email: this.email,
        });
        if (result.status == 201) {
          localStorage.setItem("user-info", JSON.stringify(result.data));
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
            title: "User not added",
            showConfirmButton: false,
            timer: 2000,
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
.signUpFrom {
  max-height: 600px;
  align-items: center;
  text-transform: capitalize;
}
.image-sign {
  margin: auto;
}
.image-sign img {
  width: 100%;
  height: 100%;
  margin: auto;
  background-size: cover;
}
.sign-form {
  padding: 0 10px;
  margin-left: auto;
}
.sign-form .title-form {
  font-size: 48px !important;
  color: #18aecc;
  line-height: 1.7;
  letter-spacing: -3.5px;
  text-shadow: 2px 2px #7a7070;
}
.btn-input {
  margin: 20px auto;
  width: 100%;
  padding: 5px;
  font-size: 20px;
  text-indent: 5px;
}
.sign-form .Errors {
  display: inline-block;
  width: 100%;
  margin: 0 !important;
  padding: 11px 13px;
}
.sign-form .btn {
  margin: 17px auto;
  width: 100%;
  font-weight: bold;
  padding: 10px;
  display: block;
  font-size: 20px;
}
.sign-form .redirect {
  display: inline-block;
  text-align: center;
  font-size: 20px;
  color: #708cd5;
  margin: auto;
}
.sign-form .redirect a {
  cursor: pointer;
  transition: 0.5s all;
}
.sign-form .redirect a:hover {
  font-size: 22px;
  color: #ef6e58;
  font-weight: bold;
}
</style>
