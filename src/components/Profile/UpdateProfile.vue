<template>
  <div class="container">
    <div class="row updateProfileFrom">
      <div class="updateProfile-form col-6">
        <form @click.prevent>
          <h1 class="text-center title-form">update Profile</h1>
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
            type="text"
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
          <button
            class="btn btn-primary"
            type="submit"
            @click="updateProfile()"
          >
            edit
          </button>
        </form>
      </div>
      <div class="image-container col-5">
        <img
          src="@/assets/profileImages/editProfile.jpg"
          alt="profileImage"
          class="profileImage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
  components: {},
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
          console.log("the data is update");
          localStorage.setItem("user-info", JSON.stringify(result.data));
          this.redirect("Profile");
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
  display: flex;
  align-items: center;
  text-transform: capitalize;
}
.updateProfile-form {
  padding: 0 10px;
  margin-top: 50px;
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
