<template>
  <div class="Restaurants">
    <navigationComponent class="navbar" />
    <h1 class="Restaurants-title text-center">restaurant locations</h1>
    <button
      class="btn btn-danger d-block ml-auto mb-4"
      @click="DeleteAllLocations()"
    >
      DeleteAllLocations
    </button>
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
            <h5 class="card-id">{{ "ID :" + restaurant.id }}</h5>
            <h5 class="card-subtitle mb-2">
              Phone : <span class="ph"> {{ restaurant.phoneRestaurant }}</span>
            </h5>
            <h6 class="card-subtitle mb-2">
              addressRestaurant :
              <span class="ph"> {{ restaurant.addressRestaurant }}</span>
            </h6>
            <div class="group-button">
              <div class="row">
                <button
                  class="card-link btn btn-info d-block col-3 m-auto"
                  @click="updateRestaurant(restaurant.id)"
                >
                  Update
                </button>
                <button
                  class="card-link btn btn-dark d-block col-3 m-auto"
                  @click="goMenuRestaurant(restaurant.id)"
                >
                  Menu
                </button>
                <button
                  class="card-link btn btn-danger d-block col-3 m-auto"
                  @click="goDeleteRestaurant(restaurant.id)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"; // component vuex
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
  mounted() {
    let user = JSON.parse(localStorage.getItem("user-info"));
    console.log(user);
    if (user) {
      this.userID = user.id;
      this.getRestaurant();
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
    updateRestaurant(id) {
      this.$router.push({ path: `/updateRestaurant/${id}` });
    },
    goDeleteRestaurant(deleteRestaurant) {
      this.$router.push({ path: `/deleteRestaurant/${deleteRestaurant}` });
    },
    DeleteAllLocations() {
      this.$router.push({ path: `/DeleteAllLocations` });
    },
    goMenuRestaurant(restaurantId) {
      this.$router.push({ path: `/MenuComp/${restaurantId}` });
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Crimson+Text:ital@1&display=swap");
.Restaurants {
  font-family: "Crimson Text", serif;
  background-image: url("@/assets/homeImages/golden-cutlery-with-textile-plate-dark-background-top-view.jpg");
  background-size: cover;
  background-attachment: center center;
  width: 100%;
  height: 1000px;
  color: white;
}
.Restaurants-title {
  margin: auto;
  padding: 30px 0;
  text-transform: capitalize;
  color: #8b6a2a;
  font-size: 35px;
  padding-top: 7%;
  text-shadow: 1px 1px 2px #333;
}
////////////////////////start card design ////////////////////////
.card {
  padding: 10px !important;
  background-color: transparent;
  border: 0px;
}
.ph {
  color: #8b6a2a !important;
}
</style>
