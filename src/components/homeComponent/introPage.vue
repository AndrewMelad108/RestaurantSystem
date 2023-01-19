<template>
  <div class="intro">
    <section class="intro-restaurant text-center">
      <p class="lead intro-restaurant-des">
        If you would like to see the restaurants of the guest and know more
        about the restaurants and their places and their restaurants, click on

        <button class="intro-restaurant-btn btn" @click="show()">show</button>
        <button class="btn intro-restaurant-more"></button>
      </p>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Swal from "sweetalert2";
export default {
  name: "introPage",
  data: () => {
    return {};
  },
  computed: {
    ...mapGetters(["isUserLoggedInCheck"]),
  },
  mounted() {
    this.isUserLogged();
    console.log(this.isUserLoggedInCheck);
  },
  methods: {
    ...mapActions(["redirect"]),
    ...mapMutations(["isUserLogged"]),
    show() {
      if (this.isUserLoggedInCheck == true) {
        this.redirect("RestaurantsComp");
      } else {
        Swal.fire({
          icon: "error",
          title: "Please login Your Account",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.intro-restaurant {
  background-image: url("@/assets/homeImages/introPage.jpg");
  width: 100%;
  height: 600px;
  background-origin: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.intro-restaurant-des,
.intro-restaurant-btn,
.intro-restaurant-more {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
  color: black !important;
  text-transform: capitalize;
  font-weight: bold;
  letter-spacing: 1px;
}
.intro-restaurant-des {
  line-height: 2.2;
  letter-spacing: 1px;
  width: 60%;
}
.intro-restaurant-btn {
  margin-top: 15%;
  padding: 2%;
  width: 30%;
  border: 1px solid #ff7000;
  transition: all ease-in-out 0.7s;
}
.intro-restaurant-btn:hover {
  width: 35%;
  border: 1px solid black;
  color: #fff;
  font-size: 25px;
}
.intro-restaurant-more {
  margin-top: 25%;
}
</style>
