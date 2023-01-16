<template>
  <div class="updateProfileFrom">
    <div class="updateProfile-form">
      <form @click.prevent>
        <h1 class="text-center title-form">update Profile</h1>
        <div class="form-floating">
          <input
            type="text"
            class="form-control btn-input"
            id="floatingEmail"
            placeholder="Enter Your Name"
            v-model.trim="name"
          />
          <label for="floatingEmail" class="text-muted">
            Enter Your Name
          </label>
        </div>

        <span
          class="alert alert-warning Errors"
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
          <label for="floatingEmail" class="text-muted">
            Enter Your Email
          </label>
        </div>
        <span
          class="alert alert-warning Errors"
          role="alert"
          v-if="v$.email.$error"
        >
          {{ v$.email.$errors[0].$message }}
        </span>
        <div class="form-floating">
          <input
            type="text"
            class="form-control btn-input"
            id="floatingPassword"
            placeholder="Enter Your Password"
            v-model.trim="password"
          />
          <label for="floatingPassword" class="text-muted">
            Enter Your Password
          </label>
        </div>

        <span
          class="alert alert-warning Errors"
          role="alert"
          v-if="v$.password.$error"
        >
          {{ v$.password.$errors[0].$message }}
        </span>
        <button class="btn btn-primary" type="submit" @click="updateProfile()">
          edit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import useValidate from "@vuelidate/core"; //import from page
import { required, email, minLength } from "@vuelidate/validators"; //option validate
import { mapActions } from "vuex";
export default {
  name: "updateProfile",
  data: function () {
    return {
      v$: useValidate(),
      name: "",
      email: "",
      password: "",
      userId: "",
    };
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user-info"));
    if (user) {
      this.name = user.Name;
      this.email = user.Email;
      this.password = user.Password;
      this.userId = user.id;
    } else {
      this.redirect("signUp");
    }
  },
  validations() {
    return {
      name: { required, minLength: minLength(10) },
      email: { required, email },
      password: { required, minLength: minLength(10) },
    };
  },
  methods: {
    ...mapActions(["redirect"]),
    async updateProfile() {
      this.v$.$validate(); //run function validations
      if (
        !this.v$.error &&
        this.name !== null &&
        this.email !== null &&
        this.password !== null
      ) {
        // dirty or invalid or error
        let result = await axios.put(
          `http://localhost:3000/users/${this.userId}`,
          {
            Name: this.name,
            Password: this.password,
            Email: this.email,
          }
        );
        if (result.status == 200) {
          localStorage.setItem("user-info", JSON.stringify(result.data));
          Swal.fire({
            icon: "success",
            title: "Update succeeded",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            this.redirect("Home");
          }, 2000);
        } else {
          console.log("the data is not update");
        }
      } else {
        console.warn("error validate");
      }
    },
  },
};
</script>
<style scoped>
.updateProfileFrom {
  background-image: url("@/assets/back.jpg");
  background-size: cover;
  background-attachment: center center;
  width: 100%;
  min-height: 590px;
}

.updateProfile-form {
  display: block;
  width: 50%;
  margin: auto;
  padding: 6% 0;
}
.updateProfile-form .title-form {
  font-size: 48px !important;
  color: #18aecc;
  line-height: 1.7;
  letter-spacing: -3.5px;
  text-shadow: 2px 2px #7a7070;
  margin: auto;
}
.btn-input {
  margin: 20px auto;
  /* width: 100%; */
  padding: 5px;
  font-size: 20px;
  text-indent: 10px !important;
}
.updateProfile-form .Errors {
  display: inline-block;
  width: 100%;
  margin: 0;
}
.updateProfile-form .btn {
  margin: 17px auto;
  width: 100%;
  font-weight: bold;
  padding: 10px;
  display: block;
  font-size: 20px;
  text-transform: capitalize;
  border: 0;
  transition: all 0.7s;
}
.updateProfile-form .btn:hover {
  background-color: red;
  color: #fff;
  letter-spacing: 2.5px;
}
.updateProfile-form .redirect {
  display: inline-block;
  text-align: center;
  font-size: 20px;
  color: #708cd5;
  margin: auto;
}
.updateProfile-form .redirect a {
  cursor: pointer;
  transition: 0.5s all;
}
.updateProfile-form .redirect a:hover {
  font-size: 22px;
  color: #ef6e58;
  font-weight: bold;
}
.image-container .profileImage {
  max-width: 100%;
  height: 449px;
}
</style>
