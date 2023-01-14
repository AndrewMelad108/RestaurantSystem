<template>
  <div class="UpdateCategories">
    <navigationComponent class="navbar" />
    <div class="UpdateCategories-content container">
      <div class="row">
        <button
          class="btn btn-info UpdateCategories-back-categories col-6"
          @click="BackCategories()"
        >
          Back categories
        </button>
        <button
          class="btn btn-info UpdateCategories-back-menu col-6"
          @click="BackMenu()"
        >
          Back menu
        </button>
        <div class="location-info text-center mt-2">
          <h1 class="restaurant-title">{{ localName }}</h1>
          <p class="restaurant-title text-muted pt-0">{{ addressName }}</p>
        </div>
        <div class="addCategories-form m-auto w-auto">
          <form @click.prevent>
            <label class="label-title">Name Categories</label>
            <input
              class="form-control btn-input"
              type="text"
              placeholder="Enter Your Name Categories"
              v-model="name"
            />
            <span
              class="alert alert-success Errors"
              role="alert"
              v-if="v$.name.$error"
            >
              {{ v$.name.$errors[0].$message }}
            </span>
            <button
              class="btn btn-info text-center d-block m-auto"
              @click="UpdateCategories()"
            >
              UpdateCategories
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
import { required, minLength, maxLength } from "@vuelidate/validators"; //option validate

export default {
  name: "UpdateCategories",
  data() {
    return {
      restaurantId: this.$route.params.locationId,
      catId: this.$route.params.catId,
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
    this.accessUserLocations({
      //access user locations
      userId: this.isUserLoggedInId,
      locationId: this.restaurantId,
      redirect: "Home",
    });
    this.displayLocationsName();
    this.displayUserCategories();
    this.displayUpdateCategories();
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
    async displayLocationsName() {
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
    async displayUpdateCategories() {
      let result = await axios.get(
        `http://localhost:3000/categories?userId=${this.isUserLoggedInId}&locationId=${this.restaurantId}&id=${this.catId} `
      );
      if (result.status == 200) {
        this.name = result.data[0].name;
        console.log(" run");
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
    async UpdateCategories() {
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
          let result = await axios.put(
            `http://localhost:3000/categories/${this.catId}`,
            {
              name: this.name,
              userId: this.isUserLoggedInId,
              locationId: this.restaurantId,
              id: this.catId,
            }
          );
          if (result.status == 200) {
            this.BackCategories();
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
.UpdateCategories-content {
  padding-top: 10%;
}
.UpdateCategories-back-categories,
.UpdateCategories-back-menu {
  width: auto;
}
.UpdateCategories-back-menu {
  margin-left: auto;
}
</style>
