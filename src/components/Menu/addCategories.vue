<template>
  <div class="AddCategories">
    <navigationComponent class="navbar" />
    <div class="AddCategories-content container">
      <div class="row">
        <button
          class="btn btn-info AddCategories-back-categories col-6"
          @click="BackCategories()"
        >
          Back categories
        </button>
        <button
          class="btn btn-info AddCategories-back-menu col-6"
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
              @click="addCategories()"
            >
              add Categories
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
    this.accessUserLocations({
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
    async addCategories() {
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
          let result = await axios.post(`http://localhost:3000/categories`, {
            name: this.name,
            userId: +this.isUserLoggedInId,
            locationId: +this.restaurantId,
          });
          if (result.status == 201) {
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
.AddCategories-content {
  padding-top: 10%;
}
.AddCategories-back-categories,
.AddCategories-back-menu {
  width: auto;
}
.AddCategories-back-menu {
  margin-left: auto;
}
</style>
