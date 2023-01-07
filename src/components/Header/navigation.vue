<template>
  <div class="Navbar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-content">
      <router-link :to="{ name: 'Home' }" class="navbar-brand">
        FAMR
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-end navbar-links"
        id="navbarText"
      >
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <router-link :to="{ name: 'Profile' }" class="userName nav-item">
            <span>{{ "Hi" + " " + userName }}</span>
          </router-link>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="logout()">logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "navigationComponent",
  data: function () {
    return {
      userName: "",
    };
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user-info")).Name;
    this.userName = user;
  },
  methods: {
    ...mapActions(["redirect"]),
    logout() {
      localStorage.clear();
      this.redirect("signUp");
    },
    homePage() {
      this.redirect("Home");
    },
  },
};
</script>
<style lang="scss" scoped>
.Navbar {
  background-color: transparent !important;
  position: absolute;
  width: 100% !important;
}
.navbar-content {
  padding: 10px 25px !important;
  width: 100% !important;
  background-color: transparent !important;
}
.navbar-content .navbar-brand {
  transition: 0.5s all ease-in-out;
  color: #dc0000;
  font-size: 30px;
  font-weight: bold;
}
.navbar-content .navbar-brand:hover {
  //hover brand
  color: #18aecc !important;
  padding-right: 20px;
  letter-spacing: 2px !important;
}
.nav-item {
  margin-right: 80px !important; //space bettween links
}
.userName {
  transition: 0.5s all ease-in-out;
  cursor: pointer;
  margin: auto;
  text-decoration: none !important;
  color: #dc0000;
  font-size: 22px;
  font-weight: bold;
}
.navbar-links ul li {
  //display image under links
  display: inline-block !important;
  margin-left: auto !important;
}
.navbar-links ul li a {
  transition: 0.5s all ease-in-out;
  text-align: center !important;
  font-size: 22px;
  font-weight: bold;
  color: #dc0000;
}
.navbar-links ul li a:hover,
.userName:hover {
  color: #fff !important;
  padding-right: 20px;
  letter-spacing: 2px !important;
}
</style>
