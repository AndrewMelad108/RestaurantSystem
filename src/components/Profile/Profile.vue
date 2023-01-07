<template>
  <div class="container profileFrom">
    <div class="row">
      <div class="profile-form">
        <form @click.prevent>
          <h1 class="text-center title-form">profile info</h1>
          <input
            class="form-control btn-input"
            type="text"
            placeholder="Enter Your Name"
            v-model="name"
            disabled
          />
          <input
            class="form-control btn-input"
            type="email"
            placeholder="Enter Your Email"
            v-model="email"
            disabled
          />
          <input
            class="form-control btn-input"
            type="text"
            placeholder="Enter Your Password"
            v-model="password"
            disabled
          />
          <button class="btn btn-primary" type="submit" @click="Profile()">
            updateProfile
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "profileForm",
  data: function () {
    return {
      name: "",
      email: "",
      password: "",
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
  methods: {
    ...mapActions(["redirect"]),
    Profile() {
      this.redirect("updateProfile");
    },
  },
};
</script>
<style scoped>
.profileFrom {
  display: flex;
  align-items: center;
  text-transform: capitalize;
  min-width: 400px;
  height: auto !important;
}
.profile-form {
  padding: 0 10px;
}
.profile-form .title-form {
  font-size: 48px !important;
  color: #18aecc;
  line-height: 1.7;
  letter-spacing: -3.5px;
  text-shadow: 2px 2px #7a7070;
  margin: auto;
}
.btn-input {
  margin: 20px auto;
  width: 450px;
  padding: 5px;
  font-size: 20px;
  text-indent: 5px;
  cursor: pointer;
}
.profile-form .Errors {
  display: inline-block;
  width: 100%;
  margin: 0;
}
.profile-form .btn {
  margin: 17px auto;
  width: 100%;
  font-weight: bold;
  padding: 10px;
  display: block;
  font-size: 20px;
  cursor: pointer;
}
.profile-form .redirect {
  display: inline-block;
  text-align: center;
  font-size: 20px;
  color: #708cd5;
  margin: auto;
}
.profile-form .redirect a {
  cursor: pointer;
  transition: 0.5s all;
}
.sign-form .redirect a:hover {
  font-size: 22px;
  color: #ef6e58;
  font-weight: bold;
}
</style>
