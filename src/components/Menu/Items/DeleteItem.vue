<template>
  <div class="DeleteCategories">
    <navigationComponent class="navbar" />
    <div class="DeleteCategories-content container">
      <div class="row">
        <div class="location-info text-center mt-2">
          <h1 class="restaurant-title">{{ localName }}</h1>
          <p class="restaurant-title text-muted pt-0">{{ addressName }}</p>
          <p class="lead text-danger m-auto">
            Do you want to delete item {{ nameItem }}
          </p>
          <div class="group-btn">
            <div class="row">
              <button
                class="btn btn-danger delete col-6 w-auto d-block ml-auto"
                @click="DeleteItem()"
              >
                delete item
              </button>
              <router-link
                :to="{
                  name: 'MenuComp',
                  params: {
                    restaurantId: locationId,
                  },
                }"
                class="btn btn-info DeleteCategories-back-categories col-6"
              >
                Back menu
              </router-link>
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
      itemId: this.$route.params.itemId,
      addressName: "",
      localName: "",
      nameItem: "",
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
    this.getLocationName();
    this.getItemName();
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
          locationId: this.locationId,
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
        this.localName = result.data[0].nameRestaurant;
        this.addressName = result.data[0].addressRestaurant;
      } else {
        console.log("not run");
      }
    },
    async getItemName() {
      let result = await axios.get(
        `http://localhost:3000/items?userId=${this.isUserLoggedInId}&locationId=${this.locationId}&id=${this.itemId}`
      );
      if (result.status == 200) {
        this.nameItem = result.data[0].name;
      } else {
        console.log("not displayUserCategories");
      }
    },
    async DeleteItem() {
      let result = await axios.delete(
        `http://localhost:3000/items/${this.itemId}`
      );

      if (result.status == 200) {
        this.$router.push({
          name: "MenuComp",
          params: {
            restaurantId: this.locationId,
          },
        });
      } else {
        alert("error");
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
