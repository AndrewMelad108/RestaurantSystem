<template>
  <div class="Navbar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-content">
      <router-link :to="{ name: 'Home' }" class="navbar-brand">
        FAMR
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{ name: 'signUp' }" class="nav-item">
              RESIGNER
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Login' }" class="nav-item">
              LOGIN
            </router-link>
          </li>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "navComp",
  data: function () {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.Navbar {
  width: 100% !important;
  background-color: transparent !important;
  --bs-navbar-padding-y: 0 !important;
}
.navbar-content {
  width: 100% !important;
  background-color: transparent !important;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}
#navbarNavAltMarkup {
  margin-left: 60% !important ;
}
.navbar-content .navbar-brand {
  transition: 0.5s all ease-in-out;
  color: #03c988;
  font-size: 30px;
  font-weight: bold;
}
.navbar-content .navbar-brand:hover {
  //hover brand
  color: black !important;
  padding-right: 20px;
  letter-spacing: 2px !important;
}
.nav-item,
.nav-link {
  //space bettween links
  text-decoration: none;
  text-align: center;
  display: inline-block !important;
  width: 150px !important;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: #03c988;
  transition: all ease-in-out 0.7s;
}
.nav-item:hover {
  font-size: 25px;
}
.nav-link :hover {
  //space bettween links

  font-size: 25px;
}
</style>
