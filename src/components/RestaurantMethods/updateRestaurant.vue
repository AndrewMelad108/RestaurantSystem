<template>
  <div class="updateRestaurant">
    <navigationComponent />
    <div class="updateRestaurant-content">
      <h1 class="updateRestaurant-title text-center mb-5">
        <i>Update Restaurant</i>
      </h1>

      <div class="updateRestaurant-form">
        <!--nameRestaurant input-->
        <label class="label-title">Name :</label>
        <div class="form-floating">
          <input
            type="text"
            class="form-control btn-input"
            id="floatingName"
            placeholder="Enter Your Name Restaurant"
            v-model.trim="nameRestaurant"
          />
          <label for="floatingName" class="text-muted">
            Enter Your Name Restaurant
          </label>
        </div>
        <span
          class="alert alert-success Errors"
          role="alert"
          v-if="v$.nameRestaurant.$error"
        >
          {{ v$.nameRestaurant.$errors[0].$message }}
        </span>
        <!--input phone-->
        <label class="label-title">Phone :</label>
        <div class="form-floating">
          <input
            type="tel"
            class="form-control btn-input"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            id="floatingPhone"
            placeholder="Enter Your Phone Restaurant"
            v-model.trim="phoneRestaurant"
          />
          <label for="floatingPhone" class="text-muted">
            Enter Your Phone Restaurant
          </label>
        </div>
        <span
          class="alert alert-success Errors"
          role="alert"
          v-if="v$.phoneRestaurant.$error"
        >
          {{ v$.phoneRestaurant.$errors[0].$message }}
        </span>
        <!--input addressRestaurant-->
        <label class="label-title">address :</label>
        <div class="form-floating">
          <input
            type="text"
            class="form-control btn-input"
            id="floatingAddress"
            placeholder="Enter Your Address Restaurant"
            v-model.trim="addressRestaurant"
          />
          <label for="floatingPhone" class="text-muted">
            Enter Your Address Restaurant
          </label>
        </div>
        <span
          class="alert alert-success Errors"
          role="alert"
          v-if="v$.addressRestaurant.$error"
        >
          {{ v$.addressRestaurant.$errors[0].$message }}
        </span>
        <div class="update-restaurant-modal-footer">
          <button type="button" class="btn submit" @click="updateRestaurant()">
            Update
          </button>
        </div>
        <!--end form-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex"; // component vuex
import navigationComponent from "@/components/Header/navigation.vue";
import axios from "axios";
import useValidate from "@vuelidate/core"; //import from page
import { required, minLength } from "@vuelidate/validators"; //option validate
import Swal from "sweetalert2";
export default {
  name: "updateRestaurant",
  data: function () {
    return {
      v$: useValidate(),
      nameRestaurant: "",
      phoneRestaurant: "",
      addressRestaurant: "",
      userId: "",
      restaurantId: this.$route.params.id,
    };
  },
  validations() {
    return {
      nameRestaurant: { required, minLength: minLength(10) },
      phoneRestaurant: { required, minLength: minLength(11) },
      addressRestaurant: { required },
    };
  },
  created() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirect("signUp");
    } else {
      this.userId = JSON.parse(user).id;
      this.showUpdateRestaurant();
      this.accessUserLocation({
        userId: this.userId,
        locationId: this.restaurantId,
        redirect: "Home",
      });
    }
  },
  components: { navigationComponent },
  methods: {
    async showUpdateRestaurant() {
      let result = await axios.get(
        `http://localhost:3000/locations/${this.restaurantId}`
      );
      this.nameRestaurant = result.data.nameRestaurant;
      this.phoneRestaurant = result.data.phoneRestaurant;
      this.addressRestaurant = result.data.addressRestaurant;
    },
    ...mapActions(["redirect"]),
    ...mapMutations(["accessUserLocation"]),
    async updateRestaurant() {
      this.v$.$validate(); //run function validations
      if (!this.v$.$error) {
        //dirty or invalid or error
        let restaurantLocation = await axios.put(
          `http://localhost:3000/locations/${this.restaurantId}`,
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
        Swal.fire({
          icon: "success",
          title: "Update succeeded",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          this.redirect("RestaurantsComp");
        }, 2000);
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

<style lang="scss" scoped>
.updateRestaurant-content {
  padding: 15px;
  background-image: url("@/assets/homeImages/introPage.jpg");
  background-size: cover;
  background-origin: center center;
  width: 100%;
  min-height: 560px;
  margin: auto;
}
.updateRestaurant-form {
  width: 70%;
  display: block;
  margin: 0 auto !important;
}
.updateRestaurant-title {
  font-size: 45px;
  letter-spacing: 1px;
  color: black !important;
  font-weight: bold;
  text-transform: capitalize;
}
.label-title::before {
  content: "*";
  color: black;
}
.label-title {
  display: block;
  width: 100%;
  font-size: 25px;
  font-weight: bold;
  font-family: "Sevillana", cursive;
  margin: auto;
  padding: 10px 0;
  color: black;
}

.btn-input {
  width: 100%;
  padding: 10 px;
  font-size: 20px;
  border: 1px black solid;
  background-color: transparent !important;
  margin-bottom: 10px;
  color: black;
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
  color: #03c988;
  border: black 1.5px solid;
}
</style>
