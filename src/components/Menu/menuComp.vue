<template>
  <div class="MenuComp">
    <navigationComponent class="navbar" />
    <div class="container">
      <div class="menuContent">
        <div class="row">
          <button
            class="btn btn-info menuContent-add-categories col-6"
            @click="goToAddCategories()"
          >
            Add/View categories
          </button>
          <button
            class="btn btn-info menuContent-add-item col-6"
            v-if="numOfCategories > 0"
            @click="goToAddItems()"
          >
            add items
          </button>
          <div class="location-info text-center mt-2">
            <h1 class="restaurant-title">{{ localName }}</h1>
            <p class="restaurant-title text-muted pt-0">{{ addressName }}</p>
          </div>
          <div class="displayMenu">
            <div
              class="displayCategories"
              v-for="(category, i) in listOfAllCategories"
              :key="i"
            >
              <div class="categoryName">
                <span>name category :_</span>
                {{ category.name }}
                <div
                  class="displayItems"
                  v-for="(item, i) in listOfAllItems"
                  :key="i"
                >
                  <div class="name items" v-if="category.id == item.catId">
                    <span>name item :_</span>
                    {{ item.name }}
                    <router-link
                      :to="{
                        name: 'updateItem',
                        params: {
                          itemId: item.id,
                          locationId: restaurantId,
                        },
                      }"
                      class="btn-update btn btn-info"
                    >
                      update</router-link
                    >
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex"; // component vuex
import navigationComponent from "@/components/Header/navigation.vue";
import axios from "axios";
export default {
  name: "MenuComp",
  data() {
    return {
      restaurantId: this.$route.params.restaurantId,
      localName: "",
      addressName: "",
    };
  },
  components: {
    navigationComponent,
  },
  computed: {
    ...mapState([
      "isUserLoggedIn",
      "listOfAllCategories",
      "numOfCategories",
      "isUserLoggedInId",
      "listOfAllItems",
    ]),
  },
  mounted() {
    this.isUserLogged();
    this.displayCategories({
      id: this.isUserLoggedInId,
      location: this.restaurantId,
    });
    this.displayLocations();
    this.getUserItems({
      userId: this.isUserLoggedInId,
      locationId: this.restaurantId,
    });
  },
  methods: {
    ...mapActions(["redirect"]),
    ...mapMutations([
      "isUserLogged",
      "displayCategories",
      "accessUserLocations",
      "getUserItems",
    ]),
    goToAddItems() {
      this.$router.push({
        name: "addItems",
        params: {
          locationId: this.restaurantId,
        },
      });
    },
    goToAddCategories() {
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
  },
};
</script>

<style scoped>
.menuContent {
  padding-top: 10%;
}
.menuContent-add-item,
.menuContent-add-categories {
  width: auto;
}
.menuContent-add-item {
  margin-left: auto;
}
</style>
