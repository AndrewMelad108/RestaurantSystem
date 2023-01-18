<template>
  <div class="AddItems">
    <navigationComponent class="navbar" />
    <div class="AddItems-content">
      <div class="container">
        <div class="row">
          <div class="location-info text-center mt-2">
            <h1 class="restaurant-title">{{ localName }}</h1>
          </div>
          <div class="addCategories-form">
            <form @click.prevent>
              <div class="form-floating containerBtn">
                <!--name itmes-->

                <input
                  type="text"
                  class="form-control btn-input"
                  id="floatingPassword"
                  placeholder="Enter Name Items"
                  v-model.trim="name"
                />
                <label for="floatingPassword">Enter Name Items</label>
              </div>
              <!--validate name items-->
              <span
                class="alert alert-danger Errors"
                role="alert"
                v-if="v$.name.$error"
                ><!--validate name items-->
                {{ v$.name.$errors[0].$message }}
              </span>
              <div class="form-floating containerBtn">
                <!---->
                <input
                  type="number"
                  class="form-control btn-input"
                  id="Quantities"
                  placeholder="Enter Name Quantities"
                  v-model.trim="Quantities"
                />
                <label for="Quantities">Enter Name Quantities</label>
              </div>
              <span
                class="alert alert-danger Errors"
                role="alert"
                v-if="v$.Quantities.$error"
              >
                {{ v$.Quantities.$errors[0].$message }}
              </span>
              <div class="form-floating containerBtn">
                <!---->
                <input
                  type="number"
                  class="form-control btn-input"
                  id="Price"
                  placeholder="Enter Price Items"
                  v-model.trim="Price"
                />
                <label for="Quantities">Enter Price Items</label>
              </div>
              <span
                class="alert alert-danger Errors"
                role="alert"
                v-if="v$.Price.$error"
              >
                {{ v$.Price.$errors[0].$message }}
              </span>
              <div class="form-floating containerBtn">
                <select
                  class="form-select btn-input"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  v-model="PickedCategory"
                >
                  <option
                    v-for="category in listOfAllCategories"
                    :key="category.index"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>

                <label for="floatingSelect">Open Categories menu</label>
              </div>
              <span
                class="alert alert-danger Errors"
                role="alert"
                v-if="v$.PickedCategory.$error"
              >
                {{ v$.PickedCategory.$errors[0].$message }}
              </span>
              <div class="form-floating containerBtn">
                <textarea
                  class="form-control btn-input"
                  placeholder="Enter Description About Items"
                  id="floatingTextarea"
                  v-model.trim="Description"
                ></textarea>
                <label for="floatingTextarea"
                  >Enter Description About Items</label
                >
              </div>
              <span
                class="alert alert-danger Errors"
                role="alert"
                v-if="v$.Description.$error"
              >
                {{ v$.Description.$errors[0].$message }}
              </span>
              <button
                class="btn btn-success text-center AddItems-btn"
                @click="addItems()"
              >
                AddItem
              </button>
              <router-link
                :to="{
                  name: 'MenuComp',
                  params: {
                    restaurantId: restaurantId,
                  },
                }"
                class="btn btn-dark AddItems-back-categories text-center AddItems-back-menu"
              >
                Back Menu
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
import navigationComponent from "@/components/Header/navigation.vue";
import { mapActions, mapMutations, mapState } from "vuex"; // component vuex
import useValidate from "@vuelidate/core"; //import from page
import { required, minLength, maxLength, between } from "@vuelidate/validators"; //option validate
import Swal from "sweetalert2";
export default {
  name: "AddCategories",
  data() {
    return {
      restaurantId: this.$route.params.locationId,
      localName: "",
      name: "",
      Description: "",
      Quantities: "",
      PickedCategory: "",
      Price: "",
      v$: useValidate(),
      listUserCategories: [],
    };
  },
  validations() {
    return {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(7),
      },
      PickedCategory: {
        required,
      },
      Description: {
        required,
        minLength: minLength(12),
        maxLength: maxLength(120),
      },
      Quantities: {
        required,
        between: between(1, 1000000000000000000000),
      },
      Price: {
        required,
        between: between(1, 1000000000000000000000),
      },
    };
  },
  computed: {
    ...mapState([
      "isUserLoggedIn",
      "listOfAllCategories",
      "numOfCategories",
      "isUserLoggedInId",
    ]),
  },
  components: {
    navigationComponent,
  },
  created() {
    this.isUserLogged();
    this.accessUserLocation({
      //access user locations
      userId: this.isUserLoggedInId,
      locationId: this.restaurantId,
      redirect: "Home",
    });
    this.displayLocations();
    this.displayUserCategories();
  },
  methods: {
    ...mapActions(["redirect"]),
    ...mapMutations([
      "isUserLogged",
      "displayCategories",
      "accessUserLocation",
    ]),
    async displayLocations() {
      let result = await axios.get(
        `http://localhost:3000/locations?userId=${this.isUserLoggedInId}&id=${this.restaurantId}`
      );
      if (result.status == 200) {
        for (let i = 0; i < result.data.length; i++) {
          this.localName = result.data[i].nameRestaurant;
        }
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
    async addItems() {
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
        } else {
          console.log("  valid ");
          let result = await axios.post(`http://localhost:3000/items`, {
            name: this.name,
            Quantities: +this.Quantities,
            Price: parseFloat(this.Price).toFixed(2),
            Description: this.Description,
            catId: this.PickedCategory,
            userId: +this.isUserLoggedInId,
            locationId: +this.restaurantId,
          });
          if (result.status == 201) {
            Swal.fire({
              icon: "success",
              title: "Add Succeeded",
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
.AddItems-content {
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
.btn-input:focus,
.btn-input:active {
  background: transparent;
}
.btn-input {
  margin-bottom: 20px;
  background: transparent;
  text-indent: 10px !important;
}
.AddItems-btn,
.AddItems-back-menu {
  width: auto;
  display: inline-block !important;
  padding-left: 20px;
}
.AddItems-btn {
  margin-left: 35%;
}

.AddItems-back-menu {
  margin-left: 5%;
}
</style>
