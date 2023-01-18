<template>
  <div class="UpdateItems">
    <navigationComponent class="navbar" />
    <div class="UpdateItems-content">
      <div class="container">
        <div class="row">
          <div class="location-info text-center mt-2">
            <h1 class="restaurant-title">{{ localName }}</h1>
          </div>
          <div class="UpdateItems-form">
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
                class="btn btn-success text-center UpdateItems-btn"
                @click="updateItems()"
              >
                updateItems
              </button>
              <router-link
                :to="{
                  name: 'MenuComp',
                  params: {
                    restaurantId: restaurantId,
                  },
                }"
                class="btn btn-dark text-center UpdateItems-back-menu"
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
      itemId: this.$route.params.itemId,
      localName: "",
      v$: useValidate(),
      name: "",
      Quantities: "",
      Price: "",
      Description: "",
      PickedCategory: "",
      listUserCategories: [],
      listUserItems: [], //get all categories
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
    ...mapState(["isUserLoggedIn", "isUserLoggedInId", "listOfAllCategories"]),
  },
  components: {
    navigationComponent,
  },
  mounted() {
    this.isUserLogged();
    this.displayLocations();
    this.displayUserCategories();
    this.displayItems();
    this.displayAllItems();
    this.canAccessUserThisItem({
      userId: this.isUserLoggedInId,
      locationId: this.restaurantId,
      id: this.itemId,
      redirect: "Home",
    });
  },
  methods: {
    ...mapActions(["redirect"]),
    ...mapMutations([
      "isUserLogged",
      "displayCategories",
      "canAccessUserThisItem",
    ]),
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
    async displayItems() {
      let result = await axios.get(
        `http://localhost:3000/items?userId=${this.isUserLoggedInId}&locationId=${this.restaurantId}&id=${this.itemId}`
      );
      if (result.status == 200) {
        for (let i = 0; i < result.data.length; i++) {
          this.name = result.data[i].name;
          this.Quantities = result.data[i].Quantities;
          this.Price = result.data[i].Price;
          this.PickedCategory = result.data[i].catId;
          this.Description = result.data[i].Description;
        }
      } else {
        console.log("not run");
      }
    },
    async displayAllItems() {
      let result = await axios.get(
        `http://localhost:3000/items?userId=${this.isUserLoggedInId}&locationId=${this.restaurantId}`
      );
      if (result.status == 200) {
        this.listUserItems = result.data;
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
      } else {
        console.log("not displayUserCategories");
      }
    },
    async updateItems() {
      console.log(this.listUserItems);
      let resultFliterName = this.listUserItems.filter((v) => {
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
          let result = await axios.put(
            `http://localhost:3000/items/${this.itemId}`,
            {
              name: this.name,
              Quantities: this.Quantities,
              Price: this.Price,
              Description: this.Description,
              catId: this.PickedCategory,
              userId: this.isUserLoggedInId,
              locationId: this.restaurantId,
              id: this.itemId,
            }
          );
          if (result.status == 200) {
            Swal.fire({
              icon: "success",
              title: "Update succeeded",
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
.UpdateItems-content {
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
.UpdateItems-btn,
.UpdateItems-back-menu {
  width: auto;
  display: inline-block !important;
  padding-left: 20px;
}
.UpdateItems-btn {
  margin-left: 35%;
}

.UpdateItems-back-menu {
  margin-left: 5%;
}
</style>
