<template>
  <div class="AddCategories">
    <navigationComponent class="navbar" />
    <div class="AddCategories-content">
      <div class="container">
        <div class="row">
          <div class="location-info text-center mt-2">
            <h1 class="restaurant-title">{{ localName }}</h1>
          </div>
          <div class="addCategories-form">
            <form @click.prevent>
              <div class="form-floating containerBtn">
                <input
                  type="text"
                  class="form-control btn-input"
                  id="floatingName"
                  placeholder="Enter Your Name Category"
                  v-model.trim="name"
                />
                <label for="floatingName" class="text-muted">
                  Enter Your Name Category
                </label>
              </div>
              <span
                class="alert alert-danger Errors"
                role="alert"
                v-if="v$.name.$error"
              >
                {{ v$.name.$errors[0].$message }}
              </span>

              <button
                class="btn btn-success text-center addCategories"
                @click="addCategories()"
              >
                add Categories
              </button>
              <router-link
                :to="{
                  name: 'MenuComp',
                  params: {
                    restaurantId: restaurantId,
                  },
                }"
                class="btn btn-secondary text-center addCategories-back-menu"
              >
                Back menu
              </router-link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import navigationComponent from "@/components/Header/navigation.vue";
import { mapActions, mapMutations, mapState } from "vuex"; // component vuex
import useValidate from "@vuelidate/core"; //import from page
import { required, minLength, maxLength } from "@vuelidate/validators"; //option validate

export default {
  name: "AddCategories",
  data() {
    return {
      restaurantId: this.$route.params.locationId,
      addressName: "",
      localName: "",
      name: "",
      v$: useValidate(),
      listUserCategories: [],
    };
  },
  validations() {
    return {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(10),
      },
    };
  },
  computed: {
    ...mapState([
      "isUserLoggedIn",
      "listOfCategories",
      "numOfCategories",
      "isUserLoggedInId",
    ]),
  },
  components: {
    navigationComponent,
  },
  mounted() {
    this.isUserLogged();
    this.accessUserLocation({
      //access user locations
      userId: this.isUserLoggedInId,
      locationId: this.restaurantId,
      redirect: "Home",
    });
    this.displayLocations();
    this.displayUserCategories();
    console.log(typeof this.name);
  },
  methods: {
    ...mapActions(["redirect"]),
    ...mapMutations([
      "isUserLogged",
      "displayCategories",
      "accessUserLocation",
    ]),
    BackCategories() {
      this.$router.push({
        name: "ViewCategories",
        params: {
          locationId: this.restaurantId,
        },
      });
    },

    async displayLocations() {
      let result = await axios.get(
        `http://localhost:3000/locations?userId=${this.isUserLoggedInId}&id=${this.restaurantId}`
      );
      if (result.status == 200) {
        this.localName = result.data[0].nameRestaurant;
        this.addressName = result.data[0].addressRestaurant;
      } else {
        console.log("not run");
      }
    },
    async displayUserCategories() {
      let result = await axios.get(
        `http://localhost:3000/categories?userId=${this.isUserLoggedInId}&locationId=${this.restaurantId}`
      );
      if (result.status == 200) {
        this.listUserCategories = result.data;
        console.table(this.listUserCategories);
      } else {
        console.log("not displayUserCategories");
      }
    },
    async addCategories() {
      console.log(this.listUserCategories);
      let resultFliterName = this.listUserCategories.filter((v) => {
        return v.name.toLocaleLowerCase() == this.name.toLocaleLowerCase();
      });
      console.log(resultFliterName);
      this.v$.$validate(); //run function validations
      if (!this.v$.$error) {
        if (resultFliterName.length > 0) {
          Swal.fire({
            icon: "success",
            title: "Name Exist",
            showConfirmButton: false,
            timer: 1000,
          });
          setTimeout(() => {
            this.$router.push({
              name: "MenuComp",
              params: {
                restaurantId: this.restaurantId,
              },
            });
          }, 2000);
        } else {
          console.log("  valid ");
          let result = await axios.post(`http://localhost:3000/categories`, {
            name: this.name,
            userId: +this.isUserLoggedInId,
            locationId: +this.restaurantId,
          });
          if (result.status == 201) {
            Swal.fire({
              icon: "success",
              title: "Add succeeded",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              this.$router.push({
                name: "MenuComp",
                params: {
                  restaurantId: this.restaurantId,
                },
              });
            }, 2000);
          }
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
.AddCategories-content {
  padding-top: 2%;
  background-image: url("@/assets/homeImages/table-top-with-background.jpg");
  width: 100%;
  background-size: cover;
  background-position: center center;
  min-height: 593px;
}
.containerBtn,
.Errors {
  display: block;
  width: 70%;
  margin: auto;
}
.Errors {
  margin-bottom: 10px;
}
.btn-input {
  margin-bottom: 20px;
  background: transparent;
  text-indent: 10px !important;
}
.btn-input:focus,
.btn-input:active {
  background: transparent;
}
.addCategories,
.addCategories-back-menu {
  width: auto;
  display: inline-block !important;
  padding-left: 20px;
}
.addCategories {
  margin-left: 35%;
}

.addCategories-back-menu {
  margin-left: 5%;
}
</style>
