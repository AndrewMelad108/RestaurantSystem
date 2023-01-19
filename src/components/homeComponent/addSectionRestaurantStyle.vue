<template>
  <div class="containter addRestaurantStyle">
    <div class="row">
      <div class="addRestaurantStyle-description col-6">
        <h1 class="title-info">restaurant info</h1>
        <span class="title-line text-center"></span>
        <p class="des-info lead">
          If you would like to add a restaurant or access the restaurant's data
          and make your own modification, click on the Add button
        </p>
        <button class="btn-add" @click="add()">ADD</button>
      </div>
      <div class="addRestaurantStyle-image col-5">
        <img
          src="@/assets/homeImages/add.png"
          class="image-restaurant"
          alt="image-restaurant"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Swal from "sweetalert2";
export default {
  name: "addRestaurantStyle",
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
    add() {
      if (this.isUserLoggedInCheck == true) {
        this.redirect("addRestaurantLocation");
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
.addRestaurantStyle {
  margin-top: 30px;
  min-height: 450px;
}
.addRestaurantStyle-description {
  margin-top: 5%;
}
.addRestaurantStyle-description .title-info {
  text-transform: capitalize;
  margin-bottom: 0 !important;
  transition: all ease-in-out 0.7s;
  cursor: pointer;
  font-weight: bold;
}
.addRestaurantStyle-description .title-line {
  display: inline-block;
  width: 40%;
  height: 1%;
  background-color: black;
}
// .title-info:hover .title-line {

// }
.addRestaurantStyle-description .des-info {
  margin: auto;
  font-size: 25px;
  padding: 20px 0;
  font-weight: bold;
  text-transform: capitalize;
}
.addRestaurantStyle-description .btn-add {
  display: inline-block;
  width: 25%;
  margin: 20px 0;
  padding: 10px 0;
  font-size: 30px;
  font-weight: bold;
  border: #ff7000 1px solid;
  background-color: transparent;
  border-radius: 3%;
  transition: all ease-in-out 0.7s;
}
.addRestaurantStyle-description .btn-add:hover {
  width: 30%;
  padding-left: 30px;
  background-color: black;
  color: #03c988;
  border: 0;
}
.addRestaurantStyle-image .image-restaurant {
  width: 100%;
  height: 100%;
  border-radius: 10%;
}
</style>
