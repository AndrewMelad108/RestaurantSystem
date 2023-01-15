<template>
  <div class="AddItems">
    <navigationComponent class="navbar" />
    <div class="AddItems-content container">
      <div class="row">
        <router-link
          :to="{
            name: 'MenuComp',
            params: {
              restaurantId: restaurantId,
            },
          }"
          class="btn btn-info AddItems-back-categories col-6"
        >
          Back Menu
        </router-link>

        <div class="location-info text-center mt-2">
          <h1 class="restaurant-title">{{ localName }}</h1>
          <p class="restaurant-title text-muted pt-0">{{ addressName }}</p>
        </div>
        <div class="addCategories-form m-auto w-auto">
          <form @click.prevent>
            <div class="form-floating">
              <!--name itmes-->

              <input
                type="text"
                class="form-control"
                id="floatingPassword"
                placeholder="Enter Name Items"
                v-model.trim="name"
              />
              <label for="floatingPassword">Enter Name Items</label>
            </div>
            <!--validate name items-->
            <span
              class="alert alert-success Errors"
              role="alert"
              v-if="v$.name.$error"
              ><!--validate name items-->
              {{ v$.name.$errors[0].$message }}
            </span>
            <div class="form-floating">
              <!---->
              <input
                type="number"
                class="form-control"
                id="Quantities"
                placeholder="Enter Name Quantities"
                v-model.trim="Quantities"
              />
              <label for="Quantities">Enter Name Quantities</label>
            </div>
            <span
              class="alert alert-success Errors"
              role="alert"
              v-if="v$.Quantities.$error"
            >
              {{ v$.Quantities.$errors[0].$message }}
            </span>
            <div class="form-floating">
              <!---->
              <input
                type="number"
                class="form-control"
                id="Price"
                placeholder="Enter Price Items"
                v-model.trim="Price"
              />
              <label for="Quantities">Enter Price Items</label>
            </div>
            <span
              class="alert alert-success Errors"
              role="alert"
              v-if="v$.Price.$error"
            >
              {{ v$.Price.$errors[0].$message }}
            </span>
            <div class="form-floating">
              <select
                class="form-select"
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

            <div class="form-floating">
              <textarea
                class="form-control"
                placeholder="Enter Description About Items"
                id="floatingTextarea"
                v-model.trim="Description"
              ></textarea>
              <label for="floatingTextarea"
                >Enter Description About Items</label
              >
            </div>
            <span
              class="alert alert-success Errors"
              role="alert"
              v-if="v$.Description.$error"
            >
              {{ v$.Description.$errors[0].$message }}
            </span>
            <button
              class="btn btn-info text-center d-block m-auto"
              @click="addItems()"
            >
              add items
            </button>
          </form>
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

export default {
  name: "AddCategories",
  data() {
    return {
      restaurantId: this.$route.params.locationId,
      addressName: "",
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
  mounted() {
    this.isUserLogged();
    this.accessUserLocations({
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
      "accessUserLocations",
    ]),
    BackCategories() {
      this.$router.push({
        name: "ViewCategories",
        params: {
          locationId: this.restaurantId,
        },
      });
    },
    BackMenu() {
      this.$router.push({
        name: "MenuComp",
        params: {
          restaurantId: this.restaurantId,
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
    async addItems() {
      console.log(this.listUserCategories);
      let resultFliterName = this.listUserCategories.filter((v) => {
        return v.name.toLocaleLowerCase() == this.name.toLocaleLowerCase();
      });
      console.log(resultFliterName);
      this.v$.$validate(); //run function validations
      if (!this.v$.$error) {
        if (resultFliterName.length > 0) {
          alert("name exist");
          this.name = "";
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
            this.$router.push({
              name: "MenuComp",
              params: {
                restaurantId: this.restaurantId,
              },
            });
          }
        }
      } else {
        console.log(" not valid ");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.AddItems-content {
  padding-top: 6%;
}
.AddItems-back-categories,
.AddItems-back-menu {
  width: auto;
}
.AddItems-back-menu {
  margin-left: auto;
}
</style>
