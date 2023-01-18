<template>
  <div class="Restaurants">
    <navigationComponent />
    <div class="Restaurants-content text-center">
      <h1 class="Restaurants-title text-center">restaurant locations</h1>
      <router-link
        :to="{ name: 'DeleteAllLocations' }"
        class="btn btn-danger btn-delete-all-location"
      >
        DeleteAllLocations
      </router-link>
      <div class="container">
        <div class="row">
          <div
            class="card col-4"
            v-for="restaurant in restaurants"
            :key="restaurant.index"
          >
            <div class="card-body">
              <h4 class="card-name">
                {{ "Name :   " + restaurant.nameRestaurant }}
              </h4>
              <h5 class="card-subtitle mb-2">
                Phone :
                <span class="ph"> {{ restaurant.phoneRestaurant }}</span>
              </h5>
              <h6 class="card-subtitle mb-2">
                addressRestaurant :
                <span class="ph"> {{ restaurant.addressRestaurant }}</span>
              </h6>
              <div class="group-button">
                <div class="row">
                  <router-link
                    :to="{
                      name: 'updateRestaurant',
                      params: {
                        id: restaurant.id,
                      },
                    }"
                    class="card-link btn btn-info d-block col-3 m-auto"
                  >
                    Update
                  </router-link>
                  <router-link
                    :to="{
                      name: 'MenuComp',
                      params: {
                        restaurantId: restaurant.id,
                      },
                    }"
                    class="card-link btn btn-dark d-block col-3 m-auto"
                  >
                    Menu
                  </router-link>
                  <router-link
                    :to="{
                      name: 'deleteRestaurant',
                      params: {
                        deleteRestaurant: restaurant.id,
                      },
                    }"
                    class="card-link btn btn-danger d-block col-3 m-auto"
                  >
                    Delete
                  </router-link>
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
  name: "RestaurantsComp",
  data: () => {
    return {
      restaurants: [],
      userID: "",
    };
  },
  components: {
    navigationComponent,
  },
  computed: {
    ...mapState(["isUserLoggedIn", "isUserLoggedInId"]),
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user-info"));
    if (user) {
      this.userID = user.id;
      this.getRestaurant();
      this.canAccessUserThisLocations({
        // close display location without restaurant
        userId: this.userID,
        redirect: "Home",
      });
    }
  },
  methods: {
    async getRestaurant() {
      await axios
        .get(` http://localhost:3000/locations?userId=${this.userID}`)
        .then((res) => {
          this.restaurants = res.data;
        });
    },
    ...mapActions(["redirect"]),
    ...mapMutations(["canAccessUserThisLocations"]),
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Crimson+Text:ital@1&display=swap");
.Restaurants-content {
  font-family: "Crimson Text", serif;
  background-image: url("@/assets/homeImages/introPage.jpg");
  background-size: cover;
  background-origin: center center;
  width: 100%;
  min-height: 594px;
  color: black !important;
}
.Restaurants-title {
  margin: auto;
  padding: 30px 0;
  text-transform: capitalize;
  color: black !important;
  font-size: 35px;
  padding-top: 7%;
  text-shadow: 1px 1px 2px #333;
}
.btn-delete-all-location {
  width: auto;
  margin-left: auto;
}
////////////////////////start card design ////////////////////////
.card {
  padding: 10px !important;
  background-color: transparent;
  border: 0;
  height: 200px;
}
.ph {
  color: black !important;
}
</style>
