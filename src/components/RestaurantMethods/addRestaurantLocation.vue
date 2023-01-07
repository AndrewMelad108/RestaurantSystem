<template>
  <div class="addRestaurant">
    <navigationComponent class="navbar" />
    <h1 class="addRestaurant-title text-center mb-5">
      <i>add restaurant</i>
    </h1>
    <div class="addRestaurant-form">
      <!--nameRestaurant input-->
      <label class="label-title">Name :</label>
      <input
        class="form-control btn-input"
        type="text"
        placeholder="Enter Your Name Restaurant"
        v-model="nameRestaurant"
      />
      <span
        class="alert alert-success Errors"
        role="alert"
        v-if="v$.nameRestaurant.$error"
      >
        {{ v$.nameRestaurant.$errors[0].$message }}
      </span>
      <!--input phone-->
      <label class="label-title">Phone :</label>
      <input
        class="form-control btn-input"
        type="number"
        placeholder="Enter Your Phone"
        v-model="phoneRestaurant"
      />
      <span
        class="alert alert-success Errors"
        role="alert"
        v-if="v$.phoneRestaurant.$error"
      >
        {{ v$.phoneRestaurant.$errors[0].$message }}
      </span>
      <!--input addressRestaurant-->
      <label class="label-title">address :</label>
      <input
        class="form-control btn-input"
        type="text"
        placeholder="Enter Your Address"
        v-model="addressRestaurant"
      />
      <span
        class="alert alert-success Errors"
        role="alert"
        v-if="v$.addressRestaurant.$error"
      >
        {{ v$.addressRestaurant.$errors[0].$message }}
      </span>
      <div class="add-restaurant-modal-footer">
        <button type="button" class="btn submit" @click="addLocation()">
          create
        </button>
      </div>
      <!--end form-->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import navigationComponent from "@/components/Header/navigation.vue";
import axios from "axios";
import useValidate from "@vuelidate/core"; //import from page
import { required, minLength } from "@vuelidate/validators"; //option validate
export default {
  name: "addRestaurantLocation",
  data: function () {
    return {
      v$: useValidate(),
      nameRestaurant: "",
      phoneRestaurant: "",
      addressRestaurant: "",
      userId: "",
      show: true,
    };
  },
  validations() {
    return {
      nameRestaurant: { required, minLength: minLength(10) },
      phoneRestaurant: { required, minLength: minLength(11) },
      addressRestaurant: { required },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirect("signUp");
    } else {
      this.userId = JSON.parse(user).id;
    }
  },
  components: { navigationComponent },
  methods: {
    ...mapActions(["redirect"]),
    async addLocation() {
      this.v$.$validate(); //run function validations
      if (!this.v$.$error) {
        //dirty or invalid or error
        let restaurantLocation = await axios.post(
          "http://localhost:3000/locations",
          {
            nameRestaurant: this.nameRestaurant,
            phoneRestaurant: this.phoneRestaurant,
            addressRestaurant: this.addressRestaurant,
            userId: this.userId,
          }
        );
        if (restaurantLocation.status == 201) {
          localStorage.setItem(
            "restaurant-location",
            JSON.stringify(restaurantLocation.data)
          );
        }
        this.redirect("RestaurantsComp");
      } else {
        console.warn("error validate");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.addRestaurant {
  padding: 15px;
  position: relative;
  z-index: 12222;
  background-image: url("@/assets/homeImages/add-restaurant.jpg");
  background-size: cover;
  width: 100%;
  min-height: 600;
  position: absolute;
}

.addRestaurant-title {
  font-size: 45px;
  letter-spacing: 1px;
  color: black !important;
  font-weight: bold;
  text-transform: capitalize;
  margin-top: 2%;
  padding-top: 7%;
}
.label-title::before {
  content: "*";
  color: black;
}
.label-title {
  display: block;
  width: 70%;
  font-size: 25px;
  font-weight: bold;
  font-family: "Sevillana", cursive;
  margin: auto;
  padding: 10px 0;
  color: #f7f5eb;
}

.btn-input {
  width: 100%;
  padding: 10 px;
  font-size: 20px;
  text-indent: 5px;
  border: 1px black solid;
  background-color: transparent !important;
  width: 70%;
  margin: auto;
  margin-bottom: 25px;
  color: black;
}
.btn-input::placeholder {
  color: black;
  font-size: 25px;
}
.Errors {
  display: block;
  width: 70% !important;
  margin: auto;
  margin-bottom: 2%;
  font-size: 25px;
}
.submit {
  display: block;
  width: 15%;
  padding: 1%;
  margin: 25% 0;
  color: #fff;
  background-color: black;
  font-size: 25px;
  font-weight: bold;
  margin: auto;
  text-transform: capitalize;
  border-radius: 10%;
  transition: 0.7s all ease-in-out;
}
.submit:hover {
  padding-left: 2%;
  background-color: transparent;
  color: #fff;
  border: black 1.5px solid;
}
</style>
