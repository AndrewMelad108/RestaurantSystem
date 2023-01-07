<template>
  <div class="container signUpFrom">
    <div class="row">
      <div class="image-sign col col-lg-5">
        <img src="@/assets/signUp.jpg" alt="SignUp-photo" />
      </div>
      <div class="sign-form col col-lg-5">
        <form @click.prevent>
          <h1 class="text-center title-form">sign up</h1>
          <input
            class="form-control btn-input"
            type="text"
            placeholder="Enter Your Name"
            v-model="name"
          />
          <span
            class="alert alert-warning Errors"
            role="alert"
            v-if="v$.name.$error"
          >
            {{ v$.name.$errors[0].$message }}
          </span>
          <input
            class="form-control btn-input"
            type="email"
            placeholder="Enter Your Email"
            v-model="email"
          />
          <span
            class="alert alert-warning Errors"
            role="alert"
            v-if="v$.email.$error"
          >
            {{ v$.email.$errors[0].$message }}
          </span>
          <input
            class="form-control btn-input"
            type="password"
            placeholder="Enter Your Password"
            v-model="password"
          />
          <span
            class="alert alert-warning Errors"
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
</template>

<script>
import { mapActions } from "vuex";
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
  validations() {
    return {
      name: { required, minLength: minLength(10) },
      email: { required, email },
      password: { required, minLength: minLength(8) },
    };
  },
  components: {},
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirect("signUp");
    } else {
      this.redirect("Home") || this.redirect("Login");
    }
  },
  methods: {
    ...mapActions(["redirect"]),
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
          this.redirect("Login");
        }
      } else {
        console.warn("error validate");
      }
    },
  },
};
</script>
<style scoped>
.signUpFrom {
  height: 600px;
  display: flex;
  align-items: center;
  text-transform: capitalize;
}
.image-sign img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: auto;
  background-size: cover;
}
.sign-form {
  padding: 0 10px;
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
  margin: 0;
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
