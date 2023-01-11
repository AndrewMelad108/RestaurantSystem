<template>
  <div class="DeleteCategories">
    <navigationComponent class="navbar" />
    <div class="DeleteCategories-content container">
      <div class="row">
        <button
          class="btn btn-info DeleteCategories-back-categories col-6"
          @click="BackCategories()"
        >
          Back categories
        </button>
        <button
          class="btn btn-info DeleteCategories-back-menu col-6"
          @click="BackMenu()"
        >
          Back menu
        </button>
        <div class="location-info text-center mt-2">
          <h1 class="restaurant-title">{{ localName }}</h1>
          <p class="restaurant-title text-muted pt-0">{{ addressName }}</p>
          <p class="lead text-danger m-auto">
            Do you want to delete category {{ nameCategory }}
          </p>
          <div class="group-btn">
            <div class="row">
              <button
                class="btn btn-danger delete col-6 w-auto d-block ml-auto"
              >
                delete category
              </button>
              <button class="btn btn-dark backCategory col-6 w-auto d-block">
                back
              </button>
            </div>
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
export default {
  name: "DeleteCategories",
  data() {
    return {
      locationId: this.$route.params.locationId,
      addressName: "",
      localName: "",
      name: "",
      catId: this.$route.params.catId,
      listUserCategories: [],
      nameCategory: "",
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
    // this.accessUserLocations({
    //   //access user locations
    //   userId: this.isUserLoggedInId,
    //   locationId: this.restaurantId,
    //   redirect: "Home",
    // });
    this.getLocationName();
    this.getCategoryName();
    // this.displayUserCategories();
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
    async getLocationName() {
      let result = await axios.get(
        `http://localhost:3000/locations?userId=${this.isUserLoggedInId}&id=${this.locationId}`
      );
      if (result.status == 200) {
        console.log(result.data);
        this.localName = result.data[0].nameRestaurant;
        this.addressName = result.data[0].addressRestaurant;
      } else {
        console.log("not run");
      }
    },
    async getCategoryName() {
      let result = await axios.get(
        `http://localhost:3000/categories?userId=${this.isUserLoggedInId}&locationId=${this.locationId}&id=${this.catId}`
      );
      if (result.status == 200) {
        this.nameCategory = result.data[0].name;
      } else {
        console.log("not displayUserCategories");
      }
    },
    async DeleteCategories() {
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
.DeleteCategories-content {
  padding-top: 10%;
}
.DeleteCategories-back-categories,
.DeleteCategories-back-menu {
  width: auto;
}
.DeleteCategories-back-menu {
  margin-left: auto;
}
</style>
