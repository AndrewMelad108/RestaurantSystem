<template>
  <div class="addRestaurant">
    <navigationComponent />
    <div class="addRestaurant-content">
      <h1 class="addRestaurant-title text-center mb-5">
        <i>add restaurant</i>
      </h1>
      <div class="container">
        <div class="row">
          <div class="addRestaurant-form col-md-8">
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
              class="alert alert-danger Errors"
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
              class="alert alert-danger Errors"
              role="alert"
              v-if="v$.phoneRestaurant.$error"
            >
              {{ v$.phoneRestaurant.$errors[0].$message }}
            </span>
            <!--input addressRestaurant-->
            <label class="label-title">Address :</label>
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
              class="alert alert-danger Errors"
              role="alert"
              v-if="v$.addressRestaurant.$error"
            >
              {{ v$.addressRestaurant.$errors[0].$message }}
            </span>
            <div class="add-restaurant-modal-footer">
              <button type="button" class="btn submit" @click="addLocation()">
                Create
              </button>
            </div>
            <!--end form-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"; // component vuex
import navigationComponent from "@/components/Header/navigation.vue";
import axios from "axios";
import useValidate from "@vuelidate/core"; //import from page
import { required, minLength } from "@vuelidate/validators"; //option validate
import Swal from "sweetalert2";
export default {
  name: "addRestaurantLocation",
  data: function () {
    return {
      v$: useValidate(),
      nameRestaurant: "",
      phoneRestaurant: "",
      addressRestaurant: "",
      userId: "",
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
    Swal() {
      Swal.fire({
        title: "Do You Want To Save The Restaurant?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
          setTimeout(() => {
            this.redirect("RestaurantsComp");
          }, 2000);
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    },
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
          this.Swal();
        }
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
.addRestaurant-content {
  padding: 15px;
  position: relative;
  z-index: 12222;
  background-image: url("@/assets/homeImages/table-top-with-background.jpg");
  background-size: cover;
  background-attachment: center center;
  width: 100%;
  min-height: 600;
  position: absolute;
  color: black;
}

.addRestaurant-title {
  font-size: 45px;
  letter-spacing: 1px;
  color: black !important;
  font-weight: bold;
  text-transform: capitalize;
  margin-top: 2%;
}
.addRestaurant-form {
  //center form
  display: block;
  margin: auto;
}
.label-title::before {
  content: "*";
  color: black;
}
.label-title {
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
  display: inline-block;
  width: 100%;
  margin: 0;
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
  margin-top: 10px;
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
