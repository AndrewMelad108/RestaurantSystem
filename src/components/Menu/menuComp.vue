<template>
  <div class="MenuComp">
    <navigationComponent class="navbar" />
    <div class="menuContent">
      <div class="container-fluid">
        <div class="row">
          <router-link
            :to="{
              name: 'AddCategories',
              params: {
                locationId: restaurantId,
              },
            }"
            class="btn btn-success menuContent-add-categories"
          >
            AddCategories
          </router-link>
          <router-link
            :to="{
              name: 'DeleteAllCategories',
              params: {
                locationId: restaurantId,
              },
            }"
            class="btn btn-danger menuContent-add-item"
          >
            DeleteAllCategories</router-link
          >

          <router-link
            :to="{
              name: 'addItems',
              params: {
                locationId: restaurantId,
              },
            }"
            class="btn btn-success menuContent-add-item"
            v-if="numOfCategories > 0"
          >
            add items
          </router-link>
          <div class="displayMenu">
            <div
              class="displayCategories col-xs-12"
              v-for="(category, i) in listOfAllCategories"
              :key="i"
            >
              <div class="row">
                <div
                  class="titleName col-lg-6"
                  @click="displayItems(category.id)"
                >
                  <h1 class="title-category">{{ category.name }}</h1>
                </div>
                <div class="groupBtn col-lg-6">
                  <div class="row">
                    <router-link
                      :to="{
                        name: 'UpdateCategories',
                        params: {
                          locationId: restaurantId,
                          catId: category.id,
                        },
                      }"
                      class="btn btn-secondary menuContent-update-item col-lg-6 w-auto m-auto text-center"
                    >
                      Update
                    </router-link>
                    <router-link
                      :to="{
                        name: 'DeleteCategories',
                        params: {
                          locationId: restaurantId,
                          catId: category.id,
                        },
                      }"
                      class="btn btn-danger menuContent-delete-item col-lg-6 w-auto m-auto text-center"
                    >
                      DELETE
                    </router-link>
                  </div>
                </div>
              </div>
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
    ]),
  },
  mounted() {
    this.isUserLogged();
    this.displayCategories({
      id: this.isUserLoggedInId,
      location: this.restaurantId,
    });
    this.accessUserLocation({
      userId: this.isUserLoggedInId,
      locationId: this.restaurantId,
      redirect: "Home",
    });
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
        this.localName = result.data[0].nameRestaurant;
        this.addressName = result.data[0].addressRestaurant;
      } else {
        console.log("not run");
      }
    },
    displayItems(catId) {
      this.$router.push({
        name: "ItemsCategory",
        params: {
          locationId: this.restaurantId,
          catId: catId,
        },
      });
    },
  },
};
</script>

<style scoped>
.menuContent {
  padding-top: 1%;
  background-image: url("@/assets/homeImages/sandwich-with-ground-meat.jpg");
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 100vh !important;
}
.menuContent-add-item,
.menuContent-add-categories {
  display: block;
  width: auto;
  margin: 0 15px 15px 15px;
}
.menuContent-add-item {
  margin-left: auto;
}
.displayMenu {
  padding: 0px;
}
.displayCategories {
  padding: 15px 10px;
  border-top: 1px solid #ddd;
  background-color: rgba(2, 2, 2, 0.6);
  cursor: pointer;
  color: #eee;
  text-indent: 10px;
  transition: all ease-in-out 0.7s;
}
.displayCategories:hover {
  border-top: 1px solid black;
  background-color: transparent;
  color: #03c988;
  text-indent: 20px;
}
</style>
